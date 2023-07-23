import { Test, TestingModule } from '@nestjs/testing';
import { PoController } from './po.controller';

describe('PoController', () => {
  let controller: PoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoController],
    }).compile();

    controller = module.get<PoController>(PoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
