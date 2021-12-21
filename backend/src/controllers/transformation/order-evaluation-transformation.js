const OrderEvaluation = require("../../models/OrderEvaluation");
const positionController = require("../position-controller");
const productController = require("../product-controller");

exports.transformOrderEvaluations = async function(sid, year, saleOrders, accounts){

    const ordersOfSalesman = filterSaleOrdersBySidYear(sid, year, saleOrders, accounts);

    return await enrichOrderEvaluations(ordersOfSalesman, accounts);
}

enrichOrderEvaluations = async function(ordersOfSalesman, accounts) {
    let listOrderEvaluation = [];
    for(const order of ordersOfSalesman){
        const vcardCustomer = getVcardCustomerByHref(order.customer["@href"]);
        const customerAccount = getCustomerByVcard(vcardCustomer, accounts);
        const vcardSalesOrder = await getVcardSalesOrderByHref(order["@href"]);
        const positions = await positionController.getPositionsForOrder(vcardSalesOrder);
        for(const position of positions){
            const productName = await productController.getProductName(position.productVcard)
            const orderEvaluation = new OrderEvaluation(productName,
                customerAccount.fullName,
                customerAccount.accountRating,
                position.amount//,
                //bonusCalculationEnricher.getBonusForSale(productName, customerAccount.accountRating, position.amount)
            );
            listOrderEvaluation.push(orderEvaluation);
        }
    }
    return listOrderEvaluation;
}

filterSaleOrdersBySidYear = function(sid, year, saleOrders, accounts){
    //Get Vcard of salesman
    let vcardSalesman =  getVcardBySid(sid, accounts);
    if(vcardSalesman.length !== 1){return []}
    vcardSalesman = vcardSalesman[0];

    //Filter saleOrders of given salesman
    const href = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${vcardSalesman}`;
    return saleOrders.objects.filter(order => order.salesRep["@href"] == String(href) && getYearOfStringDate(order.activeOn) == String(year));
}

//todo translator
translateRatingToString = function(rating){
    switch(rating){
        case 1:
            return "excellent";
        case 2:
            return "very good";
        case 3:
            return "good";
        case 4:
            return "okay";
        case 5:
            return "satisfacotry";
    }
}


/**
 * HELPER FUNCTIONS
 */

getVcardBySid = function(sid, accounts) {
    return accounts.objects.filter(account => account.governmentId == String(sid))
        .map(account => mapVcardStringOnVcard(account.vcard));
}

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
    return accounts.objects.find(account => mapVcardStringOnVcard(account.vcard) == String(vcard));
}

getYearOfStringDate = function(date){
    return date.split("-")[0];
}


