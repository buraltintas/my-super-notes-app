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
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const appContext = React.createContext();

const db = getFirestore(app);

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    onSnapshot(collection(db, `${user.email}`), (snapshot) => {
      if (snapshot.docs.length > 0) {
        setNotes(snapshot.docs.map((doc) => doc.data()));
      } else if (user.email) {
        initialNewUser();
      }
    });
  }, [user]);

  const initialNewUser = async () => {
    const docRef = await addDoc(collection(db, `${user.email}`), {
      name: `${user.name}`,
      email: `${user.email}`,
      time: Math.floor(new Date().getTime() / 1000),
    });
  };

  const signInWithFirebase = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        handleLogin({
          name: result._tokenResponse.fullName,
          photo: result._tokenResponse.photoUrl,
          email: result._tokenResponse.email,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        alert('Something went wrong, please try again!', err);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
    setUser({});
  };

  const handleLogin = (user) => {
    if (user.name && user.photo) {
      setIsLoggedIn(true);
      setUser(user);
    }
  };

  console.log(notes);

  return (
    <appContext.Provider
      value={{
        user,
        signInWithFirebase,
        isLoggedIn,
        handleLogout,
        isLoading,
        setIsLoading,
        notes,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { appContext, AppProvider };
