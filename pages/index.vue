<script setup>
definePageMeta({ layout: 'main-layout' })

const nuxtApp = useNuxtApp()

const logout = () => {
  localStorage.clear()
  nuxtApp.$router.push('/login')
}

const usersList = () => {
  useApi()('https://bazi-back.netall.live/api/backoffice/users?offset=0&limit=15&filled_profile=true&mobile_number=&play_house_name=&sort=ASC')
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
