import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    TasksModule,
    DatabaseModule,
  ],
})
export class AppModule { }
