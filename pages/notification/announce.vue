<script setup>
const { setStatus, getNotifConfig } = useAnnounce()
const { form, formRef, typeOptions, dateOptions, setNewConfig, newConfigLoading } = useForm()
onMounted(getNotifConfig)

function useForm () {
  const formRef = ref(false)
  const newConfigLoading = ref(false)
  const form = ref({
    text: '',
    toggle: false,
    announcCount: [0],
    announcType: 'both'
  })
  const typeOptions = ref([
    { label: 'هردو', value: 'BOTH' },
    { label: 'درون برنامه', value: 'PLATFORM' },
    { label: 'از طریق پیامک', value: 'SMS' }
  ])
  const dateOptions = ref([
    { label: 'آخرین روز', value: 0, disable: true },
    { label: '2 روز به پایان اعتبار', value: 2 },
    { label: '3 روز به پایان اعتبار', value: 3 },
    { label: '5 روز به پایان اعتبار', value: 5 },
    { label: '10 روز به پایان اعتبار', value: 10 },
    { label: '15 روز به پایان اعتبار', value: 15 },
    { label: '20 روز به پایان اعتبار', value: 20 }
  ])

  const setNewConfig = () => {
    const body = {
      status: form.value.toggle,
      medium: form.value.announcType,
      offsets: form.value.announcCount,
      text: form.value.text
    }

    newConfigLoading.value = true
    useServices().notif.setNewConfig(body)
      .then(() => {
        useNotify()('success', 'اطلاع رسانی تمدید با موفقیت انجام شد')
      }).catch(err => {
        console.error(err)
      })
      .finally(() => {
        newConfigLoading.value = false
      })
  }

  return {
    form, formRef, typeOptions, dateOptions, setNewConfig, newConfigLoading
  }
}

function useAnnounce () {
  const getNotifConfig = () => {
    Loading.show()
    useServices().notif.getNotifConfig()
      .then(res => {
        form.value.toggle = res.status
        form.value.announcType = res.medium
        form.value.announcCount = res.offsets
        form.value.text = res.text
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        Loading.hide()
      })
  }

  const setStatus = async () => {
    // loading.show()
    const body = {
      status: form.value.toggle,
      medium: form.value.announcType,
      offsets: form.value.announcCount,
      text: form.value.text
    }
    // console.log(body)
    useServices().notif.setStatus(body)
      .then(() => useNotify('success', 'آپدیت شد'))
      .catch(err => {
        console.error(err.response)
      })
      .finally(() => {
        // loading.hide()
      })
  }

  return {
    setStatus, getNotifConfig
  }
}

</script>

<template>
  <q-page
    class="q-pa-lg"
  >
    <div
      class="q-mb-md flex items-center text-h6 q-gutter-x-sm"
    >
      اطلاع رسانی تمدید
    </div>

    <q-card bordered
            flat
            class="border-radius-8"
    >
      <q-card-section>
        <q-form ref="formRef"
                @submit.prevent="setNewConfig"
        >
          <div
            class="row items-end justify-between"
          >
            <div>
              <div
                class="text-body3"
              >
                ارسال اطلاع رسانی تمدید برای مشتریان
              </div>
              <div
                class="text-caption-1 text-grey-1"
              >
                با فعال کردن این گزینه، اطلاع رسانی تمدید اعتبار برای مشتریان ارسال خواهد شد.
              </div>
            </div>

            <q-toggle v-model="form.toggle"
                      color="primary"
                      size="xl"
                      class="col-7 no-padding"
                      @click="setStatus"
            />
          </div>

          <div
            v-if="form.toggle"
          >
            <div
              class="row q-col-gutter-y-lg q-pt-md"
            >
              <div
                class="col-sm-3 col-12 q-gutter-y-md"
              >
                <div>
                  <label>روش اطلاع رسانی <span
                    class="text-primary"
                  >*</span></label>

                  <q-select v-model="form.announcType"
                            outlined
                            dense
                            :rules="[requiredRule]"
                            :options="typeOptions"
                            emit-value
                            map-options
                            lazy-rules
                            no-error-icon
                            hide-bottom-space
                            class="col-12 col-sm-4"
                            label="روش اطلاع رسانی را انتخاب کنید "
                  />
                </div>

                <div>
                  <label>دفعات اطلاع رسانی <span
                    class="text-primary"
                  >*</span></label>
                  <q-select v-model="form.announcCount"
                            outlined
                            dense
                            :rules="[requiredRule]"
                            :options="dateOptions"
                            emit-value
                            map-options
                            multiple
                            lazy-rules
                            no-error-icon
                            hide-bottom-space
                            class="col-12 col-sm-4"
                            placeholder="دفعات اطلاع رسانی را انتخاب کنید"
                            hint="در آخرین روز، به صورت خودکار اطلاع رسانی تمدید انجام خواهد شد."
                  >
                    <template
                      #option="{ itemProps, opt, selected, toggleOption }"
                    >
                      <q-item
                        v-bind="itemProps"
                      >
                        <q-item-section
                          side
                        >
                          <q-checkbox :model-value="selected"
                                      @update:model-value="toggleOption(opt)"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template
                      #selected-item="scope"
                    >
                      <q-chip :removable="!scope.opt.disable"
                              :tabindex="scope.tabindex"
                              square
                              :color="scope.opt.color"
                              text-color="black"
                              class="q-ma-xs"
                              size="md"
                              @remove="scope.removeAtIndex(scope.index)"
                      >
                        {{ scope.opt.label }}
                      </q-chip>
                    </template>
                  </q-select>
                </div>

                <div
                  class="q-gutter-y-xs"
                >
                  <label>متن اطلاع رسانی</label>

                  <q-card bordered
                          class="q-pa-md"
                  >
                    <q-card-section
                      class="row justify-center bg-white-2"
                    >
                      <div
                        v-html="form.text"
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>

            <q-card-actions
              align="right"
            >
              <q-btn label="ذخیره"
                     color="primary"
                     class="col-2"
                     type="submit"
                     :loading="newConfigLoading"
              />
            </q-card-actions>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
