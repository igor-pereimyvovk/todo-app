import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/shared/firebase/instance';

export const deleteList = async (id: string) => {
  await deleteDoc(doc(db, 'todoLists', id));
};
