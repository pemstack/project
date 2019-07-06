import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from 'app'
import { setupSwagger } from 'swagger'

async function bootstrap() {
  const basePath = process.env.NEST_BASE_PATH || 'api'

  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(basePath)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))
  setupSwagger(app, basePath)
  await app.listen(4000)
}

bootstrap().catch(console.error)
