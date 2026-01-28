document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reg').addEventListener('click', getData);
});

async function getData() {
    const data = document.getElementsByTagName('input');
    const nem = document.getElementById('nem').value;
    let j = 0;
    while (j < data.length && data[j].value != '') {
        j++;
    }

    if (j == data.length) {
        const obj = {
            vezetekNev: data[0].value,
            keresztNev: data[1].value,
            nem: nem,
            szuletesiDatum: data[2].value,
            anyjaNeve: data[3].value,
            email: data[4].value,
            telefonszam: data[5].value
        };
        let r1 = await sendTxt(obj);
        let r2 = await sendTxt(obj);
        console.log(r1);
        console.log(r2);
    } else {
        alert('HIBA');
    }
}

async function sendTxt(obj) {
    let response1 = await PostFetch('/api/posttxt', obj);
    return response1;
}
async function sendJson(obj) {
    let response1 = await PostFetch('/api/postjson', obj);
    return response1;
}

async function PostFetch(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba: ${error.message}`);
    }
}
