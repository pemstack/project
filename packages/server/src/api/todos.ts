import { Router } from 'express'
import http from 'http-status-codes'
import { Todo } from 'models'

const router = Router()

router.get('/', async function (req, res) {
  await res.json(await Todo.find())
})

router.post('/', async function (req, res) {
  const { title, done = false }: typeof Todo = req.body
  await Todo.create({ title, done })
  res.status(http.CREATED).end()
})

router.delete('/', async function (req, res) {
  await Todo.deleteMany({})
  res.status(http.OK)
})

export default router
