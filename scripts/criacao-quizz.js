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

function validarInputsNiveis(nivelObj) {
  const {title, image, text, minValue} = nivelObj
  let validacao = true;

  const tituloEstaIncorreto = title.value.length < 10
  const percentAcertosEstaIncorreto = minValue.value < 0 || minValue.value > 100 || !isNaN(Number(minValue.value))
  const imagemEstaIncorreta = !validarUrl(image.value)
  const descricaoEstaIncorreta = text.value.length < 30
  console.log(text.value.length)

  if (tituloEstaIncorreto) {
    mostrarErro(title)
    validacao = false
  }
  if (percentAcertosEstaIncorreto) {
    mostrarErro(minValue)
    validacao = false
  }
  if (imagemEstaIncorreta) {
    mostrarErro(image)
    validacao = false
  }
  if (descricaoEstaIncorreta) {
    mostrarErro(text)
    validacao = false
  }

  return validacao
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
            class="titulo-nivel" 
            type="text" 
            placeholder="Título do nível" 
          />
          <span class="escondido erro">O valor informado deve ter, no mínimo, 10 caracteres.</span>
          <input  
            class="percentual-acerto" 
            type="number" 
            placeholder="% de acerto mínima"
          />
          <span class="escondido erro">Pelo menos 1 percentual mínimo deve ser 0. O valor informado deve estar entre 0 e 100</span>
          <input  
            class="url-imagem" 
            type="url" 
            placeholder="URL da imagem do nível" 
          />
          <span class="escondido erro">O valor informado não é uma URL válida.</span>
          <textarea  
            class="descricao-nivel" 
            placeholder="Descrição do nível"
            minlength="30"
          ></textarea>
          <span class="escondido erro">O valor informado deve ter, no mínimo, 30 caracteres.</span>
      </div>
    </div>
  `

  return formHTML
}

function renderizarFormCriacaoDeNiveis() {
  criacaoNivelForm.innerHTML = ''
  for (let i = 0; i<qtdNiveis.value; i++) {
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
  let todosOsInputsEstaoCorretos = true

  tituloNivelInputs.forEach((input, idx) => {
    
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

    const todosInputsDaSecaoSaoValidos = validarInputsNiveis({
      title: input,
      image: urlImagemInputs[idx],
      text: descricaoTextAreas[idx],
      minValue: percentualAcertoInputs[idx]
    })

    if(!todosInputsDaSecaoSaoValidos) {
      todosOsInputsEstaoCorretos = false
      return
    }
    
    if (nivelObj.minValue === 0) existePeloMenosUmPercentual0 = true
    levels = [...levels, nivelObj]
  })

  if(!todosOsInputsEstaoCorretos) {
    return false
  }

  if(!existePeloMenosUmPercentual0) {
    alert('Deve existir pelo menos um percentual mínimo igual a 0')
    percentualAcertoInputs.forEach((input, idx) => {
      input.value = ''
      mostrarErro(percentualAcertoInputs[idx])
    })
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
  console.log(objCriado)
  return objCriado
}

async function updateQuiz(quizObj){
  let objAtualizado;
  let id = idEdit;
  const res = await axios.put(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`,quizObj, keyEdit);
  objAtualizado = res.data;
  console.log(objAtualizado);
  return objAtualizado;
}

function armazenarQuiz(objQuizIdESecretKey) {
  let quizzesParaArmazenar;
  const QUIZ_KEY = 'quizzes-usuario'
  const existeQuizzArmazenado = localStorage.getItem(QUIZ_KEY) ? true : false
  if (existeQuizzArmazenado) {
    quizzesParaArmazenar = JSON.parse(localStorage.getItem(QUIZ_KEY))
    quizzesParaArmazenar = [...quizzesParaArmazenar, objQuizIdESecretKey]
  } else {
    quizzesParaArmazenar = [objQuizIdESecretKey]
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
let objCriado
async function handleSubmit(e) {
  e.preventDefault()
  resetarInputs()

  const quiz = construirQuizObj() 
  if (!quiz) return
  if(quizEdit !== ""){
    objCriado = await updateQuiz(quiz);
  }else{
    objCriado = await criarQuizz(quiz);
  }
  armazenarQuiz({id: objCriado.id, secretKey: objCriado.key})
  mostrarOuEsconderEmTela(criacaoNivel) 
  renderizarContainerConfirmacaoCriacao(objCriado)
}

function handleClickNovoQuizz(quizzId) {
  document.querySelector(".confirmacao-criacao").classList.add("escondido");
  pegarQuizzes()
  pegarQuiz(quizzId)
}

function voltarHome() {
  pegarQuizzes()
  mostrarOuEsconderEmTela(containerConfirmacaoCriacao)
  mostrarOuEsconderEmTela(home)
  window.location.reload();
}

criacaoNivelForm.addEventListener('submit', handleSubmit)
btnVoltarHome.addEventListener('click', voltarHome)