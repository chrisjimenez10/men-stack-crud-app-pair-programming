//Import
const mongoose = require("mongoose");

//Schema
const VideoGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    release: {
        type: Number,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
    },
});

//Model
const VideoGame = mongoose.model("Video_Game", VideoGameSchema);

//Export Model
module.exports = VideoGame;
