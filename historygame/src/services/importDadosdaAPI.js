import { db } from './firebaseConfig.js';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { pegaTodosDados } from './pegarTodosDados.js';

async function importDadosdaAPI(tabela,query) {
  try {
    const url = `https://api.igdb.com/v4/${tabela}`;
    const headers= {
        'Accept': 'application/json',
        'Client-ID': '0ht4yl0a2h5tycn8ighuujkgdmqsyv',
        'Authorization': 'Bearer tsgpqb1bu4uxlfgfcj2iotj551my80'
      };
    const data = await pegaTodosDados(url, headers, query);
    return data;

  //   const batch = writeBatch(db);
  //   data.forEach((dado) => {
  //     const docRef = doc(collection(db, `${tabela}`));
  //     batch.set(docRef,dado);
  //   });

  //   await batch.commit();
  //   console.log(`Dados da tabela ${tabela} importados com sucesso!`);
   } catch (error) {
   console.error('Erro ao importar dados:', error);
  }
}

export { importDadosdaAPI };
