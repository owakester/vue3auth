import { defineStore } from "pinia";
import { ref } from "vue";
export const feriadosStore = defineStore("feriados", () => {
  const dateSelect = ref(null);
  const dias = ref(new Date());
  const diasFeriados = ref(null);
  try {
    fetch("https://nolaborables.com.ar/api/v2/feriados/2022")
      .then((response) => response.json())
      .then((resp) => validateDate(resp));
  } catch (error) {
    console.log(error);
  }

  const validateDate = (feriado) => {
    diasFeriados.value = feriado.filter(
      (dia) => dia.mes === dias.value.getMonth() + 1
    );

    return lockDate(feriado);
  };

  const lockDate = (feriado) => {};

  return {
    validateDate,
    dias,
    diasFeriados,
    dateSelect,
  };
});
