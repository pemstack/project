import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import swaggerConfig from './swagger.config'

export function swaggerSetup(app: INestApplication) {
  const {
    title,
    description,
    version,
    basePath,
    path
  } = swaggerConfig

  const options = new DocumentBuilder()
    .setBasePath(basePath)
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${basePath}/${path}`, app, document)
}
