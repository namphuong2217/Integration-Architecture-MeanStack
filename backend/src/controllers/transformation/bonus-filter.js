const Bonus = require("../../models/Bonus");

exports.filterOrderEvaluationBySid = function(respBonus, year){

    const filteredBonus = respBonus.filter(bonus => bonus["year"] == year)[0];
    if(!filteredBonus){
        return {status : "error"};
    }
    return new Bonus(filteredBonus["year"], filteredBonus["value"]);
}