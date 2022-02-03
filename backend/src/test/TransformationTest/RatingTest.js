const chai = require("chai");
let expect = chai.expect;

const ratingTranslator = require("../../../src/controllers/transformation/order-evaluation-ranking-translator");

describe("Test of order evaluation ranking translator", () => {
    it("should return the order evaluation for the given sid 90123", async() =>{

        expect(ratingTranslator.translateRatingToString(1)).to.equal("excellent");
        expect(ratingTranslator.translateRatingToString(2)).to.equal("very good");
        expect(ratingTranslator.translateRatingToString(3)).to.equal("good");
        expect(ratingTranslator.translateRatingToString(4)).to.equal("okay");
        expect(ratingTranslator.translateRatingToString(5)).to.equal("satisfactory");
        expect(ratingTranslator.translateRatingToString(-1)).to.equal("incorrect rating input");
        expect(ratingTranslator.translateRatingToString(50)).to.equal("incorrect rating input");
    })
});
