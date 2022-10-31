import { createPinia, defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import storeReset from './plugins/storeReset'

export const useIdStore = defineStore('id', () => {
  const counter = ref(0)
  const settings = reactive({
    dates: new Set(),
  })
  return {
    counter,
    settings,
    addDate: v => settings.dates.add(v),
  }
})

const store = createPinia()
store.use(storeReset)

export default store
