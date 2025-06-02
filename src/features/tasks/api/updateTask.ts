import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/shared/firebase/instance';

export const updateTask = async (
  id: string,
  data: Partial<{ title: string; description: string; completed: boolean }>,
) => {
  await updateDoc(doc(db, 'tasks', id), data);
};
