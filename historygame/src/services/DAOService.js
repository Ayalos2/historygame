import { startAfter,limit,addDoc, orderBy,serverTimestamp,getDocs, collection, query, where, setDoc, getDoc, doc, arrayUnion, updateDoc, arrayRemove, increment } from 'firebase/firestore';
import { db } from './firebaseConfig';

let lastVisible = null;
let PAGE_SIZE_REVIEW = 3;

class DAOService {

  async getAll(ordenacao) {
    try {
      const gamesCollectionRef = collection(db, 'games2');
      const q = query(gamesCollectionRef, orderBy(ordenacao,'desc'));
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

  async getuserGames(field, user, name = '') {
    try {
        console.log(`Buscando jogos do usuário: ${user}, campo: ${field}, nome: ${name}`);

        const userGamesRef = collection(db, 'userGames');
        const docRef = doc(userGamesRef, user); 
        const userGamesSnapshot = await getDoc(docRef); 

        if (!userGamesSnapshot.exists()) {
            console.log("Nenhum jogo encontrado para o usuário especificado.");
            return [];
        }

        const data = userGamesSnapshot.data(); 

        const gameIds = data[field] || []; 

        if (gameIds.length === 0) {
            console.log("Nenhum ID de jogo encontrado no campo especificado.");
            return [];
        }

        const games2Ref = collection(db, 'games2');
        const gamesPromises = gameIds.map(id => getDoc(doc(games2Ref, id))); 
        const gamesSnapshots = await Promise.all(gamesPromises); 

        const documents = gamesSnapshots
            .filter(snapshot => snapshot.exists()) 
            .map(snapshot => {
                const data = snapshot.data();
                console.log("Dados do documento games2:", data); 
                return {
                    id: snapshot.id, 
                    name: data.name, 
                    summary: data.summary, 
                    coverUrl: data.cover, 
                    slug: data.slug 
                };
            })
            .filter(game => {
                // Filtra os jogos pelo nome, se um nome foi fornecido
                if (name) {
                    return game.name.toLowerCase().includes(name.toLowerCase());
                }
                return true; // Retorna todos os jogos se nenhum nome for fornecido
            });

        return documents; 

    } catch (error) {
        console.error("Erro ao buscar os jogos do usuário:", error);
        throw error; 
    }
}

  async isPlayDesFav(user, game,field){
    const userDocRef = doc(db, "userGames", user);
    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()){
        const userData = userDoc.data()[field] || [];
        if ( userData.includes(game)){
          console.log("Está em favorito");
          return true;
        }
        else{
          console.log(`Não está em ${field}`);
          return false;
        }
      }else{
        console.log("Documento não encontrado");
        return false;
      }
    }catch (error){
      console.error("Erro ao verificar GameId em banco", error);
      return false;
    }
  }
  async saveReview(review) {
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        userID: review.userID,
        userName: review.userName,
        userPhotoURL: review.userPhotoUrl,
        gameID: review.gameID,
        stars: review.stars,
        title: review.title,
        comment: review.comment,
        slug: review.slug,
        timestamp: serverTimestamp()
      });
      console.log("Avaliação enviada com ID: ", docRef.id);
    }catch (error){
      console.error("Erro ao enviar review", error);
    }
  }

  async getStars(gameId){
    try{ 
      const reviewRef = collection(db,'reviews');
      const q = query(reviewRef, where('gameID', '==', gameId));
      const querySnapshot = await getDocs(q);

      let totalRating = 0;
      let reviewCount = 0;

      querySnapshot.forEach((doc) => {
        totalRating += doc.data().stars;
        reviewCount++;
      });

      const averageRating = reviewCount > 0 ? totalRating / reviewCount :0;
      return averageRating;


    } catch (error) {
      console.error('Erro ao calcular a médias das avaliações', error);
      return 0;
    }

  }

  async loadFirstPageReviews(gameId) {
    try {
      const commentsCollectionRef = collection(db, "reviews");
      const q = query(
        commentsCollectionRef,
        where("gameID", "==", gameId),
        orderBy("timestamp",'desc'),
        limit(PAGE_SIZE_REVIEW)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Define o último item
      }

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
      throw new Error("Erro ao carregar reviews");
    }
  }

  async loadNextPageReviews(gameId) {
    if (!lastVisible) {
      console.warn("Nenhum comentário restante para carregar.");
      return [];
    }

    try {
      const commentsCollectionRef = collection(db, "reviews");
      const q = query(
        commentsCollectionRef,
        where("gameID", "==", gameId),
        orderBy("timestamp",'desc'),
        startAfter(lastVisible), // Pega a partir do último carregado
        limit(PAGE_SIZE_REVIEW)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Atualiza o último item visível
      } else {
        lastVisible = null; // Se não há mais resultados, impede novas buscas
      }

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Erro ao carregar mais reviews:", error);
      return [];
    }
  }

  async loadLastestReviews() {
    try {
      const commentsCollectionRef = collection(db, "reviews");
      const q = query(
        commentsCollectionRef,
        orderBy("timestamp",'desc'),
        limit(4)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]; // Define o último item
      }

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
      throw new Error("Erro ao carregar reviews");
    }
  }
  


}

export default DAOService;
