const express = require("express");
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');

const router = express.Router(); //An instance to organize code

router.post("/",handleGenerateNewShortURL);
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;//Name i gave here is router but i am using it as "urlRouter" in index and it will cause no problem