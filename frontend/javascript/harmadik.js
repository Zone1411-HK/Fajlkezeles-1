document.addEventListener('DOMContentLoaded', () => {
    GenerateSelect();
    document.getElementById('select').addEventListener('change', SelectTelepules);
});

async function GenerateSelect() {
    try {
        const select = document.getElementById('select');
        let telepulesek = await GetFetch('/api/getallstat');
        telepulesek = telepulesek.result.telepules;

        for (const telepules of telepulesek) {
            const option = document.createElement('option');
            option.innerText = telepules.megnevezes;
            option.value = telepules.telepaz;
            select.appendChild(option);
        }
        console.log(telepulesek);
    } catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}

async function SelectTelepules() {
    try {
        let selectValue = document.getElementById('select').value;
        let telepules = await GetFetch('/api/getallstat/' + selectValue);
        let tr = document.getElementById('tbodyTr');
        tr.replaceChildren();
        telepules = Object.values(telepules.result);
        for (const stat of telepules) {
            const td = document.createElement('td');
            td.innerText = stat;
            tr.appendChild(td);
        }
    } catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}
