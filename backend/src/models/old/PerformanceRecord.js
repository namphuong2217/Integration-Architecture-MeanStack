class PerformanceRecord{
    constructor(sid, goal_id, goal_description, target_value, actual_value, year) {
        this.sid = sid;
        this.goal_id = goal_id;
        this.goal_description = goal_description;
        this.target_value = target_value;
        this.actual_value = actual_value;
        this.year = year;
    }
}

module.exports = PerformanceRecord;