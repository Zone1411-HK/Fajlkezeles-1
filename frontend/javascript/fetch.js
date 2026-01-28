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

async function PostFetch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify(data)
            })
            if(!response.ok){
                throw new Error(`Hiba: ${response.status} ${response.statusText}`)
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Hiba: ${error.message}`);
        }
}