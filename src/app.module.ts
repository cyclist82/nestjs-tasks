import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    TasksModule,
    DatabaseModule,
  ],
})
export class AppModule { }
