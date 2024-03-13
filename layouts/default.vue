<script setup>
import { roundMenu } from '@quasar/extras/material-icons-round'

const drawer = ref(false)

const { $dayjs } = useNuxtApp()
const time = ref(toPersianNumber($dayjs().format('HH:mm')))
const date = ref(datetimeToJalali($dayjs(), 'YYYY/MM/DD'))
onMounted(() => {
  setInterval(() => {
    time.value = toPersianNumber($dayjs().format('HH:mm'))
  }, 1000)
})
</script>

<template>
  <q-layout view="lHh Lpr lFf"
            class="bg-light"
  >
    <q-header>
      <q-toolbar
        class="bg-light text-black row justify-between"
      >
        <q-btn flat
               round
               class="drawer"
               dense
               :icon="roundMenu"
               @click="drawer = !drawer"
        />

        <div
          class="row items-center q-col-gutter-x-sm text-body3"
        >
          <div>
            {{ date }}
          </div>

          <div>
            ,{{ time }}
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <DrawerLayout
      :drawer="drawer"
    />

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
