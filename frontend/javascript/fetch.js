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
