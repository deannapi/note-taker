const path = require("path");
const router = require("express").Router();


// GET request
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    console.log("router get htmlroutes 6");
});

// Return to Homepage 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    console.log("router get htmlroutes 18");
});

module.exports = router;