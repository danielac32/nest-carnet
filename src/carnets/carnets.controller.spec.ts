import { Test, TestingModule } from '@nestjs/testing';
import { CarnetsController } from './carnets.controller';
import { CarnetsService } from './carnets.service';

describe('CarnetsController', () => {
  let controller: CarnetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarnetsController],
      providers: [CarnetsService],
    }).compile();

    controller = module.get<CarnetsController>(CarnetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
