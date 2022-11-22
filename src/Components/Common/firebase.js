import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDScmPXViEcUbbHi14Zo_9oJa4AvAnYCxE",
    authDomain: "whatsapp-clone-43ab8.firebaseapp.com",
    projectId: "whatsapp-clone-43ab8",
    storageBucket: "whatsapp-clone-43ab8.appspot.com",
    messagingSenderId: "156650878943",
    appId: "1:156650878943:web:fdd9f940442812c0f7366a",
    measurementId: "G-MEL69QQLV0"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;

