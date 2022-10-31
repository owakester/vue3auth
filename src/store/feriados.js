
import { defineStore } from "pinia";
import {ref} from 'vue'
export const feriadosStore = defineStore("feriados", () => {

    const dateSelect = ref(null);
    const dias = new Date();
    const diasFeriados=ref(null)
try {
    fetch ("http://nolaborables.com.ar/api/v2/feriados/2022")
.then (response=>response.json())
.then (resp=>validateDate(resp))    
} catch (error) {
    console.log(error)
}



const validateDate=(feriado)=>{
diasFeriados.value=feriado.filter(dia=>dia.mes===dias.getMonth()+1)
console.log(diasFeriados.value)
return lockDate(feriado)

}

const lockDate=(feriado)=>{

    
/* if (feriado.dia.includes(databaseStore.dateSelect)) {
    console.log("No puede registrar dias feriados")
} */
}


return{
    validateDate,dias,diasFeriados,   dateSelect,
}



});
