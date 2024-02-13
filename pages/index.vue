<script setup>
definePageMeta({ layout: 'main-layout' })

const usersList = () => {
  useServices().users.fetchUsers()
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
      @click="useServices().auth.logOut"
    />
  </div>
</template>

<style scoped></style>
