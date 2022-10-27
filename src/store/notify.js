import { defineStore } from "pinia";
import { notify } from "@kyvg/vue3-notification";
export const notifyStore = defineStore("notificacion", () => {


    
    function logIn(){
    console.log("hola")
    }





return{
    logIn,
}

})