const express = require("express")
const router = express.Router()

const { scrape } = require('../services/scraper')

const patterns = {
    example: {
        selectors: {
            title: 'h1',
            skillLevel: 'td',
            skillLevelText: 'Skill Level'
        }
    },
    anotherSite: {
        selectors: {
            title: '.different-title-class',
            skillLevel: '.skill-level',
            instructions: '.instructions'
        }
    }
};

// Add this new route
router.get('/scrape-test', async (req, res) => {
    try {
        const data = await scrape('https://fabrics-store.com/sewing-patterns/lois-paperbag-waist-pants-pattern-type-pdf', patterns); // Replace with your target URL
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


router.post("/", (req, res)=>{
    res.send("Create Pattern")
})


module.exports = {router, patterns}
