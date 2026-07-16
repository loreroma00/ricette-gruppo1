// JavaScript source code

const ricettario = [
    {
        id: "patate-al-forno-croccanti",
        titolo: "Patate al Forno Croccanti",
        tipologia: "contorno",
        porzioni: 4,
        ingredienti: [
            { nome: "Patate", quantita: 800, unita: "g" },
            { nome: "Olio extravergine d'oliva", quantita: 30, unita: "ml" },
            { nome: "Rosmarino", quantita: 5, unita: "g" },
            { nome: "Aglio", quantita: 2, unita: "spicchi" },
            { nome: "Sale fino", quantita: null, unita: "q.b." }
        ],
        steps: [
            "Pelare le patate e tagliarle a cubetti di circa 2 cm.",
            "Sbollentare i cubetti in acqua bollente salata per 5 minuti.",
            "Scolare le patate e lasciarle asciugare per qualche minuto.",
            "Preriscaldare il forno a 200°C statico.",
            "In una teglia, condire le patate con l'olio, gli spicchi d'aglio e il rosmarino.",
            "Infornare per 30-40 minuti, mescolando a meta' cottura, fino a doratura."
        ]
    },
    {
        id: "carbonara",
        titolo: "Spaghetti alla Carbonara",
        tipologia: "primo",
        porzioni: 2,
        ingredienti: [
            { nome: "Spaghetti", quantita: 200, unita: "g" },
            { nome: "Guanciale", quantita: 100, unita: "g" },
            { nome: "Tuorli", quantita: 4, unita: "pz" },
            { nome: "Pecorino Romano", quantita: 50, unita: "g" },
            { nome: "Pepe nero", quantita: null, unita: "q.b." }
        ],
        steps: [
            "Tagliare il guanciale a listarelle spesse circa mezzo centimetro.",
            "Rosolare il guanciale in padella fredda, senza grassi aggiunti, finche' non e' croccante.",
            "In una ciotola, mescolare i tuorli con il pecorino grattugiato e abbondante pepe nero.",
            "Cuocere gli spaghetti in acqua bollente poco salata.",
            "Stemperare la crema di tuorli con un mestolo di acqua di cottura.",
            "Scolare la pasta, mantecare fuori dal fuoco con la crema e il guanciale."
        ]
    },
    {
        id: "tiramisu",
        titolo: "Tiramisu'",
        tipologia: "dolce",
        porzioni: 6,
        ingredienti: [
            { nome: "Savoiardi", quantita: 300, unita: "g" },
            { nome: "Mascarpone", quantita: 500, unita: "g" },
            { nome: "Uova", quantita: 4, unita: "pz" },
            { nome: "Zucchero", quantita: 100, unita: "g" },
            { nome: "Caffe' espresso", quantita: 300, unita: "ml" },
            { nome: "Cacao amaro", quantita: null, unita: "q.b." }
        ],
        steps: [
            "Preparare il caffe' e lasciarlo raffreddare completamente.",
            "Montare i tuorli con lo zucchero fino a ottenere un composto chiaro e spumoso.",
            "Incorporare il mascarpone poco alla volta, mescolando dal basso verso l'alto.",
            "Montare gli albumi a neve ferma e unirli delicatamente alla crema.",
            "Inzuppare velocemente i savoiardi nel caffe' e disporli in uno strato.",
            "Alternare strati di crema e savoiardi, terminando con la crema.",
            "Spolverare di cacao amaro e riporre in frigo per almeno 4 ore."
        ]
    }
]; 


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
            evento.stopPropagation();
            mostraDettagliRicetta(ricetta); 
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
