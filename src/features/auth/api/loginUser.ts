import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/firebase/instance';

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
