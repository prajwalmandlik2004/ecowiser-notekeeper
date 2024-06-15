import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFew96DcPybB6zwq16f8oSiu4XHTPSu_c",
    authDomain: "notekeeper-1b7cd.firebaseapp.com",
    projectId: "notekeeper-1b7cd",
    storageBucket: "notekeeper-1b7cd.appspot.com",
    messagingSenderId: "179546600533",
    appId: "1:179546600533:web:672ddee5f89c3d393ad0dc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
