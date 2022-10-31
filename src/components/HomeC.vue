<template>
  <div>
    <h1 class="m-4">Home</h1>

    <div class="container mx-auto m-12 p-4">
      <h2>
        Bienvenido <strong class="text-teal-600">{{ userData.email }}</strong>
      </h2>
      <br />
      <hr />
      <br />

      <div v-if="statehours">
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          -->
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              -->
              <div
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <br />
                  <br />
                  <div class="sm:flex sm:items-start">
                    <form @submit.prevent="handleSubmit">
                      <div class="grid grid-cols-1">
                        <div>
                          <label
                            for="first_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Fecha</label
                          >
                          <input
                            class="border bg-gray-100 p-2 rounded"
                            v-model="feriados.dateSelect"
                            type="date"
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="first_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Numero de Horas</label
                          >
                          <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Ingrese Numero de horas"
                            v-model="horas"
                            required
                          />
                        </div>

                        <div>
                          <label
                            for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                            >Your message</label
                          >
                          <textarea
                            id="message"
                            rows="2"
                            v-model="url"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Actividades..."
                            required
                          ></textarea>
                        </div>

                        <div>
                          <button
                            class="rounded , bg-teal-600 p-1 m-1 text-gray-100"
                            type="submit"
                          >
                            Agregar
                          </button>
                          <p class="text-orange-400">{{msnFeriado}}</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    @click="statehours = false"
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="registerHours" class="btnfirst">Registrar horas</button>

      <AddActivity v-if="statehours"></AddActivity>

      <loadingSpin v-if="databaseStore.stateSpin"></loadingSpin>

      <h2 :class="`my-2 text-${warning}-400`">
        Estamos en el dia {{ feriados.dias.getDate() }} te queda {{ restantes }} dia para
        registrar tus horas de trabajo.
      </h2>

      <PlanillaEmpleados />

      <!--  <div class="grid grid-cols-12 gap-4 border-t-4 m-12">
        <button
          @click="showComponent(num)"
          v-for="num in 10"
          :key="num"
          class="px-3 text-center rounded-full relative bottom-3 bg-teal-500 mx-2 shadow-sm text-gray-100 hover:bg-teal-600"
        >
          {{ num }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import PlanillaEmpleados from "./PlanillaEmpleados.vue";
import { useUserStore } from "../store/user.js";
import desUno from "../components/desafios/desUno.vue";
import { computed } from "@vue/reactivity";
import AddActivity from "./AddActivity.vue";
import { feriadosStore } from "../store/feriados";
import { useDatabaseStore } from "../store/database";
import loadingSpin from "../components/loadingSpin.vue";
const userStore = useUserStore();
const statehours = ref(false);
const { userData } = userStore;
const databaseStore = useDatabaseStore();
const url = ref("");
const horas = ref("");
const feriados=feriadosStore()
const msnFeriado=ref(null)
const diasMes = new Date(feriados.dias.getFullYear(), feriados.dias.getMonth() + 1, 0).getDate();
const restantes = diasMes - feriados.dias.getDate();


const warning = computed(() => {
  const color = ref(null);

  if (restantes > 0 && restantes <= 20) {
    return (color.value = "green");
  } else if (restantes > 20) {
    return (color.value = "orange");
  } else {
    return (color.value = "red");
  }
});





console.log(diasMes);
console.log(feriados.dias.getDate());

/* Reset store para que no carguen de vuelta */
onBeforeUnmount(() => {
  databaseStore.$reset();
});

const handleSubmit = () => {
  console.log("agregando");

const selectDate= feriados.dateSelect.substring(8, 10)


feriados.diasFeriados.forEach(element => {
  
  if (  element.dia==selectDate) {
   msnFeriado.value=`Recuerda que el dia ${element.dia} corresponde al feriado por ${element.motivo}`
  }

  
});


  databaseStore.addUrls(url.value, horas.value, feriados.dateSelect);
};

const size = ref(0);
const showComponent = (num) => {
  console.log(num);
};

const changesize = () => {
  setInterval(() => {
    size.value = size.value + 10;
  }, 1000);
};
changesize();

const registerHours = () => {
  statehours.value = true;
};
</script>

<style scoped></style>
