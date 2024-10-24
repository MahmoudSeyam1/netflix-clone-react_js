import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCrJwn1UOBqmP-4I6B-Bm48-9VdURm9XQc",
    authDomain: "netflix-clone-434e5.firebaseapp.com",
    projectId: "netflix-clone-434e5",
    storageBucket: "netflix-clone-434e5.appspot.com",
    messagingSenderId: "89423066145",
    appId: "1:89423066145:web:7dae0d21ceccf3a9d0df60",
    measurementId: "G-69YCXV7T5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    }catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const Logout = () => {
    signOut(auth);
}

export{ auth, db, login, signup, Logout};