let perguntas = [] //Questions


function construirArrayPgt() {

    for(let i = 0; i < qtdPerguntas; i++){

        const tituloPgt = document.querySelectorAll('.texto-pergunta')[i].value;
        const corPgt = document.querySelectorAll('.cor-pergunta')[i].value;
    
        const rCorretoTextoPgt = document.querySelectorAll('.texto-correto').value;
        const rCorretoImagemPgt = document.querySelectorAll('.url-imagem-correto').value;
  
        const rIncorretoTextoPgt1 = document.querySelectorAll('.texto-incorreto')[0 + i].value;
        const rIncorretoImagemPgt1 = document.querySelectorAll('.url-imagem-incorreto')[0 + i].value;
        const rIncorretoTextoPgt2 = document.querySelectorAll('.texto-incorreto')[1 + i].value;
        const rIncorretoImagemPgt2 = document.querySelectorAll('.url-imagem-incorreto')[1 + i].value;
        const rIncorretoTextoPgt3 = document.querySelectorAll('.texto-incorreto')[2 + i].value;
        const rIncorretoImagemPgt3 = document.querySelectorAll('.url-imagem-incorreto')[2 + i].value;
    
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
          perguntas = [...perguntas, pgtObj];
    }
}

function perguntasValida(){
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