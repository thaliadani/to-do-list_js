// Seleciona os elementos HTML pelo id
let inputTarefa = document.getElementById('tarefa');
let botaoAdicionar = document.getElementById('adicionar-tarefa');
let listaTarefas = document.getElementById('tarefas');

// Função para adicionar tarefa
function adicionarTarefa() {
    let textoTarefa = inputTarefa.value.trim(); // Remove espacos em branco

    // Adiciona a tarefa apenas se o input não estiver vazio
    if (textoTarefa !== "") {
        let novoElemento = criarTarefa(textoTarefa);
        listaTarefas.appendChild(novoElemento);

        inputTarefa.value = ""; // Limpa o input
        inputTarefa.focus(); // Foca no input para a próxima digitação

        salvarTarefas(); // Salva a lista após a adição
    }else{
    // Feedback visual para usuário
    inputTarefa.placeholder = "Digite algo primeiro!";
    setTimeout(() => {
        inputTarefa.placeholder = "Digite uma tarefa...";
    }, 2000);
        
    }
}

// Função para remover tarefa
function removerTarefa(novaTarefa) {
    novaTarefa.remove();
    salvarTarefas(); // Salva a lista após a remoção
}

// Função para criar o elemento da tarefa
function criarTarefa(texto) {
    // Cria o elemento da tarefa
    let novaTarefa = document.createElement("li");

    // Cria o span para o texto da tarefa
    let spanTexto = document.createElement("span");
    spanTexto.innerText = texto;
    
    // Adiciona o span ao elemento da tarefa
    novaTarefa.appendChild(spanTexto);

    // Cria o botão remover tarefa
    let botaoRemover = document.createElement("button");
    botaoRemover.innerText = "-";

    // Adiciona o evento de clique para remover a tarefa da lista
    botaoRemover.addEventListener("click", () => removerTarefa(novaTarefa));

    novaTarefa.appendChild(botaoRemover);

    return novaTarefa;
}

// Salva as tarefas no localStorage
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

// Carrega as tarefas salvas do localStorage
function carregarTarefas() {
    // Pega as tarefas armazenadas, se houver
    let tarefasSalvas = localStorage.getItem('minhasTarefas');

    if (tarefasSalvas) {
        // Converte a string JSON de volta para um array
        let tarefas = JSON.parse(tarefasSalvas);

        // Para cada tarefa no array, cria o elemento e o adiciona à lista
        tarefas.forEach(textoTarefa => {
            let novoElemento = criarTarefa(textoTarefa);
            listaTarefas.appendChild(novoElemento);
        });
    }
}

// Adiciona o evento de clique para adicionar a tarefa
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Evento keydown para adicionar tarefa
inputTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
})

// Evento para carregar as tarefas quando a página é completamente carregada
document.addEventListener("DOMContentLoaded", carregarTarefas);
