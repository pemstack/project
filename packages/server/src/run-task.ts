import { Module } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'modules/app'
import fs from 'fs'
import path from 'path'

async function bootstrap(argv: string[]) {
  const [tsNode, index, taskName, ...args] = argv
  if (!taskName || typeof taskName !== 'string') {
    return
  }

  const taskPath = path.join(__dirname, 'tasks', taskName + '.task.ts')
  if (!fs.existsSync(taskPath)) {
    console.log('Task not found.')
    return
  }

  interface RequiredModule {
    default: any
    imports?: any[]
  }

  const { default: TaskService, imports = [] } = require(taskPath) as RequiredModule
  if (!TaskService) {
    return
  }

  @Module({
    imports: [AppModule, ...imports],
    providers: [TaskService]
  })
  class TaskModule { }

  const app = await NestFactory.createApplicationContext(TaskModule)
  const service = app.select(TaskModule).get(TaskService)
  try {
    if (typeof service.run === 'function') {
      await service.run([tsNode, taskPath, ...args])
    }
  } finally {
    app.close()
  }
}

bootstrap(process.argv).catch(console.error)
