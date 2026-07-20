// JavaScript source code

// @ts-check

/**
 * @typedef { 'g' | 'ml' | 'pz' | 'spicchi' | 'q.b.' } unita;
 */

/**
 * @typedef {Object} Ingrediente
 * @property {string} nome - Nome dell'ingrediente
 * @property {number|null} quantita - Quantità dell'ingrediente
 * @property {unita} unita - Unità di misura dell'ingrediente}
 */

/**
 * @typedef {Object} Ricetta
 * @property {string} titolo - Titolo della ricetta
 * @property {string} tipologia - Tipologia della ricetta
 * @property {number} porzioni - Numero di porzioni della ricetta
 * @property {string} storia - Storia della ricetta
 * @property {Ingrediente[]} ingredienti - Lista degli ingredienti della ricetta
 * @property {string[]} steps - Lista dei passaggi della ricetta
 * @property {string} urlImmagine - URL dell'immagine della ricetta
 */

/**
 *      
 * @param {string} url
 * @returns {Promise<any>}}
 */
async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
}

/** @returns {Promise<Ricetta[]>} */
async function loadRicettario() {
    const nomi = await fetchJson('ricette/manifest.json');
    const promesse = nomi.map(nome => fetchJson(`ricette/${nome}`));
    return Promise.all(promesse);
}

/** @type {Ricetta[]} */
let ricettario = [];

const messaggio = document.querySelector("#messaggio");
const form = document.querySelector("#newsletterForm");

form.addEventListener("submit", function (event) {
    // blocca il reload della pagina
    event.preventDefault();

    // nasconde il form
    form.style.display = "none";

    // mostra il messaggio
    messaggio.classList.remove("nascosto");
});

/**
 * @param {Ricetta} ricetta
 */
function mostraDettagliRicetta(ricetta) {

    //scrivo il titolo della ricetta
    document.getElementById('titoloRicetta').textContent = ricetta.titolo;
    
    //scrivo porzioni
    document.getElementById('contenutoPorzioni').textContent = ricetta.porzioni;

    //listaIngredienti corrisponde al contenitore fisico html
    const listaIngredienti = document.getElementById('contenutoIngredienti');
    listaIngredienti.innerHTML = ''; //svuota testo precedente
    ricetta.ingredienti.forEach(ingr => {
        // Se quantità è null scrivo q.b.
        if (ingr.quantita === null) {
            listaIngredienti.innerHTML += `- ${ingr.nome} ${ingr.unita}<br>`;
        } else {
            listaIngredienti.innerHTML += `- ${ingr.nome}: ${ingr.quantita} ${ingr.unita}<br>`;
        }
    });
    const storia = document.getElementById('contenutoStoria');
    storia.innerHTML = ''; //svuota testo precedente
    storia.textContent = ricetta.storia;
    //scrivo il procedimento nel paragrafo (numera passaggi)
    const procedimento = document.getElementById('contenutoProcedimento');
    procedimento.innerHTML = ''; // Svuota testo precedente
    ricetta.steps.forEach((step, indice) => {
        procedimento.innerHTML += `${indice + 1}. ${step}<br><br>`;
    });
}

/**
 * 
 * @param {string} titolo
 * @returns {boolean}
 */
function checkContent(titolo) {
    const titoloRicetta = document.getElementById('titoloRicetta').textContent;
    if (titoloRicetta === titolo) { return true; }
        return false;
}

function svuotaBody() {
    document.getElementById('titoloRicetta').textContent = '';
    document.getElementById('contenutoPorzioni').textContent = '';
    document.getElementById('contenutoIngredienti').innerHTML = '';
    document.getElementById('contenutoStoria').textContent = '';
    document.getElementById('contenutoProcedimento').innerHTML = '';
}

/**
 * @param {string} tipologia
 */
function clickOnMenu(tipologia) {
    const tasto = document.getElementById(tipologia); // primi, secondi...
    tasto.addEventListener('click', function (evento) { 
        const soloTipologia = ricettario.filter(ricetta => ricetta.tipologia === tipologia);
        sessionStorage.setItem('risultatiRicerca', JSON.stringify(soloTipologia));
        window.location.href = "/search.html";
        });
}

