import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/shared/firebase/instance';

export const updateList = async (id: string, title: string) => {
  await updateDoc(doc(db, 'todoLists', id), {
    title,
  });
};
