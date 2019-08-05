import { inSrc, inProject } from 'globals'

export default {
  type: 'sqlite',
  database: inProject('data/db.sqlite'),
  synchronize: true,
  logging: false,
  entities: [
    inSrc('**/!(*.d.ts).entity.{ts,js}')
  ],
  migrations: [
    inSrc('database/migrations/**/!(*.d.ts).{ts,js}')
  ],
  subscribers: [
    '**/!(*.d.ts).subscriber.{ts,js}'
  ],
  cli: {
    entitiesDir: inSrc('database/entities'),
    migrationsDir: inSrc('database/migrations'),
    subscribersDir: inSrc('database/subscribers')
  }
}
