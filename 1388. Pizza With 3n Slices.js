// There is a pizza with 3n slices of varying size, you and your friends will take slices of pizza as follows:

// You will pick any pizza slice.
// Your friend Alice will pick next slice in anti clockwise direction of your pick. 
// Your friend Bob will pick next slice in clockwise direction of your pick.
// Repeat until there are no more slices of pizzas.
// Sizes of Pizza slices is represented by circular array slices in clockwise direction.

// Return the maximum possible sum of slice sizes which you can have.



// seems like a knapsack
var maxSizeSlices = function(slices) {
    
    let totalSum=slices.reduce((acc,curr)=>acc+curr)

    let dp=[...Array(slices.length/3+1)].map(d=>[...Array(slices.length+1)].map(q=>0))

     //dp[i][j]= Max sum I can get using at most i items 

};