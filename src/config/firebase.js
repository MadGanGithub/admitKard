// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase, ref,get,child} from "firebase/database";
import {onAuthStateChanged,getAuth} from "firebase/auth";
import {useState,useEffect} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdwpbRYjqEcTq7Na08Ce6MTWQAhPErN8M",
  authDomain: "admitkard-8258f.firebaseapp.com",
  projectId: "admitkard-8258f",
  storageBucket: "admitkard-8258f.appspot.com",
  messagingSenderId: "998837920180",
  appId: "1:998837920180:web:c8141e5700f213dc8e52e1",
  measurementId: "G-7STT1G8KSX",
  databaseURL:"https://admitkard-8258f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database=getDatabase(app)



export const auth=getAuth(app)

export function useAuth() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
export function readData(){
  const dbref=ref(database)

  get(child(dbref,auth.currentUser.uid)).then((snapshot)=>{
    return snapshot
  })
}