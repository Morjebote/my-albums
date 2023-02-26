const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Album = require("./models/Album");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect("<MongoDB URL>");

app.post("/album", async (req, res) => {
    const {artist, artwork, genre, title, tracklist, year} = req.body;
    const albumDoc = await Album.create({artist, artwork, genre, title, tracklist, year});
    res.json(albumDoc);
});

app.put("/album", async (req, res) => {
    const {id, artist, artwork, genre, title, tracklist, year} = req.body;
    const albumDoc = await Album.findById(id);
    await albumDoc.updateOne({artist, artwork, genre, title, tracklist, year});
    res.json(albumDoc);
});

app.delete("/album", async (req, res) => {
    const {id} = req.body;
    await Album.deleteOne({_id: id});
})

let sort = {};
app.get("/list", async (req, res) => {
    sort = req.query;
    order = sort;
    res.json(await Album.find({})
        .sort({[sort.key]:sort.order})
    );
});

app.get("/filter", async (req, res) => {
    const params = req.query;
    res.json(await Album.find({genre: params.genres})
        .sort({[sort.key]:sort.order})
    );
})

app.get("/album/:id", async (req, res) => {
    const {id} = req.params;
    const albumDoc = await Album.findById(id);
    res.json(albumDoc);
});

app.listen(4000, () => console.log("Server started at port 4000"));
