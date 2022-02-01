
const departments = {
    sales : "Sales",
    hr : "HR",
    ceo : "Leader"
}

exports.hasRoleHR = function(user) {
    return user.role == departments.hr;
}

exports.hasRoleCEO = function (user){
    return user.role == departments.ceo;
}

exports.hasRoleSales = function (user){
    return user.role == departments.sales;
}

exports.Permissions ={
    sales : "Sales",
    hr : "HR",
    ceo : "Leader",

    permissionSales : [],
    permissionHR : ["approveBonusHR"],
    permissionCEO : ["approveBonusCEO"],

    hasUserPermission(user, action){
        if(user.role === this.sales){
            return this.permissionSales.includes(action);
        }
        else if(user.role === this.hr){
            return this.permissionHR.includes(action);
        }
        else if(user.role === this.ceo){
            return this.permissionCEO.includes(action);
        }
    }
}