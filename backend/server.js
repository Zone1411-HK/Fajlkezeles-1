//!Module-ok importálása
const express = require('express'); //?npm install express
const session = require('express-session'); //?npm install express-session
const path = require('path');
const fs = require('fs');

//!Beállítások
const app = express();
const router = express.Router();

const ip = '127.0.0.1';
const port = 3000;

app.use(express.json()); //?Middleware JSON
app.set('trust proxy', 1); //?Middleware Proxy

//!Session beállítása:
app.use(
    session({
        secret: 'titkos_kulcs', //?Ezt generálni kell a későbbiekben
        resave: false,
        saveUninitialized: true
    })
);

//!Routing
//?Főoldal:
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});
router.get('/elso', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/elso.html'));
});
router.get('/masodik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/masodik.html'));
});
router.get('/harmadik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/harmadik.html'));
});
router.get('/negyedik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/negyedik.html'));
});
router.get('/otodik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/otodik.html'));
});
router.get('/hatodik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/hatodik.html'));
});
router.get('/hetedik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/hetedik.html'));
});
router.get('/nyolcadik', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/nyolcadik.html'));
});
//! ------------------------------------------------------- !//

let nums = [];
for (let i = 0; i < 20; i++) {
    nums.push(Math.floor(Math.random() * (50 - 1 + 1) + 1));
}
fs.writeFileSync('files/szamok.txt', nums.join(','), 'utf8');

//!API endpoints
app.use('/', router);
const endpoints = require('./api/api.js');
app.use('/api', endpoints);

//!Szerver futtatása
app.use(express.static(path.join(__dirname, '../frontend'))); //?frontend mappa tartalmának betöltése az oldal működéséhez
app.listen(port, ip, () => {
    console.log(`Szerver elérhetősége: http://${ip}:${port}`);
});

//?Szerver futtatása terminalból: npm run dev
//?Szerver leállítása (MacBook és Windows): Control + C
//?Terminal ablak tartalmának törlése (MacBook): Command + K
