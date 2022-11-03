const CREATE_QUIZ_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
const criacaoNivel = document.querySelector('.criacao-nivel-quiz');
const criacaoNivelForm = criacaoNivel.querySelector('.container-forms')
const btnsCriarNivel = criacaoNivelForm.querySelectorAll('ion-icon')
const containerConfirmacaoCriacao = document.querySelector('.confirmacao-criacao')
const containerQuizRecemCriado = containerConfirmacaoCriacao.querySelector('.quiz-recem-criado')
const btnAcessarQuiz = containerConfirmacaoCriacao.querySelector('.botao-confirmacao')
const home = document.querySelector('.pagina-inicial')
const btnVoltarHome = containerConfirmacaoCriacao.querySelector('.voltaHome')
let levels = []

function mostrarOuEsconderEmTela(elemento) {
  elemento.classList.toggle('escondido')
}

function construirArrayNivel() {
  const tituloNivelInputs = criacaoNivel.querySelectorAll('.titulo-nivel')
  const percentualAcertoInputs = criacaoNivel.querySelectorAll('.percentual-acerto')
  const urlImagemInputs = criacaoNivel.querySelectorAll('.url-imagem')
  const descricaoTextAreas = criacaoNivel.querySelectorAll('textarea')
  let existePeloMenosUmPercentual0 = false

  tituloNivelInputs.forEach((input, idx) => {
    const umCampoVazio = input.value === '' || urlImagemInputs[idx] === '' || descricaoTextAreas[idx] === '' || percentualAcertoInputs === ''
    if(umCampoVazio) return
    
    const nivelObj = {
      title: '',
      image: '',
      text: '',
      minValue: 0
    }

    nivelObj.title = input.value
    nivelObj.image = urlImagemInputs[idx].value
    nivelObj.text = descricaoTextAreas[idx].value
    nivelObj.minValue = Number(percentualAcertoInputs[idx].value)
    
    if (nivelObj.minValue === 0) existePeloMenosUmPercentual0 = true
    levels = [...levels, nivelObj]
  })

  if(!existePeloMenosUmPercentual0) {
    alert('Deve existir pelo menos um percentual mínimo igual a 0')
    percentualAcertoInputs.forEach(input => {input.value = ''})
    levels = []
    return false
  }

  return true
}

function mostrarFormNivel(btn) {
    const headerForm = btn.parentElement
    const form = headerForm.nextElementSibling
    mostrarOuEsconderEmTela(form)
}

function construirQuizObj() {
  const niveis = construirArrayNivel()
  if(!niveis) return false

  const quizObj = {
    levels
  }

  return quizObj
}

async function criarQuizz(quizObj) {
  let objCriado;
  const res = await axios.post(CREATE_QUIZ_URL, quizObj)
  objCriado = res.data
  return objCriado
}

function armazenarQuiz(quizId) {
  let quizzesParaArmazenar;
  const QUIZ_KEY = 'quizzes-usuario'
  const existeQuizzArmazenado = localStorage.getItem(QUIZ_KEY) ? true : false
  if (existeQuizzArmazenado) {
    quizzesParaArmazenar = JSON.parse(localStorage.getItem(QUIZ_KEY))
    quizzesParaArmazenar = [...quizzesParaArmazenar, quizId]
  } else {
    quizzesParaArmazenar = [quizId]
  }

  localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzesParaArmazenar))
  console.log(localStorage.getItem(QUIZ_KEY))
}

function construirConfirmaçãoHTML(novoQuizz) {
  const novoQuizHTML = `
    <div 
      class="quiz" 
      style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${novoQuizz.image}')"
      onclick="pegarQuiz(${novoQuizz.id})"
    >
      <p>${novoQuizz.title}</p>
    </div>
  `
  return novoQuizHTML
}

function renderizarContainerConfirmacaoCriacao(quiz) {
  const quizzHtml = construirConfirmaçãoHTML(quiz)
  containerQuizRecemCriado.innerHTML = quizzHtml
  btnAcessarQuiz.setAttribute('onclick', `pegarQuiz(${quiz.id})`)
  mostrarOuEsconderEmTela(containerConfirmacaoCriacao)
}

async function handleSubmit(e) {
  e.preventDefault()
  const quiz = construirQuizObj() 
  if (!quiz) return
  const quizObj = {
    title: "Título do quizz do grupo 2486",
    image: "https://http.cat/411.jpg",
    questions: [
      {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false
          }
        ]
      },
      {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false
          }
        ]
      },
      {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false
          }
        ]
      }
    ],
    levels: [
      {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50
      }
    ]
  }

  const objCriado = await criarQuizz(quizObj)
  armazenarQuiz(objCriado.id)
  mostrarOuEsconderEmTela(criacaoNivel) 
  renderizarContainerConfirmacaoCriacao(objCriado)
}

function voltarHome() {
  pegarQuizzes()
  mostrarOuEsconderEmTela(containerConfirmacaoCriacao)
  mostrarOuEsconderEmTela(home)
}

criacaoNivelForm.addEventListener('submit', handleSubmit)
btnVoltarHome.addEventListener('click', voltarHome)