<script setup>
import { useDialogPluginComponent } from 'quasar'

const { screenSize } = useScreenHandler()
const { dialogRef, onDialogHide } = useDialogPluginComponent()

defineEmits([
  ...useDialogPluginComponent.emits
])

defineProps({
  text: {
    type: String,
    required: true
  },
  removeFn: {
    type: Function,
    default: () => { }
  },
  dltLoading: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <q-dialog ref="dialogRef"
            :position="screenSize(768).value ? 'bottom' : 'standard'"
            @hide="onDialogHide"
  >
    <q-card
      class="q-pa-2xl card-width border-radius-8"
    >
      <q-card-section>
        <div
          class="text-body1 text-center"
        >
          آیا از حذف این
          {{ text }}
          مطمئن هستید؟
        </div>
      </q-card-section>

      <q-card-actions
        align="center"
      >
        <q-btn label="بله"
               outline
               color="primary"
               class="col-5"
               :loading="dltLoading"
               @click="removeFn(), onDialogHide()"
        />

        <q-btn label="خیر"
               color="success"
               class="col-5"
               @click="onDialogHide"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.card-width
  max-width: 464px
  min-width: $breakpoint-xs
  width: 100%

@media (max-width: $breakpoint-sm)
  .conatiner
    align-items: flex-end

  .card-width
    max-width: 100%
    padding: 0px

  // :deep(.q-dialog__inner--minimized)
  //   padding: 0px
</style>
