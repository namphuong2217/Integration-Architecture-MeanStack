const socialPerformanceService = require("../services/social-performance-service");


exports.getSocialPerformance = async(sid, year, db) => {
    const sidInt = parseInt(sid);
    const yearInt = parseInt(year);
    const socialPerformance = await socialPerformanceService.getYearAverage(db, sidInt, yearInt);
    return socialPerformance;
}