const produtos = [
  {
    id: 1,
    nome: "Celular Samsung",
    preco: 1200,
    imagem: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    nome: "Notebook Dell",
    preco: 3500,
    imagem: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    nome: "Fone Bluetooth",
    preco: 200,
    imagem: "https://via.placeholder.com/200"
  },
  {
    id: 4,
    nome: "Smart TV",
    preco: 2800,
    imagem: "https://via.placeholder.com/200"
  }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function mostrarProdutos(lista) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("produto");

    div.innerHTML = `
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco}</p>
      <button onclick="adicionar(${p.id})">Comprar</button>
    `;

    container.appendChild(div);
  });
}

function adicionar(id) {
  const produto = produtos.find(p => p.id === id);
  carrinho.push(produto);
  salvarCarrinho();
  atualizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.nome} - R$ ${p.preco}
      <button onclick="remover(${i})">X</button>`;
    lista.appendChild(li);
    soma += p.preco;
  });

  total.textContent = "Total: R$ " + soma;
}

function remover(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

function finalizarCompra() {
  alert("Compra finalizada!");
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
}

// Busca
document.getElementById("busca").addEventListener("input", function(e) {
  const texto = e.target.value.toLowerCase();
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(texto)
  );
  mostrarProdutos(filtrados);
});

mostrarProdutos(produtos);
atualizarCarrinho();
