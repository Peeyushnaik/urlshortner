const express = require("express");
const {connectMongoDB} = require("./connection");
const urlRoute = require('./routes/url'); //I could have named it router only instead of urlRoute but it is just fine
const URL = require("./models/url");
const app = express();

const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected")
);

app.use(express.json()) //Middleware
//Beneficial as it parses the data (converts the data from one form to another) here to json format

app.use("/url",urlRoute);
app.get('/:shortId', async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate( //FindOneAndUpdate MongoDB's function will check wheather shortID attribute mein shortId is present or not
        {shortID:shortId},

        {
            $push:{ //$push will update the timestamp to latest visited in visitHistory array
                visitHistory:{
                    timestamp: Date.now(),
                }
            },
        }
    );

    if(!entry){ //Condition to check if the shortid does actually exist or not in the MongoDB
        return res.status(404).send("Short URL not found")
    }

    res.redirect(entry.redirectURL); //Here we are able to use redirectURL as it was defined in our schema
    //Entry is a variable which is full of JavaScript objects like redirectURL, visitHistory, shortId
    //redirect will redirect us to our original url that we gave
});

app.listen(PORT,() => console.log("Server Started!"));