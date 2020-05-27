const path = require("path");

module.exports = function(app) {
    // GET request
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
    });

    // CSS
    app.get("/styles", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/css/styles.css"));
    });

    // Return to Homepage 
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });
};