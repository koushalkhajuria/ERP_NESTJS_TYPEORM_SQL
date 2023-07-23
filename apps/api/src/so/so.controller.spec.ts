import { Test, TestingModule } from '@nestjs/testing';
import { SoController } from './so.controller';

describe('SoController', () => {
  let controller: SoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoController],
    }).compile();

    controller = module.get<SoController>(SoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
