import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/shared/firebase/instance';

export const addTask = async (listId: string, title: string, description: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  await addDoc(collection(db, 'tasks'), {
    uid: user.uid,
    listId,
    title,
    description,
    completed: false,
    createdAt: serverTimestamp(),
  });
};
