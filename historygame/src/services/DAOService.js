import { getDocs, collection, query,where } from 'firebase/firestore';
import { db } from './firebaseConfig';

class DAOService {
  async getAll() {
    try {
      const gamesSnapshot = await getDocs(collection(db, 'games'));
      const coversSnapshot = await getDocs(collection(db, 'covers'));

      const coversMap = new Map(); 
      coversSnapshot.forEach(doc => {
         coversMap.set(doc.id, doc.data().url); 
      });

      const documents = gamesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          summary: data.summary,
          coverUrl: coversMap.get(data.cover)
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
      const gamesRef = collection(db, 'games');
      const coversRef = collection(db, 'covers');
  
      const q = query(gamesRef, where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
  
      const gamesSnapshot = await getDocs(q);
      const coversSnapshot = await getDocs(coversRef);
  
      const coversMap = new Map();
      coversSnapshot.forEach(doc => {
        coversMap.set(doc.id, doc.data().url);
      });
  
      const documents = gamesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          summary: data.summary,
          coverUrl: coversMap.get(data.cover)
        };
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw new Error('Error getting documents');
    }
  }  
}
export default DAOService;