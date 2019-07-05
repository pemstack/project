import './hook'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import * as controllers from 'controllers'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useContainer as routingUseContainer,
  useExpressServer
} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import swaggerUi from 'swagger-ui-express'
import { Container } from 'typedi'
import { createConnection, useContainer as ormUseContainer } from 'typeorm'

async function main() {
  dotenv.config({
    path: path.resolve(__dirname, '..', '.env')
  })

  routingUseContainer(Container)
  ormUseContainer(Container)
  const connection = await createConnection()

  const apiOptions: RoutingControllersOptions = {
    controllers: Object.values(controllers),
    cors: true,
    routePrefix: '/api'
  }

  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  const schemas = validationMetadatasToSchemas(metadatas, {
    refPointerPrefix: '#/components/schemas/'
  })

  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, apiOptions, {
    components: {
      schemas,
      securitySchemes: {
        basicAuth: {
          scheme: 'basic',
          type: 'http'
        }
      }
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: '@my-app API',
      version: '1.0.0'
    }
  })

  const app = express()

  app.get('/api/swagger.json', (req, res) => {
    res.json(spec)
  })

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec))

  useExpressServer(app, apiOptions)

  app.listen(4000)
}

main().catch(console.error)
