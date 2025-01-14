import { vi } from 'vitest';
import getUserByIdController from '../controllers/users.mjs';

const mockRequest = {
  foundUserIndex: 1,
};

const mockResponse = {
  sendStatus: vi.fn(),
  send: vi.fn(),
  status: vi.fn().mockImplementation(() => ({ send: vi.fn() })),
};

describe('get users', () => {
  it('should get user by id', () => {
    getUserByIdController(mockRequest, mockResponse);
  });
});
