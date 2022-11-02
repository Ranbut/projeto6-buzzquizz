const BASE_URL = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

function pegarQuizzes (){
  const res = axios.get(BASE_URL);
  res.then((res) => renderizarQuizzes(res.data))
}

function renderizarQuizzes(quizzes) {
  const listaQuizzes = document.querySelector('.lista-quizzes')
  listaQuizzes.innerHTML = ''
  quizzes.forEach(quiz => {
    const quizHTML = construirHTMLQuiz(quiz)
    listaQuizzes.innerHTML += quizHTML
  });
}

function construirHTMLQuiz(quizz) {
  const quizzHTML = `
    <div
      onclick="pegarQuiz(${quizz.id})" 
      class="quiz" 
      style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${quizz.image}')"
    >
    <p>
      ${quizz.title}
    </p>
    </div>
  `
  return quizzHTML
}

pegarQuizzes()