class SocialPerformance{
    constructor(sid, issuerID, year, leadership_competence, openness, social_behaviour, attitude, comm_skills, integrity) {
        this.sid = sid;
        this.issuerID = issuerID;
        this.year = year;
        this.leadershipCompetence = leadership_competence;
        this.openness = openness;
        this.socialBehaviour = social_behaviour;
        this.attitude = attitude;
        this.communicationSkills = comm_skills;
        this.integrity = integrity;
    }
}

module.exports = SocialPerformance;