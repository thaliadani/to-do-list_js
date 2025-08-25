// O botao para adicionar a tarefa digitada no input
let botaoAdicionar = document.getElementById('adicionar-tarefa');
// Div com id tarefas para adicionar a tarefa na lista
let listaTarefas = document.getElementById('tarefas');

//Evento de clicar no botao para criar uma tarefa
botaoAdicionar.addEventListener("click", () => {
    // pega o valor do input
    let inputTarefa = document.getElementById('tarefa').value;
    // verifica se o input está vazio e adiciona uma li com o valor 
    if(inputTarefa !== "" || inputTarefa !== novaTarefa){
        let novaTarefa = document.createElement("li")
        novaTarefa.innerText = inputTarefa;
        //adiciona a nova tarefa na div
        listaTarefas.appendChild(novaTarefa)
    }
})