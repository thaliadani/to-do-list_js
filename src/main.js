// Seleciona os elementos HTML principais
let botaoAdicionar = document.getElementById('adicionar-tarefa');
let listaTarefas = document.getElementById('tarefas');
let inputTarefa = document.getElementById('tarefa');

/**
 * Cria um novo elemento <li> para uma tarefa, incluindo o texto e um botão de remover.
 * @param {string} texto O texto da tarefa.
 * @returns {HTMLLIElement} O elemento <li> completo.
 */
function criarElementoTarefa(texto) {
    let novaTarefa = document.createElement("li");

    let spanTexto = document.createElement("span");
    spanTexto.innerText = texto;

    let botaoRemover = document.createElement("button");
    botaoRemover.innerText = "Remover";
    botaoRemover.className = "botao-remover"; // Adiciona uma classe para estilização

    // Adiciona o evento de clique para remover a tarefa da lista e salvar
    botaoRemover.addEventListener("click", () => {
        novaTarefa.remove();
        salvarTarefas(); // Salva a lista após a remoção
    });

    novaTarefa.appendChild(spanTexto);
    novaTarefa.appendChild(botaoRemover);

    return novaTarefa;
}

/**
 * Salva todas as tarefas da lista no localStorage do navegador.
 */
function salvarTarefas() {
    let tarefas = [];
    // Pega todos os spans que contêm o texto das tarefas
    let itensDaLista = document.querySelectorAll('#tarefas li span');
    
    // Itera sobre os spans e adiciona o texto ao array
    itensDaLista.forEach(item => {
        tarefas.push(item.innerText);
    });
    
    // Converte o array em uma string JSON e armazena no localStorage
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

/**
 * Carrega as tarefas salvas no localStorage e as exibe na página.
 */
function carregarTarefas() {
    // Pega as tarefas armazenadas, se houver
    let tarefasSalvas = localStorage.getItem('minhasTarefas');

    if (tarefasSalvas) {
        // Converte a string JSON de volta para um array
        let tarefas = JSON.parse(tarefasSalvas);
        
        // Para cada tarefa no array, cria o elemento e o adiciona à lista
        tarefas.forEach(textoTarefa => {
            let novoElemento = criarElementoTarefa(textoTarefa);
            listaTarefas.appendChild(novoElemento);
        });
    }
}

// --- Event Listeners ---

// 1. Evento para o botão de adicionar tarefa
botaoAdicionar.addEventListener("click", () => {
    // .trim() remove espaços em branco no início e no fim
    let textoTarefa = inputTarefa.value.trim();

    // Adiciona a tarefa apenas se o input não estiver vazio
    if (textoTarefa !== "") {
        let novoElemento = criarElementoTarefa(textoTarefa);
        listaTarefas.appendChild(novoElemento);

        inputTarefa.value = ""; // Limpa o input
        inputTarefa.focus();    // Foca no input para a próxima digitação
        
        salvarTarefas(); // Salva a lista após adicionar uma nova tarefa
    }
});

// 2. Evento para carregar as tarefas quando a página é completamente carregada
document.addEventListener("DOMContentLoaded", carregarTarefas);