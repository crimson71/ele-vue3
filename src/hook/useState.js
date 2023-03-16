import { useStore, mapState } from 'vuex'
import { computed } from 'vue'
export function useState (mapper) {
  const store = useStore()
  const stateFunObj = mapState(mapper)
  const state = {}
  Object.keys(stateFunObj).forEach(funKey => {
    // bind是为了绑定store setup中没有this 所有函数执行时取不到$store
    state[funKey] = computed(stateFunObj[funKey].bind({ $store: store }))
  })
  return state
}
