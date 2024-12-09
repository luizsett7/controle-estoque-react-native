import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBLMpKJPYbnSG4dT4Oo5Pjcao5ewRiek-k",
    authDomain: "controle-estoque-5b990.firebaseapp.com", 
    projectId: "controle-estoque-5b990",
    storageBucket: "controle-estoque-5b990.firebasestorage.app",
    messagingSenderId: "673138005554", 
    appId: "1:673138005554:android:c767e040640cccbe6e8e2b",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};