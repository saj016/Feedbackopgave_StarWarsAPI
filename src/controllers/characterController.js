//Receives HTTP data, calls relevant service functions and sends responses
const validator = require("../utils/validator");
const characterService = require("../services/characterService");

exports.getAllCharacters = async (req, res) => {
    const characters = await characterService.getAllCharacters();
    res.status(200).json(characters);
}

exports.getSpecificCharacter = async (req, res) => {
    const id = Number(req.params.id);

    const character = await characterService.findCharacterById(id);

    if (!character) {
        return res.status(404).json({ "error": "Karakteren findes ikke"});
    }
    res.status(200).json(character);
}

exports.createCharacter = async (req, res) => {
    const validation = validator.validateCharacter(req.body);
    if ("error" in validation) {
        return res.status(400).json({ error: validation.error});
    }

    //object destructuring to pull name, role and planet properties from validation.data and assign them to the specified constants
    const { name, role, planet} = validation.data;
    const character = {name: name, role: role, planet: planet}

    const newCharacter = await characterService.createCharacter(character);

    //status 201, as new character has been created and saved
    res.status(201).json({
        "status": "Karakter modtaget",
        "character": newCharacter});
}

exports.replaceCharacter = async (req, res) => {
    const id = Number(req.params.id);

    let character = await characterService.findCharacterById(id)
    if (character === undefined) {
        return res.status(404).json( {error: "Karakteren findes ikke"});
    }

    const validation = validator.validateCharacter(req.body);
    if ("error" in validation) {
        return res.status(400).json({ error: validation.error});
    }

    //object destructuring to pull name, region and planet properties from validation.data and assign them to the specified constants
    const { name, role, planet} = validation.data;

    //update character
    character.name = name;
    character.role = role;
    character.planet = planet;
    const updatedCharacter = await characterService.replaceCharacterById(id, character);

    res.status(200).json({
        "status": "Karakter opdateret",
        "trainer": updatedCharacter});
}

exports.deleteCharacter = async (req, res) => {
    const id = Number(req.params.id);
    if (await characterService.deleteCharacterById(id)) {
        return res.sendStatus(204);
    }

    res.status(404).json({"error": "Karakteren findes ikke"});
}