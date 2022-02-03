const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;

const ratingTranslator = require("../../../src/controllers/transformation/order-evaluation-ranking-translator");

describe("Test of order evaluation ranking translator", () => {
    it("should return the order evaluation for the given sid 90123", async() =>{


        expect(orderEval).to.length(3);
        expect(orderEval[0].nameProduct).to.equal("HooverClean");
        expect(orderEval[0].client).to.equal("Germania GmbH");
        expect(orderEval[0].clientRanking).to.equal(3);
        expect(orderEval[0].items).to.equal("10");
    })
});
