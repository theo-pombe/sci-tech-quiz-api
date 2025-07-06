import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';
import { AdminSubjectsController } from './admin-subjects.controller';
import { PublicSubjectsController } from './public-subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [AdminSubjectsController, PublicSubjectsController],
  providers: [SubjectsService],
  exports: [TypeOrmModule, SubjectsService],
})
export class SubjectsModule {}
