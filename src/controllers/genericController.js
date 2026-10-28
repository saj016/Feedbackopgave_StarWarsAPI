const path = require("path");
const filePath = path.join(__dirname, "../public", "rebel-alliance.txt");

exports.download = (req, res) => {
    res.download(filePath);
}

exports.goToLuke = (req, res) => {
    res.redirect("/characters/1");
    //Luke has id 1
}