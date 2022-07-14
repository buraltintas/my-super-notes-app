import React, { useEffect, useState } from 'react';
import { app } from '../firebase/index';
import {
  collection,
  getFirestore,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

const appContext = React.createContext();

const db = getFirestore(app);

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        handleLogin({
          name: user.displayName,
          email: user.email,
        });
        // ...
      } else {
        setLoggedIn(false);
        // User is signed out
        // ...
      }
    });
  }, [auth]);

  useEffect(() => {
    if (user.email) {
      onSnapshot(collection(db, `${user.email}`), (snapshot) => {
        if (snapshot.docs.length > 0) {
          setNotes(snapshot.docs.map((doc) => doc.data()));
        } else if (user.email) {
          initialNewUser();
        }
      });
    }
  }, [user.email]);

  const initialNewUser = async () => {
    const docRef = await addDoc(collection(db, `${user.email}`), {
      name: `${user.name}`,
      email: `${user.email}`,
      time: Math.floor(new Date().getTime() / 1000),
    });
  };

  const signInWithFirebase = () => {
    setIsLoading(true);
    signInWithRedirect(auth, provider)
      .then((result) => {
        handleLogin({
          name: result._tokenResponse.fullName,
          email: result._tokenResponse.email,
        });
        setLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        alert('Something went wrong, please try again!', err);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    signOut(auth);
    setUser({});
    setNotes([]);
    setLoggedIn(false);
  };

  const handleLogin = (user) => {
    if (user.email) {
      setUser(user);
      setLoggedIn(true);
    }
  };

  return (
    <appContext.Provider
      value={{
        user,
        signInWithFirebase,
        handleLogout,
        isLoading,
        setIsLoading,
        notes,
        db,
        loggedIn,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { appContext, AppProvider };
