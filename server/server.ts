import dotenv from 'dotenv'
import express from 'express'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
})

const app = express()

app.use('/api/*', function (req, res) {
  res.send('api')
})

app.listen(4000)
