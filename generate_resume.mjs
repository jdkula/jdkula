import { promises as fs } from 'fs';
import * as theme from 'jsonresume-theme-caffeine';
import puppeteer from 'puppeteer';
import { render } from 'resumed';
import yaml from 'js-yaml';
import tslog from 'tslog';

const log = new tslog.Logger({ displayFunctionName: false });

log.info('Creating output directory...');
await fs.mkdir('./public/generated', { recursive: true });

log.info('Loading resume...');
const resume = yaml.load(await fs.readFile('./public/resume.yaml', 'utf-8'));

log.info('Saving json...');
await fs.writeFile('./public/generated/resume.json', JSON.stringify(resume));

log.info('Rendering resume...');
const html = await render(resume, theme);

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
    printBackground: true,
});
await browser.close();

log.info('Success! Resume exported to ./public/generated/resume.pdf');
