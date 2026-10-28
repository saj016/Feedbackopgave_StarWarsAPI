function validateCharacter(body) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return { error: 'Karakter mangler. Påkrævede felter: name, role, planet'};
    }

    //If a string then trim, otherwise set it to ""
    const name = typeof body.name === 'string' ? body.name.trim() : "";
    const role = typeof body.role === 'string' ? body.role.trim() : "";
    const planet = typeof body.planet === 'string' ? body.planet.trim() : "";

    const missingInfo = [];
    if (name === "") { missingInfo.push("[name]")}
    if (role === "") { missingInfo.push("[role]")}
    if (planet === "") { missingInfo.push("[planet]")}
    if (missingInfo.length > 0) {
        return { error: `Information mangler eller har forkert datatype: ${missingInfo.join(" ")}`}
        //join the missing info array with a space in between each element
    }

    const minNameLength = 3; //name must have at least 2 characters (was trimmed earlier)
    const minPlanetLength = 1; //planet must not be empty after trim, so at least 1 character

    if (name.length < minNameLength || planet.length < minPlanetLength) {
        return { error: `Navn skal være minimum ${minNameLength} karakterer, og planet skal være minimum ${minPlanetLength} karakterer`};
    }

    const validRoles = ["Jedi", "Sith", "Rebel", "Smuggler", "Jedi Master", "Princess", "Sith Lord"];
    for (let i = 0; i < validRoles.length; i++) {
        if (role === validRoles[i]) {
            return {data: {name, role, planet}};
        }
    }

    return { error: "Ugyldig rolle. Gyldige roller er: " + validRoles.join(", ")};
}

module.exports = { validateCharacter : validateCharacter};