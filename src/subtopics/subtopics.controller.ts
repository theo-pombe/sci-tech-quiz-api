import { Controller } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';

@Controller('subtopics')
export class SubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) {}
}
