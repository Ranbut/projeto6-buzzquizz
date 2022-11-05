function btnCriarQuizz(){

    console.log("Selecionado criação de quizz");
    console.log("Informações do quizz");

    const fecharElemento = document.querySelector(".pagina-inicial");
    const abrirElement = document.querySelector(".criacao-informacao-quiz");

    fecharElemento.classList.add("escondido");
    abrirElement.classList.remove("escondido");
}

function deletarQuizz(id){

    const QUIZ_KEY = 'quizzes-usuario'
    let storage = JSON.parse(localStorage.getItem(QUIZ_KEY));
    
    let idValido = false;
    let indexStorage = 0;

    for (let i = 0; i < storage.length; i++) {
        const idQuizz = storage[i].id;

        if(id === idQuizz){
            idValido = true; 
            indexStorage = i;
        }
    }

    if(idValido){
        const key = storage[indexStorage].secretKey;

        const config = { headers: { "Secret-Key": key } }
    
        if(confirm("Você deseja deletar esse quizz?\nNão a como reverter essa não ação.")){
            console.log("Deletando o quizz!");
            const re = axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`, config);
            storage.splice(indexStorage, 1);
            localStorage.setItem(QUIZ_KEY, JSON.stringify(storage));
            re.then(alert("Quizz deletado com sucesso!"));
            pegarQuizzes();
        }
        else{
            console.log("Ação cancelada!");
        }
    }
    else{
        alert("O quizz selecionado, não possui nenhum registro local.");
    }
}
