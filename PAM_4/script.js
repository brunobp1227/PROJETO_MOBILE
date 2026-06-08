// Array fixo com os produtos da loja. Cada produto é um objeto.
const produtos = [
    { id: 1, nome: "Mouse", preco: 25.9, disponivel: true },
    { id: 2, nome: "Teclado", preco: 49.9, disponivel: true },
    { id: 3, nome: "Fone de Ouvido", preco: 59.9, disponivel: true },
    { id: 4, nome: "Webcam", preco: 89.9, disponivel: true },
    { id: 5, nome: "Pendrive 32GB", preco: 34.9, disponivel: true },
    { id: 6, nome: "Caixa de Som", preco: 75.5, disponivel: true }
];

// O carrinho começa vazio e depois recebe os produtos escolhidos.
let carrinho = [];

// querySelector pega elementos do HTML para o JavaScript poder alterar a tela.
const listaProdutos = document.querySelector("#listaProdutos");
const listaCarrinho = document.querySelector("#listaCarrinho");
const totalCompra = document.querySelector("#totalCompra");
const filtroProdutos = document.querySelector("#filtroProdutos");
const limparCarrinho = document.querySelector("#limparCarrinho");
const descontoInput = document.querySelector("#desconto");

// Formata números no padrão de dinheiro brasileiro, por exemplo R$ 25,90.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salva o carrinho e o desconto no navegador usando localStorage.
function salvarCarrinho() {
    localStorage.setItem("carrinhoCompras", JSON.stringify(carrinho));
    localStorage.setItem("descontoCarrinho", descontoInput.value);
}

// Carrega os dados salvos quando a página abre ou é atualizada.
function carregarDados() {
    const carrinhoSalvo = localStorage.getItem("carrinhoCompras");
    const descontoSalvo = localStorage.getItem("descontoCarrinho");

    if (carrinhoSalvo) {
        // JSON.parse transforma o texto salvo de volta em array.
        carrinho = JSON.parse(carrinhoSalvo);
    }

    if (descontoSalvo) {
        descontoInput.value = descontoSalvo;
    }
}

// Aplica o filtro escolhido no select usando switch.
function filtrarProdutos() {
    const filtro = filtroProdutos.value;

    switch (filtro) {
        case "ate50":
            return produtos.filter((produto) => produto.preco <= 50);
        case "acima50":
            return produtos.filter((produto) => produto.preco > 50);
        default:
            return produtos;
    }
}

// Mostra os produtos na tela criando elementos HTML pelo DOM.
function listarProdutos() {
    // Limpa a lista antes de desenhar novamente, evitando repetição.
    listaProdutos.innerHTML = "";

    const produtosFiltrados = filtrarProdutos();

    produtosFiltrados.forEach((produto) => {
        // createElement cria tags HTML pelo JavaScript.
        const card = document.createElement("article");
        card.classList.add("produto");

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.classList.add("preco");
        preco.textContent = formatarMoeda(produto.preco);

        const botao = document.createElement("button");
        botao.textContent = "Adicionar ao Carrinho";
        // Quando clicar no botão, chama a função passando o id do produto.
        botao.addEventListener("click", () => adicionarAoCarrinho(produto.id));

        card.appendChild(titulo);
        card.appendChild(preco);
        card.appendChild(botao);
        listaProdutos.appendChild(card);
    });
}

// Adiciona um produto ao carrinho ou aumenta a quantidade se ele já existir.
function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find((item) => item.id === idProduto);
    const itemExistente = carrinho.find((item) => item.id === idProduto);

    if (itemExistente) {
        // Condicional: se já existe no carrinho, aumenta a quantidade.
        itemExistente.quantidade++;
    } else {
        // Se ainda não existe, insere um novo objeto no array carrinho.
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    // Atualiza a tela, o total e o localStorage.
    atualizarCarrinho();
}

// Remove uma unidade do produto. Se só tiver uma, remove o item inteiro.
function removerDoCarrinho(idProduto) {
    const item = carrinho.find((produto) => produto.id === idProduto);

    if (item.quantidade > 1) {
        item.quantidade--;
    } else {
        carrinho = carrinho.filter((produto) => produto.id !== idProduto);
    }

    atualizarCarrinho();
}

// Botão extra: aumenta a quantidade de um item que já está no carrinho.
function aumentarQuantidade(idProduto) {
    const item = carrinho.find((produto) => produto.id === idProduto);
    item.quantidade++;
    atualizarCarrinho();
}

// Limpa todo o carrinho e zera o desconto.
function limparTodosItens() {
    carrinho = [];
    descontoInput.value = 0;
    atualizarCarrinho();
}

// Atualiza a visualização do carrinho na tela.
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        // Mostra uma mensagem quando não há itens.
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem-vazio");
        mensagem.textContent = "Carrinho vazio";
        listaCarrinho.appendChild(mensagem);
    }

    carrinho.forEach((item) => {
        // Para cada item do carrinho, cria um card com nome, quantidade e subtotal.
        const card = document.createElement("article");
        card.classList.add("item-carrinho");

        const titulo = document.createElement("h3");
        titulo.textContent = item.nome;

        const quantidade = document.createElement("p");
        quantidade.textContent = `Quantidade: ${item.quantidade}`;

        const subtotal = document.createElement("p");
        subtotal.classList.add("subtotal");
        // Subtotal = quantidade vezes preço unitário.
        subtotal.textContent = `Subtotal: ${formatarMoeda(item.quantidade * item.preco)}`;

        const botoes = document.createElement("div");
        botoes.classList.add("botoes-quantidade");

        const botaoMenos = document.createElement("button");
        botaoMenos.classList.add("botao-remover");
        botaoMenos.textContent = "-";
        // O botão - diminui a quantidade ou remove o produto.
        botaoMenos.addEventListener("click", () => removerDoCarrinho(item.id));

        const botaoMais = document.createElement("button");
        botaoMais.textContent = "+";
        // O botão + aumenta a quantidade.
        botaoMais.addEventListener("click", () => aumentarQuantidade(item.id));

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("botao-remover");
        botaoRemover.textContent = "Remover";
        // O botão remover usa a mesma regra do enunciado: diminuir ou remover.
        botaoRemover.addEventListener("click", () => removerDoCarrinho(item.id));

        botoes.appendChild(botaoMenos);
        botoes.appendChild(botaoMais);
        botoes.appendChild(botaoRemover);

        card.appendChild(titulo);
        card.appendChild(quantidade);
        card.appendChild(subtotal);
        card.appendChild(botoes);
        listaCarrinho.appendChild(card);
    });

    atualizarTotal();
    salvarCarrinho();
}

// Calcula o total da compra e aplica o desconto, se for válido.
function atualizarTotal() {
    let total = 0;

    // forEach percorre todos os itens do carrinho.
    carrinho.forEach((item) => {
        total += item.preco * item.quantidade;
    });

    const desconto = Number(descontoInput.value);
    const descontoValido = desconto >= 0 && desconto <= 100;

    if (descontoValido) {
        // Exemplo: desconto 10 significa retirar 10% do total.
        total -= total * (desconto / 100);
    }

    totalCompra.textContent = formatarMoeda(total);
}

// Eventos: cada ação do usuário chama uma função.
filtroProdutos.addEventListener("change", listarProdutos);
limparCarrinho.addEventListener("click", limparTodosItens);
descontoInput.addEventListener("input", () => {
    atualizarTotal();
    salvarCarrinho();
});

// DOMContentLoaded garante que o JavaScript rode depois que o HTML carregou.
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    listarProdutos();
    atualizarCarrinho();
});
