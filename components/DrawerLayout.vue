<template>
  <q-drawer v-model="drawer"
            class="bg-light"
            side="left"
            :width="252"
            show-if-above
            bordered
  >
    <div
      class="row items-center justify-center q-my-md"
    >
      <q-img :src="Logo"
             width="172px"
             height="60px"
             fit="fill"
      />
    </div>

    <q-list
      class="text-primary q-pr-sm q-gutter-y-sm q-mt-md"
    >
      <template v-for="(menu, index) in menus"
                :key="index"
      >
        <q-item v-if="!menu.subMenu"
                class="text-primary q-mr-sm border-radius-right-8"
                clickable
                :to="menu.to"
                :class="{ 'active-route': isRouteActive(menu.to) }"
                @click="menu.function"
        >
          <q-item-section>
            <div
              class="row items-center q-col-gutter-x-sm"
            >
              <q-icon size="20px"
                      :name="menu.icon"
                      color="inherit"
              />
              <div>{{ menu.label }}</div>
            </div>
          </q-item-section>
        </q-item>
        <q-expansion-item v-else
                          v-model="menu.expand"
                          group="somegroup"
                          :label="menu.label"
                          :icon="menu.icon"
                          :header-class="['text-primary', 'q-mr-sm border-radius-top-right-8']"
        >
          <template
            #header
          >
            <q-item-section>
              <div
                class="row items-center q-col-gutter-x-sm"
              >
                <q-icon size="20px"
                        :name="menu.icon"
                        color="inherit"
                />
                <div>{{ menu.label }}</div>
              </div>
            </q-item-section>
          </template>
          <q-item v-for="sub in menu.subMenu"
                  :key="sub.label"
                  :to="sub.to"
                  clickable
                  :class="{ 'active-route': isRouteActive(sub.to) }"
          >
            <q-item-section>
              <div
                class="row q-ml-lg"
              >
                {{ sub.label }}
              </div>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup>
import {
  roundGroups,
  roundPersonAdd,
  roundLogout,
  roundNotifications,
  roundMailLock,
  roundSupportAgent
} from '@quasar/extras/material-icons-round'

const Logo = '@/assets/logo.png' // Adjust the path to your logo
const drawer = ref(false)
const route = useRoute()

const menus = ref([
  {
    label: 'لیست مشتریان',
    icon: roundGroups,
    to: { path: '/users/management' }
  },
  {
    label: 'مدیریت حساب',
    icon: roundPersonAdd
  },
  {
    label: 'مدیریت پیامک ها',
    icon: roundMailLock
  },
  {
    to: '',
    icon: roundNotifications,
    label: 'اطلاعیه',
    expand: false,
    subMenu: [
      {
        label: 'اطلاع رسانی تمدید'
      },
      {
        label: 'ایجاد اطلاعیه'
      }
    ]
  },
  {
    to: { path: '/workshop/list' },
    icon: roundNotifications,
    label: 'آموزش',
    expand: false,
    subMenu: [
      {
        to: { path: '/workshop/create' },
        label: 'ایجاد آموزش'
      }
    ]
  },
  {
    to: '',
    icon: roundSupportAgent,
    label: 'پشتیبانی',
    expand: false,
    subMenu: [
      {
        label: 'لیست تیکت‌ها'
      }
    ]
  },
  {
    label: 'خروج',
    icon: roundLogout,
    function: () => { useServices().auth.logOut() }
  }
])

const isRouteActive = (to) => {
  return route.path === to?.path
}
</script>

<style lang="scss" scoped>
.active-route, .q-item.q-router-link--active, .q-item--active {
  color: $light;
  background-color: $primary;
  font-weight: 600;
}

.q-item {
  border-radius: 0 8px 8px 0px;
}

:deep(.q-item__section) {
  padding-left: 0 !important;
}
</style>
