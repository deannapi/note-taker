const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Folder to retrieve CSS and JS Files
app.use(express.static('public'));
// Middleware to parse the JSON data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Add routes for HTML pages
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

// PORT
app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})