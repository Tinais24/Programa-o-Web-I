// teste

// Lista de tarefas
let tarefas = [];
let filtroAtual = 'todas';

// Salvamento no LocalStorage
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Carrega do LocalStorage para o iniciar
function carregarTarefas() {
  const armazenadas = localStorage.getItem('tarefas');
  if (armazenadas) tarefas = JSON.parse(armazenadas);
  atualizarLista();
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
  const entrada = document.getElementById('entradaTarefa');
  const texto = entrada.value.trim();
  if (!texto) return;

  // Cria um objeto tarefa
  tarefas.push({ texto, concluida: false });
  salvarTarefas();
  atualizarLista();

  entrada.value = '';
  entrada.focus();
}

// Cria um visual de uma tarefa
function exibirTarefa(tarefa, indice) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center fade-in';

  // Define a cor conforme o status
  li.classList.add(tarefa.concluida ? 'tarefa-concluida' : 'tarefa-ativa');

  const span = document.createElement('span');
  span.textContent = tarefa.texto;
  span.style.cursor = 'pointer';

  // Texto exibindo se concluída
  if (tarefa.concluida) span.classList.add('concluida');

  // Clique simples irá alternar o status
  span.onclick = () => {
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvarTarefas();
    atualizarLista();
  };

  // Duplo clique irá editar o texto
  span.ondblclick = () => {
    const input = document.createElement('input');
    input.className = 'editando';
    input.value = tarefa.texto;

    input.onblur = () => {
      const novoTexto = input.value.trim();
      if (novoTexto !== '') {
        tarefas[indice].texto = novoTexto;
        salvarTarefas();
        atualizarLista();
      }
    };

    input.onkeypress = (e) => {
      if (e.key === 'Enter') input.blur();
    };

    li.replaceChild(input, span);
    input.focus();
  };

  // Botão de remover tarefa
  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'btn btn-danger btn-sm';
  botaoRemover.textContent = 'Remover';
  botaoRemover.onclick = () => {
    li.classList.add('fade-out');
    setTimeout(() => {
      tarefas.splice(indice, 1);
      salvarTarefas();
      atualizarLista();
    }, 300);
  };

  li.appendChild(span);
  li.appendChild(botaoRemover);
  document.getElementById('listaTarefas').appendChild(li);
}

// Atualiza a lista na tela
function atualizarLista() {
  const lista = document.getElementById('listaTarefas');
  lista.innerHTML = '';

  // Marca o botão de filtro ativo
  document.querySelectorAll('.filtros .btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filtros .btn[onclick*="${filtroAtual}"]`).classList.add('active');

  // Exibe conforme o filtro
  tarefas.forEach((tarefa, indice) => {
    const mostrar =
      filtroAtual === 'todas' ||
      (filtroAtual === 'pendentes' && !tarefa.concluida) ||
      (filtroAtual === 'concluidas' && tarefa.concluida);
    if (mostrar) exibirTarefa(tarefa, indice);
  });

  // Reativar drag and drop após renderização
  Sortable.create(lista, {
    animation: 150,
    onEnd: function (evt) {
      const [moved] = tarefas.splice(evt.oldIndex, 1);
      tarefas.splice(evt.newIndex, 0, moved);
      salvarTarefas();
      atualizarLista();
    }
  });
}

// Remove apenas as tarefas com status concluídas
function limparConcluidas() {
  tarefas = tarefas.filter(tarefa => !tarefa.concluida);
  salvarTarefas();
  atualizarLista();
}

// Atalho Enter para adicionar tarefa
document.getElementById('entradaTarefa').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') adicionarTarefa();
});

// Inicializa a lista ao carregar a página
window.onload = carregarTarefas;
