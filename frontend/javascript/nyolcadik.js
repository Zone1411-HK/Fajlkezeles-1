document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reg').addEventListener('click', getData);
    getData();
});

function getData() {
    const data = document.getElementsByTagName('input');
    const nem = document.getElementById('nem').value;
    let isValid = false;
    let j = 0;
    while (j < data.length && data[j].value != null) {
        j++;
    }
    if (j == data.length) {
        console.log('asd');
    } else {
        console.log('ad');
    }
}
