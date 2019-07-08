import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { inSrc, inProject } from 'globals'
import { TodosModule } from 'modules/todos'

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
      autoSchemaFile: inProject('schema.gql')
    }),
    TodosModule
  ]
})
export class AppModule { }
