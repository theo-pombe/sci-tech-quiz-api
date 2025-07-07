import { Test, TestingModule } from '@nestjs/testing';
import { PublicQuestionsController } from './public-questions.controller';
import { QuestionsService } from './questions.service';

describe('QuestionsController', () => {
  let controller: PublicQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicQuestionsController],
      providers: [QuestionsService],
    }).compile();

    controller = module.get<PublicQuestionsController>(
      PublicQuestionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
