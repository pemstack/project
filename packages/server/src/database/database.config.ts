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
    inSrc('database/migration/**/!(*.d.ts).{ts,js}')
  ],
  subscribers: [
    '**/!(*.d.ts).subscriber.{ts,js}'
  ],
  cli: {
    entitiesDir: inSrc('database/entity'),
    migrationsDir: inSrc('database/migration'),
    subscribersDir: inSrc('database/subscriber')
  }
}
