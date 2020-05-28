const path = require("path");
const router = require("express").Router();


    // GET request
    router.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
    });

    // CSS
    router.get("/styles", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/css/styles.css"));
    });

    // Return to Homepage 
    router.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });

    module.exports = router;