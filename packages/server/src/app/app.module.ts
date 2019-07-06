import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { inSrc, inProject } from 'globals'
import { TodosModule } from 'todos';

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
    TodosModule
  ]
})
export class AppModule { }
