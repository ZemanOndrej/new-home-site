import { User } from 'firebase/auth';
import { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const initUserState = { user: null };
export const useAuth = () => {
  const fb = useContext(FirebaseContext);
  const auth = getAuth(fb);
  type UserState = {
    user: User | null;
  };

  const [userState, setUserState] = useState<UserState>(initUserState);
  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      setUserState({ user: res.user });
      return res.user;
    });
  const logout = () => auth?.signOut();
  useEffect(() => {
    auth?.onAuthStateChanged((res) => {
      if (res) {
        setUserState({ user: res });
      } else {
        setUserState(initUserState);
      }
    });
  }, []);

  return { logout, login, user: userState.user, isLoggedIn: !!userState.user };
};
