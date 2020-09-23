import { User } from 'firebase';
import { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import 'firebase/auth';

const initUserState = { user: null };
export const useAuth = () => {
  const fb = useContext(FirebaseContext);
  const auth = fb?.auth();
  const [userState, setUserState] = useState<{ user: User | null }>(
    initUserState,
  );
  const login = (email: string, password: string) =>
    auth?.signInWithEmailAndPassword(email, password).then((res) => {
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
