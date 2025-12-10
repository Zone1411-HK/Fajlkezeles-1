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

        const div = document.getElementById('szamok');
        div.replaceChildren();

        const beolvasP = document.createElement('p');
        beolvasP.innerText = beolvas.numbers;
        beolvasP.classList.add('text-center');

        const osszegLi = document.createElement('li');
        osszegLi.innerText = 'Összegük: ' + osszeg.sum;

        const szorzatLi = document.createElement('li');
        szorzatLi.innerText = 'Első és utolsó szorzata: ' + szorzat.product;

        const atlagLi = document.createElement('li');
        atlagLi.innerText = 'Átlaguk: ' + atlag.avg;

        const minLi = document.createElement('li');
        minLi.innerText = 'Legkisebb: ' + min.min;

        const maxLi = document.createElement('li');
        maxLi.innerText = 'Legnagyobb: ' + max.max;

        const rendezettP = document.createElement('p');
        rendezettP.innerText = rendezett.nums;
        rendezettP.classList.add('text-center');

        const ul = document.createElement('ul');

        ul.appendChild(osszegLi);
        ul.appendChild(szorzatLi);
        ul.appendChild(atlagLi);
        ul.appendChild(minLi);
        ul.appendChild(maxLi);

        div.appendChild(beolvasP);
        div.appendChild(ul);
        div.appendChild(rendezettP);
    } catch (error) {
        console.log(`Hiba: ${error.message}`);
    }
}
