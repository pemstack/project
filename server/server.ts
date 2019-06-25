import express from 'express'

const app = express()

app.use('/api/*', function (req, res) {
  res.send('api')
})

app.listen(4000)
