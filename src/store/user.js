import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { createPinia } from 'pinia'
import { getActivePinia } from "pinia"
import { useDatabaseStore } from "./database";
import storeReset from './plugins/storeReset'
export const useUserStore = defineStore("userStore", () => {
  const count = ref(0);
  let userData = ref(null);
  const email = ref("alejo15084@gmail.com");
  const password = ref("FINGER06");
  const loading = ref(false);
  const userActive = ref(null);
  const userExist = ref(null);
  const loadingSession = false;

  let registerUser = async (email, password) => {
    loading.value = true;
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userData.value = { email: user.email, uid: user.uid };
      userActive.value = user.email;
      router.push("/");
      console.log(user);
    } catch (error) {
      if (userExist.value === null) {
        userExist.value =
          "Este correo electrónico ya está en uso. Inicia sesión o restaura tu contraseña.";
      } else {
        console.log(error);
      }
    } finally {
      loading.value = false;
    }
  };

  const loginUser = async (email, password) => {
    
    const databaseStore = useDatabaseStore();
    try {

      databaseStore.$reset

      const { user } = await signInWithEmailAndPassword(auth, email, password);
     
      userData.value = { email: user.email, uid: user.uid };
      userActive.value = user.email;
      console.log(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    loading.value = true;
    const databaseStore = useDatabaseStore();
  
    try {
      signOut(auth);
      userData.value = null;
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
      userActive.value = null;
      databaseStore.$reset

    }
  };

  const currentUser = () => {
    return new Promise((resolve, reject) => {
      const unsuscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            userData.value = { email: user.email, uid: user.uid };
          } else {
            userData.value = null;

      
          }
          resolve(user);
        },
        (e) => reject(e)
      );
      unsuscribe();
    });
  };

  return {
    count,
    registerUser,
    userData,
    email,
    password,
    loginUser,
    logoutUser,
    loading,
    currentUser,
    userActive,
    userExist,
    loadingSession,
  };
});
