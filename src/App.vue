<template>
  <div>


    <nav>
      

  <NavbarC></NavbarC>
  

  <notifications />

    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import {useUserStore} from './store/user'

import {ref} from 'vue'
import LoadingSpin from './components/loadingSpin.vue';
import NavbarC from './components/NavbarC.vue';
const userStore =useUserStore()
const estado = ref(false)


const changeState=()=>{

  estado.value=true
}


</script>


<style scoped></style>
