import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsModule } from './subjects/subjects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subjects/entities/subject.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicsModule } from './topics/topics.module';
import { Topic } from './topics/entities/topic.entity';
import { SubtopicsModule } from './subtopics/subtopics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Subject, Topic],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // TODO: Turn off in production
      }),
    }),
    SubjectsModule,
    TopicsModule,
    SubtopicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
