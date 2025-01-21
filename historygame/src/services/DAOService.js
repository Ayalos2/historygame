import { getDocs, collection, query,where, setDoc, getDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore';
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
    try { const gameDoc = await getDoc(doc(db, 'games2', id)); 
      if (gameDoc.exists()) { 
        return { id: gameDoc.id, ...gameDoc.data() };
       } else { 
        throw new Error('Game not found'); 
      } } catch (error) { 
        console.error('Error getting game:', error); 
        throw new Error('Error getting game'); 
      } 
    }
  async setFavoritos(user,game) {
    const userDocRef = doc(db, "userFavoritos", user);
    try {
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          gameIds: arrayUnion(game)
        });
        console.log("ID do jogo salvo com sucesso na lista!");
      } else {
        await setDoc(userDocRef, {
          gameIds: [game]
        });
        console.log("Documento criado e ID do jogo salvo com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar ID do jogo na lista: ", error);
    }
  }

}
export default DAOService;