<template>
    <div>
        <section class="h-screen">
  <div class="px-6 h-full text-gray-800">
    <div
      class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image"
        />
      </div>
      <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form  @submit.prevent="handleSubmit">
          <div class="flex flex-row items-center justify-center lg:justify-start">
            <p class="text-lg mb-0 mr-4">Sign in with</p>
            
          </div>

          <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0">Or</p>
          </div>

          <!-- Email input -->
          <div class="mb-6">
            <input
              type="email"  v-model.trim="userStore.email" 
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Email address"
            />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
            v-model.trim="userStore.password"
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput3"
              placeholder="Password"
            />
          </div>

          <div class="flex justify-between items-center mb-6">
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck4"
              />
              <label class="form-check-label inline-block text-gray-800" for="exampleCheck4"
                >Remember me</label
              >
            </div>
            <a href="#!" class="text-gray-800">Forgot password?</a>
          </div>

          <div class="text-center lg:text-left">
            <button
              type="submit"
              class="btnfirst"
            >
              Login
            </button>

            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <router-link to="/register"
                href="#!"
                class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</router-link
              >
            </p>

          </div>
        </form>
        
      </div>
    </div>
  </div>
</section>

      
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from "../store/user.js"
  import { notifyStore} from "../store/notify.js"
  import {ref} from 'vue'
  import {useDatabaseStore} from "../store/database.js"
/*   import { useRouter } from "vue-router"
 */  import { async } from "@firebase/util";
  
  /* const email=ref('')
  const password=ref('') */
/*   const router =useRouter ()
 */  
const wrongPassword=ref(false) 
  const userStore = useUserStore();
  const notificacion = notifyStore();


  
  const handleSubmit=async()=>{

    const databaseStore=useDatabaseStore()
     
      if (userStore.email==='' || userStore.password==='') {
      return alert('Ingrese email y contraseña')
      }
  
      await userStore.loginUser(userStore.email,userStore.password)
      
/*   router.push('/')
 */      console.log("procesando formulario")
  }
  </script>
  
  <style lang="scss" scoped></style>
  