//Import
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const VideoGame = require("./models/games.js");

//Connect Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", ()=>{
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

//Middelware
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

//Start Server
const port = 4000;
app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})

//Routes
app.get("/", (req, res)=>{
    res.render("home.ejs")
})
    //Index Show Page
app.get("/index", async (req, res)=>{
    const videoGameList = await VideoGame.find();
    res.render("index.ejs", {
        videoGameList
    })
})
    //Add Video Game Show Page
app.get("/index/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/index/new", async (req, res)=>{
    if(req.body.status){
        req.body.status = true;
    }
    await VideoGame.create(req.body);
    res.redirect("/index");
})
    //Video Game Details Show Page
app.get("/index/:id", async (req, res)=>{
    const foundGame = await VideoGame.findById(req.params.id);
    res.render("show.ejs", {
        foundGame
    })
})
    //Delete Video Game
app.delete("/index/:id", async (req, res)=>{
    await VideoGame.findByIdAndDelete(req.params.id);
    res.redirect("/index");
})
    //Edit Video Game Show Page
app.get("/index/:id/edit", async (req, res) =>{
    const foundVideoGame = await VideoGame.findById(req.params.id)
    res.render("edit.ejs", {
        foundVideoGame
    })
})

    //Edit Video Game Database
app.put("/index/:id", async (req, res)=>{
    if(req.body.status === "on"){
        req.body.status = true;
    }else{
        req.body.status = false;
    }
    await VideoGame.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/index/${req.params.id}`);
})
