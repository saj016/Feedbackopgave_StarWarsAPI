const fs = require("node:fs/promises");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data", "characters.json");


function getAllCharacters(req, res) {
    return readCharactersFromFile();
}

async function findCharacterById(id) {
    const characters = await readCharactersFromFile();
    return characters.find(character => character.id === id);
}

async function createCharacter(newCharacter) {
    const characters = await readCharactersFromFile();
    const nextAvailableId = characters.reduce(
        (maxId, character) => Math.max(maxId, character.id),
        0
    ) + 1;
    /*
    reduce(...) goes through each character and carries forward a running max (maxId).
    Math.max checks if the saved max or the current character's max is the highest and only keeps the highest
    Initial max is 0 so an empty array will have max 0
    +1 ensures the id will be 1 higher than the current max
    if the current max is deleted, this method allows for it to be reused
     */
    const character = {
        id: nextAvailableId,
        name: newCharacter.name,
        role: newCharacter.role,
        planet: newCharacter.planet
    }

    characters.push(character);
    await updateCharactersInFile(characters);
    return character;
}

async function replaceCharacterById(id, character) {
    const characters = await readCharactersFromFile();
    for (let i = 0; i < characters.length; i++) {
        if (id === characters[i].id) {
            characters[i] = character;
            break;
        }
    }
    await updateCharactersInFile(characters);
    return character;
}

async function deleteCharacterById(id) {
    const characters = await readCharactersFromFile();

    for (let i = 0; i < characters.length; i++) {
        if (id === characters[i].id) {
            characters.splice(i, 1);
            await updateCharactersInFile(characters);
            return true;
        }
    }
    return false;
}

async function readCharactersFromFile() {
    try {
        const characterData = await fs.readFile(
            dataFilePath,
            'utf8'
        )
        return JSON.parse(characterData);
    } catch (cause) {
        const error = new Error("Karaktererne kunne ikke loades, { cause }");
        error.code = "CHARACTERS_LOAD_FAILED";
        throw error;
    }
}

async function updateCharactersInFile(characters) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(characters, null, 2));
    } catch (cause) {
        const error = new Error("Karaktererne kunne ikke opdateres, { cause }");
        error.code = "CHARACTERS_UPDATE_FAILED";
        throw error;
    }
}

module.exports = {
    getAllCharacters,
    findCharacterById,
    createCharacter,
    replaceCharacterById,
    deleteCharacterById
}