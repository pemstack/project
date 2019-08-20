import { message } from 'antd'
import i18n from 'i18next'

export class MessagesStore {
  showError(error?: string) {
    message.error(error || i18n.t('error.general'))
  }
}
