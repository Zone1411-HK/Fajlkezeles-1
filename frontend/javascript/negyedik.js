document.addEventListener('DOMContentLoaded', () => {
    GenerateSelect();
    const select = document.getElementById('select');
    select.addEventListener('change', printStats);
    document.getElementById('quizQuestion').addEventListener('click', newQuestion);
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
});

async function GenerateSelect() {
    try {
        let res = await GetFetch('/api/barlangok');
        res = res.result;
        const select = document.getElementById('select');
        res.forEach((element) => {
            const option = document.createElement('option');
            option.innerText = element.nev;
            option.value = element.azon;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Hiba: ${error.message}`);
    }
}

async function printStats() {
    const ul = document.getElementById('barlangStat');
    ul.replaceChildren();

    let res = await GetFetch('/api/barlangok/' + this.value);
    res = Object.entries(res.result[0]);
    for (let i = 0; i < res.length; i++) {
        if (res[i][0] == 'nev') {
            document.getElementById('barlangNev').innerText = res[i][1];
        } else {
            const li = document.createElement('li');
            li.innerText = res[i][0] + ': ' + res[i][1];
            ul.appendChild(li);
        }
    }
}

let questionAnswer;
async function newQuestion() {
    const stats = await GetFetch('/api/stat');
    const quizTitle = document.getElementById('quizTitle');
    let randomNum = Math.floor(Math.random() * 4);
    let randomQuestion = Object.keys(stats)[randomNum];
    questionAnswer = Object.values(stats)[randomNum];
    switch (randomQuestion) {
        case 'hossz':
            quizTitle.innerText = 'Milyen hosszú a leghosszabb barlang?';
            break;
        case 'melyseg':
            quizTitle.innerText = 'Milyen mély a legsekélyebb barlang?';
            break;
        case 'fokozottDb':
            quizTitle.innerText = 'Hány fokozottan védett barlang van?';
            break;
        case 'barlangDb':
            quizTitle.innerText = 'Hány barlang van eltárolva?';
            break;
    }
    console.log(randomQuestion);
}

async function checkAnswer() {
    try {
        const feedback = document.getElementById('feedback');
        feedback.classList.add('alert', 'w-75', 'd-block', 'mx-auto');
        feedback.classList.remove('alert-success');
        feedback.classList.remove('alert-danger');
        feedback.classList.remove('alert-warning');
        console.log(document.getElementById('quizAnswer').value == questionAnswer);
        if (document.getElementById('quizAnswer').value == questionAnswer) {
            feedback.classList.add('alert-success');
            feedback.innerText = 'Gratulálok eltaláltad!';
        } else {
            if (document.getElementById('quizAnswer').value == '') {
                feedback.classList.add('alert-warning');
                feedback.innerText = 'Nem adott megválaszt!';
            } else {
                feedback.classList.add('alert-danger');
                feedback.innerText = 'Helytelen!';
            }
        }
    } catch (err) {
        console.log('ads');
    }
}
