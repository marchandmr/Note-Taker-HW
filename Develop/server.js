const express = require("express");
const path = require("path");
const util = require('util');
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);

//set up server
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//set up routes (when the user types /notes, express grabs the notes.html file and displays it )
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

// save notes to db.json

