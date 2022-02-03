exports.translateRatingToString = function(rating){
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
            return "satisfactory";
        default:
            return "incorrect rating input"
    }
}