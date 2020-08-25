// Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

// You may return the answer in any order.


// Math formula for the NUMBER of combinations
// through dp
var combine = function(n, k) {
    let memo=[...Array(n+1)].map(d=>[...Array(k+1)])
    let comb=(m,l)=>{
        if(l==0||m==l){ //top
            memo[m][l]=1
            return 1
        }
        if(memo[m][l]!==undefined)return memo[m][l]
        memo[m][l]=comb(m-1,l-1)+comb(m-1,l) // comb formula
        return memo[m][l]
    }
    return comb(n,k)
};

//smart bitset approach n*2**n
var combine = function(n, k) {
    let result=[]
    for (let i = 0; i <2**n; i++) {
        let sol=[]
        for (let j = 0; j <=n; j++) 
            if(i&(1<<j))sol.push(j+1)            
        if(sol.length===k)result.push(sol)
    }
    return result
};

//2**n
var combine = function(n, k) {
    let out = comb(k, n);
    // console.log(out);
    return out;
};
function comb(max, n, out=[], curr = [], index = 1){
    if(curr.length===max){
        out.push(curr);
        return [];
    }
    else{
        while(index<=n){
            comb(max, n, out, [...curr, index], ++index);
        }
        return out;
    }
}

console.log(
    combine(4,2)
)