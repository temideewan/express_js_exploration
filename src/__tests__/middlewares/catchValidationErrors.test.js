import { vi } from 'vitest';
import * as ExpressValidator from 'express-validator';
import { catchValidationErrors } from '../../utils/middlewares.mjs';
vi.mock('express-validator', () => ({
  validationResult: vi.fn(() => ({
    isEmpty: vi.fn(() => false),
    array: vi.fn(() => [{ msg: 'Invalid field' }]),
  })),
}));

const mockResponse = {
  status: vi.fn(() => mockResponse),
  send: vi.fn(() => mockResponse),
};
const mockRequest = {};
const next = vi.fn();

describe('catches the validation errors', () => {
  it('should return a status of 400 when there are errors', () => {
    
    const validationResultSpy = vi.spyOn(ExpressValidator, 'validationResult');
    catchValidationErrors(mockRequest, mockResponse, next);
    expect(validationResultSpy).toHaveBeenCalled(1);
    expect(validationResultSpy).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      errors: ['Invalid field'],
    });
  });

  it('should call the next function if there is no error caught by the middleware', async () => {
    vi.spyOn(ExpressValidator, 'validationResult').mockImplementationOnce(() => ({
      isEmpty: vi.fn(() => true),
    }))
    await catchValidationErrors(mockRequest, mockResponse, next);
    expect(next).toHaveBeenCalled(1);
   });
});
