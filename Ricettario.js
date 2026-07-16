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
 * @property {Ingrediente[]} ingredienti - Lista degli ingredienti della ricetta
 * @property {string[]} steps - Lista dei passaggi della ricetta
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

async function main() {
    try {
        ricettario = await loadRicettario();
        console.log(ricettario);
    } catch (error) {
        console.error('Errore durante il caricamento del ricettario:', error);
    }
}

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

/************************************ LISTA PRIMI *************************************/
//tasto fisico che serve per vedere i primi
const tastoPrimi = document.getElementById('primi');

//listaPrimi corrisponde al contenitore fisico che abbiamo sull'html
const listaPrimi = document.getElementById('listaPrimi');

tastoPrimi.addEventListener('click', function (evento) {

    // Se lista visibile e piena allora viene svuotata e nascosta
    if (listaPrimi.children.length > 0) {
        listaPrimi.innerHTML = '';
        return;
    }

    //ricetta = oggetto di quella ricetta, es: oggetto carbonara
    //se tipologia = primo viene tenuto
    //soloPrimi è un array che conterrà tutti gli oggetti ricetta che sono dei primi
    const soloPrimi = ricettario.filter(ricetta => ricetta.tipologia === "primo");


    //scorro le ricette in soloPrimi 
    //per ognuna creo un elemento fisico nell'html (li) e mostro solo il titolo 
    soloPrimi.forEach(ricetta => {
        const nuovoLi = document.createElement('li');
        nuovoLi.textContent = ricetta.titolo;

        // Rendi il piatto cliccabile con la manina
        nuovoLi.style.cursor = "pointer";

        // Al click mostra i dettagli
        nuovoLi.addEventListener('click', function (evento) {
            evento.stopPropagation(); // Evita che si chiuda il menu a tendina
            mostraDettagliRicetta(ricetta); // Chiama la funzione sopra!
        });

        listaPrimi.appendChild(nuovoLi);
    });
});

/************************************ LISTA SECONDI *************************************/
const tastoSecondi = document.getElementById('secondi');
const listaSecondi = document.getElementById('listaSecondi');

tastoSecondi.addEventListener('click', function (evento) {

    if (listaSecondi.children.length > 0) {
        listaSecondi.innerHTML = '';
        return;
    }
   
    const soloSecondi = ricettario.filter(ricetta => ricetta.tipologia === "secondo");

    soloSecondi.forEach(ricetta => {
        const nuovoLi = document.createElement('li');
        nuovoLi.textContent = ricetta.titolo;
        listaSecondi.appendChild(nuovoLi);
    });
});

/************************************ LISTA CONTORNI *************************************/
const tastoContorni = document.getElementById('contorni');
const listaContorni = document.getElementById('listaContorni');

tastoContorni.addEventListener('click', function (evento) {

    if (listaContorni.children.length > 0) {
        listaContorni.innerHTML = '';
        return;
    }

    const soloContorni = ricettario.filter(ricetta => ricetta.tipologia === "contorno");

    soloContorni.forEach(ricetta => {
        const nuovoLi = document.createElement('li');
        nuovoLi.textContent = ricetta.titolo;
        listaContorni.appendChild(nuovoLi);
    });
});

/************************************ LISTA DOLCI *************************************/
const tastoDolci = document.getElementById('dolci');
const listaDolci = document.getElementById('listaDolci');

tastoDolci.addEventListener('click', function (evento) {


    if (listaDolci.children.length > 0) {
        listaDolci.innerHTML = '';
        return;
    }

    const soloContorni = ricettario.filter(ricetta => ricetta.tipologia === "dolce");

    soloContorni.forEach(ricetta => {
        const nuovoLi = document.createElement('li');
        nuovoLi.textContent = ricetta.titolo;
        listaDolci.appendChild(nuovoLi);
    });
});

/******************************* FUNZIONE DETTAGLI RICETTA ***********************/
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

    //scrivo il procedimento nel paragrafo (numera passaggi)
    const procedimento = document.getElementById('contenutoProcedimento');
    procedimento.innerHTML = ''; // Svuota testo precedente
    ricetta.steps.forEach((step, indice) => {
        procedimento.innerHTML += `${indice + 1}. ${step}<br><br>`;
    });
}

main();
