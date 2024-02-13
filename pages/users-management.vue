<script setup>
import { API_URL_USERS } from '~/services';

const columns = [
  {
    name: 'index',
    label: 'ردیف',
    align: 'left',
    field: 'id',
    headerStyle: 'font-size:16px'
  },
  {
    name: 'profile',
    label: 'نام خانه بازی',
    align: 'left',
    field: row => row.profile.play_house_name,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'city_name',
    label: 'شهر',
    align: 'left',
    field: row => row.profile.location.city.name,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'province_name',
    label: 'استان',
    align: 'left',
    field: row => row.profile.location.province.name,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'mobile_number',
    label: 'شماره موبایل',
    align: 'left',
    field: val => val.mobile_number,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'participant_count',
    label: 'تعداد حساب',
    align: 'left',
    field: val => val.participant_count,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'total_income',
    label: 'مجموع درآمد(تومان)',
    align: 'left',
    field: val => val.total_income / 10,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'expiration_date',
    label: 'وضعیت',
    align: 'left',
    field: row => row.account_info.expiration_date,
    headerStyle: 'font-size:16px'
  },
  {
    name: 'action',
    align: 'left',
    field: 'action',
    headerStyle: 'font-size:16px'
  }
]

const { rows, loading, pagination, onRequest, request, tableRef } = useTableHandler({
  url: API_URL_USERS.usersList,
  params: {
    filled_profile: true
  }
})
onMounted(request)

// const provincesList = () => {
//   useServices().users.fetchProvinces()
//     .then(res => {
//       console.log('ressss', res);
//     }).catch(err => console.log(err))
// }
// provincesList()

const details = ref({})
const { loadDialog } = useDialog()
const openDialog = () => {
  loadDialog(import('@/components/dialogs/DialogUser.vue'), {
    details: details.value
  })
}
</script>

<template>
  <div class="q-pa-md">
    <div class="q-mb-md flex items-center text-primary-1 text-h6 q-gutter-x-sm">
      لیست مشتریان
    </div>

    <q-table
      ref="tableRef"
      v-model:pagination="pagination"
      flat
      bordered
      class="q-mt-lg border-radius-8"
      :columns="columns"
      :rows="rows"
      row-key="index"
      :loading="loading"
      @request="onRequest"
    >
      <template #body-cell-index="props">
        <td :props="props">
          {{ props.pageIndex + 1 }}
        </td>
      </template>

      <template #body-cell-action="props">
        <td :props="props">
          <q-btn
            label="جزئیات"
            flat
            color="primary"
            class="text-weight-bold"
            @click="openDialog(details = props.row)"
          />
        </td>
      </template>

      <template #body-cell-expiration_date="props">
        <td :props="props">
          <q-chip
            square
            label="پرداخت نشده"
            text-color="error"
            color="on-error"
          />

          <q-chip
            square
            label="پرداخت شده"
            text-color="success"
            color="on-success"
          />
        </td>
      </template>
    </q-table>
  </div>
</template>