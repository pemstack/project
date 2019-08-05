export default {
  siteKey: process.env.RECAPTCHA_SITE_KEY,
  secretKey: process.env.RECAPTCHA_SECRET_KEY,
  tokenExpiration: process.env.RECAPTCHA_TOKEN_EXPIRATION || '30',
  verifyUrl: process.env.RECAPTCHA_VERIFY_URL || 'https://www.google.com/recaptcha/api/siteverify'
}
