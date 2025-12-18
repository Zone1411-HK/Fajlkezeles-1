document.addEventListener('DOMContentLoaded', () => {
    csiribucsiriba();
});

async function csiribucsiriba() {
    try {
        let apiok = [];
        apiok.push(await GetFetch('/api/fovaros'));
        apiok.push(await GetFetch('/api/OUAGADOUGOU'));
        apiok.push(await GetFetch('/api/tt'));
        apiok.push(await GetFetch('/api/sgd'));
        apiok.push(await GetFetch('/api/malta'));
        apiok.push(await GetFetch('/api/japan'));
        apiok.push(await GetFetch('/api/fold'));
        apiok.push(await GetFetch('/api/osszTer'));
        apiok.push(await GetFetch('/api/atlagNep'));
        apiok.push(await GetFetch('/api/atlagTer'));

        apiok = Object.values(apiok);
        console.log(apiok);
        let dl = document.getElementById('adatok');

        let dtk = [];
        let mada = document.createElement('dt');
        mada.innerText = 'Mi Madagaszkár fővárosa?';
        dtk.push(mada);

        let ouag = document.createElement('dt');
        ouag.innerText = 'Melyik ország fővárosa?';
        dtk.push(ouag);

        let tt = document.createElement('dt');
        tt.innerText = 'Melyik ország autójele a TT?';
        dtk.push(tt);

        let sgd = document.createElement('dt');
        sgd.innerText = 'Melyik ország pénzének a jele az SGD?';
        dtk.push(sgd);

        let matla = document.createElement('dt');
        matla.innerText = 'Hányan laknak máltán?';
        dtk.push(matla);

        let jap = document.createElement('dt');
        jap.innerText = 'Mennyi Japán nápsűrűsége?';
        dtk.push(jap);

        let fold = document.createElement('dt');
        fold.innerText = 'Hány lakosa van a Földnek?';
        dtk.push(fold);

        let ter = document.createElement('dt');
        ter.innerText = 'Mennyi az országok területe összesen?';
        dtk.push(ter);

        let atlnep = document.createElement('dt');
        atlnep.innerText = 'Mennyi az országok átlagos népessége?';
        dtk.push(atlnep);

        let atlter = document.createElement('dt');
        atlter.innerText = 'Mennyi az országok átlagos területe?';
        dtk.push(atlter);

        for (let i = 0; i < dtk.length; i++) {
            const dd = document.createElement('dd');
            dd.innerText = Object.values(apiok[i])[0];
            dl.appendChild(dtk[i]);
            dl.appendChild(dd);
        }
    } catch (err) {
        console.error(err);
    }
}
