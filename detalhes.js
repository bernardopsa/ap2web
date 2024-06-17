const verificarLogin = () => {
    const logado = sessionStorage.getItem('logado');
    if (!logado || logado !== 'true') {
        window.location.href = 'index.html';
    }
}

const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.classList.add('card');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;

    const nome = document.createElement('p');
    nome.innerHTML = `${entrada.nome}<br>${entrada.posicao}`;
    nome.classList.add('nome-atleta');

    const infoContainer = document.createElement('div');
    infoContainer.style.fontSize = '1.3em';

    const descricao = document.createElement('p');
    descricao.innerHTML = entrada.detalhes;
    descricao.style.fontFamily = 'Neuton';

    const detalhes = document.createElement('p');
    detalhes.innerHTML = `
        <strong style="font-size:1em">Jogos pelo Botafogo:</strong> ${entrada.n_jogos}<br>
        <strong>Nascimento:</strong> ${entrada.nascimento}<br>
        <strong>Altura:</strong> ${entrada.altura}<br>
        <strong>Naturalidade:</strong> ${entrada.naturalidade}
    `;

    imgContainer.appendChild(imagem);
    imgContainer.appendChild(nome);
    infoContainer.appendChild(descricao);
    infoContainer.appendChild(detalhes);
    card.appendChild(imgContainer);
    card.appendChild(infoContainer);

    return card;
}

const acha_cookie = (chave) => {
    const array_cookies = document.cookie.split("; ");
    const procurado = array_cookies.find(
        (e) => e.startsWith(`${chave}=`))
    return procurado?.split('=')[1];
}

const parametros = new URLSearchParams(window.location.search);
const atletaId = parametros.get('id');

const voltar = document.createElement('a');
voltar.href = 'tela.html';
voltar.innerHTML = 'Voltar';
voltar.classList.add('voltar');

document.body.appendChild(voltar);

const carregarDetalhesAtleta = async (id) => {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        
        const atleta = await response.json();
        document.body.appendChild(montaCard(atleta));
        document.body.appendChild(voltar);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar dados do atleta.');
    }
}

carregarDetalhesAtleta(atletaId);

const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMediaQuery(mediaQuery) {
    if (mediaQuery.matches) {
        document.body.style.flexDirection = 'column';
        const card = document.querySelector('article');
        card.style.flexDirection = 'column';
        card.style.textAlign = 'center';
    } else {
        document.body.style.flexDirection = 'column';
        const card = document.querySelector('article');
        card.style.flexDirection = 'row';
        card.style.textAlign = 'left';
    }
}

handleMediaQuery(mediaQuery);
mediaQuery.addListener(handleMediaQuery);
