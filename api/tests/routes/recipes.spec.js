/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);

const recipe = {
  title: "This is a valid title",
  summary: "This is a valid summary for my recipe",
  score: 90,
  healthScore: 100,
  diets: [],
  steps: ["First step", "Second step", "Third step"],
};

describe("Recipe routes", () => {
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );

  describe("GET /recipe", () => {
    it("status 200", (done) => {
      agent.get("/recipe").expect(200, done);
    }).timeout(5000);
    it("status 404", (done) => {
      agent.get("/recipe?name=asdfasdfasdfasdf").expect(404, done);
    });
  });

  describe("GET /recipe/:id", () => {
    it("status 200 valid id", (done) => {
      agent.get("/recipe/716426").expect(200, done);
    });
    it("status 404 not valid id", (done) => {
      agent.get("/recipe/asdfasdfasdf").expect(404, done);
    });
  });

  describe("POST /recipe", () => {
    it("status 200 valid recipe", (done) => {
      agent.post("/recipe").send(recipe).expect(200, done);
    });
    it("status 400 not valid recipe", (done) => {
      agent.post("/recipe").send({}).expect(400, done);
    });
  });
});
