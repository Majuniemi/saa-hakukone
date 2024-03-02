const buzzwordBody = document.getElementById('buzzword-body');
const loadMoreBtn = document.getElementById('load-more');
const BUZZWORD_URL = 'https://corporatebs-generator.sameerkumar.website/';

const loadAPhrase = () => {
    fetch(BUZZWORD_URL)
        .then(response => response.json())
        .then(responseJson => {
            const buzzWord = responseJson.phrase;
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.innerText = buzzWord;
            row.appendChild(cell);
            buzzwordBody.appendChild(row);
        })
        .catch(error => {
            console.error('Virhe haettaessa tietoja:', error);
        });
}

loadMoreBtn.addEventListener('click', () => {
    loadAPhrase();
});

loadAPhrase();