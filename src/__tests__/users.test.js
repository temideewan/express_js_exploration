import { expect, vi } from 'vitest';
import {
  createUserController,
  getUserByIdController,
} from '../controllers/users.mjs';
import { mockUsers } from '../utils/constants.mjs';
import * as ExpressValidator from 'express-validator';
import * as helpers from '../utils/helpers';
import User from '../mongoose/schemas/user';

const dummyUser = {
  username: 'Test',
  displayname: 'Test name',
  password: 'password',
};
vi.mock('express-validator', () => ({
  matchedData: vi.fn(() => dummyUser),
}));

vi.mock('../utils/helpers.js', () => ({
  hashPassword: vi.fn((password) => `hashed_${password}`),
}));

vi.mock('../mongoose/schemas/user.js');

const mockRequest = {
  foundUserIndex: 1,
};

const mockResponse = {
  sendStatus: vi.fn(),
  send: vi.fn(),
  status: vi.fn(() => mockResponse),
};

describe('get user id', () => {
  it('should get user by id', () => {
    const spied = vi.spyOn(mockResponse, 'send');
    getUserByIdController(mockRequest, mockResponse);
    expect(spied).toHaveBeenCalled();
    expect(spied).toHaveBeenCalledWith(mockUsers[mockRequest.foundUserIndex]);
    expect(spied).toHaveBeenCalledTimes(1);
  });

  it('should send a status of 404 along with message when user is not found', () => {
    const mockRequestCopy = { ...mockRequest, foundUserIndex: 100 };
    const statusSpy = vi.spyOn(mockResponse, 'status');
    const sendSpy = vi.spyOn(mockResponse, 'send');
    getUserByIdController(mockRequestCopy, mockResponse);
    expect(statusSpy).toHaveBeenCalled();
    expect(statusSpy).toHaveBeenCalledTimes(1);
    expect(statusSpy).toHaveBeenCalledWith(404);
    expect(sendSpy).toHaveBeenCalledTimes(1);
  });
});

describe('create users', () => {
  const mockRequest = {};
  it('should return status of 201 and the user created', async () => {
    const matchedDataSpy = vi.spyOn(ExpressValidator, 'matchedData');
    const helperSpy = vi.spyOn(helpers, 'hashPassword');
    const saveSpy = vi.spyOn(User.prototype, 'save').mockResolvedValueOnce({
      ...dummyUser,
      id: 1,
      password: `hashed_password`,
    });
    const mockResponseStatus = vi.spyOn(mockResponse, 'status');
    const mockResponseSend = vi.spyOn(mockResponse, 'send');
    await createUserController(mockRequest, mockResponse);
    expect(matchedDataSpy).toHaveBeenCalledWith(mockRequest);
    expect(helperSpy).toHaveBeenCalledWith('password');
    expect(helperSpy).toHaveReturnedWith('hashed_password');
    expect(User).toHaveBeenCalledWith({
      ...dummyUser,
      password: 'hashed_password',
    });
    expect(saveSpy).toHaveBeenCalled();
    expect(mockResponseStatus).toHaveBeenCalledWith(201);
    expect(mockResponseSend).toHaveBeenCalledWith({ ...dummyUser, id: 1 });
  });

  it('send status code 400 if database call fails', async () => {
    const saveSpy = vi.spyOn(User.prototype, 'save').mockRejectedValueOnce('Failed to save user');
    await createUserController(mockRequest, mockResponse);
    expect(saveSpy).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });
});
