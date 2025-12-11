document.addEventListener('DOMContentLoaded', () => {
    GenerateSelect();
});

async function GenerateSelect() {
    try {
        let res = await GetFetch('/api/barlangok');
        res = res.result;
        console.log(res);
    } catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}
