import { async } from "@firebase/util";
import {
  collection,
  getDocs,
  getDoc,
  query,
  doc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { ref } from "vue";
import { nanoid } from "nanoid";



export const useDatabaseStore = defineStore("database", () => {
  const stateSpin = ref(false);
  let date = new Date();

  let document = ref([]);

  const getUrls = async () => {
    try {
      if (document.value.length !== 0) {
        return;
      }

      stateSpin.value = true;
      const q = query(
        collection(db, "urls"),
        where("user", "==", auth.currentUser.uid)
      );
      const querysnapshot = await getDocs(q);

      querysnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        document.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      stateSpin.value = false;
    }
  };

  const addUrls = async (name,horas,fecha) => {
    try {
      const objetoDoc = {
        date: fecha,
        name: name,
        short: nanoid(6),
        user: auth.currentUser.uid,
        hours:horas
        
      };

      const docRef = await addDoc(collection(db, "urls"), objetoDoc);

      document.value.push({
        ...objetoDoc,
        id: docRef.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const deleteUrl = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("no existe");
      }

      if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error("no le pertenece");
      }

      await deleteDoc(docRef);
      document.value = document.value.filter((item) => item.id !== id);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };










  

  return {
    getUrls,
    document,
    stateSpin,
    addUrls,
    deleteUrl,
 
  };
});
