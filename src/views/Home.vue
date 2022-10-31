<template>
<HomeC></HomeC>
</template>

<script setup>
import {useUserStore} from '../store/user.js'
import HomeC from '../components/HomeC.vue';
import {useDatabaseStore} from '../store/database.js'
const userStore= useUserStore()
const databaseStore = useDatabaseStore()
databaseStore.getUrls()

</script>


<style scoped>

</style>