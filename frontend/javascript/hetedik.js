document.addEventListener('DOMContentLoaded', () => {
    generateSelect();
    document.getElementById('vizsgazok').addEventListener('change', selectVizsgazo);
    document.getElementById('vizsgazoEredmeny').addEventListener('click', generateTable);
});

async function generateSelect() {
    try {
        const response = await GetFetch('/api/getVizsgazok');
        const select = document.getElementById('vizsgazok');
        for (const vizsgazo of response.vizsgazok) {
            const option = document.createElement('option');
            option.innerText = vizsgazo.Nev;
            option.value = vizsgazo.Nev;
            select.appendChild(option);
        }
    } catch (error) {
        console.error(error);
    }
}
async function selectVizsgazo() {
    const vizsgazo = document.getElementById('vizsgazok').value;
    const vizsgazoUl = document.getElementById('vizsgazoAdat');
    const vizsgazoNev = document.getElementById('vizsgazoNev');
    vizsgazoNev.innerText = '';
    vizsgazoUl.replaceChildren();
    const response = await GetFetch('/api/getVizsgazok');
    let j = 0;
    while (j < response.vizsgazok.length && response.vizsgazok[j].Nev != vizsgazo) {
        j++;
    }
    let osztalyzatok = Object.entries(response.vizsgazok[j]);
    console.log(osztalyzatok);
    vizsgazoNev.innerText = osztalyzatok[0][1];
    for (let i = 1; i < osztalyzatok.length; i++) {
        const li = document.createElement('li');
        li.innerText = osztalyzatok[i][0] + ': ' + osztalyzatok[i][1];
        li.classList.add('list-group-item');
        vizsgazoUl.appendChild(li);
    }
}

async function generateTable() {
    try {
        const tbody = document.getElementById('tbody');
        tbody.replaceChildren();
        let result = await GetFetch('/api/getOsztalyzatok');
        result = result.Result;

        for (const adatok of result) {
            console.log(adatok);
            const tr = document.createElement('tr');

            for (let i = 0; i < Object.values(adatok).length - 1; i++) {
                const td = document.createElement('td');
                td.innerText = Object.values(adatok)[i];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error(error);
    }
}
