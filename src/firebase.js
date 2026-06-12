// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHiTd20VWnO8mmNtbDtqgcgeIIp_6a44Q",
  authDomain: "ldjvv1.firebaseapp.com",
  databaseURL: "https://ldjvv1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ldjvv1",
  storageBucket: "ldjvv1.firebasestorage.app",
  messagingSenderId: "967893197895",
  appId: "1:967893197895:web:78dc69f676cd57166f7d62",
  measurementId: "G-1VKH0RK2BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
