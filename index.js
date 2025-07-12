const express = require("express");
const {connectMongoDB} = require("./connection");
const urlRoute = require('./routes/url');//I could have named it router only instead of urlRoute but it is just fine
const URL = require("./models/url");
const app = express();

const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected")
);

app.use(express.json())//Middleware

app.use("/url",urlRoute);
app.get('/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortID:shortId,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                }
            },
        }
    );

    res.redirect(entry.redirectURL);
});

app.listen(PORT,() => console.log("Server Started!"));