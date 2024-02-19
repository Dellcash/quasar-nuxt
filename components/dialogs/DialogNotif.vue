<script setup>
import { useDialogPluginComponent } from 'quasar'
import { roundClose } from '@quasar/extras/material-icons-round'

const { $dayjs } = useNuxtApp()
const { screenSize } = useScreenHandler()
const { dialogRef, onDialogHide } = useDialogPluginComponent()

defineEmits([
  ...useDialogPluginComponent.emits
])

defineProps({
  details: {
    type: Object,
    default: () => { }
  }
})

</script>

<template>
  <q-dialog ref="dialogRef"
            persistent
            :position="screenSize(768).value ? 'bottom' : 'standard'"
            @hide="onDialogHide"
  >
    <q-card bordered
            flat
    >
      <q-card-section
        class="row items-center justify-between no-padding q-ma-md"
      >
        <div
          class="text-subtitle2"
        >
          اطلاعیه
        </div>

        <q-btn v-close-popup
               flat
               :icon="roundClose"
               round
               dense
        />
      </q-card-section>

      <q-card-section
        class="q-gutter-y-md"
      >
        <div
          class="announce"
        >
          {{ details.title }}
        </div>

        <div
          class="announce"
        >
          {{ details.body }}
        </div>
      </q-card-section>

      <q-card-section
        class="text-grey-2 row items-center justify-end no-padding q-my-md"
      >
        <div>
          {{ datetimeToJalali($dayjs.utc(details.created_at), 'HH:mm - YYYY/MM/DD') }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.q-card__section
    width: 500px

// @media (max-width: $breakpoint-sm)
//   .q-card__section
//     width: 300px

.announce
    width: 100%
    overflow-wrap: break-word
</style>
