const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


const formSaldo = document.getElementById('formSaldo');
const formDespesa = document.getElementById('formDespesa');

let listaSaldo = localStorage.getItem("itensSaldo") || "";
let listaDespesa = localStorage.getItem("itensDespesa") || "";

document.getElementById("listaSaldo").innerHTML = listaSaldo;
document.getElementById("listaDespesa").innerHTML = listaDespesa;

formSaldo.addEventListener('submit', (event) => {

  const descricao = document.getElementById("descricao-saldo").value;
  const valor = document.getElementById("valor-saldo").value;

  listaSaldo += `<li class="c-main_itens c-itens-Saldo"> ${descricao} - ${valor} <button class="btn-delete btn" onclick="removerItem(this)">X</button></li>`;

  document.getElementById("listaSaldo").innerHTML = listaSaldo;

  localStorage.setItem("itensSaldo", listaSaldo);


});

formDespesa.addEventListener('submit', (event) => {

  const descricao = document.getElementById("descricao-despesa").value;
  const valor = document.getElementById("valor-despesa").value;

  listaDespesa += `<li class="c-main_itens c-itens-Despesa ">${descricao} - ${valor}<button class="btn-delete btn" onclick="removerItem(this)">X</button> </li>`;

  document.getElementById("listaDespesa").innerHTML = listaDespesa;

  localStorage.setItem("itensDespesa", listaDespesa);

  somarValoresDespesas();
  somarValoresSaldos();
});


function somarValoresDespesas() {
  const valorInputsDespesas = document.getElementsByClassName('c-itens-Despesa');
  let soma = 0;

  for (let i = 0; i < valorInputsDespesas.length; i++) {
    const valorText = valorInputsDespesas[i].textContent;
    const valor = parseFloat(valorText.split('-')[1]);

    if (!isNaN(valor)) {
      soma += valor;
    }
  }

  document.getElementById("totalDespesas").textContent = "R$" + soma;
}


function somarValoresSaldos() {
  const valorInputsSaldos = document.getElementsByClassName('c-itens-Saldo');
  let soma = 0;

  for (let i = 0; i < valorInputsSaldos.length; i++) {
    const valorText = valorInputsSaldos[i].textContent;
    const valor = parseFloat(valorText.split('-')[1]);

    if (!isNaN(valor)) {
      soma += valor;
    }
  }

  document.getElementById("totalSaldo").textContent = "R$" + soma;
}

function calcularLucro() {
  const totalDespesas = parseFloat(document.getElementById("totalDespesas").textContent.replace("R$", ""));
  const totalSaldos = parseFloat(document.getElementById("totalSaldo").textContent.replace("R$", ""));

  const lucro = totalSaldos - totalDespesas;

  document.getElementById("totalLucro").textContent = "R$" + lucro;
}

function removerItem(element) {
  const listItem = element.parentNode;
  const lista = listItem.parentNode;
  lista.removeChild(listItem);

  const listaSaldo = document.getElementById("listaSaldo").innerHTML;
  const listaDespesa = document.getElementById("listaDespesa").innerHTML;

  localStorage.setItem("itensSaldo", listaSaldo);
  localStorage.setItem("itensDespesa", listaDespesa);

  somarValoresDespesas();
  somarValoresSaldos();
  calcularLucro();
}

somarValoresDespesas();
somarValoresSaldos();
calcularLucro();

let cadastro = localStorage.getItem("cadastros")

let cadastroObj = JSON.parse(cadastro)


let nomeDeUsuario = document.getElementById("nomeDeUsuario")
let imgPerfil = document.getElementById("imgPerfil")

nomeDeUsuario.textContent = cadastroObj[0].nome
imgPerfil.setAttribute("src", "src/perfil.jpg")




