import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyApdFxj--jqq4Tf7LmMC7pIC_xwuJAKaJQ",
  authDomain: "vue-3-2022-b5f67.firebaseapp.com",
  projectId: "vue-3-2022-b5f67",
  storageBucket: "vue-3-2022-b5f67.appspot.com",
  messagingSenderId: "694947053346",
  appId: "1:694947053346:web:dba2a3816434b10bbdef7b"
};

initializeApp(firebaseConfig);

const auth= getAuth()


export {auth}