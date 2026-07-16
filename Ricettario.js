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

main();