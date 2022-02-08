const puppeteer = require('puppeteer');
const assert = require('assert');
require('dotenv').config();

const config = {
    url: process.env.URL_GUI
}

const optsHeadless = {
    headless: true,
    args: [
        "--no-sandbox",
        "--disable-gpu",
    ]
}

const optsNonHeadless = {
    headless: false,
    slowMo: 50,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1920,1040']
}

function generateUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

describe('Company Component', () => {

    let companyIds = [];
    console.log('companyIds', companyIds);

    it('should save a new company when all basic properties are given', async () => {

        const companyId = "kehrw" + generateUID();
        companyIds.push(companyId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })

        input = await page.$('input[name="year"]');
        await input.click({ clickCount: 3 })
        await input.type('2003');

        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="industry"]', 'Tech Consulting', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.type('input[name="logo_url"]', 'https://www.kehrwasser.com/logo.png', { delay: 50 })
        await page.type('textarea[name="additional_information"]', '{"test": "TEST"}', { delay: 50 })
        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should not save a new company when ID is already taken', async () => {

        const companyId = companyIds[0];

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })

        input = await page.$('input[name="year"]');
        await input.click({ clickCount: 3 })
        await input.type('2003');

        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="industry"]', 'Tech Consulting', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, false);

    });

    it('should save a new company when funding properties are given', async () => {

        const companyId = "kehrw" + generateUID();
        companyIds.push(companyId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })

        input = await page.$('input[name="year"]');
        await input.click({ clickCount: 3 })
        await input.type('2003');

        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="industry"]', 'Tech Consulting', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.click('form button[name="add-funding"]', { delay: 50 })
        await page.type('.companies-funding input[name="lead"]', 'Lead Investor', { delay: 50 })

        input = await page.$('.companies-funding input[name="amount"]');
        await input.click({ clickCount: 3 })
        await input.type('650000', { delay: 50 });

        await page.select('.companies-funding select[name="currency"]', 'USD')

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should save a new company when file properties are given', async () => {

        const companyId = "kehrw" + generateUID();
        companyIds.push(companyId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })

        input = await page.$('input[name="year"]');
        await input.click({ clickCount: 3 })
        await input.type('2003');

        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="industry"]', 'Tech Consulting', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.click('form button[name="add-file"]', { delay: 50 })
        await page.type('input[name="file_0"]', 'http://link.to.a/folder/file.exe', { delay: 50 })

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should save a new company when only required properties are given', async () => {

        const companyId = "kehrw" + generateUID();
        companyIds.push(companyId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })

        input = await page.$('input[name="year"]');
        await input.click({ clickCount: 3 })
        await input.type('2003');

        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="industry"]', 'Tech Consulting', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should not save a new company when not all required properties are given', async () => {

        const companyId = "kehrw" + generateUID();
        companyIds.push(companyId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        const input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(companyId);

        await page.type('input[name="name"]', 'Kehrwasser', { delay: 50 })
        await page.type('input[name="hq"]', 'Bottrop', { delay: 50 })
        await page.type('input[name="company_url"]', 'https://www.kehrwasser.com', { delay: 50 })

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
            // if as expected (not saved) - clean up from companyIds array
            companyIds = companyIds.filter(item => item !== companyId)
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, false);

    });

    it('should edit a company when all basic properties are given', async () => {

        const companyId = companyIds[0];

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + `/companies/${companyId}`, { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="name"]', { timeout: 8000 });

        const input = await page.$('input[name="name"]');
        await input.click({ clickCount: 3 })
        await input.type('New Company Name');

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + companyId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });


    /*
    it('should delete a company', async () => {

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/companies', { waitUntil: 'networkidle2' });

        await page.click(`.${companyId} .delete-link`);
        console.log('clicked')
        //await delay(1000);
        console.log('continue')
        await page.keyboard.press(String.fromCharCode(13));
        console.log('confirmed')

        try {
            await page.waitForSelector('.' + companyId, { timeout: 5000 });
            resultsAppeared = true;
        } catch (error) {
            resultsAppeared = false;
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, false);

    });
    */

});


