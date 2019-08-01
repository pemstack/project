import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from 'nestjs-config'

export function swaggerSetup(app: INestApplication) {
  const swaggerConfig = app.get(ConfigService).get('swagger')
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
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${basePath}/${path}`, app, document)
}
