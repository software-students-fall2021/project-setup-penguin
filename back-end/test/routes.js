/**
 * assumptions:
 * a12ccfc9-21da-4430-a37c-69416621dc09 is an existing deck id
 * 0 is a nonexistent deck id
 */
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Decks", () => {
  describe("POST /", () => {
    it("should return id of newly created deck", (done) => {
      chai
        .request(app)
        .post("/deck")
        .send({
          cardTemplate: {},
          deckName: "generated",
          deckDescription: "from mocha test",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("deckId");
          done();
        });
    });
  });
  describe("PATCH /", () => {
    it("should return error when updating nonexistent deck", (done) => {
      chai
        .request(app)
        .patch("/deck/0")
        .send({
          deckName: "updated",
          deckDescription: "from mocha test",
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error.message).to.equal(
            "Cannot find deck in database"
          );
          done();
        });
    });
    it("should return id of updated deck", (done) => {
      chai
        .request(app)
        .patch("/deck/a12ccfc9-21da-4430-a37c-69416621dc09")
        .send({
          deckName: "updated",
          deckDescription: "from mocha test",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("deckId");
          done();
        });
    });
  });
  describe("GET /", () => {
    it("should return an error when getting nonexistent deck", (done) => {
      chai
        .request(app)
        .get("/deck/-1")
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error.message).to.equal(
            "Cannot find deck in database"
          );
          done();
        });
    });
  });
});

describe("Cards", () => {
  describe("POST /", () => {
    it("should return error when adding to nonexistent deck", (done) => {
      chai
        .request(app)
        .post("/card")
        .send({ newCard: {}, deckId: 0 })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error.message).to.equal(
            "Cannot add card to nonexistent deck"
          );
          done();
        });
    });
    it("should return id of newly created card", (done) => {
      chai
        .request(app)
        .post("/card")
        .send({ newCard: {}, deckId: "a12ccfc9-21da-4430-a37c-69416621dc09" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("cardId");
          done();
        });
    });
  });
});
