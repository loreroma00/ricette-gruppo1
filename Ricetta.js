// JavaScript source code

document.addEventListener('DOMContentLoaded', function () {
    const json = sessionStorage.getItem('ricettaSelezionata');
    const ricetta = JSON.parse(json);
    let title = document.getElementById('titoloRicetta');
    title.textContent = ricetta.titolo;

    let storia = document.getElementById('storiaRicetta');
    storia.textContent = ricetta.storia;

    let ingredienti = document.getElementById('ingredientiRicetta');
    ricetta.ingredienti.forEach(ingrediente => {
        let li = document.createElement('li');
        li.classList.add('fs-4');
        li.textContent = ingrediente.nome;
        ingredienti.appendChild(li);
    });

    let procedimento = document.getElementById('procedimentoRicetta');
    ricetta.steps.forEach((step, index) => {
        let li = document.createElement('li');
        li.classList.add('fs-4');
        li.innerHTML = `PASSO ${index + 1}`;
        paragraph = document.createElement('p');
        paragraph.textContent = step;
        li.appendChild(paragraph);
        procedimento.appendChild(li);
    });
});