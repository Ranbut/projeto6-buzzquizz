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

function construirHTMLFormCriacaoNiveis (nivel) {
  const formHTML = `
    <div class="form-nivel">
      <div class="form-header">
        <h5>Nível ${nivel}</h5>
        <ion-icon onclick="mostrarFormNivel(this)" name="create-outline"></ion-icon>
      </div>
      <div class="input-container">
          <input 
            required 
            class="titulo-nivel" 
            type="text" 
            placeholder="Título do nível"
            minlength="10" 
          />
          <input 
            required 
            class="percentual-acerto" 
            type="number" 
            placeholder="% de acerto mínima"
            min="0" 
            max="100" 
          />
          <input 
            required 
            class="url-imagem" 
            type="url" 
            placeholder="URL da imagem do nível" 
          />
          <textarea 
            required 
            class="descricao-nivel" 
            placeholder="Descrição do nível"
            minlength="30"
          ></textarea>
      </div>
    </div>
  `

  return formHTML
}

function renderizarFormCriacaoDeNiveis() {
  criacaoNivelForm.innerHTML = ''
  for (let i = 0; i<qtdNiveis; i++) {
    criacaoNivelForm.innerHTML += construirHTMLFormCriacaoNiveis(i + 1)
  }

  criacaoNivelForm.innerHTML += '<button type="submit" class=botao-confirmacao>Finalizar Quizz</button>'
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
    levels,
    title: tituloQuizz,
    image: imagemQuizz,
    questions: perguntas
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
      onclick="handleClickNovoQuizz(${novoQuizz.id})"
    >
      <p>${novoQuizz.title}</p>
    </div>
  `
  return novoQuizHTML
}

function renderizarContainerConfirmacaoCriacao(quiz) {
  const quizzHtml = construirConfirmaçãoHTML(quiz)
  containerQuizRecemCriado.innerHTML = quizzHtml
  btnAcessarQuiz.setAttribute('onclick', `handleClickNovoQuizz(${quiz.id})`)
  mostrarOuEsconderEmTela(containerConfirmacaoCriacao)
}

async function handleSubmit(e) {
  e.preventDefault()
  const quiz = construirQuizObj() 
  if (!quiz) return

  const objCriado = await criarQuizz(quiz)
  armazenarQuiz(objCriado.id)
  mostrarOuEsconderEmTela(criacaoNivel) 
  renderizarContainerConfirmacaoCriacao(objCriado)
}

function handleClickNovoQuizz(quizzId) {
  pegarQuizzes()
  pegarQuiz(quizzId)
}

function voltarHome() {
  pegarQuizzes()
  mostrarOuEsconderEmTela(containerConfirmacaoCriacao)
  mostrarOuEsconderEmTela(home)
}

criacaoNivelForm.addEventListener('submit', handleSubmit)
btnVoltarHome.addEventListener('click', voltarHome)