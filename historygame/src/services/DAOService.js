import { getDocs, collection, query, where, setDoc, getDoc, doc, arrayUnion, updateDoc, arrayRemove, increment } from 'firebase/firestore';
import { db } from './firebaseConfig';

class DAOService {
  async getAll() {
    try {
      const gamesSnapshot = await getDocs(collection(db, 'games2'));

      const documents = gamesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          summary: data.summary,
          coverUrl: data.cover,
          slug: data.slug
        };
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw new Error('Error getting documents');
    }
  }

  async getByName(name) {
    try {
      const gamesRef = collection(db, 'games2');
      const q = query(gamesRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
      const gamesSnapshot = await getDocs(q);

      const documents = gamesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          summary: data.summary,
          coverUrl: data.cover,
          slug: data.slug
        };
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw new Error('Error getting documents');
    }
  }

  async getById(id) {
    try {
      const gameDoc = await getDoc(doc(db, 'games2', id));
      if (gameDoc.exists()) {
        return { id: gameDoc.id, ...gameDoc.data() };
      } else {
        throw new Error('Game not found');
      }
    } catch (error) {
      console.error('Error getting game:', error);
      throw new Error('Error getting game');
    }
  }

  async setFavoritos(user, game, field) {
    const userDocRef = doc(db, "userGames", user);

    try {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentList = userDoc.data()[field] || [];
        const isGameInList = currentList.includes(game);

        if (isGameInList) {
          await updateDoc(userDocRef, {
            [field]: arrayRemove(game)
          });
          await this.atualizarFavoritos(game,field,-1);
          console.log("Removido com sucesso");
        } else {
          await updateDoc(userDocRef, {
            [field]: arrayUnion(game)
          });
          await this.atualizarFavoritos(game,field,1);
          console.log("ID do jogo salvo com sucesso na lista!");
        }
      } else {
        await setDoc(userDocRef, {
          [field]: [game]
        });
        await this.atualizarFavoritos(game,field,1);
        console.log("Documento criado e ID do jogo salvo com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar ID do jogo na lista: ", error);
    }
  }

  atualizarFavoritos = async (gameId, field, increDecre) => {
    const gameRef = doc(db, 'games2', gameId);

    try {
      // Verifica se o documento existe
      const gameDoc = await getDoc(gameRef);

      if (gameDoc.exists()) {
        // Se o campo não existir, inicializa com 0 antes de incrementar/decrementar
        if (!(field in gameDoc.data())) {
          await updateDoc(gameRef, { [field]: 0 });
        }

        // Incrementa ou decrementa o campo
        await updateDoc(gameRef, {
          [field]: increment(increDecre)
        });
        console.log(`Favoritos atualizados com sucesso! Valor alterado em ${increDecre}.`);
      } else {
        // Cria o documento caso não exista
        await setDoc(gameRef, { [field]: increDecre });
        console.log(`Documento criado e favoritos inicializados com sucesso! Valor definido como ${increDecre}.`);
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos: ", error);
    }
  };
}

export default DAOService;
