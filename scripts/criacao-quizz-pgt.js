let perguntas = [] //Questions
const form = document.querySelector('.criacao-perguntas-quiz .container-forms')
console.log(form)

function construirArraysPgt() {

    //Repita processo para todas as perguntas
    for(let i = 0; i < qtdPerguntas.value; i++){

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
  const textoPerguntaInputs = document.querySelectorAll('.texto-pergunta')
  const corPerguntaInputs = document.querySelectorAll('.cor-pergunta')
  const respostaCorretaInputs = document.querySelectorAll('.texto-correto')
  const urlRespostaCorretaInputs = document.querySelectorAll('.url-imagem-correto')
  // primeiro texto resposta incorreta -> .texto-incorreto % 4 (array)
  const respostaIncorretaInputs = document.querySelectorAll('.texto-incorreto')
  // primeiro url resposta incorreta -> .url-imagem-incorreto % 4 (array)
  const urlRespostaIncorretaInputs = document.querySelectorAll('.url-imagem-incorreto')


  textoPerguntaInputs.forEach(input => {
    const textoPerguntaEstaInvalido = input.value.length < 20
    if(textoPerguntaEstaInvalido) {
      mostrarErro(input)
      valido = false
    }
  })

  corPerguntaInputs.forEach(input => {
    const corPerguntaEstaInvalido = !validarCor(input.value)
    if(corPerguntaEstaInvalido) {
      mostrarErro(input)
      valido = false
    }
  })

  respostaCorretaInputs.forEach(input => {
    const respostaCorretaEstaInvalido = input.value === ''
    if (respostaCorretaEstaInvalido) {
      mostrarErro(input)
      valido = false
    }
  })

  urlRespostaCorretaInputs.forEach(input => {
    const urlEstaInvalido = !validarUrl(input.value)
    if(urlEstaInvalido) {
      mostrarErro(input)
      valido = false
    }
  })

  respostaIncorretaInputs.forEach((input, idx) => {
    const primeiroRespostaIncorretaInput = idx % 3 === 0
    if (primeiroRespostaIncorretaInput) {
      const respostaIncorretaEstaInvalido = input.value === ''
      if (respostaIncorretaEstaInvalido) {
        mostrarErro(input)
        valido = false
      }
    }
  })

  urlRespostaIncorretaInputs.forEach((input, idx) => {
    const primeiroUrlRespotasIncorretaInput = idx % 3 === 0
    if (primeiroUrlRespotasIncorretaInput) {
      const urlRespostaIncorretaEstaInvalido = !validarUrl(input.value)
      if(urlRespostaIncorretaEstaInvalido) {
        mostrarErro(input)
        valido = false
      }
      //Se não for o primeiro url, verificar se há resposta incorreta preenchida. Se houver, verificar url
    } else {
      const inputRespostaIncorreta = input.previousElementSibling
      const respotaIncorretaEstaPreenchida = inputRespostaIncorreta.value !== ''
      if (respotaIncorretaEstaPreenchida) {
        const urlRespostaIncorretaEstaInvalido = !validarUrl(input.value)
        if(urlRespostaIncorretaEstaInvalido) {
          mostrarErro(input)
          valido = false
        }
      }
    }

  })

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
        return
    }
}

form.addEventListener('submit', criarNiveis)