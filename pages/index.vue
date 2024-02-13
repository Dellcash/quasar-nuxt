<script setup>
import { usersService } from '/services'

definePageMeta({ layout: 'main-layout' })

const nuxtApp = useNuxtApp()

const logout = () => {
  localStorage.clear()
  nuxtApp.$router.push('/login')
}

const usersList = () => {
  usersService.fetchUsers()
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
