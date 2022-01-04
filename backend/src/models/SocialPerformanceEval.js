const SocialPerformance = require("./SocialPerformance")
const bonusCalc = require("../controllers/transformation/bonus-calculation-enricher")


class SocialPerformanceEval extends SocialPerformance{
    constructor(socialPerformance) {
        super(socialPerformance.sid, socialPerformance.issuerID, socialPerformance.year, socialPerformance.leadership_competence, socialPerformance.openness,
            socialPerformance.social_behaviour, socialPerformance.attitude, socialPerformance.comm_skills,
            socialPerformance.integrity);
    }

    static fromSocialPerformance(socialPerformance){
        const addedBonus = addBonusAndCommentToSocialPerformance(socialPerformance);
        socialPerformance = new SocialPerformanceEval(addedBonus.socialPerformance);
        return {socialPerformance: socialPerformance, bonusSum: addedBonus.bonusSum}
    }
}

module.exports = SocialPerformanceEval;


function addBonusAndCommentToSocialPerformance(socialPerformance) {
    let bonusSum = 0;
    for(const [key, value] of Object.entries(socialPerformance)){
        if(value.hasOwnProperty("target")){
            const bonus = bonusCalc.getBonusForSocialPerformance(key, value.target, value.actual);
            value.bonus = bonus;
            value.comment="";
            bonusSum += bonus;
        }
    }
    return {socialPerformance: socialPerformance, bonusSum : bonusSum};
}