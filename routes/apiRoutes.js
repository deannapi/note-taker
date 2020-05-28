const notesData = require("../data/notesData");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function(app) { 
    // GET request
    app.get("/api/notes", (req, res) => {
        // Reads the notes from JSON file
        readFileAsync("./Develop/db/db.json", "utf8").then(function (data) {
            // Parse data to get an array of objects
            notesData = JSON.parse(data);
            // 
            res.json(notesData);
        })
    });

    // POST  request
    app.post("/api/notes", (req, res) => {
        readFileAsync("./Develop/db/db.json", "utf8").then(function (data) {
            // Parse data to get an array of objects
            notesData = JSON.parse(notesData);
            // set new notes ID
            req.body.id = notesData.length;
            // add the new note to the array of note objects
            notesData.push(req.body);
            // make it a string(stringify) so you can write it to the file
            notesData = JSON.stringify(notesData);
            // Writes the new note to the file
            fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {
                if (err) throw err;
            });
            res.json(JSON.parse(notesData));
        });
    });

    // DELETE request
    app.delete("/api/notes", (req, res) => {
        const elem = parseInt(req.params.index);
        const tempNotes = [];
        for (let i = 0; i < notesData.length; i++) {
            if (i !== elem) {
                tempNotes.push(notesData[i]);
            }
        }
        notesData = tempNotes;

        res.json("Note has been deleted.");
    });
};

