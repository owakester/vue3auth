<template>
  <div>
    <h1 class="">Home</h1>

    <div class="container mx-auto m-12 p-4">
      <h2>Bienvenido {{ userData.email }}</h2>

      <div class="grid grid-cols-12 gap-4 border-t-4 m-12">
        <button
          @click="showComponent(num)"
          v-for="num in 10"
          :key="num"
          class="px-3 text-center rounded-full relative bottom-3 bg-teal-500 mx-2 shadow-sm text-gray-100 hover:bg-teal-600"
        >
          {{ num }}
        </button>
      </div>

      <h2 class="text-center">Desafios numero :</h2>

      <desUno></desUno>
    </div>

    
    <button @click="changesize">sumar</button>
<!-- 
  <div class="bg-green-300" v-bind:style="{width:size +'px' }">ghjg</div> -->
<p>tamaño:{{size}}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user.js";
import desUno from "../components/desafios/desUno.vue";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();

const {userData}=userStore



const size = ref(0);
const showComponent = (num) => {
  console.log(num);
};

const changesize = () => {

setInterval(() => {
  
size.value = size.value + 10;
}, 1000);


  }
  changesize()
</script>

<style scoped></style>
