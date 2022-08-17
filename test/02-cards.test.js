const { mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { userModel, cardsModel } = require("../models");
const { tokenSigning } = require("../utils/handleJwt");
const { encrypt } = require("../utils/passwordManagement");
const { messiCard, invalidBody } = require("./helpers/cards.helper");
let JWT_TOKEN_ADMIN = "";
let JWT_TOKEN_USER = "";

beforeAll(async () => {
  await userModel.deleteMany({});
  await cardsModel.deleteMany({});
  const passAdmin = await encrypt("123456");
  const passUser = await encrypt("1234");

  const admin = await userModel.create({
    username: "uniqueadmin",
    email: "admin@admin.com",
    password: passAdmin,
    role: ["admin"],
  });

  const user = await userModel.create({
    username: "test",
    email: "test@test.com",
    password: passUser,
    role: ["collectionist"],
  });

  JWT_TOKEN_ADMIN = await tokenSigning(admin);
  JWT_TOKEN_USER = await tokenSigning(user);
});

// .set('Authorization', 'Bearer ' + token)

describe("Test of /api/cards", () => {
  test("This should return a 403 status code. | POST Cards | Invalid role", async () => {
    const response = await supertest(app)
      .post("/api/cards")
      .set("Authorization", "Bearer " + JWT_TOKEN_USER);
    expect(response.statusCode).toEqual(403);
    expect(response._body.error).toEqual("No valid permissions");
  });

  test("This should return a 201 status code. | POST Cards | Valid role", async () => {
    const response = await supertest(app)
      .post("/api/cards")
      .set("Authorization", "Bearer " + JWT_TOKEN_ADMIN)
      .send(messiCard);
    expect(response.statusCode).toEqual(201);
    expect(response._body.msj).toEqual("Card successfully created");
  });

  test("This should return a 201 status code. | POST Cards | Duplicated card", async () => {
    const response = await supertest(app)
      .post("/api/cards")
      .set("Authorization", "Bearer " + JWT_TOKEN_ADMIN)
      .send(messiCard);
    expect(response.statusCode).toEqual(409);
    expect(response._body.error).toEqual(
      "The player Leonel Messi already exists in the team argentina"
    );
  });

  test("This should return a 403 status code. | POST Cards | Invalid body", async () => {
    const response = await supertest(app)
      .post("/api/cards")
      .set("Authorization", "Bearer " + JWT_TOKEN_ADMIN)
      .send(invalidBody);

    expect(response.statusCode).toEqual(403);
    expect(response._body.errors.length).toEqual(5)
  });

  test("This should return a 401 status code. | POST Cards | No token", async () => {
    const response = await supertest(app).post("/api/cards");
    expect(response.statusCode).toEqual(401);
    expect(response._body.error).toEqual("Need to start section");
  });

  test("This should return a 401 status code. | GET Cards | No token", async () => {
    const response = await supertest(app).get("/api/cards");
    expect(response.statusCode).toEqual(401);
    expect(response._body.error).toEqual("Need to start section");
  });
});
