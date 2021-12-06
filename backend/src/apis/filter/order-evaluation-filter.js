const OrderEvaluation = require("../../models/OrderEvaluation");
const Customer = require("../../models/Customer");

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

getVcardByHref = function(href){
    return href.split("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/")[1];
}


getCustomerByVcard = function(vcard, accounts){
    return accounts.objects.find(account => mapVcardStringOnVcard(account["vcard"]) == vcard);
}

exports.filterOrderEvaluationBySid = function(sid, evaluationRecords, accounts){

    //Get Vcard of salesman
    let vcardSalesman =  getVcardBySid(sid, accounts);
    if(vcardSalesman.length !== 1){return []};
    vcardSalesman = vcardSalesman[0];

    //Get all order of salesman
    const href = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${vcardSalesman}`;
    const orderOfSalesman = evaluationRecords.objects.filter(order => order["salesRep"]["@href"] == href);

    //Create list of orders evaluation
    let listOrderEvaluation = [];
    for(const order of orderOfSalesman){
        const vcardCustomer = getVcardByHref(order["customer"]["@href"]);
        let customerAccount = getCustomerByVcard(vcardCustomer, accounts);
        const orderEvaluation = new OrderEvaluation(order["name"], // todo product name
                                                        customerAccount["fullName"],
                                                        customerAccount["accountRating"], //todo = RATING???
                                                        order["totalAmount"]
                                                    );
        listOrderEvaluation.push(orderEvaluation);
    }

    return listOrderEvaluation;
}
