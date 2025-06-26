function mudarTexto() {

    let nome = document.getElementById("nome").value;
    document.getElementById("message").innerText = "Olá " + nome;

}

function mudarEstilo() {

    const p = document.getElementById("message");

    p.style.color = "blue";
    p.style.fontSize = "32px";
}