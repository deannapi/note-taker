// const notesData = require("../data/notesData");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
var notesData;

module.exports = function(app) { 
    // GET request
    app.get("/api/notes", (req, res) => {
        // Reads the notes from JSON file
        readFileAsync("../db/db.json", "utf8").then(function (data) {
            // Parse data to get an array of objects
            notesData = JSON.parse(data);
            // 
            res.json(notesData);
        });
    });

    // POST  request
    app.post("/api/notes", (req, res) => {
        //  Add a 1 to the ID for each new note
        let newNote = req.body;
        let currentID = 0;
        if (notesData.length !== 0) {
            currentID = notesData[notesData.length -1]["id"];
        }
        let newID = currentID +1;
        newNote["id"] = newID;
        console.log(req.body);
        // Add new note to the array of note objects
        notesData.push(newNote);
        //  Writes the new note to the file
        writeFileAsync("../db/db.json", "utf8").then(function (data) {
            console.log("Note has been added.");
            });
            res.json(newNote);
        });

    // DELETE request
    app.delete("/api/notes/:id", (req, res) => {
        let selID = parseInt(req.params.id);
        //  Read JSON file
        for (let i = 0; i < notesData.length; i++) {
            if (selID === notesData[i].id) {
                notesData.splice(i, 1);
                let noteJSON = JSON.stringify(notesData, null, 2);

                writeFileAsync("../db/db.json", noteJSON).then(function () {
                    console.log("Note has been deleted.");
                });
            }
        }
        res.json(notesData);
    });
};