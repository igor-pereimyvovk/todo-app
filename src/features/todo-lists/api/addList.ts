import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/shared/firebase/instance';

export const addList = async (title: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('Not authenticated');

  await addDoc(collection(db, 'todoLists'), {
    title,
    uid: user.uid,
    createdAt: serverTimestamp(),
    collaborators: {
      [user.email]: 'admin',
    },
  });
};
