

exports.getBonusForSale = (productName, ranking, items) => {
    ranking = Number(ranking);
    items = Number(items);
    switch (productName) {
        case ("HooverClean"):
            return (7 - ranking) * items * 10;
        case ("HooverGo"):
            return (7 - ranking) * items * 5;
        default:
            return (7 - ranking) * items;
    }
}


exports.getBonusForSocialPerformance = (performance, target, actual) => {
    const factorDiff = factorDiffTargAct(target, actual);
    switch (performance) {
        case ("leadershipCompetence"):
            return factorDiff * target * 5;
        case ("openness"):
            return factorDiff * target * 5;
        case ("socialBehaviour"):
            return factorDiff * target * 10;
        case ("attitude"):
            return factorDiff * target * 5;
        case ("communicationSkills"):
            return factorDiff * target * 8;
        case ("integrity"):
            return factorDiff * target * 8;
        default:
            return null;
    }
}

const factorDiffTargAct = (target, actual) => {
    const diff = actual - target;
    return 1.5 * Math.exp(diff * 0.5);
}