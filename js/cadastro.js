
import maiorDeIdade from "./valida-idade.js"

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]')

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "sobrenome": e.target.elements["sobrenome"].value,
        "nascimento": e.target.elements["nascimento"].value,
        "email": e.target.elements["email"].value,
        "senha": e.target.elements["senha"].value
    }

    
    // buscar lista
    let cadastros = localStorage.getItem('cadastros') || "[]"

    // converter para o formato original

    let listaCadastro = JSON.parse(cadastros)
    
    // add itens a lista

    listaCadastro.push(listaRespostas)

    // converter em string

    let listaConvertidaStr = JSON.stringify(listaCadastro)
    // salvar lista localstorage

    localStorage.setItem("cadastros", listaConvertidaStr)

    window.location.href = "./login.html"
})





camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    sobrenome: {
        valueMissing: "O campo de sobrenome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um sobrenome válido.",
        tooShort: "Por favor, preencha um sobrenome válido."
    },
    nascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ter maior que 18 anos para se cadastrar.'
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        patternMismatch: "Por favor, preencha um senha válido.",
        tooShort: "Por favor, preencha um senha válido."
    }

}



function verificaCampo(campo) {
    let mensagem = ""
    campo.setCustomValidity('')
    if (campo.name == "nascimento" && campo.value != "") {
        maiorDeIdade(campo);
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]

        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');

    const validadorDeInput = campo.checkValidity()

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ""
    }
}







