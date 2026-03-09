const express = require("express");
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const fs = require('fs');

app.use(express.json());
app.use(express.static("public")); // allow images to be served

// API route to return the correct image
app.get("/api/getImage", (req, res) => {
    const name = (req.query.name || "").toLowerCase();  //name = jerry

    let image = "default.png";

    if (name.includes("tom")) image = "tom.png";
    if (name.includes("jerry")) image = "jerry.png";
    if (name.includes("dog")) image = "dog.png";

    res.json({ url: "/" + image });   
});

// API route to upload image
app.post('/api/upload', upload.single('image'), function (req, res, next) {
    const name = (req.body.name || "").toLowerCase();
    //res.json({message: "Good upload", name: name, file: req.file});

    fs.rename(req.file.path, `public/${name}.png`, function (err){
        if (err) return res.json({message: "Error", error: err});
        res.json({message: "Good upload", name: name, file: `${name}.png`})
    });

});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
