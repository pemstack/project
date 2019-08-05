import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from 'modules/app'
import { swaggerSetup } from 'swagger/swagger.setup'
import helmet from 'helmet'

async function bootstrap() {
  const basePath = process.env.NEST_BASE_PATH || 'api'

  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(helmet())
  app.setGlobalPrefix(basePath)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  swaggerSetup(app)

  await app.listen(4000)
}

bootstrap().catch(console.error)
