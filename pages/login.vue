<script setup>
import Background from '/assets/auth-background.png'

definePageMeta({ layout: 'login-layout' })

const nuxtApp = useNuxtApp()
const loading = ref(false)

const form = ref({
  username: '',
  password: ''
})

const login = async () => {
  loading.value = true
  useServices().auth.login(form.value)
    .then(res => {
      loading.value = false

      localStorage.setItem('token', res.access_token)
      nuxtApp.$router.push('/users-management')
    }).catch(() => loading.value = false)
}
</script>

<template>
  <q-img
    :src="Background"
    height="100vh"
  >
    <div class="fit row items-center justify-center container no-padding">
      <q-card class="card-width">
        <q-card-section>
          <q-form
            @submit.prevent="login"
            class="q-gutter-y-md"
          >
            <div>
              <label class="text-black">نام کاربری</label>
              <q-input
                v-model="form.username"
                dense
                outlined
                :rules="[requiredRule]"
                hide-bottom-space
                no-error-icon
                placeholder="نام کاربری خود را وارد کنید"
              />
            </div>

            <div>
              <label class="text-black">رمز عبور</label>
              <q-input
                v-model="form.password"
                dense
                outlined
                :rules="[requiredRule]"
                hide-bottom-space
                no-error-icon
                placeholder="رمز عبور را وارد کنید"
              />
            </div>

            <q-btn
              color="primary"
              label="ورود"
              class="full-width"
              :loading="loading"
              type="submit"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-img>
</template>

<style scoped></style>
