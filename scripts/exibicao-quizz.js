let questoes, niveis, quantAcertos, quantErros, respostaAxio;
function comparador() { 
	return Math.random() - 0.5; 
}
function pegarQuiz(id){
    carregando();
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promessa.then(exibirQuiz);
}
function exibirQuiz(resposta){
    quantAcertos = 0, quantErros = 0
    respostaAxio = resposta;
    const elementoQueQueroQueApareca = document.querySelector("header");
    elementoQueQueroQueApareca.scrollIntoView();
    const quiz = resposta.data;
    const containerExibicao = document.querySelector(".containerExibicao");
    const paginaInicial = document.querySelector(".pagina-inicial");
    paginaInicial.classList.add('escondido');
    containerExibicao.classList.remove('escondido');
    containerExibicao.innerHTML = `
        <div class="divImagemQuiz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quiz.image});"> 
            <h1 class="tituloQuiz">${quiz.title}</h1>
        </div>
    `;
    questoes = quiz.questions;
    for(let i = 0; i < questoes.length; i++){
        const opcoes = questoes[i].answers;
        opcoes.sort(comparador);
        containerExibicao.innerHTML += `
            <div class="questao" id="${i}">
                <div class="caixaTitulo" style="background-color: ${questoes[i].color};">
                    <h2 class="tituloQuestao">${questoes[i].title}</h2>
                </div>
                <div class="opcoes">
                    
                </div>
            </div>
        `;
        for(let j = 0; j < opcoes.length; j++){
            const pai = document.getElementById(i);
            const opcao = pai.children[1];
            opcao.innerHTML += `
                <div class="${opcoes[j].isCorrectAnswer}" onclick="estaCorreto(this, ${i}, ${opcoes[j].isCorrectAnswer})">
                    <img class="imagemOpcao" src="${opcoes[j].image}" alt="">
                    <h3 class="textoOpcao">${opcoes[j].text}</h3>
                </div>
            `;
        }
    }
    niveis = quiz.levels; 
    carregamentoFeito();
}
function estaCorreto(elemento, id, respostaMarcada){
    const pai = elemento.parentNode;
    const opIncorreta = pai.querySelectorAll(".false");
    const opCorreta = pai.querySelectorAll(".true");
    if(respostaMarcada === true){
        quantAcertos++;
    }else{
        quantErros++;
    }
    opCorreta[0].children[1].classList.add("respostaCerta");
    for(let i = 0; i < opIncorreta.length; i++){
        opIncorreta[i].children[1].classList.add("respostaErrada");
    }
    for(let i = 0; i < pai.childElementCount; i++){
        pai.children[i].removeAttribute("onclick");
        if(pai.children[i] !== elemento){
            const img = pai.children[i].children[0];
            img.classList.add("esbranquicado");
        }
    }
    if(questoes.length === (quantAcertos+quantErros)){
        resultado(id + 1);
    }
    setTimeout(scrollar, 2000, id);
}
function resultado(id){
    let nivel;
    let quantQuestoes = quantAcertos + quantErros;
    let resultado = (quantAcertos*100)/quantQuestoes;
    resultado = Math.ceil(resultado);
    const containerExibicao = document.querySelector(".containerExibicao");
    for(let i = 0; i < niveis.length; i++){
        if(resultado >= niveis[i].minValue){
            nivel = niveis[i];
        }
    }
    containerExibicao.innerHTML += `
        <div class="questao divFim" id="${id}">
            <div class="caixaTituloFim">
                <h2 class="tituloQuestao">${resultado}% de acerto: ${nivel.title}</h2>
            </div>
            <div class="fim">
                <img class="imagemFim" src="${nivel.image}" alt="">
                <h3 class="textoFim">${nivel.text}</h3>
            </div>
        </div>
        <button class="botaoReiniciarQuiz" onclick="reiniciar()">Reiniciar Quizz</button>
        <div class="voltaHome" onclick="voltaHome()">Voltar para home</div>
    `;
}
function reiniciar(){
    exibirQuiz(respostaAxio);
}
function voltaHome(){
    const elementoQueQueroQueApareca = document.querySelector(".header");
    elementoQueQueroQueApareca.scrollIntoView();
    const paginaInicial = document.querySelector(".pagina-inicial");
    paginaInicial.classList.remove('escondido');
    const containerExibicao = document.querySelector(".containerExibicao");
    containerExibicao.classList.add('escondido');
    window.location.reload();
}
function scrollar(id){
    const elementoQueQueroQueApareca = document.getElementById(id+1);
    if(elementoQueQueroQueApareca !== null){
        elementoQueQueroQueApareca.scrollIntoView();
    }
}