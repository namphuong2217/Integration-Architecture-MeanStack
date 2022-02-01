const Bonus = require("../../models/Bonus");

exports.filterOrderEvaluationBySid = function(respBonus, year){
    const filteredBonus = respBonus.filter(bonus => bonus["year"] === year);
    if(filteredBonus.length=== 0){
        return { status: 404, payload: "no targets for year" };
    }
    return new Bonus(filteredBonus[0]["year"], filteredBonus[0]["value"]);
}