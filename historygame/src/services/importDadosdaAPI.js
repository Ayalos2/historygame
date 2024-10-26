import { db } from './firebaseConfig.js';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { pegaTodosDados } from './pegarTodosDados.js';

async function importDadosdaAPI(tabela,query) {
  try {
    const url = `https://api.igdb.com/v4/${tabela}`;
    const headers= {
        'Accept': 'application/json',
        'Client-ID': '0ht4yl0a2h5tycn8ighuujkgdmqsyv',
        'Authorization': 'Bearer sr1ekvm5ehqhg10ah04yzxlfu7yo4n'
      };
    const data = await pegaTodosDados(url, headers, query);

    const batch = writeBatch(db);
    data.forEach((dado) => {
      const docRef = doc(collection(db, `${tabela}`));
      batch.set(docRef,dado);
    });

    await batch.commit();
    console.log(`Dados da tabela ${tabela} importados com sucesso!`);
  } catch (error) {
    console.error('Erro ao importar dados:', error);
  }
}

export { importDadosdaAPI };
