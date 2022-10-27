<template>
  <div class="container mt-8 px-12">
   <loadingSpin/>
    <div class="grid grid-cols-3 gap-4">
    
      <!--   <loadindSpin v-if="estado" class="top-5 right-1/2 absolute ..."></loadindSpin>
 -->
      <div v-for="dato in myGalery" :key="dato.id" :class=propiedades>
      <img class="w-full rounded-2xl" :src="dato.url" alt="Mountain">
      <div  class=" py-4">
        <div class="font-bold text-xl mb-2">{{dato.categoria}}</div>
        <p class="text-teal-700 py-2 text-base">
            {{dato.pregunta}}
        </p>
        <button @click="showDetail(dato)" class="bg-teal-600 rounded text-gray-100 p-1 m-1">Detalle</button>
        <p v-if="estado==dato.id" class="text-gray-700 text-base">
            {{dato.respuesta}}
        </p>
      </div>
      <div class=" pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>









    </div>
    <!-- 

    Hola para todos/as!! Les comparto una serie de compilaciones interesantes para sus desarrollos o si apenas estas iniciando, seguramente te sirva.
Publica gratis tus páginas:
http://netlify.com
http://firebase.google.com
http://aws.amazon.com
http://heroku.com
http://pages.github.com
http://vercel.com
http://surge.sh
http://render.com
Páginas para practicar código en todos los lenguajes:
codewars.com
http://topcoder.com
http://codingame.com
http://hackerrank.com
http://projecteuler.net
http://coderbyte.com
http://codechef.com
http://exercism.io http://leetcode.com
http://spoj.com
Páginas para aprender a programar:
http://freecodecamp.org
http://codecademy.com
http://javascript30.com
http://frontendmentor.io
http://testautomationu.applitools.com
http://coursera.org
http://khanacademy.org
http://sololearn.com

 -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import loadindSpin from './loadingSpin.vue'
import { async } from "@firebase/util";
import { apiStore } from "../store/api";

const myApiStore = apiStore();
const estado = ref(false);
const propiedades = ref('max-w-sm rounded overflow-hidden shadow-md p-1')

const myGalery=ref([])


onMounted(() => {


    getData()

})
estado.value=true

const getData = () => {
  
    const url =
      "https://script.googleusercontent.com/macros/echo?user_content_key=vnHuywflHe_zQofXqN3BUPCJnsdJP3B23mpAdv_0tjJDcKK3KiW2DmPbhppgRug3RtD2yK0QR5HFmYw3ZMXsT16Hut-jaHC9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNp7Wvz1S9DlOpYU-m7C4Af5uiiWsECooCstuXwhaamhlA1k8_lGmEnjiOFDwZjmmibMYSZXCy_C6ooBgau1i-yuB1F9lqGT7dz9Jw9Md8uu&lib=MFK4xC7y3sT0GDrArtd8YFwhvTfcvbrpA";

    fetch(url)
    .then( (respuesta) => respuesta.json()) //Si encuentra la URl
    
      .then((datos) =>myGalery.value=datos.data);
        estado.value=false
  };

  const showDetail=(opcion)=>{
  
    estado.value = opcion.id==estado.value?null:opcion.id

  }



</script>
