import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBy7EWZlQBbQefFfODSLeuu3aWsBt9jas",
  authDomain: "portfolio-firebase-c0c12.firebaseapp.com",
  databaseURL: "https://portfolio-firebase-c0c12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-firebase-c0c12",
  storageBucket: "portfolio-firebase-c0c12.appspot.com",
  messagingSenderId: "949225306116",
  appId: "1:949225306116:web:1994759fc992060c855d51"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
