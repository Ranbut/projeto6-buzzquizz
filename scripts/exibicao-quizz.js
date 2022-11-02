let questoes;
function comparador() { 
	return Math.random() - 0.5; 
}
function pegarQuiz(id){
    //Quando o usuário clicar no quiz que deseja jogar, o onclick deve repassar o id do quiz, por enquanto o id está fixo em 1
    id = 1;//remover essa linha depois
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promessa.then(exibirQuiz);
}
function exibirQuiz(resposta){
    const quiz = resposta.data;
    const containerExibicao = document.querySelector(".containerExibicao");
    containerExibicao.innerHTML = `
        <div class="divImagemQuiz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quiz.image});"> 
            <h1 class="tituloQuiz">${quiz.title}</h1>
        </div>
    `;
    questoes = quiz.questions;
    for(let i = 0; i< questoes.length; i++){
        const opcoes = questoes[i].answers;
        opcoes.sort(comparador);
        containerExibicao.innerHTML += `
            <div class="questao" id="${i}">
                <div class="caixaTitulo" style="background-color: ${questoes[i].color};">
                    <h2 class="tituloQuestao">${questoes[i].title}</h2>
                </div>
                <div class="opcoes">
                    <div onclick="estaCorreto(this, ${i})">
                        <img class="imagemOpcao" src="${opcoes[0].image}" alt="">
                        <h3 class="textoOpcao">${opcoes[0].text}</h3>
                    </div>
                    <div onclick="estaCorreto(this, ${i})">
                        <img class="imagemOpcao" src="${opcoes[1].image}" alt="">
                        <h3 class="textoOpcao">${opcoes[1].text}</h3>
                    </div>
                    <div onclick="estaCorreto(this, ${i})">
                        <img class="imagemOpcao" src="${opcoes[2].image}" alt="">
                        <h3 class="textoOpcao">${opcoes[2].text}</h3>
                    </div>
                    <div onclick="estaCorreto(this, ${i})">
                        <img class="imagemOpcao" src="${opcoes[3].image}" alt="">
                        <h3 class="textoOpcao">${opcoes[3].text}</h3>
                    </div>
                </div>
            </div>
        `;
    }
}
function estaCorreto(elemento, id){
    const pai = elemento.parentNode;
    const opcoes = questoes[id].answers;
    const certo = opcoes.filter((objeto) => {
        if (objeto.isCorrectAnswer === true) {
          return true;
        }
    });
    console.log(certo);
    for(let i = 0; i < 4; i++){
        pai.children[i].removeAttribute("onclick");
        if(pai.children[i] !== elemento){
            const img = pai.children[i].children[0];
            img.classList.add("esbranquicado");
        }
        if(pai.children[i].children[1].innerHTML === certo[0].text){
            pai.children[i].children[1].classList.add("respostaCerta");
        }else{
            pai.children[i].children[1].classList.add("respostaErrada");
        }
    }
    setTimeout(scrollar, 2000, id);
}
function scrollar(id){
    const elementoQueQueroQueApareca = document.getElementById(id+1);
    if(elementoQueQueroQueApareca !== null){
        elementoQueQueroQueApareca.scrollIntoView();
    }
}
pegarQuiz();