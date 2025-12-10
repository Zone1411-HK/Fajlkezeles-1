const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');
const { read } = require('fs');

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
module.exports = router;