function getRandomInt(min, max) {
    // Il +1 assicura che anche il valore massimo sia incluso nei risultati
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendToRecipePage(ricetta) {
    sessionStorage.setItem('ricettaSelezionata', JSON.stringify(ricetta));
    window.location.href = "/ricetta.html";
}

function loadCards() {
    let img1 = document.getElementById('img_1');
    let img2 = document.getElementById('img_2');
    let img3 = document.getElementById('img_3');
    let img4 = document.getElementById('img_4');
    let img5 = document.getElementById('img_5');
    let img6 = document.getElementById('img_6');

    let title1 = document.getElementById('card_title1');
    let title2 = document.getElementById('card_title2');
    let title3 = document.getElementById('card_title3');
    let title4 = document.getElementById('card_title4');
    let title5 = document.getElementById('card_title5');
    let title6 = document.getElementById('card_title6');

    let text1 = document.getElementById('card_text1');
    let text2 = document.getElementById('card_text2');
    let text3 = document.getElementById('card_text3');
    let text4 = document.getElementById('card_text4');
    let text5 = document.getElementById('card_text5');
    let text6 = document.getElementById('card_text6');

    let button1 = document.getElementById('card_button1');
    let button2 = document.getElementById('card_button2');
    let button3 = document.getElementById('card_button3');
    let button4 = document.getElementById('card_button4');
    let button5 = document.getElementById('card_button5');
    let button6 = document.getElementById('card_button6');

    let ricetta1 = ricettario[getRandomInt(0, ricettario.length - 1)];
    let ricetta2 = ricettario[getRandomInt(0, ricettario.length - 1)];
    let ricetta3 = ricettario[getRandomInt(0, ricettario.length - 1)];
    let ricetta4 = ricettario[getRandomInt(0, ricettario.length - 1)];
    let ricetta5 = ricettario[getRandomInt(0, ricettario.length - 1)];
    let ricetta6 = ricettario[getRandomInt(0, ricettario.length - 1)];

    img1.src = ricetta1.urlImmagine;
    img2.src = ricetta2.urlImmagine;
    img3.src = ricetta3.urlImmagine;
    img4.src = ricetta4.urlImmagine;
    img5.src = ricetta5.urlImmagine;
    img6.src = ricetta6.urlImmagine;

    title1.textContent = ricetta1.titolo;
    title2.textContent = ricetta2.titolo;
    title3.textContent = ricetta3.titolo;
    title4.textContent = ricetta4.titolo;
    title5.textContent = ricetta5.titolo;
    title6.textContent = ricetta6.titolo;

    text1.textContent = ricetta1.storia;
    text2.textContent = ricetta2.storia;
    text3.textContent = ricetta3.storia;
    text4.textContent = ricetta4.storia;
    text5.textContent = ricetta5.storia;
    text6.textContent = ricetta6.storia;

    button1.addEventListener('click', function () { sendToRecipePage(ricetta1); });
    button2.addEventListener('click', function () { sendToRecipePage(ricetta2); });
    button3.addEventListener('click', function () { sendToRecipePage(ricetta3); });
    button4.addEventListener('click', function () { sendToRecipePage(ricetta4); });
    button5.addEventListener('click', function () { sendToRecipePage(ricetta5); });
    button6.addEventListener('click', function () { sendToRecipePage(ricetta6); });

}

/**
 * @param {string} recipeName
 * @returns {Ricetta[]}
 */
function searchRecipe(recipeName){
    /** @type {Ricetta[]} */
    return ricettario.filter(ricetta => ricetta.titolo.toLowerCase().includes(recipeName.toLowerCase()));
}

function addEventListenerToSearch() {
    const searchInput = document.getElementById('searchBarText');
    const searchButton = document.getElementById('searchBarButton');
    searchButton.addEventListener('click', function (event) {
        console.log(searchRecipe(searchInput.value));
    });
}

async function inizializzaPagina() {
    try {
        ricettario = await loadRicettario();
        ["primo", "secondo", "contorno", "dolce"].forEach(tipologia => clickOnMenu(tipologia));
        addEventListenerToSearch();
        loadCards();
        console.log("Pagina inizializzata correttamente");
    } catch (error) {
        console.error("Errore durante l'inizializzazione della pagina:", error);
    }
}

document.addEventListener('DOMContentLoaded', inizializzaPagina);