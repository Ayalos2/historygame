import { getDocs, collection, query,where, getDoc, doc } from 'firebase/firestore';
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


}
export default DAOService;