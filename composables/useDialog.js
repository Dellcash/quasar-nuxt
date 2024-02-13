import { useQuasar } from 'quasar'

export function useDialog() {
  const $q = useQuasar()

  const loadDialog = async (dialogComponentPath, componentData) => {
    const Dialog = await dialogComponentPath

    $q.dialog({
      component: Dialog.default,
      componentProps: { ...componentData }
    })
  }

  return {
    loadDialog
  }
}
