<template>
  <div>
    <div class="overflow-x-auto relative shadow-sm border sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">ID</th>
            <th scope="col" class="py-3 px-6">FECHA</th>
            <th scope="col" class="py-3 px-6">HORAS</th>
            <th scope="col" class="py-3 px-6">ACTIVIDADES</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in databaseStore.document"
            :key="item.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th>
            <td class="py-4 px-6">
              {{ item.date }}
            </td>
            <td class="py-4 px-6">
              {{ item.hours }}
            </td>
            <td class="py-4 px-6">
              {{ item.name }}
            </td>
            <td class="py-4 px-6">
              <a
                @click="databaseStore.deleteUrl(item.id)"
                href="#"
                class="font-medium text-teal-600 dark:text-teal-500 hover:underline"
                >Eliminar</a
              >
            </td>
          </tr>
        </tbody>
      </table>
 
    </div>
    <h2 class="py-4  font-medium text-gray-600 whitespace-nowrap dark:text-white"><strong class="text-teal-600 ">Total Completadas:</strong> {{TotalHours}} horas </h2>
<div class="container mx-auto">
<h2 class="text-teal-600 text-xl text-center">Feriados Nacionales</h2>
<p class=" text-orange-400 py-2 my-2">Por favor tener en cuenta los dias feriados</p>
    

<table class=" text-sm text-left text-gray-500 dark:text-gray-400">
  <thead class="text-xs  text-gray-700 uppercase bg-teal-600 dark:bg-gray-700 dark:text-gray-400">
    <tr class="  text-center text-gray-100">
      <th class=" border border-teal-600 ...">Motivo</th>
      <th class="border border-teal-600 ...">Tipo</th>
      <th class="border border-teal-600 ...">Fecha</th>
    </tr>
  </thead>
  <tbody>
    <tr class=" border border-teal-600 ..." v-for="feriado in feriados.diasFeriados " :key="feriado.id">
      <td class="border border-teal-600 ... py-3 px-6">{{feriado.motivo}}</td>
      <td class="border border-teal-600 ...  py-3 px-6">{{feriado.tipo}}</td>
      <td class="py-3 px-6">{{feriado.dia}}/{{feriado.mes}}</td>
    </tr>
    
  </tbody>
</table>

</div>


  </div>
</template>

<script setup>
import { useDatabaseStore } from "../store/database";
import { computed, onBeforeMount, ref } from "vue";
import { feriadosStore } from "../store/feriados";
const databaseStore = useDatabaseStore();
const feriados = feriadosStore()
const dias = new Date()
const diasMes = new Date(dias.getFullYear(), dias.getMonth()+1, 0).getDate();
const restantes = diasMes-dias.getDate();

const TotalHours = computed(() => {
  let total = 0;
  databaseStore.document.forEach((element) => {
    total = total + parseInt(element.hours);
  });
  return total;
});


  




</script>
