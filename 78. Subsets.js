// Given a set of distinct integers, nums, return all possible subsets (the power set).

// Note: The solution set must not contain duplicate subsets.


var subsets = function(A) {
    //the powerset contains 2**N elements,the biwise representation of each index tells me which elements to pick.
    let result=Array(2**A.length).fill(null)
    .map(
        (d,i)=>A.filter(
            //essentially tests whether the j-th bit of i is set or not and takes the respective element for the set
                        (k,j)=>i&(1<<j)
    ))

    return result

};