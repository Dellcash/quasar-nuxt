<script setup>
import { LocalStorage } from 'quasar';

definePageMeta({ layout: 'main-layout' })

const nuxtApp = useNuxtApp()

const logout = () => {
  localStorage.clear()
  nuxtApp.$router.push('/login')
}

useFetch('https://bazi-back.netall.live/api/backoffice/users?offset=0&limit=15&filled_profile=true&mobile_number=&play_house_name=&sort=ASC', {
  headers: {
    Authorization: `Bearer ${LocalStorage.getItem('token')}`
  }
  // headers: useRequestHeaders(['token'])
}).then(res => {
  console.log('ressss', res.data.value);
})
  .catch(err => {
    console.log(err);
  })
</script>

<template>
  <div>
    Page: foo

    <q-btn
      label="logout"
      @click="logout"
    />
  </div>
</template>

<style scoped></style>
