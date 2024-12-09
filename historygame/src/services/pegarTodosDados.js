import fetch from 'node-fetch';

async function pegaTodosDados(url, headers, query, offset = 0, limit = 500) {
    let todosDados = [];
    let temMais = true;

    while (temMais && todosDados.length < 10) {
        const response = await fetch(url, {
            method: 'POST',
            headers, 
            body: `${query} ; limit ${limit}; offset ${offset};`
        });

        const dados = await response.json();
        todosDados = todosDados.concat(dados);



        if (dados.length < limit){
            temMais = false;
        }
        else{
            offset += limit;
        }
    }
    return todosDados;
}

export {pegaTodosDados} ;