

exports.getBonusForSale = (productName, ranking, items) =>{
    ranking = Number(ranking);
    items = Number(items);
    switch(productName){
        case("HooverClean"):
            return (7-ranking)*items*10;
        case("HooverGo"):
            return (7-ranking)*items*5;
        default:
            return (7-ranking)*items;
    }
}

//todo Formel anpassen
exports.getBonusForSocialPerformance = (performance, target, actual) =>{
    switch(performance){
        case("leadership_competence"):
            return target;
        case("oppenness"):
            return target;
        case("social_behaviour"):
            return target;
        case("attitude"):
            return target;
        case("comm_skills"):
            return target;
        case("integrity"):
            return target;
    }
}