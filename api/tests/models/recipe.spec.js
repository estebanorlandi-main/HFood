const { Recipe, conn } = require("../../src/db.js");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => {});

  describe("Creation", () => {
    beforeEach(() => {
      return Recipe.sync({ force: true });
    });

    describe("Title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({
          summary: "This is a valid summary for the recipe.",
        })
          .then(() => done(new Error("It requires a title")))
          .catch(() => done());
      });
      it("should throw an error if title length < 3", (done) => {
        Recipe.create({
          title: "a",
          summary: "This is a valid summary for the recipe.",
        })
          .then((r) => done(new Error(`It requires a valid title length`)))
          .catch(() => done());
      });
    });

    describe("Summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({ title: "new recipe" })
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should throw an error if summary length < 15", (done) => {
        Recipe.create({ title: "new recipe" })
          .then(() => done(new Error("It requires a valid summary length")))
          .catch(() => done());
      });
    });

    describe("Score", () => {
      it("should throw an erorr if score is string", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: "a",
          healthScore: 100,
        })
          .then(() => done(new Error("health score is integer")))
          .catch(() => done());
      });
      it("should throw an error if score is lower than 0", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: -1,
        })
          .then(() => done(new Error("It requires a score greater than 0")))
          .catch(() => done());
      });
      it("should throw an error if score is greater than 100", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 101,
        })
          .then(() => done(new Error("Max score 100")))
          .catch(() => done());
      });
    });

    describe("Health Score", () => {
      it("should throw an error if health score is string", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 100,
          healthScore: "a",
        })
          .then(() => done(new Error("health score is integer")))
          .catch(() => done());
      });
      it("should throw an error if health score is lower than 0", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 100,
          healthScore: -1,
        })
          .then(() => done(new Error("Min health score 0")))
          .catch(() => done());
      });
      it("should throw an error if health score is greater than 100", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 100,
          healthScore: 101,
        })
          .then(() => done(new Error("Max health score 0")))
          .catch(() => done());
      });
    });
    describe("Steps", () => {
      it("should throw an error if steps has invalid string", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 100,
          healthScore: 100,
          steps: ["valid step", "^", "valid step"],
        })
          .then(() => done(new Error("has invalid strings")))
          .catch(() => done());
      });
    });
    describe("Valid", () => {
      it("should create the recipe with only not null data", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
        })
          .then(() => done())
          .catch(() => done(new Error("not null")));
      });
      it("should create the recipe when everything is ok", (done) => {
        Recipe.create({
          title: "new recipe",
          summary: "this is a valid summary for the recipe.",
          score: 100,
          healthScore: 100,
          steps: ["valid step", "valid step"],
        })
          .then(() => done())
          .catch(() => done(new Error("has invalid properties")));
      });
    });
  });
});
