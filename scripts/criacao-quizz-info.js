//Quizz Informação
let tituloQuizz; //Title
let imagemQuizz; //Image
let qtdPerguntas;
let qtdNiveis;

function infomacaoValida(){
    tituloQuizz = document.querySelector(".titulo-quizz").value;
    imagemQuizz = document.querySelector(".url-imagem-quizz").value;
    qtdPerguntas = document.querySelector(".quantidade-perguntas-quizz").value;
    qtdNiveis = document.querySelector(".quantidade-niveis-quizz").value;

    //Titulo
    if(tituloQuizz.length >= 20 && tituloQuizz.length <= 65){
        if(qtdPerguntas >= 3){
            if(qtdNiveis >= 2){
                return true;
            }
        }
    }

    return false;
}

function criarPerguntas(){

     if (infomacaoValida()){
        const fecharElemento = document.querySelector(".criacao-informacao-quiz");
        const abrirElement = document.querySelector(".criacao-perguntas-quiz")

        fecharElemento.classList.add("escondido");
        abrirElement.classList.remove("escondido");
    
        const HTML = document.querySelector(".criacao-perguntas-quiz .container-forms");
        const btn = `<button type="submit" class="botao-confirmacao">Prosseguir pra criar níveis</button>`

        for(let i = 0; i < qtdPerguntas; i++){
            const templatePgt = 
            `<div class="form-nivel">
                <div class="form-header">
                    <h5>Pergunta ${i + 1}</h5>
                    <ion-icon onclick="mostrarFormNivel(this)" name="create-outline"></ion-icon>
                </div>
                <div class="input-container">
                    <input required class="texto-pergunta" type="text" placeholder="Texto da pergunta"
                        minlength="20" />
                    <input required class="cor-pergunta" type="text" value="#EC362D" placeholder="Cor de fundo da pergunta" />
                    <h5>Resposta correta</h5>
                    <input required class="texto-correto" type="text" placeholder="Resposta correta" />
                    <input required class="url-imagem-correto" type="url" placeholder="URL da imagem" />
                    <h5>Respostas incorretas</h5>
                    <input required class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 1" />
                    <input required class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 1" />
                    <input class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 2" />
                    <input class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 2" />
                    <input class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 3" />
                    <input class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 3" />
                </div>
            </div>`

            HTML.innerHTML += templatePgt;
        }
        HTML.innerHTML += btn
        if(questionsEdit !== ""){
            const textosPerguntas = document.querySelectorAll(".texto-pergunta");
            const coresPerguntas = document.querySelectorAll(".cor-pergunta");
            const textosCorretos = document.querySelectorAll(".texto-correto");
            const imagensCorretos = document.querySelectorAll(".url-imagem-correto");
            for(let i = 0; i < questionsEdit.length; i++){
                textosPerguntas[i].value = questionsEdit[i].title;
                coresPerguntas[i].value = questionsEdit[i].color;
                textosCorretos[i].value = questionsEdit[i].answers[0].text;
                imagensCorretos[i].value = questionsEdit[i].answers[0].image;
                const textosIncorretos = document.querySelectorAll(`.t${i + 1}`);
                const imagensIncorretos = document.querySelectorAll(`.i${i + 1}`);
                for(let j = 0; j < questionsEdit[i].answers.length-1; j++){
                    textosIncorretos[j].value = questionsEdit[i].answers[j+1].text;
                    imagensIncorretos[j].value = questionsEdit[i].answers[j+1].image;
                }
            }
        }

        renderizarFormCriacaoDeNiveis()
        if(levelsEdit !== ""){
            const tituloNivel = document.querySelectorAll(".titulo-nivel");
            const percentualAceto = document.querySelectorAll(".percentual-acerto");
            const imagensNivel = document.querySelectorAll(".url-imagem");
            const textoDescricao = document.querySelectorAll(".descricao-nivel");
            for(let i = 0; i < levelsEdit.length; i++){
              tituloNivel[i].value = levelsEdit[i].title;
              percentualAceto[i].value = levelsEdit[i].minValue;
              imagensNivel[i].value = levelsEdit[i].image;
              textoDescricao[i].value = levelsEdit[i].text;
            }
        }
    }
    else{
        alert("As informações estão incorretas ou faltando.\nVerifique se os campos estão corretos.")
        console.log("Informações incorreta!")
    }
}