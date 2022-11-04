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
                    <input class="texto-pergunta" type="text" placeholder="Texto da pergunta"
                        minlength="20" />
                    <input class="cor-pergunta" type="text" value="#EC362D" placeholder="Cor de fundo da pergunta" />
                    <h5>Resposta correta</h5>
                    <input class="texto-correto" type="text" placeholder="Resposta correta" />
                    <input class="url-imagem-correto" type="url" placeholder="URL da imagem" />
                    <h5>Respostas incorretas</h5>
                    <input class="texto-incorreto" type="text" placeholder="Resposta incorreta 1" />
                    <input class="url-imagem-incorreto" type="url" placeholder="URL da imagem 1" />
                    <input class="texto-incorreto" type="text" placeholder="Resposta incorreta 2" />
                    <input class="url-imagem-incorreto" type="url" placeholder="URL da imagem 2" />
                    <input class="texto-incorreto" type="text" placeholder="Resposta incorreta 3" />
                    <input class="url-imagem-incorreto" type="url" placeholder="URL da imagem 3" />
                </div>
            </div>`

            HTML.innerHTML += templatePgt;
        }
        HTML.innerHTML += btn
        console.log("Perguntas do quizz");
    }
    else{
        alert("As informações estão incorretas ou faltando.\nVerifique se os campos estão corretos.")
        console.log("Informações incorreta!")
    }
}