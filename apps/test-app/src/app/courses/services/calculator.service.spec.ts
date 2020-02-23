import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';
import { createService, SpectatorService } from '@netbasal/spectator';

describe('CalculatorService', () => {
  let spectator: SpectatorService<CalculatorService>;
  const test = createService({
    service: CalculatorService,
    mocks: [LoggerService]
  });
  beforeEach(() => (spectator = test));

  it('should exist', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should add two numbers', () => {
    const mockedValue = 'Addition operation called';
    const expectedValue = 'Addition operation called';
    const loggerService = spectator.get<LoggerService>(LoggerService);
    loggerService.log.and.returnValue(mockedValue);
    const result = spectator.service.add(2, 2);
    expect(result).toBe(4);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
    expect(loggerService.log()).toBe(expectedValue)
  });

  it('should subtract two numbers', () => {
    const mockedValue = 'Addition operation called';
    const expectedValue = 'Addition operation called';
    const loggerService = spectator.get<LoggerService>(LoggerService);
    loggerService.log.and.returnValue(mockedValue);
    const result = spectator.service.subtract(2, 2);
    expect(result).toBe(0);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
    expect(loggerService.log()).toBe(expectedValue)
  });
});
