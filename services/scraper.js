const puppeteer = require('puppeteer');

async function scrape(url, pattern) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
        // await page.setViewport({ width: 1280, height: 800 });
        // await page.setDefaultNavigationTimeout(30000);
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Get title using pattern selector
        await page.locator(pattern.selectors.title);
        let titleElement = await page.$(pattern.selectors.title);
        const title = await page.evaluate(el => el.textContent, titleElement);
        
        // Get skill level using pattern selector
        await page.waitForSelector(pattern.selectors.skillLevel);
        const skillLevel = await page.evaluate((skillLevelSelector) => {
            let tdElements = Array.from(document.querySelectorAll(skillLevelSelector));
            let skillTd = tdElements.find(td => td.textContent.includes("Skill Level"));
            
            if (skillTd) {
                return skillTd.nextElementSibling.textContent.trim();
            }
            return null;
        }, pattern.selectors.skillLevel);
        
        const result = {
            title,
            skillLevel
        };
        
        await browser.close();
        console.log(result)
        return result;
        
    } catch (error) {
        await browser.close();
        console.error('Scraping failed:', error);
        throw error;
    }
}

module.exports = {
    scrape
};