document.addEventListener('DOMContentLoaded', () => {
    GetFile();
});

async function GetFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Hiba: ${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba: ${error.message}`);
    }
}

async function GetFile() {
    let eredmenyH1 = document.getElementById('eredmeny');
    try {
        let response = await GetFetch('/api/readfile');
        eredmenyH1.innerText = 'Eredmémy: ' + response.text;
    } catch (error) {
        console.log(`Hiba: ${error.message}`);
    }
}
