import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from 'modules/app'
import { swaggerSetup } from 'swagger/swagger.setup'
import helmet from 'helmet'

export async function bootstrap(port = 4000) {
  const basePath = process.env.NEST_BASE_PATH || 'api'

  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(helmet())
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
