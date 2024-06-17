const alvo = '574ef9d8d1721c9fddc448b3195f4b966fde4635cc7d49c8a58742f0f222116f';
const sal = 'um_sal';

document.getElementById('btn_login').onclick = () => {
    const entrada = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');
    const entradaHash = hex_sha256(entrada + sal);
    
    if (entradaHash === alvo){
        sessionStorage.setItem('logado', 'true');
        window.location.href = 'tela.html';
    } else {
        mensagem.innerHTML = "<h2>ERRO: A senha está incorreta.</h2>";
    }
}
