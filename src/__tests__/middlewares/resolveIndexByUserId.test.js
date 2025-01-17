import { vi } from 'vitest';
import { resolveIndexByUserId } from '../../utils/middlewares.mjs';

vi.mock('../../utils/constants.mjs', () => ({
  mockUsers: [
    { username: 'test1', id: 1, password: 'test123' },
    { username: 'test2', id: 2, password: 'test123' },
  ],
}));

const mockRequest = {
  params: {
    id: 1,
  },
};
const mockResponse = {
  sendStatus: vi.fn(),
  send: vi.fn(),
  status: vi.fn(() => mockResponse),
};
const mockNext = vi.fn();
describe('test resolve index by user id', () => {
  mockRequest.params.id = 'asdf';
  it('send status of 400 if the user id is not a number', () => {
    resolveIndexByUserId(mockRequest, mockResponse, mockNext);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });

  it('send a status of 404 if user is not found in the array', () => {
    mockRequest.params.id = 3;
    resolveIndexByUserId(mockRequest, mockResponse, mockNext);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
  });
  it('call next if the user is found', () => {
    mockRequest.params.id = 1;
    expect(mockRequest.foundUserIndex).toBeUndefined();
    resolveIndexByUserId(mockRequest, mockResponse, mockNext);
    expect(mockRequest.foundUserIndex).toBeDefined();
    expect(mockNext).toHaveBeenCalled();
  });
});
