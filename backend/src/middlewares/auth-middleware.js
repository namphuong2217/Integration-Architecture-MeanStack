const Permissions = require("../Globals").Permissions;

/**
 * this express middleware checks if a user is authenticated or even has admin permissions;
 * otherwise the request gets intercepted and status 401 is returned
 * @param {boolean} beAdmin if true, user needs to be admin
 * @return {(function(*, *, *): void)|*}
 */
exports.checkAuthorization = (action, beAdmin) => {
    return (req, res, next) => {
        if(req.session.authenticated){
            if(true || Permissions.hasUserPermission(req.session.user, action)){ //TODO delete true and adapt hasUserPermission
                if(!beAdmin || req.session.user.isAdmin){
                    next();
                    return;
                }
            }
        }
        res.status(401).send("no permission"); //intercept request
    }
}

//in api-route.js
//router.get("/....path", checkAuthorization("postBonus"), api.function);