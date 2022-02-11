
exports.Permissions = {
    sales: "Sales",
    hr: "HR",
    ceo: "Leader",

    permissionSales: [],
    permissionHR: ["approveBonusHR", "readBonus"],
    permissionCEO: ["approveBonusCEO", "readBonus"],

    hasUserPermission(user, action) {
        if (user.role === this.sales) {
            return this.permissionSales.includes(action);
        }
        else if (user.role === this.hr) {
            return this.permissionHR.includes(action);
        }
        else if (user.role === this.ceo) {
            return this.permissionCEO.includes(action);
        }
    }
}