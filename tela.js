const verificarLogin = () => {
    const logado = sessionStorage.getItem('logado');
    if (!logado || logado !== 'true') {
        window.location.href = 'index.html';
    }
    
}

verificarLogin();

let dados = [];
const masculinoURL = "https://botafogo-atletas.mange.li/2024-1/masculino";
const femininoURL = "https://botafogo-atletas.mange.li/2024-1/feminino";
const allURL = "https://botafogo-atletas.mange.li/2024-1/all";

const divPesquisa = document.createElement('div');
divPesquisa.classList.add('div-pesquisa');

const inputPesquisa = document.createElement('input');
inputPesquisa.classList.add('input-pesquisa');
inputPesquisa.type = 'search';
inputPesquisa.name = 'pesquisa';
inputPesquisa.placeholder = "BUSQUE PELO NOME";

inputPesquisa.classList.add('input-pesquisa');
divPesquisa.appendChild(inputPesquisa);
document.body.appendChild(divPesquisa);

const conteudo = document.createElement('div');
conteudo.innerHTML = '';
conteudo.classList.add('conteudo-container');
document.body.appendChild(conteudo);

const handleClick = (evento) => {
    const card = evento.target.closest('article');
    for (const propriedade in card.dataset) {
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;
    }

    localStorage.setItem('atleta', JSON.stringify(card.dataset))
    window.location.href = `detalhes.html?id=${card.dataset.id}`;
}

const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.classList.add('card')

    card.dataset.id = entrada.id;
    card.dataset.elenco = entrada.elenco;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.imagem = entrada.imagem;
    card.dataset.descricao = entrada.detalhes;
    card.dataset.n_jogos = entrada.n_jogos;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.altura = entrada.altura;

    card.onclick = handleClick;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('imagem-container');

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.classList.add('imagem-atleta');

    const saibaMais = document.createElement('h3');
    saibaMais.innerHTML = `Saiba Mais`;
    saibaMais.classList.add('saiba-mais')

    const nome = document.createElement('h3');
    nome.innerHTML = entrada.nome;
    nome.classList.add('nome-atleta');

    imgContainer.appendChild(imagem);
    card.appendChild(imgContainer);
    card.appendChild(saibaMais);
    card.appendChild(nome);

    return card;
}

inputPesquisa.onkeyup = (ev) => {
    const searchValue = ev.target.value.toLowerCase();
    const filteredData = dados.filter(elemento => {
        return elemento.nome.toLowerCase().includes(searchValue) || elemento.posicao.toLowerCase().includes(searchValue);
    });

    renderData(filteredData);
}

const showLoading = async () => {
    conteudo.classList.add('hide-content');

    const loadingDiv = document.createElement('div');
    loadingDiv.textContent = 'Carregando...';
    loadingDiv.classList.add('carregamento')

    document.body.appendChild(loadingDiv);

    await new Promise(resolve => setTimeout(resolve, 1000)); 
    conteudo.classList.remove('hide-content');
    document.body.removeChild(loadingDiv);
}

const pegaDados = async (url) => {
    const resposta = await fetch(url);
    const data = await resposta.json();
    return data;
}

const renderData = (data) => {
    conteudo.innerHTML = '';
    data.forEach(atleta => {
        conteudo.appendChild(montaCard(atleta));
    });
}

const handleFiltragem = async (urlArray) => {
    await showLoading();

    dados = [];
    for (const url of urlArray) {
        const fetchedData = await pegaDados(url);
        dados = dados.concat(fetchedData);
    }
    renderData(dados);
}

document.querySelectorAll('.btnFiltragem').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            handleFiltragem([masculinoURL]);
        } else if (index === 1) {
            handleFiltragem([femininoURL]);
        } else if (index === 2) {
            handleFiltragem([allURL]);
        }
    });
});

const filtroSelect = document.getElementById('filtroSelect');

filtroSelect.addEventListener('change', () => {
    const selectedIndex = filtroSelect.selectedIndex;
    if (selectedIndex === 0) {
        handleFiltragem([masculinoURL]);
    } else if (selectedIndex === 1) {
        handleFiltragem([femininoURL]);
    } else if (selectedIndex === 2) {
        handleFiltragem([allURL]);
    }
});

document.querySelectorAll('.btnFiltragem').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        filtroSelect.selectedIndex = index;
        filtroSelect.dispatchEvent(new Event('change'));
    });
});

const btnSair = document.getElementById('btnSair');
btnSair.addEventListener('click', () => {
    window.location.href = 'index.html';
});

handleFiltragem([allURL]);
