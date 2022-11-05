const BASE_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
function pegarQuizzes (){
  const res = axios.get(BASE_URL);
  res.then((res) => renderizarQuizzes(res.data))
}

function renderizarQuizzes(quizzes) {
  const QUIZZES_USUARIO_STORAGE_KEY = 'quizzes-usuario'

  // Todos os quizzes
  const listaQuizzes = document.querySelector('.todos-quizzes .lista-quizzes')
  listaQuizzes.innerHTML = ''
  quizzes.forEach(quiz => {
    const quizHTML = construirHTMLQuiz(quiz)
    listaQuizzes.innerHTML += quizHTML
  });

  // Quizzes do Usuário
  const criarQuizzes = document.querySelector('.criar-quizz-container')
  const containerUsuarioQuizzes = document.querySelector('.usuario-quizzes')
  const quizzesUsuario = document.querySelector('.usuario-quizzes .lista-quizzes')
  const existeQuizzesDoUsuario = localStorage.getItem(QUIZZES_USUARIO_STORAGE_KEY)
  if(existeQuizzesDoUsuario) {
    const objQuizzesUsuario = JSON.parse(localStorage.getItem(QUIZZES_USUARIO_STORAGE_KEY))
    const idQuizzesUsuario = objQuizzesUsuario.map(quiz => quiz.id)

    const listaQuizzesUsuario = quizzes.filter(quiz => (
      idQuizzesUsuario.indexOf(quiz.id) !== -1
    ));

    if (listaQuizzesUsuario.length === 0) return

    quizzesUsuario.innerHTML = ''

    listaQuizzesUsuario.forEach(quiz => {
      const quizUsuarioHTML = construirHTMLQuiz(quiz)
      quizzesUsuario.innerHTML += quizUsuarioHTML
    })

    criarQuizzes.classList.add('escondido')
    containerUsuarioQuizzes.classList.remove('escondido')
  }

}

function construirHTMLQuiz(quizz) {
  const quizzHTML = `
    <div class="divRelativa">
      <div
        onclick="pegarQuiz(${quizz.id})" 
        class="quiz" 
        style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizz.image}')"
      >
        <p>
          ${quizz.title}
        </p>
      </div>
      <div class="opcoesEditaDeleta">
        <ion-icon name="create-outline" onclick="editarQuizz(${quizz.id})"></ion-icon>
        <ion-icon name="trash-outline" onclick="deletarQuizz(${quizz.id})"></ion-icon>
      </div>
    </div>
  `
  return quizzHTML
}

pegarQuizzes()