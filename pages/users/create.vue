<script setup>
import { API_URL_USERS } from '~/services'
import { roundSearch, roundVisibility, roundVisibilityOff } from '@quasar/extras/material-icons-round'

const { isPwd, userLoading, formRef, form, generateUser } = useGenerate()
const { columns, rows, filter, loading, pagination, onRequest, request, tableRef } = useTable()
filter.value = {
  mobile_number: ''
}

onMounted(request)

function useGenerate () {
  const isPwd = ref(true)
  const formRef = ref(false)
  const userLoading = ref(false)
  const form = ref({
    username: null,
    password: null,
    mobile_number: null
  })

  const generateUser = () => {
    userLoading.value = true
    useServices().users.generateUser(form.value)
      .then(res => {
        form.value = { username: '', password: '', mobile_number: '' }

        formRef.value.reset()
        formRef.value.resetValidation()
        useNotify()('success', res)
      }).catch(err => {
        console.log('error', err)
      }).finally(() => {
        userLoading.value = false
      })
  }

  return {
    form,
    isPwd,
    formRef,
    userLoading,
    generateUser
  }
}

console.log('API_URL_USERS.usersList', API_URL_USERS.usersList)
function useTable () {
  const columns = [
    {
      name: 'index',
      label: 'ردیف',
      align: 'left',
      field: 'user_id',
      headerStyle: 'width: 100px'
    },
    {
      name: 'username',
      label: 'نام کاربری',
      align: 'left',
      field: 'username',
      headerStyle: 'width: 300px'
    },
    {
      name: 'mobile_number',
      label: 'شماره موبایل',
      align: 'left',
      field: val => toPersianNumber(val.mobile_number),
      headerStyle: 'font-size:16px'
    }
  ]
  const { rows, loading, pagination, filter, onRequest, request, tableRef } = useTableHandler({
    url: API_URL_USERS.usersList,
    params: {
      filled_profile: false,
      sort: 'ASC'
    }
  })

  return {
    columns, rows, loading, pagination, onRequest, request, tableRef, filter
  }
}
</script>

<template>
  <q-page
    class="q-pa-lg"
  >
    <div
      class="q-mb-md flex items-center text-primary-1 text-h6 q-gutter-x-sm"
    >
      مدیریت حساب
    </div>

    <q-card bordered
            flat
            class="border-radius-8"
    >
      <q-form ref="formRef"
              class="q-pa-md col"
              @submit.prevent="generateUser"
      >
        <div
          class="q-gutter-y-md"
        >
          <div
            class="row q-col-gutter-x-md"
          >
            <div
              class="col-sm-6 col-12 q-gutter-y-xs"
            >
              <div>
                نام کاربری<span
                  class="text-primary"
                >*</span>
              </div>

              <q-input v-model="form.username"
                       :rules="[requiredRule, isValidUsername]"
                       lazy-rules
                       no-error-icon
                       hide-bottom-space
                       dense
                       outlined
                       hint="حداقل چهار کارکتر و به زبان انگلیسی باشد."
                       placeholder="نام کاربری خود را وارد کنید"
              />
            </div>

            <div
              class="col-sm-6 col-12 q-gutter-y-xs"
            >
              <div>
                شماره موبایل<span
                  class="text-primary"
                >*</span>
              </div>

              <q-input v-model="form.mobile_number"
                       :rules="[requiredRule, isValidIrMobileNumber]"
                       lazy-rules
                       no-error-icon
                       hide-bottom-space
                       dense
                       outlined
                       type="number"
                       placeholder="شماره موبایل را وارد کنید"
              />
            </div>
          </div>

          <div
            class="row q-col-gutter-x-md"
          >
            <div
              class="col-sm-6 col-12 q-gutter-y-xs"
            >
              <div>
                رمز عبور<span
                  class="text-primary"
                >*</span>
              </div>

              <q-input v-model="form.password"
                       :rules="[requiredRule, isValidPassword]"
                       lazy-rules
                       no-error-icon
                       hide-bottom-space
                       hint="رمز عبور باید به زبان انگلیسی و حداقل 8 کاراکتر داشته باشد و شامل ترکیبی از حروف بزرگ و کوچک و اعداد باشد."
                       dense
                       outlined
                       :type="isPwd ? 'password' : 'text'"
                       placeholder="رمز عبور را وارد کنید"
              >
                <template
                  #append
                >
                  <q-icon :name="!isPwd ? roundVisibility : roundVisibilityOff"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <div
          class="row justify-end"
        >
          <q-btn label=" ایجاد حساب کاربری"
                 class="q-mt-lg col-12 col-sm-auto"
                 color="primary"
                 padding="10px 32px"
                 type="submit"
                 :loading="userLoading"
          />
        </div>
      </q-form>
    </q-card>

    <q-table ref="tableRef"
             v-model:pagination="pagination"
             flat
             :rows="rows"
             class="q-mt-lg border-radius-8"
             bordered
             :columns="columns"
             :filter="filter"
             row-key="index"
             :loading="loading"
             @request="onRequest"
    >
      <template
        #top
      >
        <q-input v-model="filter.mobile_number"
                 borderless
                 dense
                 class="col-sm-6 col-12"
                 outlined
                 type="number"
                 debounce="300"
                 placeholder="جستجو براساس شماره موبایل"
        >
          <template
            #append
          >
            <q-icon
              :name="roundSearch"
            />
          </template>
        </q-input>
      </template>

      <template
        #body-cell-index="props"
      >
        <td
          :props="props"
        >
          {{ toPersianNumber(props.pageIndex + 1) }}
        </td>
      </template>
    </q-table>
    <!-- <div
      class="q-mt-md row justify-end"
    >
      <q-btn color="secondary"
             label="دانلود گزارش"
             :icon="roundDownload"
             :loading="exportLoading"
             class="full-width-btn"
             text-color="dark"
             :disable="!rows.length"
             @click="getReport"
      />
    </div> -->
  </q-page>
</template>
