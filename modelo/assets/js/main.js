const inputTarefa = document.querySelector('.input');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.lista');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function criaBotaoRemover(li){
    li.innerHTML += ' ';
    const btnRemover = document.createElement('button');
    // btnRemover.textContent = `Remover`;
    // btnRemover.innerHTML = `<img src="./assets/img/botao-x.png" alt="X vermelho para remover item da lista" width="25px" class="img-btn-remover">`;

    // btnRemover.classList.add('btn-remover');
    btnRemover.setAttribute('class', 'btn-remover');
    return btnRemover;
}

function criaBotaoFinalizar(li){
    li.innerHTML += ' ';
    const btnFinalizar = document.createElement('button');

    btnFinalizar.setAttribute('class', 'btn-finalizar');
    return btnFinalizar;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    const btnRemover = criaBotaoRemover(li);
    const btnFinalizar = criaBotaoFinalizar(li);
    li.innerText = textoInput;
    tarefas.appendChild(li);
    li.appendChild(btnFinalizar);
    li.appendChild(btnRemover);
    limpaInput();
    salvarTarefas();
}

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Remover', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
    console.log(tarefasJSON);
    console.log(listaDeTarefas);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

inputTarefa.addEventListener('keypress', function(e){
    if(!inputTarefa.value) return;
    if(e.keyCode === 13){
        criaTarefa(inputTarefa.value);
    }
});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('btn-tarefa')){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
    if(el.classList.contains('btn-remover')){
        el.parentElement.remove();
        salvarTarefas(); 
    }
    if(el.classList.contains('btn-finalizar')){
        el.parentElement.style.textDecoration = 'line-through';
    }
});

adicionaTarefasSalvas();