describe('Tag Component', () => {

    let tagIds = [];
    console.log('tagIds', tagIds);

    it('should save a new tag when all properties are given', async () => {

        const tagId = "testtag" + generateUID();
        tagIds.push(tagId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/tags/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(tagId);

        input = await page.$('input[name="description"]');
        await input.click({ clickCount: 3 })
        await input.type("Test description");

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + tagId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should not save a new tag if required properties are not given', async () => {

        const tagId = "testtag" + generateUID();
        tagIds.push(tagId);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/tags/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        const input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type('');

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector(`.tag-list`, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
            // if as expected (not saved) - clean up from tagIds array
            tagIds = tagIds.filter(item => item !== tagId);
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, false);

    });

    it('should not be editable if the tag doesn\'t exist', async () => {

        let resultsAppeared = false;

        const randomTagID = generateUID();

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + `/tags/${randomTagID}`, { waitUntil: 'networkidle2' });

        try {
            await page.waitForSelector(`.tags-create`, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should not save a new tag when ID is already taken', async () => {

        const tagId = tagIds[0];

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/tags/create', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="_id"]', { timeout: 8000 });

        let input;
        input = await page.$('input[name="_id"]');
        await input.click({ clickCount: 3 })
        await input.type(tagId);

        await page.type('input[name="description"]', 'Descr', { delay: 50 })

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('._' + tagId, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, false);

    });

    it('should edit a tag when all properties are given', async () => {

        const tagId = tagIds[0];

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + `/tags/${tagId}`, { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="description"]', { timeout: 8000 });

        const input = await page.$('input[name="description"]');
        await input.click({ clickCount: 3 })
        await input.type('New Test Description');

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector(`._${tagId}`, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

    it('should edit a tag when only required properties are given', async () => {

        const tagId = tagIds[0];

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + `/tags/${tagId}`, { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="description"]', { timeout: 8000 });

        const input = await page.$('input[name="description"]');
        await input.click({ clickCount: 3 })
        await input.type('');

        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector(`._${tagId}`, { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

});

describe('News Component', () => {

    let newsUrls = [];
    console.log('newsUrls', newsUrls);

    it('should save a new news when all basic properties are given', async () => {

        const newsUrl = "https://www.kehrwasser.com?id=" + generateUID();
        newsUrls.push(newsUrl);

        let resultsAppeared = false;

        const browser = await puppeteer.launch(optsHeadless);
        const page = await browser.newPage();
        await page.goto(config.url + '/news/create', { waitUntil: 'networkidle2' });

        let input;

        await page.waitForSelector('input[name="main_company"]', { timeout: 8000 });

        input = await page.$('input[name="main_company"]');
        await input.click({ clickCount: 1, delay: 50 })
        await page.click('li[data-value="amazon"]', { delay: 50 })

        await page.type('input[name="news_url"]', newsUrl, { delay: 50 })
        await page.type('input[name="headline"]', 'What a catchy headline!', { delay: 50 })
        await page.type('input[name="summary"]', 'All the important stuff about the competitor...', { delay: 50 })

        input = await page.$('input[name="news_tags"]');
        await input.click({ clickCount: 1, delay: 50 })
        await page.click('li[data-value="services"]', { delay: 50 })

        /*
        await page.click('input[name="date"]', { delay: 50 })
        let inputValue = await page.$eval('input[name="date"]', el => el.value);
        for (let i = 0; i < inputValue.length; i++) {
            await page.keyboard.press('Backspace');
        }
        await page.type('input[name="date"]', '01.01.2021', { delay: 50 })

        await page.click('input[name="rating"]', { delay: 50 })
        inputValue = await page.$eval('input[name="rating"]', el => el.value);
        for (let i = 0; i < inputValue.length; i++) {
            await page.keyboard.press('Backspace');
        }
        await page.type('input[name="rating"]', '4', { delay: 50 })
        */

        await page.type('textarea[name="additional_information"]', '{"test": "TEST"}', { delay: 50 })
        await page.click('form button[type="submit"]', { delay: 50 })

        try {
            await page.waitForSelector('article.news-list', { timeout: 10000 });
            resultsAppeared = true;
        } catch (error) {
        }

        await browser.close();

        assert.strictEqual(resultsAppeared, true);

    });

});