const { gerarSugestoes } = require("./iaTips")
const fetch = require('node-fetch');

async function sortearAmigoOculto(participantes,obs) {
    // Função para embaralhar o array de forma aleatória
    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let sorteioValido = false;
    let sorteados = [];

    // Continua embaralhando até que ninguém sorteie a si mesmo
    while (!sorteioValido) {
        sorteados = [...participantes]; // Cria uma cópia do array original
        embaralharArray(sorteados);

        // Verifica se o sorteio é válido (ninguém pode tirar a si mesmo)
        sorteioValido = participantes.every((participante, index) => participante.email !== sorteados[index].email);
    }

    // Monta o resultado no formato desejado
    const resultado = participantes.map((participante, index) => ({
        presentedorData: {
            email: participante.email,
            nome: participante.nome,
        },
        sorteadoData: {
            email: sorteados[index].email,
            nome: sorteados[index].nome,
            gostos: sorteados[index].gostos,
        },
    }));
    async function sendToGpt() {
        try{
            const resultadoPlusGpt = await gerarSugestoes(resultado,obs)
            return resultadoPlusGpt;
        }catch(error){
            console.log(`Ocorreu um erro: ${error}`)
        }
    }
    return await sendToGpt()
}


module.exports = { sortearAmigoOculto }
