document.addEventListener('DOMContentLoaded', () => {
    Irogatas();
});

async function Irogatas() {
    try {
        const beolvas = await GetFetch('/api/beolvasas');
        const osszeg = await GetFetch('/api/osszeg ');
        const szorzat = await GetFetch('/api/szorzat ');
        const atlag = await GetFetch('/api/atlag ');
        const min = await GetFetch('/api/min');
        const max = await GetFetch('/api/max');
        const rendezett = await GetFetch('/api/rendezett');

        const beolvasP = document.createElement('p');
        beolvasP.innerText = beolvas.numbers;

        const osszegLi = document.createElement('li');
        osszegLi.innerText = osszeg.sum;

        const szorzatLi = document.createElement('li');
        szorzatLi.innerText = szorzat.product;

        const atlagLi = document.createElement('li');
        atlagLi.innerText = atlag.avg;

        const minLi = document.createElement('li');
        minLi.innerText = min.min;

        const maxLi = document.createElement('li');
        maxLi.innerText = max.max;

        const rendezettP = document.createElement('p');
        rendezettP.innerText = rendezett.nums;

        const ul = document.createElement('ul');

        ul.appendChild();

        document.getElementById('szamok').appendChild(beolvasP);
    } catch (error) {
        console.log(`Hiba: ${error.message}`);
    }
}
