<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
// import { roundGroups, roundPersonAdd, roundLogout, roundMenu, roundNotifications, roundMailLock, roundSupportAgent } from '@quasar/extras/material-icons-round'

// const drawer = ref(false)
// const menus = ref([
//   {
//     label: 'لیست مشتریان',
//     icon: roundGroups,
//     to: { name: 'Customers' }
//   },
//   {
//     label: 'مدیریت حساب',
//     icon: roundPersonAdd,
//     to: { name: 'AccMangement' }
//   },
//   {
//     label: 'مدیریت پیامک ها',
//     icon: roundMailLock,
//     to: { name: 'SmsManagement' }
//   },
//   {
//     to: '',
//     icon: roundNotifications,
//     label: 'اطلاعیه',
//     expand: false,
//     subMenu: [
//       {
//         to: { name: 'Announcement' },
//         label: 'اطلاع رسانی تمدید'
//       },
//       {
//         to: { name: 'Notification' },
//         label: 'ایجاد اطلاعیه'
//       }
//     ]
//   },
//   {
//     to: { name: 'WorkshopsList' },
//     icon: roundNotifications,
//     label: 'آموزش',
//     expand: false,
//     subMenu: [
//       {
//         to: { name: 'CreateWorkshop' },
//         label: 'ایجاد آموزش'
//       }
//     ]
//   },
//   {
//     to: '',
//     icon: roundSupportAgent,
//     label: 'پشتیبانی',
//     expand: false,
//     subMenu: [
//       {
//         to: { name: 'TicketList' },
//         label: 'لیست تیکت‌ها'
//       }
//     ]
//   },
//   {
//     label: 'خروج',
//     icon: roundLogout,
//     function: () => {
//       appStore.logOut()
//       router.push({ name: 'Login' })
//     }
//   }
// ])

// const { $dayjs } = useNuxtApp()
// const time = ref(toPersianNumber($dayjs().format('HH:mm')))
// const date = ref(datetimeToJalali($dayjs(), 'YYYY/MM/DD'))
// onMounted(() => {
//   setInterval(() => {
//     time.value = toPersianNumber($dayjs().format('HH:mm'))
//   }, 1000)
// })
</script>

<style lang="scss" scoped>
.q-item.q-router-link--active,
.q-item--active {
  // color: $light;
  // background-color: $primary;
  font-weight: 600;
}

:deep(.q-item__section) {
  padding-left: 0 !important;
}

.q-item {
  border-radius: 0 8px 8px 0px;
}
</style>
