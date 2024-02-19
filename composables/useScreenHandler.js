import { computed } from 'vue'
import { useQuasar } from 'quasar'

export function useScreenHandler () {
  const $q = useQuasar()
  const screenSize = (size) => computed(() => $q.screen.width <= size)
  const breackpoint = $q.screen.sizes
  return {
    screenSize,
    breackpoint
  }
}
