import { defineStore } from "pinia";
import { notify } from "@kyvg/vue3-notification"; 
import {ref} from 'vue'
export const apiStore = defineStore("myApiStore", () => {

 
 const info=ref([])
const msn="hola"
 const getInfo = () => {
  
  const url =
    "https://script.googleusercontent.com/macros/echo?user_content_key=vnHuywflHe_zQofXqN3BUPCJnsdJP3B23mpAdv_0tjJDcKK3KiW2DmPbhppgRug3RtD2yK0QR5HFmYw3ZMXsT16Hut-jaHC9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNp7Wvz1S9DlOpYU-m7C4Af5uiiWsECooCstuXwhaamhlA1k8_lGmEnjiOFDwZjmmibMYSZXCy_C6ooBgau1i-yuB1F9lqGT7dz9Jw9Md8uu&lib=MFK4xC7y3sT0GDrArtd8YFwhvTfcvbrpA";

  fetch(url)
  .then( (respuesta) => respuesta.json()) //Si encuentra la URl
  
    .then((datos) =>console.log(info.value.push(datos.data)));
 
};

getInfo()

  
  return {
    info,getInfo,msn
  };
});
