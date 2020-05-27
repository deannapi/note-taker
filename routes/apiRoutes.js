const notesData = require("../data/notesData");

module.exports = function(app) { 
    // GET request
    app.get("/api/notes", (req, res) => {
        res.json(notesData);
    });

    // POST  request
    app.post("/api/notes", (req, res) => {
        notesData.push(req.body);
        res.json("Saved");
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
    })
};

