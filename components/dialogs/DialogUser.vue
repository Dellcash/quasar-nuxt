<script setup>
import { useDialogPluginComponent } from 'quasar'

import { roundClose } from '@quasar/extras/material-icons-round'

const { dialogRef, onDialogHide } = useDialogPluginComponent()

defineEmits([...useDialogPluginComponent.emits])

defineProps({
  details: {
    type: Object,
    default: () => { }
  }
})
</script>

<template>
  <q-dialog
    ref="dialogRef"
    persistent
    @hide="onDialogHide"
  >
    <q-card
      bordered
      flat
    >
      <q-card-section
        class="row items-center justify-between no-padding q-ma-md"
      >
        <div
          class="text-subtitle2"
        >
          جزئیات خانه بازی
        </div>

        <q-btn
          v-close-popup
          flat
          :icon="roundClose"
          round
          dense
        />
      </q-card-section>

      <q-card-section
        class="row"
      >
        <q-card
          flat
          bordered
          class="bg-white-2 text-dark"
        >
          <q-card-section
            class="row justify-between items-center"
          >
            <div
              class="col-6 q-gutter-y-sm"
            >
              <div
                class="text-body2 text-bold"
              >
                {{ details.profile.play_house_name }}
              </div>
              <div
                class="text-caption2"
              >
                {{ details.profile.location.province.name }},
                {{ details.profile.location.city.name }}
              </div>
            </div>

            <div
              class="col-6"
            >
              <div
                class="row justify-end q-mb-lg"
              >
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
              </div>

              <div
                class="q-gutter-y-sm"
              >
                <div
                  class="row justify-between items-center"
                >
                  <div>تاریخ ثبت نام:</div>
                  <div
                    class="text-body3 text-weight-bold"
                  />
                </div>

                <div
                  class="row justify-between items-center"
                >
                  <div>اعتبار حساب:</div>
                  <div
                    class="text-body3 text-weight-bold"
                  >
                    {{}} روز
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-section
        class="row"
      >
        <div
          class="col-6 q-gutter-y-md"
        >
          <div
            class="row items-center justify-between"
          >
            <div
              class="text-caption1"
            >
              شماره موبایل :
            </div>
            <div
              class="text-body3"
            >
              {{ details.mobile_number }}
            </div>
          </div>

          <div
            class="row items-center justify-between"
          >
            <div
              class="text-caption1"
            >
              مجموع درآمد :
            </div>
            <div
              class="text-body3"
            >
              {{ details.total_income / 10 }} تومان
            </div>
          </div>

          <div
            class="row items-center justify-between"
          >
            <div
              class="text-caption1"
            >
              تعداد حساب :
            </div>
            <div
              class="text-body3"
            >
              {{ details.participant_count }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.q-card__section
    width: 500px

// @media (max-width: $breakpoint-sm)
//   .q-card__section
//     width: 300px
</style>
