function btnCriarQuizz(id){
    const fecharElemento = document.querySelector(".pagina-inicial");
    const abrirElement = document.querySelector(".criacao-informacao-quiz");

    fecharElemento.classList.add("escondido");
    abrirElement.classList.remove("escondido");
    if(id === null){
        document.querySelector(".titulo-quizz").value = "";
        document.querySelector(".url-imagem-quizz").value = "";
        document.querySelector(".quantidade-perguntas-quizz").value = "";
        document.querySelector(".quantidade-niveis-quizz").value = "";
    }else{
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
        promessa.then(colocarInformacoes);
    }
}

function deletarQuizz(id){

    const QUIZ_KEY = 'quizzes-usuario'
    const storage = JSON.parse(localStorage.getItem(QUIZ_KEY));
    
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
            JSON.parse(localStorage.removeItem(QUIZ_KEY)[indexStorage]);
            re.then(alert("Quizz deletado com sucesso!"));
            pegarQuizzes();
            window.location.reload();
        }
        else{
            console.log("Ação cancelada!");
        }
    }
    else{
        alert("O quizz selecionado, não possui nenhum registro local.");
    }
}
let keyEdit, idEdit;
function editarQuizz(id){
    const QUIZ_KEY = 'quizzes-usuario'
    const storage = JSON.parse(localStorage.getItem(QUIZ_KEY));
    
    let idValido = false;
    let indexStorage = 0;

    for (let i = 0; i < storage.length; i++) {
        const idQuizz = storage[i].id;

        if(id === idQuizz){
            idValido = true; 
            indexStorage = i;
            idEdit = id;
        }
    }

    if(idValido){
        const key = storage[indexStorage].secretKey;
        keyEdit = { headers: { "Secret-Key": key } }

        btnCriarQuizz(id);
    }
    else{
        alert("O quizz selecionado, não possui nenhum registro local.");
    }

}
let questionsEdit="", levelsEdit="", quizEdit="";
function colocarInformacoes(resposta){
    quizEdit = resposta.data;
    questionsEdit = quizEdit.questions;
    levelsEdit = quizEdit.levels;
    document.querySelector(".titulo-quizz").value = quizEdit.title;
    document.querySelector(".url-imagem-quizz").value = quizEdit.image;
    document.querySelector(".quantidade-perguntas-quizz").value = quizEdit.questions.length;
    document.querySelector(".quantidade-niveis-quizz").value = quizEdit.levels.length;
}
