//endpoints starting with /trainers are routed here from app.js
const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

const path = require("path");

const filePath = path.join(__dirname, "public", "trainer-license.txt");


router.get("/", characterController.getAllCharacters);

router.get("/:id", characterController.getSpecificCharacter);

router.post("/", characterController.createCharacter);

//put requires both name, role and planet info in body, PATCH should be used if requiring only one of them
router.put("/:id", characterController.replaceCharacter);

router.delete("/:id", characterController.deleteCharacter);

//fra valideringsopgaven, som bygger videre på Pokémon CRUD
//router.post("/register-trainer", trainerController.registerTrainer);

module.exports = router;