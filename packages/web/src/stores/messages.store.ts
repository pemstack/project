import { message } from 'antd'
import i18n from 'i18next'

export class MessagesStore {
  successKey(key: string) {
    message.success(i18n.t(key))
  }

  success(text: string) {
    message.success(text)
  }

  error(error?: string) {
    message.error(error || i18n.t('error.general'))
  }
}
