import loadScript from 'load-script2'

export default async function load() {
  if ((window as any).__grecaptcha_ready) {
    return (window as any).__grecaptcha_ready
  }

  await loadScript('https://www.google.com/recaptcha/api.js?render=' + process.env.REACT_APP_RECAPTCHA_KEY)
  return new Promise((resolve, reject) => {
    const grecaptcha = (window as any).grecaptcha
    if (typeof grecaptcha === 'undefined') {
      return reject()
    }

    let done = false
    grecaptcha.ready(() => {
      (window as any).__grecaptcha_ready = grecaptcha
      if (!done) {
        done = true
        resolve(grecaptcha)
      }
    })

    setTimeout(() => {
      if (!done) {
        done = true
        reject()
      }
    }, 5000)
  })
}
