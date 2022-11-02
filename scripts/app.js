function criarQuizz(){

    console.log("Selecionado criação de quiz");

    const menuPrincipal = document.querySelector(".app");
    const menuDeCriação = document.querySelector(".app-creator")

    menuPrincipal.classList.add("disable");
    menuDeCriação.classList.toggle("disable");
}