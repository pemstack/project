import api from 'api'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
})

mongoose.connect(process.env.DB_URI as string, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())

app.use('/api', api)

app.listen(4000)
