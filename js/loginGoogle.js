function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential)

  const listaRespostas = {
    "nome": data.name,
    "sobrenome": data.family_name,
    "email": data.email,
    "senha": "123456789"
  }

  let cadastros = localStorage.getItem('cadastros') || "[]"

  let listaCadastro = JSON.parse(cadastros)

  let verificaEmail = false

  for (let i in listaCadastro) {
    if (listaCadastro[i].email == data.email) {
      verificaEmail = true
      break
    }
    
  }

  if ( verificaEmail == true) {
    alert("email ja cadastrado!")
  }else{
    listaCadastro.push(listaRespostas)
    let listaConvertidaStr = JSON.stringify(listaCadastro)
    localStorage.setItem("cadastros", listaConvertidaStr)
  }

}


window.onload = function () {
  google.accounts.id.initialize({
    client_id: "888304772580-fm294tn68ma1r1ll9re89s9c8tmtqob0.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    {
      theme: "filled_blue",
      size: "medium",
      type: "standard",
      shape: "pill",
      text: "signup_with",
      logo_alignment: "left"
    }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}