const { nanoid } = require('nanoid'); //For shortid generation
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body; //Can only be used once a middleware is initialized
  if (!body.url) return res.status(400).json({ error: 'URL is required' });
//Body.url can only be written when post request has url in its body , if body has something else written like "content" then you'll have to write body.content
  const shortID = nanoid(8); // Generates an 8-character ID

  await URL.create({//MongoDB's function used to create data
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortID:shortId}); //FindOne MongoDB's function which checks wheather shortID:shortId is present in db or not
  return res.json({
    totalClicks:result.visitHistory.length, //Size of array basically how many times that shortID was visited before
    analytics:result.visitHistory, //Data that when visited timestamps
  });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}