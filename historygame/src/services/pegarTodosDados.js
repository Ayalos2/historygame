import fetch from 'node-fetch';

function sleep(ms) { 
  return new Promise(resolve => setTimeout(resolve, ms)); 
}

async function pegaTodosDados(url, headers, query, offset = 0, limit = 100) {
  let todosDados = [];
  let temMais = true;
  const maxRetries = 3; // Definindo o número máximo de tentativas
  let retryCount = 0;
  let activeRequests = 0;

  while (temMais && todosDados.length < 1000) {
    try {
      if (activeRequests >= 6) {
        console.warn('Número máximo de requisições abertas atingido. Aguardando...');
        await sleep(500); // Espera se o número máximo de requisições abertas for atingido
        continue;
      }

      await sleep(500); // Espera de 250 milissegundos entre as requisições
      activeRequests++; // Incrementa o contador de requisições ativas

      const response = await fetch(url, {
        method: 'POST',
        headers, 
        body: `${query} ; limit ${limit}; offset ${offset};`
      });
      
      activeRequests--; // Decrementa o contador de requisições ativas após a resposta

      if (response.status === 429) { // Tratando erro de "too many requests"
        if (retryCount < maxRetries) {
          retryCount++;
          console.warn(`Muitas requisições. Tentativa ${retryCount}/${maxRetries}... Aguardando 1 segundo.`);
          await sleep(1000); // Espera de 1 segundo antes de tentar novamente
          continue;
        } else {
          throw new Error('Muitas requisições. Limite de tentativas atingido.');
        }
      }

      if (response.status === 401) { // Tratando erro de "unauthorized"
        throw new Error('Não autorizado. Verifique suas credenciais da API.');
      }

      if (!response.ok) { 
        throw new Error(`Erro ao importar dados: ${response.statusText}`); 
      }

      const dados = await response.json();
      todosDados = todosDados.concat(dados);

      if (dados.length < limit) {
        temMais = false;
      } else {
        offset += limit;
      }
    } catch (error) {
      activeRequests--; // Decrementa o contador de requisições ativas em caso de erro
      console.error(`Erro ao importar dados: ${error.message}`);
      return [];
    }
  }
  return todosDados;
}

export { pegaTodosDados };
