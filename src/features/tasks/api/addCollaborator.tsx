import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/shared/firebase/instance';

export const addCollaborator = async (listId: string, email: string, role: 'admin' | 'viewer') => {
  const uid = await getUidByEmail(email);
  if (!uid) throw new Error('User not found');

  const ref = doc(db, 'todoLists', listId);
  await updateDoc(ref, {
    [`collaborators.${uid}`]: role,
  });
};

export const getUidByEmail = async (email: string): Promise<string | null> => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];

  return doc ? doc.id : null;
};
