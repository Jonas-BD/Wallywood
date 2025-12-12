# Wallywood API
API til håndtering af poster, genrer, users, ratings & cart for Wallywood

# Før du starter:
Før du starter, skal du have disse ting sat op og installeret:
* [node.js](https://nodejs.org/en) - (nyeste version)
* [npm](https://www.npmjs.com) - bruges til at installere dependencies
* [Visual Studio Code](https://code.visualstudio.com) - code editor

# Kom godt i gang:
### Følg disse steps:
#### 1) Klon repository:
```bash
git clone https://github.com/Jonas-BD/Wallywood.git
cd my-api
```
#### 2) Installer dependencies:
```bash
npm install
```
#### 3) Konfigurer miljøvariabler:
Skriv følgende i en `.env` fil i projektets rodmappe
```bash
DATABASE_URL="mysql://brugernavn:adgangskode@localhost:3306/Wallywood"
JWT_SECRET=hemmeligSecretKey
```
* Erstat `brugernavn` med dit database brugernavn
* Erstat `adgangskode` med din databaseadgangskode. Hvis din database ikke har en adgangskode, kan du fjerne 'adgangskode'.
* Erstat `Wallywood` med navnet på din database
* `JWT_SECRET` du bestemmer selv hvad den skal hedde, bare der ikke er mellemrum
#### 4) Kør prisma migration:
```bash
npx prisma migrate dev --name init
```
#### 5) Få test data ind i databasen:
```bash
npm run prisma:reset
```
# Opstart:
#### Development mode:
```bash
npm run dev
```
#### Build:
```bash
npm run build
npm start
```
# API Endpoints:
Der er disse API endpoints:
* `/users` - brugerhåndtering
* `/posters` - postere
* `/genre` - genrer
* `/cartlines` - cartlines
* `/userratings` - userratings
* `/authorize` - autherize
## Authenticate:
For at få adgang til endpoints, hvor POST, PUT, DELETE skal du:
1. Logge ind via. `/login` taste email og password
2. Finde din JWT token
3. Sætte den ind i authorize header: `'bearer Token'`
# Postman documentation
[Postman documentation](https://jonesd12-4499998.postman.co/workspace/Webudvikler-Projekter~baeff590-138d-498a-9221-91088d650d09/documentation/49430978-44d2dec5-9330-436f-bb49-c7de27c08bbc)