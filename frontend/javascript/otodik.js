document.addEventListener('DOMContentLoaded', () => {
    generateAllElements();
    generateUnknownElements();
    document.getElementById('elemKereses').addEventListener('click', getElement);
});

async function generateAllElements() {
    try {
        let elements = await GetFetch('/api/getallelem');
        elements = elements.elemek;
        elements.forEach((element) => {
            console.log(element);
        });
    } catch (err) {
        console.error(err);
    }
}

async function generateUnknownElements() {
    try {
        let elements = await GetFetch('/api/ismeretlen');
        elements = elements.elemek;
        let tbody = document.getElementById('ismeretlenElemek');
        tbody.replaceChildren();
        elements.forEach((element) => {
            const tr = document.createElement('tr');
            Object.values(element).forEach((info) => {
                const td = document.createElement('td');
                td.innerText = info;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error(err);
    }
}

async function getElement() {
    try {
        let elemInput = document.getElementById('elemText');
        if (elemInput.value !== '') {
            let infos = await GetFetch('/api/getelem/' + elemInput.value);
            if (infos.status) {
                infos = infos.elem;
                const tbody = document.getElementById('keresettBody');
                const thead = document.getElementById('keresettHead');

                tbody.replaceChildren();
                thead.replaceChildren();

                const bodyTr = document.createElement('tr');
                const headTr = document.createElement('tr');
                Object.entries(infos).forEach((info) => {
                    const td = document.createElement('td');
                    const th = document.createElement('th');

                    td.innerText = info[1];
                    th.innerText = info[0];

                    bodyTr.appendChild(td);
                    headTr.appendChild(th);
                });
                tbody.appendChild(bodyTr);
                thead.appendChild(headTr);

                console.log(infos);
            }
        }
    } catch (err) {
        console.error(err);
    }
}
