// Seleciona os elementos HTML pelo id
let inputBuscar = document.getElementById('buscar');
let botaoBuscar = document.getElementById('buscar-tarefas');

let inputTarefa = document.getElementById('tarefa');
let botaoAdicionar = document.getElementById('adicionar-tarefa');
let listaTarefas = document.getElementById('tarefas');

let botaoLimpar = document.getElementById("limpar-tarefas");

//buscar a tarefa digitada
function buscarTarefas() {
    // filtra o valor do inputBuscar para texto minusculo
    const filtro = inputBuscar.value.toLowerCase();

    //Seleciona todas as tarefas da lista
    const todasAsTarefas = listaTarefas.querySelectorAll('li');

    //Itera cada tarefa
    todasAsTarefas.forEach(tarefa => {

        //Seleciona cada uma das tarefas e converte para minusculo
        const textoTarefa = tarefa.querySelector('span').textContent.toLowerCase();
        
        //Verifica se encontra a tarefa digitada, caso aparecer mostra na lista de tarefas e esconde o restante
        if (textoTarefa.includes(filtro)) {
            tarefa.style.display = '';
        } else {
            tarefa.style.display = 'none';
        }
    });

}

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
    } else {
        // Feedback visual para usuário
        inputTarefa.placeholder = "Digite algo primeiro!";
        //Adiciona cor no placeholder
        inputTarefa.classList.add('erro');
        inputTarefa.classList.add('wobble-hor-bottom')
        setTimeout(() => {
            inputTarefa.placeholder = "Digite uma tarefa";
            inputTarefa.classList.remove('erro')
            inputTarefa.classList.remove('wobble-hor-bottom')
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
    
    let svgNS = "http://www.w3.org/2000/svg";
    let imagemRemover = document.createElementNS(svgNS, "svg");
    imagemRemover.setAttribute("xmlns", svgNS);
    imagemRemover.setAttribute("viewBox", "0 0 640 640");
    let path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M96 320c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32z");
    imagemRemover.appendChild(path);
    botaoRemover.appendChild(imagemRemover);

    // Evento de clique para remover a tarefa da lista
    botaoRemover.addEventListener("click", () => removerTarefa(novaTarefa));

    // Evento de clique duplo no texto para remover a tarefa
    spanTexto.addEventListener("dblclick", () => removerTarefa(novaTarefa));

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

function limparTarefas() {
    listaTarefas.remove();
    salvarTarefas();
    setTimeout(() => {
        location.reload();
    }, 0)
}

botaoBuscar.addEventListener("click", buscarTarefas);

// Adiciona o evento de clique para adicionar a tarefa
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Evento keydown para adicionar tarefa
inputTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
})

botaoLimpar.addEventListener("click", limparTarefas);

// Evento para carregar as tarefas quando a página é completamente carregada
document.addEventListener("DOMContentLoaded", carregarTarefas);
