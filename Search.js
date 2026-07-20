document.addEventListener('DOMContentLoaded', function () {
    const datiSalvati = sessionStorage.getItem('risultatiRicerca');
    if (datiSalvati) {
        const risultatiRicerca = JSON.parse(datiSalvati);
        const resultsContainer = document.getElementById('searchResults');
        risultatiRicerca.forEach(ricetta => {
            const newRow = document.createElement('div');
            newRow.classList.add('row');
            // Aggiungi i dettagli della ricetta al newRow

            const title = document.createElement('h3');
            const titleLink = document.createElement('a');

            titleLink.textContent = ricetta.titolo;
            titleLink.href = '/ricetta.html';
            titleLink.addEventListener('click', function () { sendToRecipePage(ricetta); });
            title.appendChild(titleLink);
            newRow.appendChild(title);

            const history = document.createElement('p');
            history.textContent = ricetta.storia;
            newRow.appendChild(history);

            // Aggiungo al child
            resultsContainer.appendChild(newRow);
        });
    }
});

