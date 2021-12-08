const OrderEvaluation = require("../../models/OrderEvaluation");
const mapRanking = require("../mapping/mapping-ranking");
const positionController = require("../../controllers/position-controller");
const productController = require("../../controllers/product-controller");

getVcardBySid = function(sid, accounts) {
    return accounts.objects.filter(account => account["governmentId"] == sid)
        .map(account => mapVcardStringOnVcard(account["vcard"]));
}

//  "vcard": "BEGIN:VCARD\nVERSION:3.0\nUID:97NB4O91UQORTH2MA4T2TYJFL\n19...\nEND:VCARD\n", => 97NB4O91UQORTH2MA4T2TYJFL
function mapVcardStringOnVcard(vcardString){
    return vcardString.split("\n")[2]
        .split(":")[1]
        .replace("\r", "");
}

getVcardCustomerByHref = function(href){
    return href.split("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/")[1];
}

getVcardSalesOrderByHref = function(href){
    return href.split("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/")[1];
}


getCustomerByVcard = function(vcard, accounts){
    return accounts.objects.find(account => mapVcardStringOnVcard(account["vcard"]) == vcard);
}

exports.filterOrderEvaluationBySid = async function(sid, evaluationRecords, accounts){

    //Get Vcard of salesman
    let vcardSalesman =  getVcardBySid(sid, accounts);
    if(vcardSalesman.length !== 1){return []};
    vcardSalesman = vcardSalesman[0];

    //Get all saleOrders of salesman
    const href = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${vcardSalesman}`;
    const orderOfSalesman = evaluationRecords.objects.filter(order => order["salesRep"]["@href"] == href);

    //Create list of orders evaluation
    let listOrderEvaluation = [];
    for(const order of orderOfSalesman){
        const vcardCustomer = getVcardCustomerByHref(order["customer"]["@href"]);
        const customerAccount = getCustomerByVcard(vcardCustomer, accounts);
        const vcardSalesOrder = await getVcardSalesOrderByHref(order["@href"]);
        const positions = await positionController.getPositionsForOrder(vcardSalesOrder);
        for(const position of positions){
            const productName = await productController.getProductName(position.productVcard)
            const orderEvaluation = new OrderEvaluation(productName,
                customerAccount["fullName"],
                mapRanking.mapRatingToString(customerAccount["accountRating"]),
                position.amount
            );
            listOrderEvaluation.push(orderEvaluation);
        }
    }

    return listOrderEvaluation;
}



