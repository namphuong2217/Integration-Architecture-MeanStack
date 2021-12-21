const SocialPerformance = require("./SocialPerformance")
const bonusCalc = require("../controllers/transformation/bonus-calculation-enricher")

class SocialPerformanceEval extends SocialPerformance{
    constructor(socialPerformance) {
        socialPerformance = addBonusAndCommentToSocialPerformance(socialPerformance);
        super(socialPerformance.sid, socialPerformance.year, socialPerformance.leadership_competence, socialPerformance.openness,
            socialPerformance.social_behaviour, socialPerformance.attitude, socialPerformance.comm_skills,
            socialPerformance.integrity);
    }
}

module.exports = SocialPerformanceEval;


addBonusAndCommentToSocialPerformance = (socialPerformance) => {
    for(const [key, value] of Object.entries(socialPerformance)){
        if(value.hasOwnProperty("target")){
            const bonus = bonusCalc.getBonusForSocialPerformance(key, value.target, value.actual);
            value.bonus = bonus;
            value.comment="";
        }
    }
    return socialPerformance;
}