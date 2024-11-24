import { getDocs, collection } from 'firebase/firestore';
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
}

export default DAOService;