import { Controller, View, view } from 'app'
import React from 'react'
import './Contact.css'

export default class ContactController implements Controller {
  public onEnter() {
    return view(Contact)
  }
}

export const Contact: View = () => {
  return <div className='Contact'>Contact</div>
}
