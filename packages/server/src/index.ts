import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from 'modules/app'
import { swaggerSetup } from 'swagger/swagger.setup'

async function bootstrap() {
  const basePath = process.env.NEST_BASE_PATH || 'api'

  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix(basePath)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  swaggerSetup(app)

  await app.listen(4000)
}

bootstrap().catch(console.error)
