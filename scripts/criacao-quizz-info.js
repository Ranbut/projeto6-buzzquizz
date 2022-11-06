//Quizz Informação
let tituloQuizz; //Title
let imagemQuizz; //Image
let qtdPerguntas;
let qtdNiveis;

function validarCor(cor) {
    const regexHexadecimal = /^#[0-9A-F]{6}$/i
    return regexHexadecimal.test(cor)
}

function validarUrl(url) {
    const regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    return regexUrl.test(url)
}

function resetarInputs() {
    const inputsComErro = Array.from(document.querySelectorAll('input.erro, textarea.erro'))
    if (inputsComErro.length === 0) return
    const mensagensDeErro = inputsComErro.map(input => input.nextElementSibling)

    inputsComErro.forEach(input => {
        input.classList.remove('erro')
    })
    mensagensDeErro.forEach(mensagem => {
        mensagem.classList.add('escondido')
    })
}

function mostrarErro(input) {
    input.classList.add('erro')
    input.nextElementSibling.classList.remove('escondido')
}


function infomacaoValida(){
    tituloQuizz = document.querySelector(".titulo-quizz");
    imagemQuizz = document.querySelector(".url-imagem-quizz");
    qtdPerguntas = document.querySelector(".quantidade-perguntas-quizz");
    qtdNiveis = document.querySelector(".quantidade-niveis-quizz");

    const tituloEstaIncorreto = tituloQuizz.value.length < 20 || tituloQuizz.value.length > 65
    const imagemEstaIncorreto = !validarUrl(imagemQuizz.value)
    const qtdPerguntasEstaIncorreto = qtdPerguntas.value < 3
    const qtdNiveisEstaIncorreto = qtdNiveis.value < 2

    let validacao = true;

    if (tituloEstaIncorreto) {
        mostrarErro(tituloQuizz);
        validacao = false
    }
    if (imagemEstaIncorreto) {
        mostrarErro(imagemQuizz);
        validacao = false
    }
    if (qtdPerguntasEstaIncorreto) {
        mostrarErro(qtdPerguntas);
        validacao = false
    }
    if (qtdNiveisEstaIncorreto) {
        mostrarErro(qtdNiveis);
        validacao = false
    }

    return validacao;
}

function criarPerguntas(){
    resetarInputs()

    if (infomacaoValida()){

        const fecharElemento = document.querySelector(".criacao-informacao-quiz");
        const abrirElement = document.querySelector(".criacao-perguntas-quiz")
        
        fecharElemento.classList.add("escondido");
        abrirElement.classList.remove("escondido");
        
        const HTML = document.querySelector(".criacao-perguntas-quiz .container-forms");
        const btn = `<button type="submit" class="botao-confirmacao">Prosseguir pra criar níveis</button>`;

        for(let i = 0; i < qtdPerguntas.value; i++){
            const templatePgt = 
            `<div class="form-nivel">
                <div class="form-header">
                    <h5>Pergunta ${i + 1}</h5>
                    <ion-icon onclick="mostrarFormNivel(this)" name="create-outline"></ion-icon>
                </div>
                <div class="input-container">
                    <input class="texto-pergunta" type="text" placeholder="Texto da pergunta"/>
                    <span class="escondido erro">O valor informado deve ter, no mínimo, 20 caracteres.</span>
                    <input class="cor-pergunta" type="text" value="#EC362D" placeholder="Cor de fundo da pergunta"/>
                    <span class="escondido erro">O valor informado não é um hexadecimal válido.</span>
                    <h5>Resposta correta</h5>
                    <input class="texto-correto" type="text" placeholder="Resposta correta" />
                    <span class="escondido erro">Deve haver uma resposta correta</span>
                    <input class="url-imagem-correto" type="url" placeholder="URL da imagem" />
                    <span class="escondido erro">O valor informado não é uma URL válida.</span>
                    <h5>Respostas incorretas</h5>
                    <input class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 1" />
                    <span class="escondido erro">Deve haver, no mínimo, uma resposta incorreta.</span>
                    <input class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 1" />
                    <span class="escondido erro">O valor informado não é uma URL válida.</span>
                    <input class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 2" />
                    <input class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 2" />
                    <span class="escondido erro">O valor informado não é uma URL válida.</span>
                    <input class="texto-incorreto t${i + 1}" type="text" placeholder="Resposta incorreta 3" />
                    <input class="url-imagem-incorreto i${i + 1}" type="url" placeholder="URL da imagem 3" />
                    <span class="escondido erro">O valor informado não é uma URL válida.</span>
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
        return
    }
}