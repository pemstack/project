import { message } from 'antd'
import i18n from 'i18next'
import { Dictionary } from '@pema/utils'

export class MessagesStore {
  successKey(key: string) {
    message.success(i18n.t(key))
  }

  success(text: string) {
    message.success(text)
  }

  errorKey(error: string, options?: Dictionary) {
    message.error(i18n.t(error, options))
  }

  error(error?: string) {
    message.error(error || i18n.t('error.general'))
  }
}
