const Position = require("../models/Position")
const positionService = require("../services/position-service");


exports.getPositionsForOrder = async function(salesOrderId) {
    const resp = await positionService.readPosition(salesOrderId);
    let listPosition = [];
    if(resp.status === 200){
        resp.payload.objects.forEach(position => listPosition.push(
            new Position(salesOrderId,
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