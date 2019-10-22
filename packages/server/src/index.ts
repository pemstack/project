import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import helmet from 'helmet'
import { AppModule } from 'modules/app'
import { swaggerSetup } from 'swagger/swagger.setup'

export async function bootstrap(port = 4000) {
  const basePath = process.env.NEST_BASE_PATH || 'api'

  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(helmet())
  app.use(compression())
  app.setGlobalPrefix(basePath)
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  swaggerSetup(app)

  await app.listen(port)
}

if (require.main === module) {
  bootstrap().catch(console.error)
}
