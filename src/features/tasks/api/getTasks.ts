import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '@/shared/firebase/instance';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  listId: string;
}

export const getTasks = async (listId: string): Promise<Task[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const q = query(
    collection(db, 'tasks'),
    where('listId', '==', listId),
    orderBy('createdAt', 'desc'),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
};
