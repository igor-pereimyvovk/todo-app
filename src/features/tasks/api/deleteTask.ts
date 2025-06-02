import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/shared/firebase/instance';

export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, 'tasks', id));
};
