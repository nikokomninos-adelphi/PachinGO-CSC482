import { Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import mongoose from "mongoose";

import { registerUser, loginUser } from "../src/controllers/authController.ts";
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
    cookie: jest.fn(),
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
      body: { email: "test@email.com", username: "testUser", password: "TestPass" },
    };

    await registerUser(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedMessage);

  })

  describe("Email Tests", () => {
    test("Error if Email is invalid", async () => {
      const expectedError = {
        message: "Invalid Email",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { email: "test@email", username: "testUser", password: "TestPass" },
      };

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if Email already exists", async () => {
      const expectedError = {
        message: "Email already exists",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { email: "test@email.com", username: "testUser2", password: "TestPass" },
      };

      const fakeUser = new User({
        email: "test@email.com",
        username: "testUser",
        password: "myPassword",
        role: "user",
      });
      await fakeUser.save();

      await registerUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Username Tests", () => {
    test("Error if Username is < 5 characters", async () => {
      const expectedError = {
        message: "Username and Password must be at least 5 characters",
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
        message: "Username and Password must be less than 50 characters",
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
        message: "Username and Password cannot contain spaces",
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
        message: "Username already exists",
      };
      const expectedStatus = 400;

      mockRequest = {
        body: { email: "test@email.com", username: "testUser", password: "TestPass" },
      };

      const fakeUser = new User({
        email: "test@email.com",
        username: "testUser",
        password: "myPassword",
        role: "user",
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
        message: "Username and Password must be at least 5 characters",
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
        message: "Username and Password must be less than 50 characters",
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
        message: "Username and Password cannot contain spaces",
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
        message: "Password must contain at least one uppercase character",
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
    test("Success if valid credentials (username)", async () => {
      const expectedBody = {
        message: "Login successful",
      };
      const expectedStatus = 200;
      const expectedCookie = ["token", expect.any(String), expect.any(Object)]

      mockRequest = {
        body: { username: "testUser", password: "TestPass" },
      };

      let registerMockRequest: Partial<Request> = {
        body: { email: "test@email.com", username: "testUser", password: "TestPass" },
      };

      let registerMockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await registerUser(registerMockRequest as Request, registerMockResponse as Response);

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedBody);
      expect(mockResponse.cookie).toHaveBeenCalledWith(expectedCookie[0], expectedCookie[1], expectedCookie[2]);
    });

    test("Success if valid credentials (email)", async () => {
      const expectedBody = {
        message: "Login successful",
      };
      const expectedStatus = 200;
      const expectedCookie = ["token", expect.any(String), expect.any(Object)]

      mockRequest = {
        body: { username: "test@email.com", password: "TestPass" },
      };

      let registerMockRequest: Partial<Request> = {
        body: { email: "test@email.com", username: "testUser", password: "TestPass" },
      };

      let registerMockResponse: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await registerUser(registerMockRequest as Request, registerMockResponse as Response);

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedBody);
      expect(mockResponse.cookie).toHaveBeenCalledWith(expectedCookie[0], expectedCookie[1], expectedCookie[2]);
    });
  describe("Username Tests", () => {
    test("Error if user does not exist (email)", async () => {
      const expectedError = {
        message: "Invalid credentials",
      };
      const expectedStatus = 401;

      mockRequest = {
        body: { username: "test@email.com", password: "TestPass" },
      };

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });

    test("Error if user does not exist (username)", async () => {
      const expectedError = {
        message: "Invalid credentials",
      };
      const expectedStatus = 401;

      mockRequest = {
        body: { username: "testUser", password: "TestPass" },
      };

      await loginUser(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("Password Tests", () => {

    test("Error if passwords do not match", async () => {
      const expectedError = {
        message: "Invalid credentials",
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
