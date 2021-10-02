const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

let recipe = {};

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => {});

  describe("Validators", () => {
    beforeEach(() => {
      recipe = {
        name: "abcdefg",
        resume: "This is a correct Resume",
        score: 10,
        level: 10,
        step: "This is a good Step",
      };
      return Recipe.sync({ force: true });
    });
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should throw an error if resume is null", (done) => {
        Recipe.create({ name: recipe.name })
          .then(() => done(new Error("It requires a valid resume")))
          .catch(() => done());
      });

      it("return object when data is valid", (done) => {
        Recipe.create({ raw: true, ...recipe })
          .then(({ dataValues }) => {
            expect(dataValues).to.eql({ id: dataValues.id, ...recipe });
            done();
          })
          .catch((err) => done(new Error(err)));
      });
    });
  });
});
