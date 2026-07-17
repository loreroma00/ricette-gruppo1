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
    const lista = document.getElementById(`lista${tipologia.charAt(0).toUpperCase() + tipologia.slice(1)}`); // listaPrimi, listaSecondi...
    tasto.addEventListener('click', function (evento) {
        // Se lista visibile e piena allora viene svuotata e nascosta
        if (lista.children.length > 0) {
            lista.innerHTML = '';
            return;
        }

        //ricetta = oggetto di quella ricetta, es: oggetto carbonara
        //se tipologia = primo viene tenuto
        //soloPrimi è un array che conterrà tutti gli oggetti ricetta che sono dei primi
        const soloTipologia = ricettario.filter(ricetta => ricetta.tipologia === tipologia);


        //scorro le ricette in soloPrimi 
        //per ognuna creo un elemento fisico nell'html (li) e mostro solo il titolo 
        soloTipologia.forEach(ricetta => {
            const nuovoLi = document.createElement('li');
            nuovoLi.textContent = ricetta.titolo;

            // Rendi il piatto cliccabile con la manina
            nuovoLi.style.cursor = "pointer";

            // Al click mostra i dettagli
            nuovoLi.addEventListener('click', function (evento) {
                if (checkContent(ricetta.titolo)) {
                    // Fai qualcosa se il contenuto è già mostrato
                    svuotaBody(); // Svuota il contenuto della ricetta
                }
                else {
                    evento.stopPropagation(); // Evita che si chiuda il menu a tendina
                    mostraDettagliRicetta(ricetta); // Chiama la funzione sopra!
                }

            });

            lista.appendChild(nuovoLi);
        });
    });
}

/**
 * @param {string} recipeName
 * @returns {string[]}
 */
function searchRecipe(recipeName){
    /** @type {string[]} */
    let foundRecipes = [];
    // const soloTipologia = ricettario.filter(ricetta => ricetta.tipologia === tipologia);
    foundRecipes.push(ricettario.filter(ricetta => ricetta.titolo.toLowerCase().includes(recipeName.toLowerCase())));
    return foundRecipes;
}

function addEventListenerToSearch() {
    const searchInput = document.getElementById('searchBarText');
    const searchButton = document.getElementById('searchBarButton');
    searchButton.addEventListener('click', function (event) {
        console.log(searchRecipe(searchInput.value));
    });
}

async function main() {
    try {
        ricettario = await loadRicettario();
        console.log(ricettario);
    } catch (error) {
        console.error('Errore durante il caricamento del ricettario:', error);
    }
    clickOnMenu('primo');
    clickOnMenu('secondo');
    clickOnMenu('contorno');
    clickOnMenu('dolce');
    addEventListenerToSearch();
}

main();
