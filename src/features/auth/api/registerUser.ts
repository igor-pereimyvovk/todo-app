import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/firebase/instance';

export const registerUser = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName,
    createdAt: serverTimestamp(),
  });

  return user;
};
