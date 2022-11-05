let perguntas = [] //Questions
const form = document.querySelector('.criacao-perguntas-quiz .container-forms')
console.log(form)

function construirArraysPgt() {

    //Repita processo para todas as perguntas
    for(let i = 0; i < qtdPerguntas; i++){

        //Pergunta
        const tituloPgt = document.querySelectorAll('.texto-pergunta')[i].value;
        const corPgt = document.querySelectorAll('.cor-pergunta')[i].value;
    
        //Resposta Correta
        const rCorretoTextoPgt = document.querySelectorAll('.texto-correto')[i].value;
        const rCorretoImagemPgt = document.querySelectorAll('.url-imagem-correto')[i].value;
  
        //Respostas Incorretas
        const rIncorretoTextoPgt1 = document.querySelectorAll('.texto-incorreto')[0 + i].value;
        const rIncorretoImagemPgt1 = document.querySelectorAll('.url-imagem-incorreto')[0 + i].value;
        const rIncorretoTextoPgt2 = document.querySelectorAll('.texto-incorreto')[1 + i].value;
        const rIncorretoImagemPgt2 = document.querySelectorAll('.url-imagem-incorreto')[1 + i].value;
        const rIncorretoTextoPgt3 = document.querySelectorAll('.texto-incorreto')[2 + i].value;
        const rIncorretoImagemPgt3 = document.querySelectorAll('.url-imagem-incorreto')[2 + i].value;

        let pgt = [];

        pgt.push({
          text: rCorretoTextoPgt,
          image: rCorretoImagemPgt,
          isCorrectAnswer: true
        })

        if(rIncorretoTextoPgt1 !== ""){
          pgt.push({
            text: rIncorretoTextoPgt1,
            image: rIncorretoImagemPgt1,
            isCorrectAnswer: false
          });
        }

        if(rIncorretoTextoPgt2 !== ""){
          pgt.push({
            text: rIncorretoTextoPgt2,
            image: rIncorretoImagemPgt2,
            isCorrectAnswer: false
          });
        }

        if(rIncorretoTextoPgt3 !== ""){
          pgt.push({
            text: rIncorretoTextoPgt3,
            image: rIncorretoImagemPgt3,
            isCorrectAnswer: false
          });
        }

        //Objeto da Pergunta
        const pgtObj = {
            title: tituloPgt,
            color: corPgt,
            answers: pgt
          }
          //Coloque a pergunta juntos com os outros
          perguntas = [...perguntas, pgtObj];
    }
}

function perguntasValida(){

  let valido = true;
  const hex = /[0-9A-Fa-f#]{7}/g;

  for(let i = 0; i < qtdPerguntas; i++){
    const corPgt = document.querySelectorAll('.cor-pergunta')[i].value;

    if(corPgt.match(hex)){
      valido = true;
    }
    else{
      valido = false;
      break;
    }
  }

  return valido;
}

function criarNiveis(evento){
  evento.preventDefault()
  resetarInputs()

  console.log('entrou na criarNiveis')
    if (perguntasValida()){

        construirArraysPgt();

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

form.addEventListener('submit', criarNiveis)