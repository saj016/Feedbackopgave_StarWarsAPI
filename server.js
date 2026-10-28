const app = require("./src/app");
const port = process.env.PORT || 3000;
//env is not used here but can be implemented later

app.listen(port, () => {
    console.log(`Serveren kører på port ${port}`);
});