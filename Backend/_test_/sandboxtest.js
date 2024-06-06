const request = require("supertest");
const app = require("../src/index");
const { Member, Book, BorrowedBook } = require("../models");
const e = require("express");

beforaAll(async () => {
  try {
    const members = require("../mockData/members.json");
    const books = require("../mockData/books.json");
    await Member.bulkCreate(members, { individualHooks: true });
    await Book.bulkCreate(books);
  } catch (error) {
    console.log(error);
  }
});

let token;
let invalidToken = "asdasdasdasd";

describe("POST /login", () => {
  test("should return access token", async () => {
    let members = {
      code: "M001",
      password: "Angga123",
    };
    const response = await request(app).post("/login").send(members);
    const { body, status } = response;
    token = body.acces_token;
    expect(status).toBe(200);
    expefc(body).toBeInstanceOf("Object");
    expect(body).toHaveProperty("acces_token", expect.any(String));
  });

  test("should return error when invalid input", async () => {
    let members = {
      code: "M001",
    };
    const response = await request(app).post("/login").send(members);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Code / Name / Password cannot be empty");
  });
  test("should return error when invalid input", async () => {
    let members = {
      password: "Angga123",
    };
    const response = await request(app).post("/login").send(members);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Code / Name / Password cannot be empty");
  });

  test("should return error when invalid member", async () => {
    let members = {
      code: "M002",
      password: "Angga123",
    };
    const response = await request(app).post("/login").send(members);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error login member not found / password not matched");
  });
  test("should return error when invalid member", async () => {
    let members = {
      code: "M001",
      password: "Angga1234",
    };
    const response = await request(app).post("/login").send(members);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error login member not found / password not matched");
  });
});

describe("POST /register", () => {
  test("should return new member", async () => {
    let members = {
      name: "Burhan",
      password: "Burhan123",
      penaltyStatus: false,
      penaltyDate: null,
    };
    const response = await request(app).post("/register").send(members);
    const { body, status } = response;
    expect(status).toBe(201);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("code", expect.any(String));
    expect(body).toHaveProperty("name", "Angga");
    expect(body).toHaveProperty("password", expect.any(String));
    expect(body).toHaveProperty("penaltyStatus", false);
    expect(body).toHaveProperty("penaltyDate", null);
  });

  test("should return error when invalid input", async () => {
    let members = {
      name: "Angga",
      penaltyStatus: false,
      penaltyDate: null,
    };
    const response = await request(app).post("/register").send(members);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Password is required");
  });

  test("should return error when invalid input", async () => {
    let members = {
      password: "Angga123",
      penaltyStatus: false,
      penaltyDate: null,
    };
    const response = await request(app).post("/register").send(members);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Name is required");
  });

  test("should return error when password less than 5", async () => {
    let members = {
      name: "Angga",
      password: "Angga",
      penaltyStatus: false,
      penaltyDate: null,
    };
    const response = await request(app).post("/register").send(members);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Password atleast 5 characters");
  });
});

describe("GET /members", () => {
  test("should return all members", async () => {
    const response = await request(app).get("/members").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  test("should return error when invalid token", async () => {
    const response = await request(app).get("/members").set("Authorization", `Bearer ${invalidToken}`);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error Authentication");
  });
});

describe("GET /members/:id", () => {
  test("should return member detail", async () => {
    const response = await request(app).get("/members/1").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("code", expect.any(String));
    expect(body).toHaveProperty("name", expect.any(String));
    expect(body).toHaveProperty("penaltyStatus", expect.any(Boolean));
    expect(body).toHaveProperty("penaltyDate", expect.any(String));
    expect(body).toHaveProperty("count", expect.any(Number));
  });

  test("should return error when invalid token", async () => {
    const response = await request(app).get("/members/1").set("Authorization", `Bearer ${invalidToken}`);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error Authentication");
  });
});

describe("POST /borrow", () => {
  test("should return new borrowed book", async () => {
    const response = await request(app).post("/booklend/borrow/1").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(201);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("memberId", expect.any(Number));
    expect(body).toHaveProperty("bookId", expect.any(Number));
    expect(body).toHaveProperty("returned", false);
    expect(body).toHaveProperty("returnedAt", null);
  });

  test("should return error when invalid token", async () => {
    const response = await request(app).post("/booklend/borrow/2").set("Authorization", `Bearer ${invalidToken}`);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("should error when stock empty", async () => {
    const response = await request(app).post("/booklend/borrow/1").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Book stock is empty");
  });

  test("should error when limit exceeded", async () => {
    const response = await request(app).post("/booklend/borrow/3").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Member has exceeded the borrowing limit");
  });

  test("should error when member penalized", async () => {
    const response = await request(app).post("/booklend/borrow/4").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Member is penalized cannot borrow book");
  });
});

describe("POST /return", () => {
  test("should return returned book", async () => {
    const response = await request(app).post("/booklend/return/1").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("memberId", expect.any(Number));
    expect(body).toHaveProperty("bookId", expect.any(Number));
    expect(body).toHaveProperty("returned", true);
    expect(body).toHaveProperty("returnedAt", expect.any(String));
  });

  test("should return error when invalid token", async () => {
    const response = await request(app).post("/booklend/return/2").set("Authorization", `Bearer ${invalidToken}`);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error Authentication");
  });

  test("should error when book already returned", async () => {
    const response = await request(app).post("/booklend/return/1").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Book already returned");
  });

  test("should error when book not found", async () => {
    const response = await request(app).post("/booklend/return/2").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "Not Found");
  });
});

describe("GET /book", () => {
  test("should return all books", async () => {
    const response = await request(app).get("/books").set("Authorization", `Bearer ${token}`);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Array);
  });

  test("should return error when invalid token", async () => {
    const response = await request(app).get("/books").set("Authorization", `Bearer ${invalidToken}`);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Error Authentication");
  });
});

// cleanup database

afterAll(async () => {
  try {
    await BorrowedBook.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await Member.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await Book.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
  } catch (error) {
    console.log(error);
  }
});
