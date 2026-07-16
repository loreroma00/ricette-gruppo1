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