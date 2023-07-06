// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDEOl3NnApiIjYz15ZwkJvQYGcIClMbfeM",
    authDomain: "fir-crud-9dba2.firebaseapp.com",
    projectId: "fir-crud-9dba2",
    storageBucket: "fir-crud-9dba2.appspot.com",
    messagingSenderId: "979514948146",
    appId: "1:979514948146:web:c9f62af32e0733259d5a2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export  const db =getFirestore(app);
const product = collection(db , 'products')
export default product