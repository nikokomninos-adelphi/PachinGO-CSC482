import { Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import mongoose from "mongoose";

import { registerUser, loginUser } from "../src/controllers/userController.ts";
import User from "../src/models/User.ts";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

/*
ChatGPT helped me learn how to mock a MongoDB instance

Prompt: 'How can I mock a MongoDB database in Jest?'

It led me to install mongodb-memory-server, an npm package
that mocks a MongoDB instance to be used in unit testing.

From the response, I added the following to this file:
  - beforeAll: added code to spin up a mock MongoDB instance to be used for all tests
  - afterEach: added code to drop the database in between each test
  - afterAll: added code to spin down the mock Mongo instance
*/
let mongoServer: MongoMemoryServer;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await mongoose.connection.db?.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tests for registerUser", () => {
  test("Success if valid credentials", async () => {
    const expectedMessage = {
      message: "User registered successfully",
    };
    const expectedStatus = 201;

    mockRequest = {
      body: { username: "testUser", password: "TestPass" },
    };

    await registerUser(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedMessage);

  })

  describe("Username Tests", () => {
    test("Error if Username is < 5 characters", async () => {
      const expectedError = {
        error: "Username and Password must be at least 5 characters",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "test", password: "TestPass" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Username is > 50 characters", async () => {
      const expectedError = {
        error: "Username and Password must be less than 50 characters",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: {
          username: "LoremipsumdolorsitametconsecteturadipiscingelitSeddoeiusm",
          password: "TestPass",
        },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Username contains a space", async () => {
      const expectedError = {
        error: "Username and Password cannot contain spaces",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "test User", password: "TestPass" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Username already exists", async () => {
      const expectedError = {
        error: "Username already exists",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "testUser", password: "TestPass" },
      };

      const fakeUser = new User({
        username: "testUser",
        password: "myPassword",
      });
      await fakeUser.save();

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Password Tests", () => {
    test("Error if Password is < 5 characters", async () => {
      const expectedError = {
        error: "Username and Password must be at least 5 characters",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "testUser", password: "test" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Password is > 50 characters", async () => {
      const expectedError = {
        error: "Username and Password must be less than 50 characters",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: {
          username: "testUser",
          password: "LoremipsumdolorsitametconsecteturadipiscingelitSeddoeiusm",
        },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Password contains a space", async () => {
      const expectedError = {
        error: "Username and Password cannot contain spaces",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "testUser", password: "Test Pass" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Password does not contain at least one uppercase character", async () => {
      const expectedError = {
        error: "Password must contain at least one uppercase character",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { username: "testUser", password: "testpass" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Tests for loginUser", () => {
    test("Success if valid credentials", async () => {
      const expectedBody = {
        message: "Login successful",
        token: expect.anything()
      };
      const expectedStatus = 200;

      mockRequest = {
        body: { username: "testUser", password: "TestPass" },
      };

      let loginMockRequest: Partial<Request> = {
        body: { username: "testUser", password: "TestPass" },
      };

      let loginMockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await registerUser(loginMockRequest as Request, loginMockResponse as Response);

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedBody);
    });
  describe("Username Tests", () => {
    test("Error if user does not exist", async () => {
      const expectedError = {
        error: "Invalid credentials",
      };
      const expectedStatus = 401;

      mockRequest = {
        body: { username: "testUser", password: "TestPass" },
      };

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if passwords do not match", async () => {
      const expectedError = {
        error: "Invalid credentials",
      };
      const expectedStatus = 401;

      mockRequest = {
        body: { username: "testUser", password: "WrongPass" },
      };

      let loginMockRequest: Partial<Request> = {
        body: { username: "testUser", password: "TestPass" },
      };

      let loginMockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await registerUser(loginMockRequest as Request, loginMockResponse as Response);

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
