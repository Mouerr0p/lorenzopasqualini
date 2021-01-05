import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCmogRCl6Q3-xKuyklCg_HrUnUWApqFe7o",
    authDomain: "programacion-iii-161b6.firebaseapp.com",
    projectId: "programacion-iii-161b6",
    storageBucket: "programacion-iii-161b6.appspot.com",
    messagingSenderId: "96857635751",
    appId: "1:96857635751:web:5f1f8ea1f2c03988059482"
};
app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();