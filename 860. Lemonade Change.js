


var lemonadeChange = function(bills) {
    let fives = 0;
    let tens = 0;
    
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] === 5) {
            fives++;
        } else if (bills[i] === 10) {
            if (fives === 0) {
                return false;
            }
            tens++;
            fives--;
        } else { // bills[i] === 20
            if (tens === 0) {
                if (fives < 3) {
                    return false;
                }
                fives -= 3;
            } else {
                if (fives === 0) {
                    return false
                }
                tens--;
                fives--;
            }
        }
    }
    

    
    return true;
};
console.log(lemonadeChange(
    [5,5,10,10,20]
))