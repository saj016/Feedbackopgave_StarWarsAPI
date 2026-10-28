//create the express application and register middleware and routes
const express = require("express");
const characterRoutes = require("./routes/characterRoutes");
const genericRoutes = require("./routes/genericRoutes");

const app = express();

app.use(express.json());

//currently just logging in the console
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use("/characters", characterRoutes); //every route starting with /trainers will now be handled in trainerRoutes.js
app.use("/", genericRoutes);

app.get("/error", (req, res) => {
    throw new Error("Noget gik galt!");
});

app.use((req, res) => {
    res.status(404).json({ error: "Routen findes ikke" });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: "Intern serverfejl" });
});

module.exports = app;