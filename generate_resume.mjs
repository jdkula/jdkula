import { promises as fs } from 'fs';
import puppeteer from 'puppeteer';
import { render } from 'resumed';
import yaml from 'yaml';
import tslog from 'tslog';

const log = new tslog.Logger({ displayFunctionName: false });

log.info('Creating output directory...');
await fs.mkdir('./public/generated', { recursive: true });

log.info('Loading resume...');
const resume = yaml.parse(await fs.readFile('./public/resume.yaml', 'utf-8'));

log.info('Saving json...');
await fs.writeFile('./public/generated/resume.json', JSON.stringify(resume));

const themeName = resume.meta?.theme ?? 'flat';

const theme = await import(`jsonresume-theme-${themeName}`);

log.info('Rendering resume...');
const html = await render(resume, theme);

log.info('Saving html...');
await fs.writeFile('./public/generated/resume.html', html);

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
