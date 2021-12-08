const Position = require("../models/Position")
const positionService = require("../services/position-service");


exports.getPositionsForOrder = async function(salesOrderId) {
    const resp = await positionService.positionRead(salesOrderId)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp};
    let listPosition = [];
    if(resp.objects){
        resp.objects.forEach(position => listPosition.push(
            new Position("name",
                position["quantity"],
                getVcardProductByHref(position["product"]["@href"])
            )
        ));
    }

    return listPosition;
}

getVcardProductByHref = function(href){
    return href.split("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/")[1];
}