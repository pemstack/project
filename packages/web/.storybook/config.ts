import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import 'i18n'

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  addDecorator(withInfo)
  req.keys().forEach(req)
}

configure(loadStories, module)
