const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

const readTextFile = async (filePath) => {
    try {
        const text = await fs.readFile(filePath, 'utf8');
        return text;
    } catch (err) {
        throw new Error(`Olvasási hiba: (text): ${err.message}`);
    }
};

//? ELSŐ FELADAT

router.get('/readfile', async (request, response) => {
    const data = await readTextFile('files/adatok.txt');
    response.status(200).json({
        text: data
    });
});

//? MÁSODIK FELADAT

router.get('/beolvasas', async (request, response) => {
    let nums = await readTextFile('files/szamok.txt');
    response.status(200).json({
        numbers: nums
    });
});

router.get('/osszeg', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    let sum = 0;
    for (let num of nums) {
        sum += parseInt(num);
    }
    response.status(200).json({
        sum: sum
    });
});

router.get('/szorzat', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    let product = nums[0] * nums[nums.length - 1];

    response.status(200).json({
        product: product
    });
});

router.get('/atlag', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    let sum = 0;
    for (let num of nums) {
        sum += parseInt(num);
    }
    response.status(200).json({
        avg: sum / nums.length
    });
});
router.get('/min', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    let min = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (parseInt(nums[i]) < min) {
            min = parseInt(nums[i]);
        }
    }
    response.status(200).json({
        min: min
    });
});
router.get('/max', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (parseInt(nums[i]) > max) {
            max = parseInt(nums[i]);
        }
    }
    response.status(200).json({
        max: max
    });
});
router.get('/rendezett', async (request, response) => {
    let nums = (await readTextFile('files/szamok.txt')).split(',');
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (parseInt(nums[i]) > parseInt(nums[j])) {
                let temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    response.status(200).json({
        nums: nums
    });
});

//? 3. Feladat

const readJsonFile = async (filePath) => {
    try {
        const raw = await fs.readFile(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        throw new Error(`Olvasási hiba (json): ${error.message}`);
    }
};

router.get('/getallstat', async (request, response) => {
    let stats = await readJsonFile('files/statisztika.json');
    response.status(200).json({
        result: stats
    });
});
router.get('/getallstat/:telepaz', async (request, response) => {
    let telepaz = request.params.telepaz;
    let stats = await readJsonFile('files/statisztika.json');
    let j = 0;

    while (j < stats.telepules.length && stats.telepules[j].telepaz != telepaz) {
        j++;
    }

    if (j < stats.telepules.length) {
        response.status(200).json({
            errorMsg: '',
            result: stats.telepules[j]
        });
    } else {
        response.status(200).json({
            errorMsg: 'Nem található ilyen település azonosító',
            result: ''
        });
    }
});

//? 4. Feladat

router.get('/barlangok', async (request, response) => {
    let barlangok = await readJsonFile('files/barlangok.json');
    response.status(200).json({
        result: barlangok
    });
});

router.get('/barlangok/:azon', async (request, response) => {
    let azon = request.params.azon;
    let resultArr = [];
    let barlangok = await readJsonFile('files/barlangok.json');
    for (let element of barlangok) {
        if (element.azon == azon) {
            resultArr.push(element);
        }
    }
    response.status(200).json({
        result: resultArr
    });
});

router.get('/stat', async (request, response) => {
    let barlangok = await readJsonFile('files/barlangok.json');
    let leghosszabbIndex = 0;
    let legmelyebbIndex = 0;
    let fokozottDb = 0;
    barlangok = Object.values(barlangok);
    for (let i = 1; i < barlangok.length; i++) {
        if (barlangok[i].hossz < barlangok[leghosszabbIndex].hossz) {
            leghosszabbIndex = i;
        }
        if (barlangok[i].melyseg < barlangok[legmelyebbIndex].melyseg) {
            legmelyebbIndex = i;
        }
        console.log(barlangok[i].vedettseg);
        if (barlangok[i].vedettseg == 'fokozottan védett') {
            fokozottDb++;
        }
    }
    response.status(200).json({
        hossz: barlangok[leghosszabbIndex].hossz,
        melyseg: barlangok[legmelyebbIndex].melyseg,
        fokozottDb: fokozottDb,
        barlangDb: barlangok.length
    });
});

//? 5. Feladat

router.get('/getallelem', async (request, response) => {
    let elemek = await readJsonFile('files/elemek.json');
    elemek = elemek.felfedez;
    response.status(200).json({
        elemek: elemek
    });
});

router.get('/ismeretlen', async (request, response) => {
    let elemek = await readJsonFile('files/elemek.json');
    elemek = elemek.felfedez;
    let ismeretlen = [];
    elemek.forEach((elem) => {
        if (elem.felfedezve == 0) {
            ismeretlen.push(elem);
        }
    });
    response.status(200).json({
        elemek: ismeretlen
    });
});

router.get('/getelem/:elemneve', async (request, response) => {
    let elemek = await readJsonFile('files/elemek.json');
    elemek = elemek.felfedez;
    const elemneve = request.params.elemneve;
    let j = 0;
    while (j < elemek.length && elemek[j].elemneve != elemneve) {
        j++;
    }

    if (j < elemek.length) {
        response.status(200).json({
            elem: elemek[j],
            status: true
        });
    } else {
        response.status(200).json({
            elem: 'Nincs ilyen elem',
            status: false
        });
    }
});

//? 6. Feladat

router.get('/fovaros', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].orszag !== 'MADAGASZKÁR') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            fovaros: orszagok[j].fovaros
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs madagaszkár'
        });
    }
});

