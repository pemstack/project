import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { inProject, inSrc } from 'globals'
import { AuthModule } from 'modules/auth'
import { TodosModule } from 'modules/todos'
import { ConfigModule, ConfigService } from 'nestjs-config'

@Module({
  imports: [
    ConfigModule.load(
      inSrc('**/!(*.d.ts).config.{ts,js}'),
      {
        modifyConfigName: name => name.replace('.config', ''),
        path: inProject()
      }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: inProject('schema.gql')
    }),
    AuthModule,
    TodosModule
  ]
})
export class AppModule { }
