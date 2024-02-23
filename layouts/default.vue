<!-- <script setup>
import Logo from '@/assets/logo.png'
import { roundGroups, roundPersonAdd, roundLogout, roundMenu, roundNotifications, roundMailLock, roundSupportAgent } from '@quasar/extras/material-icons-round'

const drawer = ref(false)
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

const { $dayjs } = useNuxtApp()
const time = ref(toPersianNumber($dayjs().format('HH:mm')))
const date = ref(datetimeToJalali($dayjs(), 'YYYY/MM/DD'))
onMounted(() => {
  setInterval(() => {
    time.value = toPersianNumber($dayjs().format('HH:mm'))
  }, 1000)
})

const { currentRoute } = useRouter()
console.log('currentRoute', currentRoute.value)
</script> -->

<!-- <template>
  <q-layout view="lHh Lpr lFf"
            class="bg-light"
  >
    <q-header>
      <q-toolbar
        class="bg-light text-black row justify-between"
      >
        <q-btn flat
               round
               class="drawer"
               dense
               :icon="roundMenu"
               @click="drawer = !drawer"
        />

        <div
          class="row items-center q-col-gutter-x-sm text-body3"
        >
          <div>
            {{ date }}
          </div>
          <div>
            ,{{ time }}
          </div>
        </div>
      </q-toolbar>
    </q-header>

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
                  active-class="bg-primary text-white"
                  @click="menu.function"
          >
            <q-item-section>
              <div
                class="row items-center q-col-gutter-x-sm"
              >
                <q-icon size="20px"
                        :name="menu.icon"
                        color="inherint"
                />
                <div>
                  {{ menu.label }}
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-expansion-item v-else
                            v-model="menu.expand"
                            group="somegroup"
                            :label="menu.label"
                            :icon="menu.icon"
                            :expand-icon-class="[menu.expand ? 'text-white' : 'text-primary']"
                            :header-class="[menu.expand ? 'bg-primary text-white' : 'text-primary', 'q-mr-sm border-radius-top-right-8']"
                            @click="menu?.to ? $router.push(menu.to) : () => { }"
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
                          color="inherint"
                  />
                  <div>
                    {{ menu.label }}
                  </div>
                </div>
              </q-item-section>
            </template>
            <q-item v-for="sub in menu.subMenu"
                    :ref="index"
                    :key="sub.label"
                    :to="sub.to"
                    clickable
                    class="text-primary q-mr-sm"
                    active-class="text-bold bg-light-primary"
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

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template> -->

<!-- <style lang="scss" scoped>
.q-item.q-router-link--active,
.q-item--active {
  color: $light;
  background-color: $primary;
  font-weight: 600;
}

:deep(.q-item__section) {
  padding-left: 0 !important;
}

.q-item {
  border-radius: 0 8px 8px 0px;
}
</style> -->

<script setup>
import { roundMenu } from '@quasar/extras/material-icons-round'

const drawer = ref(false)

const { $dayjs } = useNuxtApp()
const time = ref(toPersianNumber($dayjs().format('HH:mm')))
const date = ref(datetimeToJalali($dayjs(), 'YYYY/MM/DD'))
onMounted(() => {
  setInterval(() => {
    time.value = toPersianNumber($dayjs().format('HH:mm'))
  }, 1000)
})
</script>

<template>
  <q-layout view="lHh Lpr lFf"
            class="bg-light"
  >
    <q-header>
      <q-toolbar
        class="bg-light text-black row justify-between"
      >
        <q-btn flat
               round
               class="drawer"
               dense
               :icon="roundMenu"
               @click="drawer = !drawer"
        />

        <div
          class="row items-center q-col-gutter-x-sm text-body3"
        >
          <div>
            {{ date }}
          </div>
          <div>
            ,{{ time }}
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <DrawerLayout
      :drawer="drawer"
    />

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
