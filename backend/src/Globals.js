
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