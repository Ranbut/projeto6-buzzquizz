function btnCriarQuizz(){

    console.log("Selecionado criação de quizz");
    console.log("Informações do quizz");

    const fecharElemento = document.querySelector(".pagina-inicial");
    const abrirElement = document.querySelector(".criacao-informacao-quiz");

    fecharElemento.classList.add("escondido");
    abrirElement.classList.remove("escondido");
}