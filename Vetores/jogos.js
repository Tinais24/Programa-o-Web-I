/*Elaborar um programa para gerar uma tabela com os jogos de uma fase
eliminatória de um campeonato. O programa deve conter três funções (a
serem executadas no evento click de cada botão) para:
1) validar o preenchimento, adicionar um clube ao vetor e listar os clubes;    
2) listar osclubes (se houver); 
3) montar a tabela de jogos, no formato primeiro x último, segundo x penúltimo e assim por diante. Exibir mensagem e não listar a tabela de jogos, caso o número de clubes informados seja ímpar.
*/

let clubes = [];

const inClube = document.getElementById("inClube");
const outLista = document.getElementById("outLista");
const btAdicionar = document.getElementById("btAdicionar");
const btListar = document.getElementById("btListar");
const btMontar = document.getElementById("btMontar");

function adicionarClube() {

    const nome = inClube.value.trim();

    if (!nome) { 
        alert("Informe o nome do clube");
        inClube.focus();
        return;
    }

    clubes.push(nome);

    inClube.value = "";
    inClube.focus();

 }

 function listarClubes() {
    if (clubes.length === 0) {
        outLista.textContent = "Não há clubes na lista!";
        return;
    }

    outLista.textContent = clubes
    .map((clube, index) => `${index + 1}. ${clube}`)
    .join("\n");
}

    function montarJogos() {

        const tam = clubes.length;

        if (tam === 0 || tam % 2 !== 0) {
            alert("Deve haver númeero par de Clubes");
            inClube.focus();
            return;
        }

        const jogos = clubes
            .slice(0, tam/2)
            .map((clube, index) => `${clube} x ${clubes[tam -1 -index]}`)
            .join("\n")

        outLista.textContent = jogos;
    }

 btAdicionar.addEventListener("click", adicionarClube);
 btListar.addEventListener("click", listarClubes);
 btMontar.addEventListener("click", montarJogos);