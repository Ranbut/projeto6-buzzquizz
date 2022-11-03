let perguntas = [] //Questions


function construirArraysPgt() {

    //Repita processo para todas as perguntas
    for(let i = 0; i < qtdPerguntas; i++){

        //Pergunta
        const tituloPgt = document.querySelectorAll('.texto-pergunta')[i].value;
        const corPgt = document.querySelectorAll('.cor-pergunta')[i].value;
    
        //Resposta Correta
        const rCorretoTextoPgt = document.querySelectorAll('.texto-correto').value;
        const rCorretoImagemPgt = document.querySelectorAll('.url-imagem-correto').value;
  
        //Respostas Incorretas
        const rIncorretoTextoPgt1 = document.querySelectorAll('.texto-incorreto')[0 + i].value;
        const rIncorretoImagemPgt1 = document.querySelectorAll('.url-imagem-incorreto')[0 + i].value;
        const rIncorretoTextoPgt2 = document.querySelectorAll('.texto-incorreto')[1 + i].value;
        const rIncorretoImagemPgt2 = document.querySelectorAll('.url-imagem-incorreto')[1 + i].value;
        const rIncorretoTextoPgt3 = document.querySelectorAll('.texto-incorreto')[2 + i].value;
        const rIncorretoImagemPgt3 = document.querySelectorAll('.url-imagem-incorreto')[2 + i].value;
    
        //Objeto da Pergunta
        const pgtObj = {
            title: tituloPgt,
            color: corPgt,
            answers: [
                {
                  text: rCorretoTextoPgt,
                  image: rCorretoImagemPgt,
                  isCorrectAnswer: true
                },
                {
                  text: rIncorretoTextoPgt1,
                  image: rIncorretoImagemPgt1,
                  isCorrectAnswer: false
                },
                {
                  text: rIncorretoTextoPgt2,
                  image: rIncorretoImagemPgt2,
                  isCorrectAnswer: false
                },
                {
                  text: rIncorretoTextoPgt3,
                  image: rIncorretoImagemPgt3,
                  isCorrectAnswer: false
                }
              ]
          }
          //Coloque a pergunta juntos com os outros
          perguntas = [...perguntas, pgtObj];
    }
}

function perguntasValida(){
    //Ainda para adicionar

    return true;
}

function criarNiveis(){
    if (perguntasValida()){

        construirArrayPgt();

        const fecharElemento = document.querySelector(".criacao-perguntas-quiz");
        const abrirElement = document.querySelector(".criacao-nivel-quiz")
    
        fecharElemento.classList.add("escondido");
        abrirElement.classList.toggle("escondido");

        console.log("Níveis do quizz");
    }
    else{
        alert("Validação incorreta.\nVerifique se os campos estão corretos.")
        console.log("Validação incorreta!")
    }
}