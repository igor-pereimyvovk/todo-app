import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/shared/firebase/instance';

export interface TodoList {
  id: string;
  title: string;
  role: 'admin' | 'viewer';
}

export const getLists = async (): Promise<TodoList[]> => {
  const user = auth.currentUser;
  if (!user || !user.uid) throw new Error('Not authenticated');

  const q = query(collection(db, 'todoLists'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .filter((doc) => {
      const data = doc.data();
      const collaborators = data.collaborators || {};
      return data.uid === user.uid || collaborators[user.uid] !== undefined;
    })
    .map((doc) => {
      const data = doc.data();
      const collaborators = data.collaborators || {};
      const role: 'admin' | 'viewer' =
        data.uid === user.uid ? 'admin' : (collaborators[user.uid] ?? 'viewer');

      return {
        id: doc.id,
        title: data.title,
        role,
      };
    });
};
