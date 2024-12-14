async function gerarSugestoes(participantes,obs) {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const IA_TOKEN = process.env.IA_TOKEN;

    // Função auxiliar para chamar a API do ChatGPT e obter as sugestões
    async function obterSugestoes(gostos) {
        
        
        const prompt = `Desenvolvi um programa para auxiliar no evento de final de ano chamado "Amigo Secreto". 
        Você receberá os gostos e preferências de presentes de uma pessoa e deverá retornar uma lista de 5 sugestões de presentes. 
        A resposta deve conter exclusivamente os textos das sugestões, sem nenhum caractere adicional, como colchetes ([, ]), nem texto extra.
        
        O organizador do evento pode adicionar observações, como o local e o valor médio do presente, na variável "observacoes". 
        Verifique se foi informada uma faixa de preço; caso contrário, utilize o valor padrão de 100 reais para as sugestões.
        
        Dados da pessoa presenteada: 
        - Preferências: ${gostos} 
        - Observações: ${obs}
        
        Se não for possível sugerir presentes, retorne um array vazio []. Não force sugestões.
        `;
        
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${IA_TOKEN}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'Você é um assistente que sugere ideias de presentes.' },
                        { role: 'user', content: prompt },
                    ],
                    max_tokens: 100,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro na API OpenAI: ${response.statusText}`);
            }

            const data = await response.json();
            // Extrai a resposta do ChatGPT
            return data.choices[0].message.content.trim().split('\n').map((sugestao) => sugestao.replace(/^\d+\.\s*/, ''));
        } catch (erro) {
            console.error('Erro ao obter sugestões:', erro);
            return ['Erro ao gerar sugestões']; // Retorna uma mensagem genérica em caso de erro
        }
    }

    // Processa todos os participantes e adiciona as sugestões no campo `dicasDaIa`
    const resultados = await Promise.all(
        participantes.map(async (item) => {
            const sugestoes = await obterSugestoes(item.sorteadoData.gostos);
            return {
                ...item,
                sorteadoData: {
                    ...item.sorteadoData,
                    dicasDaIa: sugestoes
                },
            };
        })
    );

    return resultados;
}

module.exports = { gerarSugestoes }