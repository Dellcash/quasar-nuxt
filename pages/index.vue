<script setup>
definePageMeta({ layout: 'main-layout' })
import { API_URL_USERS } from '../services/apiEndpoints'

const nuxtApp = useNuxtApp()

const logout = () => {
  localStorage.clear()
  nuxtApp.$router.push('/login')
}

const usersList = () => {
  useApi()(API_URL_USERS.usersList)
    .then(res => {
      console.log('resssssss', res);
    })
    .catch(err => console.log(err))
}

usersList()
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
