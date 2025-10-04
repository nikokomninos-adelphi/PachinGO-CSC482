import { Request, Response } from "express";
import { registerUser } from "./userController.ts";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
jest.mock("../models/User");

beforeEach(() => {
  mockRequest = {};
  mockResponse = { 
    status: jest.fn().mockReturnThis(),
    json: jest.fn() 
  };
});

test('Checks if username or password is less than 5 characters', async () => {
  const expectedError = { "error": "Username and password must be at least 5 characters" }
  const expectedStatus = 400;

  mockRequest = {
    "body": {"username": "test", "password": "TestPass"},
  };

  await registerUser(mockRequest as Request, mockResponse as Response);
  expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
  expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
});
