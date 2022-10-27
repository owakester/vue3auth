<template>
<HomeC></HomeC>
</template>

<script setup>
import {useUserStore} from '../store/user.js'
import HomeC from '../components/HomeC.vue';

const userStore= useUserStore()

</script>


<style scoped>

</style>