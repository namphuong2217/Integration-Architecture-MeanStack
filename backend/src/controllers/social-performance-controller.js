const socialPerformanceService = require("../services/social-performance-service");


exports.getSocialPerformance = async(sid, year, db) => {
    const sidInt = parseInt(sid);
    const yearInt = parseInt(year);
    const socialPerformance = await socialPerformanceService.getBySidYear(sidInt, yearInt, db);
    return socialPerformance;
}