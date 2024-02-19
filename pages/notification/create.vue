<script setup>
import { API_URL_NOTIF } from '~/services'

const { $dayjs } = useNuxtApp()
const { form, formRef, addLoading, newAnnounc } = useForm()
const { announcId, deleteDialog, detailDialog } = useLoadDialog()
const { columns, rows, loading, pagination, tableRef, request, onRequest } = useTable()
onMounted(request)

function useForm () {
  const addLoading = ref(false)
  const formRef = ref(false)
  const form = ref({
    title: '',
    body: ''
  })
  const newAnnounc = () => {
    addLoading.value = true
    useServices().notif.newAnnounc(form.value)
      .then(() => {
        form.value = { title: '', body: '' }

        formRef.value.reset()
        formRef.value.resetValidation()

        useNotify()('success', 'ایجاد اطلاعیه جدید با موفقیت انجام شد')
        request()
      }).catch(err => console.log(err))
      .finally(
        addLoading.value = false
      )
  }

  return {
    form,
    formRef,
    addLoading,
    newAnnounc
  }
}

function useTable () {
  const columns = [
    {
      name: 'id',
      label: 'شناسه',
      align: 'left',
      field: 'id',
      headerStyle: 'font-size:16px'
    },
    {
      name: 'title',
      label: 'عنوان',
      align: 'left',
      field: 'title',
      headerStyle: 'font-size:16px'
    },
    {
      name: 'message',
      label: 'متن پیام',
      align: 'left',
      field: 'body',
      headerStyle: 'font-size:16px'
    },
    {
      name: 'created_at',
      label: 'تاریخ ایجاد',
      align: 'left',
      field: row => datetimeToJalali($dayjs.utc(row.created_at), 'YYYY/MM/DD - HH:mm'),
      headerStyle: 'font-size:16px'
    },
    {
      name: 'action',
      align: 'left',
      field: 'action',
      headerStyle: 'font-size:16px'
    }
  ]
  const { rows, loading, pagination, tableRef, request, onRequest } = useTableHandler({
    url: API_URL_NOTIF.getAnnounc
  })

  return { columns, rows, loading, pagination, tableRef, request, onRequest }
}

function useLoadDialog () {
  const announcId = ref('')
  const dltLoading = ref(false)
  const { loadDialog } = useDialog()
  const removeFn = () => {
    dltLoading.value = true
    useServices().notif.deleteAnnounc(announcId.value)
      .then(() => {
        useNotify()('success', 'اطلاعیه با موفقیت حذف شد')
        request()
      }).catch(err => console.log(err))
      .finally(() => {
        dltLoading.value = false
      })
  }
  const deleteDialog = async (name) => {
    loadDialog(import('@/components/dialogs/DialogDelete.vue'), {
      dltLoading: dltLoading.value,
      text: name,
      removeFn
    })
  }
  const detailDialog = async (details) => {
    loadDialog(import('@/components/dialogs/DialogNotif.vue'), {
      details
    })
  }

  return {
    removeFn,
    announcId,
    dltLoading,
    deleteDialog,
    detailDialog
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
      ایجاد اطلاعیه
    </div>

    <q-card bordered
            flat
            class="border-radius-8"
    >
      <q-card-section>
        <q-form ref="formRef"
                @submit.prevent="newAnnounc"
        >
          <div
            class="row q-col-gutter-y-lg q-pt-md"
          >
            <div
              class="col-sm-6 col-12 q-gutter-y-md"
            >
              <div>
                <label>عنوان <span
                  class="text-primary"
                >*</span></label>

                <q-input v-model="form.title"
                         outlined
                         dense
                         lazy-rules
                         no-error-icon
                         hide-bottom-space
                         :rules="[requiredRule]"
                         class="col-12 col-sm-4"
                         placeholder="عنوان را وارد کنید"
                />
              </div>

              <div>
                <label>متن اطلاعیه <span
                  class="text-primary"
                >*</span></label>

                <q-input v-model="form.body"
                         outlined
                         dense
                         lazy-rules
                         no-error-icon
                         hide-bottom-space
                         :rules="[requiredRule]"
                         type="textarea"
                         class="col-12 col-sm-4"
                         placeholder="متن اطلاعیه را وارد کنید"
                         :hint="`${toPersianNumber(220 - form.body.length)} کاراکتر باقی مانده`"
                         :maxlength="220"
                />
              </div>
            </div>
          </div>

          <q-card-actions
            align="right"
          >
            <q-btn label="ذخیره"
                   color="primary"
                   class="col-sm-2 col-12"
                   type="submit"
                   :loading="addLoading"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
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
          #{{ props.pageIndex + 1 }}
        </td>
      </template>

      <template
        #body-cell-title="props"
      >
        <q-td
          :props="props"
        >
          <div class="ellipsis"
               style="width: 100px"
          >
            {{ props.row.title }}
          </div>
        </q-td>
      </template>

      <template
        #body-cell-message="props"
      >
        <q-td
          :props="props"
        >
          <div class="ellipsis"
               style="width: 200px"
          >
            {{ props.row.body }}
          </div>
        </q-td>
      </template>

      <template
        #body-cell-action="props"
      >
        <td
          :props="props"
        >
          <q-btn label="جزئیات"
                 outline
                 color="primary"
                 class="text-weight-bold"
                 @click="detailDialog(props.row)"
          />

          <q-btn label="حذف"
                 flat
                 color="primary"
                 class="text-weight-bold"
                 @click="deleteDialog('اطلاعیه'), announcId = props.row.id"
          />
        </td>
      </template>
    </q-table>
  </q-page>
</template>
