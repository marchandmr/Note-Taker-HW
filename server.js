const express = require("express");
const path = require("path");
const util = require('util');
const fs = require("fs");

//set up server
var app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//set up routes (when the user types /notes, express grabs the notes.html file and displays it )

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// save notes to db.json

app.post("/api/notes", function (req, res) {
    var note = JSON.parse(fs.readFileSync("./db/db.json", 'utf8'));
    newNote = req.body;
    newNote.id = id();
    note.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(note));
    return res.json(note);

})

// delete notes from db.json
app.delete("/api/notes/:id", function (req, res) {
    var note = JSON.parse(fs.readFileSync("./db/db.json", 'utf8'));
    var deleteId = req.params.id;
    note = note.filter(function (data) {
        return data.id != deleteId;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(note));
    res.json(note);
})

// counter function for the id

function counter() {
    var i = 0;
    return function () {
        return JSON.stringify(i++);
    }
}

var id = counter();

//display active port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
