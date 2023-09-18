let btnLogar = document.querySelector('#btnLogar')

btnLogar.addEventListener('click', (e) => {
    let emailUsuario = document.querySelector('#email-Usuario').value
    let senhaUsuario = document.querySelector('#senha-Usuario').value

    // buscar cadastros
    let listaCadastro = localStorage.getItem('cadastros')

    // converter em formato original
    let listaCadastroConvertida = JSON.parse(listaCadastro)

    // fazer looping (for) para validar login
    let validaLogin = false

    for (let i in listaCadastroConvertida) {
        if (listaCadastroConvertida[i].nome || listaCadastroConvertida[i].email == emailUsuario && listaCadastroConvertida[i].senha == senhaUsuario) {
            validaLogin = true
            break
        }

    }

    if (validaLogin == true) {
        window.location.href = "./home.html"

    } else {
        alert("email e senha incorretos!")
    }

})










