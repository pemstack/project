import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from 'app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
    .setBasePath('api')
    .setTitle('@my-app')
    .setDescription('@my-app API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(4000)
}

bootstrap().catch(console.error)
