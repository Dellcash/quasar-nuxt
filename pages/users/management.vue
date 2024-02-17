<script setup>
import { API_URL_USERS } from '~/services'
import { roundFilterAlt, roundPhoneIphone, roundSearch } from '@quasar/extras/material-icons-round'

const { $dayjs } = useNuxtApp()

const sortOption = [
  {
    label: 'بیشترین درآمد',
    value: 'HIGHEST_INCOME'
  },
  {
    label: 'کمترین درآمد',
    value: 'LOWEST_INCOME'
  },
  {
    label: 'بیشترین حساب',
    value: 'MOST_ACCOUNT'
  },
  {
    label: 'کمترین حساب',
    value: 'LOWEST_ACCOUNT'
  },
  {
    label: 'آخرین حساب ایجاد شده',
    value: 'ASC'
  }
]
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
    field: val => toPersianNumber(val.mobile_number),
    headerStyle: 'font-size:16px'
  },
  {
    name: 'participant_count',
    label: 'تعداد حساب',
    align: 'left',
    field: val => toPersianNumber(val.participant_count),
    headerStyle: 'font-size:16px'
  },
  {
    name: 'total_income',
    label: 'مجموع درآمد(تومان)',
    align: 'left',
    field: val => seperateNumber(toPersianNumber(Math.trunc(val.total_income / 10))),
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

const {
  rows,
  filter,
  request,
  loading,
  tableRef,
  onRequest,
  pagination
} = useTableHandler({
  url: API_URL_USERS.usersList,
  params: {
    filled_profile: true
  }
})

onMounted(() => {
  if (!filter.value.city_id) delete filter.value.city_id
  request()
})

filter.value = ({
  city_id: null,
  mobile_number: '',
  play_house_name: '',
  sort: 'ASC'
})

const filterTable = () => {
  request({
    params: {
      city_id: filter.value.city_id,
      mobile_number: filter.value.mobile_number,
      play_house_name: filter.value.play_house_name
    }
  })
}
const clearFilter = () => {
  filter.value = {
    mobile_number: '',
    play_house_name: ''
  }
  request({
    params: {
      mobile_number: '',
      play_house_name: ''
    }
  })
}

const cityOption = ref([])
const cityOptionFilter = ref([])
const provincesList = () => {
  useServices().users.fetchProvinces()
    .then(res => {
      res.forEach(item => item.cities.forEach(city => {
        cityOption.value.push({
          label: city.name,
          value: city.city_id
        })

        cityOptionFilter.value.push({
          label: city.name,
          value: city.city_id
        })
      }))
    }).catch(err => console.log(err))
}
provincesList()

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      cityOption.value = cityOptionFilter.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    // provincesList(needle)
    cityOption.value = cityOptionFilter.value
      .filter(v => v.label.toLowerCase().indexOf(needle) > -1)
  })
}

const details = ref({})
const { loadDialog } = useDialog()
const openDialog = () => {
  loadDialog(import('@/components/dialogs/DialogUser.vue'), {
    details: details.value
  })
}
</script>

<template>
  <div
    class="q-pa-md"
  >
    <div
      class="q-mb-md flex items-center text-primary-1 text-h6 q-gutter-x-sm"
    >
      لیست مشتریان
      <q-btn label="خروج"
             @click="useServices().auth.logOut()"
      />
    </div>

    <q-card bordered
            flat
            class="border-radius-8"
    >
      <q-form class="q-pa-md q-col-gutter-md"
              @submit.prevent=""
      >
        <div
          class="col row q-col-gutter-md"
        >
          <div
            class="col-12 col-sm-4 q-gutter-y-xs"
          >
            <div>شماره موبایل</div>
            <q-input v-model="filter.mobile_number"
                     outlined
                     dense
                     type="number"
                     placeholder="شماره موبایل مشتری"
                     class="col-12 col-sm-4"
            >
              <template
                #append
              >
                <q-icon
                  :name="roundPhoneIphone"
                />
              </template>
            </q-input>
          </div>

          <div
            class="col-12 col-sm-4 q-gutter-y-xs"
          >
            <div>شهر</div>
            <q-select v-model="filter.city_id"
                      :options="cityOption"
                      outlined
                      dense
                      emit-value
                      use-input
                      no-error-icon
                      hide-bottom-space
                      map-options
                      label="شهر مورد نظر را انتخاب کنید"
                      @filter="filterFn"
            >
              <template
                #no-option
              >
                <q-item>
                  <q-item-section>
                    نتیجه ای یافت نشد
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div
            class="col-12 col-sm-4 q-gutter-y-xs"
          >
            <div>مرتب سازی</div>
            <q-select v-model="filter.sort"
                      outlined
                      dense
                      :options="sortOption"
                      emit-value
                      map-options
            />
          </div>
        </div>

        <div
          class="row justify-between q-col-gutter-md"
        >
          <q-input v-model="filter.play_house_name"
                   outlined
                   dense
                   placeholder="جستجو براساس نام خانه بازی"
                   class="col-xs-12 col-sm-8 text-red"
          >
            <template
              #append
            >
              <q-icon
                :name="roundSearch"
              />
            </template>
          </q-input>

          <div
            class="q-gutter-sm row items-center col-xs-12 col-sm-auto"
          >
            <q-btn label="پاک کردن"
                   color="primary"
                   outline
                   flat
                   class="col-xs-12 col-sm-auto"
                   @click="clearFilter"
            />

            <q-btn label="فیلتر"
                   color="primary"
                   class="col-xs-12 col-sm-auto"
                   :icon="roundFilterAlt"
                   @click="filterTable"
            />
          </div>
        </div>
      </q-form>
    </q-card>

    <q-table ref="tableRef"
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
      <template
        #body-cell-index="props"
      >
        <td
          :props="props"
        >
          {{ toPersianNumber(props.pageIndex + 1) }}
        </td>
      </template>

      <template
        #body-cell-action="props"
      >
        <td
          :props="props"
        >
          <q-btn label="جزئیات"
                 flat
                 color="primary"
                 class="text-weight-bold"
                 @click="openDialog(details = props.row)"
          />
        </td>
      </template>

      <template
        #body-cell-expiration_date="props"
      >
        <td
          :props="props"
        >
          <q-chip v-if="$dayjs.unix(props.row.account_info.expiration_date).isBefore($dayjs()) || null"
                  square
                  label="پرداخت نشده"
                  text-color="error"
                  color="on-error"
          />

          <q-chip v-else
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
