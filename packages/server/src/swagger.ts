import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication, basePath: string) {
  const options = new DocumentBuilder()
    .setBasePath(basePath)
    .setTitle('@my-app')
    .setDescription('@my-app API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${basePath}/docs`, app, document)
}
