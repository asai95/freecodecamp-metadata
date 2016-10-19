var express = require("express");
var multer = require("multer");

var app = express();

var options = {
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 5120000000,
        fileSize: 5120000000,
        files: 5,
        parts: 10
    }
};

var upload = multer(options);

app.use(express.static(__dirname));

app.on("/", (req, res) => {
    res.render("index.html")
});

app.post("/upload", upload.array('files'), (req, res) => {
    meta = req.files.map((v, i) => {
        return {size: v.size}
    });
    res.send(meta);
});

app.listen(process.env.PORT || 8080);

