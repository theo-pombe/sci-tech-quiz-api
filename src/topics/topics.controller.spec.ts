import { Test, TestingModule } from '@nestjs/testing';
import { AdminTopicsController } from './admin-topics.controller';
import { TopicsService } from './topics.service';

describe('TopicsController', () => {
  let controller: AdminTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTopicsController],
      providers: [TopicsService],
    }).compile();

    controller = module.get<AdminTopicsController>(AdminTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
