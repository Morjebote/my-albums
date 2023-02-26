const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AlbumSchema = new Schema({
    artist: String,
    artwork: String,
    genre: String,
    title: String,
    tracklist: [String],
    year: Number
})

const AlbumModel = model("Album", AlbumSchema);

module.exports = AlbumModel;