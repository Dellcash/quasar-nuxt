import { Notify } from 'quasar'
import { roundCheckCircle, roundCancel, roundInfo, roundError } from '@quasar/extras/material-icons-round'

const createNotificationType = (icon, classes, message, iconColor, badgeColor) => ({
  icon,
  classes,
  message,
  iconSize: '40px',
  progress: true,
  textColor: iconColor,
  iconColor,
  badgeColor
})

const notificationTypes = {
  success: createNotificationType(roundCheckCircle, 'custom-notify-success no-shadow text-body2 border-radius-8', 'Success', 'success', 'success'),
  error: createNotificationType(roundCancel, 'custom-notify-error no-shadow text-body2 border-radius-8', 'Error', 'error', 'error'),
  alert: createNotificationType(roundInfo, 'custom-notify-alert no-shadow text-body2 border-radius-8', 'Info', 'primary', 'primary'),
  notic: createNotificationType(roundError, 'custom-notify-warning no-shadow text-body2 border-radius-8', 'Warning', 'warning', 'warning')
}

Object.entries(notificationTypes).forEach(([type, config]) => {
  Notify.registerType(type, config)
})

export const useNotify = () => {
  return (type, message, options = {}, position = 'top') => {
    if (process.client) {
      Notify.create({
        ...notificationTypes[type],
        ...options,
        progress: false,
        multiLine: true,
        position,
        message
      })
    }
  }
}
