let dados = [];
const masculinoURL = "https://botafogo-atletas.mange.li/2024-1/masculino";
const femininoURL = "https://botafogo-atletas.mange.li/2024-1/feminino";
const allURL = "https://botafogo-atletas.mange.li/2024-1/all";

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';
divPesquisa.style.padding = '2em';

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'search';
inputPesquisa.name = 'pesquisa';
inputPesquisa.placeholder = "BUSQUE PELO NOME";
inputPesquisa.style.textAlign = 'center';
inputPesquisa.style.lineHeight = '3em';
inputPesquisa.style.maxWidth = '80%';
inputPesquisa.style.width = '30em';

divPesquisa.appendChild(inputPesquisa);
document.body.appendChild(divPesquisa);

const conteudo = document.createElement('div');
conteudo.style.display = 'flex';
conteudo.style.flexWrap = 'wrap';
conteudo.style.justifyContent = 'center';
conteudo.style.alignItems = 'flex-start';
conteudo.style.gap = '10px';
conteudo.style.maxWidth = '1200px';
conteudo.style.margin = '0 auto';
conteudo.innerHTML = '';

conteudo.classList.add('conteudo-container');
document.body.appendChild(conteudo);

const handleClick = (evento) => {
    const card = evento.target.closest('article');
    for (const propriedade in card.dataset) {
        document.cookie = `${propriedade}=${card.dataset[propriedade]}`;
    }

    localStorage.setItem('atleta', JSON.stringify(card.dataset))
    window.location.href = `outra.html?id=${card.dataset.id}`;
}

const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.width = '220px';
    card.style.height = '400px';
    card.style.margin = '10px';
    card.style.textAlign = 'center';
    card.style.backgroundColor = 'white';
    card.style.padding = '0.5em';
    card.style.cursor = 'pointer';
    card.style.boxSizing = 'border-box';
    card.style.border ='solid 3px black';
    card.style.borderRadius='5px';

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
    imgContainer.style.width = '100%';
    imgContainer.style.flexGrow = '1';
    imgContainer.style.overflow = 'hidden';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.style.width = '220px';
    imagem.style.height = '300px';
    imagem.style.objectFit = 'none'; 
    imagem.style.objectPosition = '100% 10%';

    const saibaMais = document.createElement('h3');
    saibaMais.innerHTML = `Saiba Mais`;
    saibaMais.style.cssText = `
        background-color: black;
        color: white;
        padding: 0.5em 0;
        width: 100%;
        margin-top: 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    `;

    const nome = document.createElement('h3');
    nome.innerHTML = entrada.nome;
    nome.style.margin = '10px 0';
    nome.style.fontSize = '1.3em'; 
    nome.style.minHeight = '40px';
    nome.style.display = 'flex';
    nome.style.alignItems = 'center';
    nome.style.justifyContent = 'center';

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
    loadingDiv.style.textAlign = 'center';
    loadingDiv.style.fontSize = '1.8em';
    loadingDiv.style.padding = '1em';
    loadingDiv.style.width = '100%';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '0';
    loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loadingDiv.style.fontFamily = 'Neuton'
    loadingDiv.style.zIndex = '9999';

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

const btnSair = document.getElementById('btnSair');
btnSair.addEventListener('click', () => {
    window.location.href = 'index.html';
});

handleFiltragem([allURL]);
