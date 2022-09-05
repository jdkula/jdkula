import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';
import { render } from 'resumed';
import yaml from 'yaml';
import tslog from 'tslog';
import fetch from 'node-fetch';

const log = new tslog.Logger({ displayFunctionName: false });

function stripExtraProperties(object, schema, path = '') {
    if (!object || !schema) {
        return;
    }

    const validKeys = Object.keys(schema);
    const objectKeys = Object.keys(object);

    for (const key of objectKeys) {
        if (!validKeys.includes(key)) {
            log.debug('Deleting key', path + '.' + key);
            delete object[key];
        } else if (Array.isArray(object[key])) {
            for (let i = 0; i < object[key].length; i++) {
                const item = object[key][i];
                if (typeof item === 'object') {
                    stripExtraProperties(
                        item,
                        schema[key]?.items?.properties,
                        `.${key}[${i}]`
                    );
                }
            }
        } else if (typeof object[key] === 'object') {
            stripExtraProperties(
                object[key],
                schema[key]?.properties,
                '.' + key
            );
        }
    }
}

// ==== Output Setup ====
log.info('Creating output directory...');
await fs.mkdir('./public/generated', { recursive: true });
await fs.mkdir('./lib/generated', { recursive: true });

// ==== Resume Parse ====
log.info('Loading resume...');
const resume = yaml.parse(await fs.readFile('./lib/resume.yaml', 'utf-8'));

// ==== Typescript Typings ====
log.info('Saving typescript information...');
await fs.writeFile(
    './lib/generated/resume.ts',
    `
const resumeJson = (${JSON.stringify(resume, null, 4)});
type Resume = typeof resumeJson;

export default Resume;
`.trim()
);

// ==== JSON Validation & Generation ====
log.info('Validating resume and stripping extra fields.');
const schema = await (await fetch(resume.$schema)).json();
stripExtraProperties(resume, schema.properties);

log.info('Saving generated json...');
await fs.writeFile('./public/generated/resume.json', JSON.stringify(resume));

// ==== HTML Generation ====
const themeName = resume.meta?.theme ?? 'flat';

const theme = await import(`jsonresume-theme-${themeName}`);

log.info('Rendering resume...');
const html = await render(resume, theme);

log.info('Saving html...');
await fs.writeFile('./public/generated/resume.html', html);

// ==== PDF Generation ====
log.info('Launching Puppeteer...');
const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
});
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0' });

log.info('Exporting PDF...');
await page.pdf({
    path: './public/generated/resume.pdf',
    format: 'letter',
    printBackground: false,
    margin: {
        top: '48px',
        left: '16px',
        right: '16px',
        bottom: '32px',
    },
});
await browser.close();

log.info('Success! Resume exported to ./public/generated/resume.pdf');
