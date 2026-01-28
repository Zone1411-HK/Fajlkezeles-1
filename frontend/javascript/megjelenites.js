document.addEventListener('DOMContentLoaded', () => {
    loadTable();
});
async function loadTable() {
    try {
        let response = await GET('/api/employeesData');
        if (response.success) {
            let tbody = document.getElementById('tbody');
            tbody.replaceChildren();
            let dataArray = response.result;
            for (const dataRow of dataArray) {
                const tr = document.createElement('tr');
                for (const data of Object.values(dataRow)) {
                    const td = document.createElement('td');
                    td.innerText = data;
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        } else {
            alert(response.result);
        }
    } catch (error) {
        console.error(error);
    }
}

async function GET(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}
