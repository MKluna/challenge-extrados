const { mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { userModel } = require("../models");
const {
  registerUserSuccessful,
  testAuthFailLogin,
  testAuthSuccessful,
  registerUser,
} = require("./helpers/auth.helper");

beforeAll(async () => {
  await userModel.deleteMany({});
});

describe("Test of /api/auth", () => {

  test("This should return a 200 status code. | Register  Successful User", async () => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .send(registerUserSuccessful);
    expect(response.statusCode).toEqual(201);
  });

  test("This should return a 404 status code. | Fail Login", async () => {
    const response = await supertest(app)
      .post("/api/auth/login")
      .send(testAuthFailLogin);
    expect(response.statusCode).toEqual(404);
  });

  test("This should return a 200 status code. | Login Successful User", async () => {
    const response = await supertest(app)
      .post("/api/auth/login")
      .send(testAuthSuccessful);
    expect(response.statusCode).toEqual(200);
  });

  test("This should return a 403 status code. | Fail Register | No username sent", async () => {
    delete registerUser["username"];
    const response = await supertest(app)
      .post("/api/auth/register")
      .send(registerUser);

    const msjError = response.body.errors;


    expect(response.statusCode).toEqual(403);
    expect(msjError[0].msg).toEqual("Invalid value");
    expect(msjError[0].param).toEqual("username");
  });

  test("This should return a 403 status code. | Fail Register | No email sent", async () => {
    registerUser["username"] = "testUnit";
    delete registerUser["email"];
    const response = await supertest(app)
      .post("/api/auth/register")
      .send(registerUser);

    const msjError = response.body.errors;

    expect(response.statusCode).toEqual(403);
    expect(msjError[0].msg).toEqual("Invalid value");
    expect(msjError[0].param).toEqual("email");
  });

  test("This should return a 403 status code. | Fail Register | No password sent", async () => {
    registerUser["username"] = "testUnit";
    registerUser["email"] = "testUnit@test.com";
    delete registerUser["password"];
    const response = await supertest(app)
      .post("/api/auth/register")
      .send(registerUser);

    const msjError = response.body.errors;

    expect(response.statusCode).toEqual(403);
    expect(msjError[0].msg).toEqual("Invalid value");
    expect(msjError[0].param).toEqual("password");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
