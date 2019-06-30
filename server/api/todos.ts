import { Router } from 'express'
import { Todo } from 'models'

const router = Router()

router.get('/', async function (req, res) {
  await res.json(await Todo.find())
})

router.post('/', async function (req, res) {
  const { title, done = false }: typeof Todo = req.body
  await Todo.create({ title, done })
  res.status(201).end()
})

export default router
