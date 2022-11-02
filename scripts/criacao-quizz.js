const criacaoNivel = document.querySelector('.criacao-nivel-quiz');
const criacaoNivelForm = document.querySelector('.container-forms')
const btnsCriarNivel = criacaoNivelForm.querySelectorAll('ion-icon')

function mostrarEmTela(elemento) {
  elemento.classList.toggle('escondido')
}

function construirArrayNivel(e) {
  e.preventDefault()

  const tituloNivelInputs = criacaoNivel.querySelectorAll('.titulo-nivel')
  const percentualAcertoInputs = criacaoNivel.querySelectorAll('.percentual-acerto')
  const urlImagemInputs = criacaoNivel.querySelectorAll('.url-imagem')
  const descricaoTextAreas = criacaoNivel.querySelectorAll('textarea')
  let levels = []
  let existePeloMenosUmPercentual0 = false

  tituloNivelInputs.forEach((input, idx) => {
    if(input.value === '') return
    
    const nivelObj = {
      title: '',
      image: '',
      text: '',
      minValue: 0
    }

    nivelObj.title = input.value
    nivelObj.image = urlImagemInputs[idx].value
    nivelObj.text = descricaoTextAreas[idx].value
    nivelObj.minValue = Number(percentualAcertoInputs[idx].value)

    if (nivelObj.minValue === 0) existePeloMenosUmPercentual0 = true

    levels = [...levels, nivelObj]
  })

  if(!existePeloMenosUmPercentual0) return false
  
  console.log(levels)
  return levels
}

function mostrarFormNivel(btn) {
    const headerForm = btn.parentElement
    const form = headerForm.nextElementSibling
    mostrarEmTela(form)
}

criacaoNivelForm.addEventListener('submit', construirArrayNivel)