function criarQuizz(){

    console.log("Selecionado criação de quizz");
    console.log("Informações do quizz");

    const fecharElemento = document.querySelector(".lista-quizzes");
    const abrirElement = document.querySelector(".criacao-informacao-quiz")

    fecharElemento.classList.add("escondido");
    abrirElement.classList.toggle("escondido");
}

function criarPerguntas(){
    /*if (Os forms forem validos){

        //Para a próxima parte

        const fecharElemento = document.querySelector(".criacao-informacao-quiz");
        const abrirElement = document.querySelector(".criacao-perguntas-quiz")
        
        fecharElemento.classList.add("escondido");
        abrirElement.classList.toggle("escondido");
    
        console.log("Perguntas do quizz");
    }
    else{
        alert("Validação incorreta.\nVerifique se os campos estão corretos.")
        console.log("Validação incorreta!")
    }*/
}

function criarNiveis(){
    /*if (Os forms forem validos){

        //Para a próxima parte

        const fecharElemento = document.querySelector(".criacao-perguntas-quiz");
        const abrirElement = document.querySelector(".criacao-nivel-quiz")
    
        fecharElemento.classList.add("escondido");
        abrirElement.classList.toggle("escondido");

        console.log("Níveis do quizz");
    }
    else{
        alert("Validação incorreta.\nVerifique se os campos estão corretos.")
        console.log("Validação incorreta!")
    }*/
}