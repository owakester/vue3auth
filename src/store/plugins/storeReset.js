import cloneDeep from 'lodash.clonedeep' //1

export default function resetStore({ store }) {
  const initialState = cloneDeep(store.$state) // 2
  store.$reset = () => store.$patch(cloneDeep(initialState)) // 3
}