router.get('/OUAGADOUGOU', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].fovaros !== 'OUAGADOUGOU') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            orszag: orszagok[j].orszag
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs OUAGADOUGOU'
        });
    }
});
router.get('/tt', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].autojel !== 'TT') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            orszag: orszagok[j].orszag
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs tt'
        });
    }
});
router.get('/sgd', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].penzjel !== 'SGD') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            orszag: orszagok[j].orszag
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs SGD'
        });
    }
});
router.get('/malta', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].orszag !== 'MÁLTA') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            lakossag: orszagok[j].nepesseg * 1000
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs Málta'
        });
    }
});
router.get('/japan', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    orszagok = orszagok.orszagok;
    let j = 0;
    while (j < orszagok.length && orszagok[j].orszag !== 'JAPÁN') {
        j++;
    }
    if (j < orszagok.length) {
        response.status(200).json({
            nepsuruseg: (orszagok[j].nepesseg * 1000) / orszagok[j].terulet
        });
    } else {
        response.status(200).json({
            idunno: 'Vmiért nincs Japán'
        });
    }
});

router.get('/fold', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    let enby = 0;
    orszagok = orszagok.orszagok;
    orszagok.forEach((orszag) => {
        enby += orszag.nepesseg * 1000;
    });
    response.status(200).json({
        lakossag: enby
    });
});
router.get('/osszTer', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    let oszty = 0;
    orszagok = orszagok.orszagok;
    orszagok.forEach((orszag) => {
        oszty += orszag.terulet;
    });
    response.status(200).json({
        terulet: oszty
    });
});
router.get('/atlagNep', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    let enby = 0;
    orszagok = orszagok.orszagok;
    orszagok.forEach((orszag) => {
        enby += orszag.nepesseg * 1000;
    });
    response.status(200).json({
        lakossag: enby / orszagok.length
    });
});
router.get('/atlagTer', async (request, response) => {
    let orszagok = await readJsonFile('files/orszagok.json');
    let oszty = 0;
    orszagok = orszagok.orszagok;
    orszagok.forEach((orszag) => {
        oszty += orszag.terulet;
    });
    response.status(200).json({
        terulet: oszty / orszagok.length
    });
});

//? Hetedik
router.get('/getVizsgazok', async (request, response) => {
    response.status(200).json({
        vizsgazok: await readJsonFile('files/erettsegi.json')
    });
});

router.get('/getOsztalyzatok', async (request, response) => {
    let adatok = await readJsonFile('files/erettsegi.json');
    let vizsgazok = [];
    for (const adat of adatok) {
        let irasbeli = adat.Szovegszerkesztes + adat.Adatbaziskezeles + adat.Programozas;

        let egeszSzazalek = ((irasbeli + adat.Szobeli) / 150) * 100;
        let osztalyzat;
        if (egeszSzazalek < 25) {
            osztalyzat = 1;
        }
        if (egeszSzazalek < 33 && egeszSzazalek > 25) {
            osztalyzat = 2;
        }
        if (egeszSzazalek < 47 && egeszSzazalek > 33) {
            osztalyzat = 3;
        }
        if (egeszSzazalek < 60 && egeszSzazalek > 47) {
            osztalyzat = 4;
        }
        if (egeszSzazalek > 60) {
            osztalyzat = 5;
        }
        let eredmenyes = false;
        if ((adat.Szobeli / 30) * 100 >= 12 && (irasbeli / 120) * 100 >= 12) {
            eredmenyes = true;
        }
        const diakEredmeny = {
            Nev: adat.Nev,
            Osszpont: irasbeli + adat.Szobeli,
            Irasbeli_Szazalek: Math.round((irasbeli / 120) * 100),
            Szobeli_Szazalek: Math.round((adat.Szobeli / 30) * 100),
            Osztalyzat: osztalyzat,
            Eredmenyes: eredmenyes
        };
        vizsgazok.push(diakEredmeny);
    }
    response.status(200).json({
        Status: 'Success',
        Result: vizsgazok
    });
});

//? Nyolcadik

async function writeTxt(path, content) {
    try {
        await fs.appendFile(path, content + '\n', 'utf8');
        return 'Sikeres fájl írás';
    } catch (error) {
        throw new Error(`Írási hiba (text): ${error.message}`);
    }
}
async function writeJson(path, content) {
    try {
        await fs.appendFile(path, content + '\n', 'utf8');
        return 'Sikeres fájl írás';
    } catch (error) {
        throw new Error(`Írási hiba (text): ${error.message}`);
    }
}

router.post('/posttxt', async (request, response) => {
    try {
        const { vezetekNev, keresztNev, nem, szuletesiDatum, anyjaNeve, email, telefonszam } =
            request.body;
        let contentLine = `${vezetekNev};${keresztNev};${nem};${szuletesiDatum};${anyjaNeve};${email};${telefonszam}`;
        writeTxt('files/', contentLine);
    } catch (error) {
        console.log('Error: ', error);
        response.status(500).json({
            error: 'Internal server error'
        });
    }
});
router.post('/postjson', async (request, response) => {
    try {
        const { vezetekNev, keresztNev, nem, szuletesiDatum, anyjaNeve, email, telefonszam } =
            request.body;
    } catch (error) {
        console.log('Error: ', error);
        response.status(500).json({
            error: 'Internal server error'
        });
    }
});
module.exports = router;
