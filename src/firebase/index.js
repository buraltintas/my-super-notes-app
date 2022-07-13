import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB9gsW3iYrKm9MeRzbcNHlwcfXoMY-37A8',
  authDomain: 'my-super-notes-b4a8f.firebaseapp.com',
  databaseURL: 'https://my-super-notes-b4a8f-default-rtdb.firebaseio.com',
  projectId: 'my-super-notes-b4a8f',
  storageBucket: 'my-super-notes-b4a8f.appspot.com',
  messagingSenderId: '258089254802',
  appId: '1:258089254802:web:881040dff38d8ed3ec0b4b',
};

const app = initializeApp(firebaseConfig);

export { app };
