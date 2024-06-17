const verificarLogin = () => {
    const logado = sessionStorage.getItem('logado');
    if (!logado || logado !== 'true') {
        window.location.href = 'index.html';
    }
    
}

const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.classList.add('card');

    card.dataset.id = entrada.id;
    card.dataset.elenco = entrada.elenco;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.imagem = entrada.imagem;
    card.dataset.descricao = entrada.descricao;
    card.dataset.n_jogos = entrada.n_jogos;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.altura = entrada.altura;

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
    descricao.innerHTML = entrada.descricao;
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

let obj = {}

obj = JSON.parse(localStorage.getItem('atleta'));

const parametros = new URLSearchParams(window.location.search);
obj.id = parametros.get('id');

document.body.appendChild(montaCard(obj));

const voltar = document.createElement('a');
voltar.href = 'tela.html';
voltar.innerHTML = 'Voltar';
voltar.style.textDecoration = 'none';
voltar.style.color = 'white';
voltar.style.fontWeight = '600';
voltar.style.fontSize = '2em';
voltar.style.display = 'block';
voltar.style.textAlign = 'center';
voltar.style.marginTop = '2em';
voltar.style.fontFamily ='Neuton';

document.body.appendChild(voltar);

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
