const Permissions = require("../Globals").Permissions;

/**
 * this express middleware checks if a user is authenticated or even has admin permissions;
 * otherwise the request gets intercepted and status 401 is returned
 * @param {boolean} beAdmin if true, user needs to be admin
 * @return {(function(*, *, *): void)|*}
 */
exports.checkAuthorization = (action) => {
    return (req, res, next) => {
        if(req.session.authenticated){
            if(Permissions.hasUserPermission(req.session.user, action)){
                next();
                return;
            }
        }
        res.status(401).send("no permission"); //intercept request
    }
}

//in api-route.js
//router.get("/....path", checkAuthorization("postBonus"), api.function);