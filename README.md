Test med Postman:

| Test     | Forventet status      | Resultat     | req.body/request param |
| ------------- | ------------- | -------- | ----|
| Hent alle karakterer|200| 200 - med liste af alle default karakterer  | |
| Hent eksisterende karakter|200| 200 - {"id": 2, "name": "Darth Vader", "role": "Sith Lord", "planet": "Tatooine"}|param 2|
| Hent ukendt karakter|404| 404 - {"error": "Karakteren findes ikke"}  | param 43 |
| Opret gyldig karakter|201| 201 - {"status": "Karakter oprettet", "character": {"id": 7, "name": "Rey", "role": "Jedi", "planet": "Jakku"}} | {"name": "Rey", "role": "Jedi", "planet": "Jakku"}|
| Opret karakter med ugyldig rolle|400| 400 - {"error": "Ugyldig rolle. Gyldige roller er: Jedi, Sith, Rebel, Smuggler"} | {"name": "Finn", "role": "Stormtrooper", "planet": "Unknown" }|
| Opret karakter uden planet|400| 400 - {"error": "Information mangler eller har forkert datatype: [planet]"} |{"name": "Rey", "role": "Jedi"}|
| Opdater eksisterende karakter|200| 200 - {"status": "Karakter opdateret", "character": {"id": 1, "name": "Luke, just Luke", "role": "Jedi", "planet": "Tatooine"}} |{"name": "Luke, just Luke", "role": "Jedi", "planet": "Tatooine"}|
| Opdater ukendt karakter|404| 404 - {"error": "Karakterern findes ikke"}  |param 900|
| Slet eksisterende karakter|204| 204 |param 5|
| Slet ukendt karakter|404| 404 - {"error": "Karakteren findes ikke"}  | param 999|

Der er ikke lavet en frontend løsning

Ift. arkitektur:
- server.js starter serveren og lytter på den specificerede port (lige nu 3000, da der ikke er implementeret env)
- app.js står for at køre express og holde styr på middleware og routes
- characterRoutes står for routes, der begynder med /characters, mens genericRoutes har ansvaret for dem, der ligger direkte under /
- genericRoutes kalder til genericController, som står for at downloade en specifik fil og redirecte til en specific URL
- characterRoutes kalder til characterController
- characterController kalder til characterService samt validator
- characterService henter data fra characters.json og opdaterer denne, når der sker ændringer
- I øjeblikket består logging-middleware kun af, at der i app.js logges til konsollen. Hvis der var mere tid og overskud, ville jeg have gemt denne data i en fil og brugt en egentlig "middleware" mappe med en "looger.js" i til at håndtere dette

