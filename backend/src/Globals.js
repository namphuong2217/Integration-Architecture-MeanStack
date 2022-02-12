
exports.Permissions = {
    sales: "Sales",
    hr: "HR",
    ceo: "Leader",
    admin:"admin",

    permissionSales: ["postSocialPerformance"],
    permissionHR: ["approveBonusHR", "postBonus"],
    permissionCEO: ["approveBonusCEO", "postBonus", "postTargets"],

    hasUserPermission(user, action) {
        if(action === "universal"){
            return true;
        }
        if (user.role === this.sales) {
            return this.permissionSales.includes(action);
        }
        else if (user.role === this.hr) {
            return this.permissionHR.includes(action);
        }
        else if (user.role === this.ceo) {
            return this.permissionCEO.includes(action);
        }
        else if(user.role === this.admin){
            return true;
        }
    }
}