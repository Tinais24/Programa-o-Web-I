function calcularMedia() {
    //Criar as referencias com os elementos da página
    let inNome = document.getElementById("inNome");
    let inNota1 = document.getElementById("inNota1");
    let inNota2 = document.getElementById("inNota2");
    let outSituacao = document.getElementById("outSituacao");
    let outMedia = document.getElementById("outMedia");

    //obter os valores dos Inputs
    const nome = inNome.value;
    const nota1 = Number(inNota1.value);
    const nota2 = Number(inNota2.value);
    documentgetElementById("btResultado").addEventListener("click", calcularMedia);

    //Calcular a média
    let media = (nota1 + nota2) / 2;

    outMedia.textContent = "Média das Notas :" + media;

    //Criar as condições

    if (media >= 7) {
        outSituacao.textContent = "Parabéns " + nome + "Você foi Aprovado(a)"
        outSituacao.style.color = "gold";
    } else if (media >= 4) {
        outSituacao.textContent = "Atenção " + nome + "Você foi para Exame"
        outSituacao.style.color = "green";
    } else {
        outSituacao.textContent = "F" + nome + "Você foi Reprovado(a)"
        outSituacao.style.color = "red";
    }
}
document.getElementById("btResultado").addEventListener("click", calcularMedia);