<script setup>
definePageMeta({ layout: 'main-layout' })

const nuxtApp = useNuxtApp()

const logout = () => {
  localStorage.clear()
  nuxtApp.$router.push('/login')
}
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
