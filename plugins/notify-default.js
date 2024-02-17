import { roundCheckCircle, roundCancel, roundInfo, roundError } from '@quasar/extras/material-icons-round'

export default defineNuxtPlugin(nuxtApp => {
  const notificationTypes = {
    success: {
      icon: roundCheckCircle,
      classes: 'custom-notify-success no-shadow text-body2 border-radius-8',
      message: 'Success',
      iconSize: '40px',
      progress: true,
      textColor: 'dark',
      iconColor: 'success',
      badgeColor: 'success'
    },
    error: {
      icon: roundCancel,
      classes: 'custom-notify-error no-shadow text-body2 border-radius-8',
      message: 'Error',
      iconSize: '40px',
      progress: true,
      textColor: 'error',
      iconColor: 'error',
      badgeColor: 'error'
    },
    alert: {
      icon: roundInfo,
      classes: 'custom-notify-alert no-shadow text-body2 border-radius-8',
      message: 'Info',
      iconSize: '40px',
      progress: true,
      textColor: 'neutral-1',
      iconColor: 'primary',
      badgeColor: 'primary'
    },
    notic: {
      icon: roundError,
      classes: 'custom-notify-warning no-shadow text-body2 border-radius-8',
      message: 'Warning',
      iconSize: '40px',
      progress: true,
      textColor: 'neutral-1',
      iconColor: 'warning',
      badgeColor: 'warning'
    }
  }

  Notify.registerType('success', notificationTypes.success)
  Notify.registerType('error', notificationTypes.error)
  Notify.registerType('alert', notificationTypes.alert)
  Notify.registerType('notic', notificationTypes.notic)

  function useNotif () {
    const $notify = (type, message, options, position = 'top') => {
      const notificationOptions = notificationTypes[type]

      Notify.create({
        ...notificationOptions,
        ...options,
        progress: false,
        multiLine: true,
        position,
        message
      })
    }

    return {
      $notify
    }
  }

  // Here you inject $notify into Nuxt so it can be used in your application
  nuxtApp.provide('notify', useNotif())
})
