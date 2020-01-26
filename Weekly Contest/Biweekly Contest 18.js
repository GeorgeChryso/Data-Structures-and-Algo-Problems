// User Accepted:0
// User Tried:0
// Total Accepted:0
// Total Submissions:0
// Difficulty:Easy
// Given an array of integers arr, replace each element with its rank.

// The rank represents how large the element is. The rank has the following rules:

// Rank is an integer starting from 1.
// The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
// Rank should be as small as possible.

var arrayRankTransform = function(A) {
    var hash = {};
    A.forEach((d, i) => {
        hash[d] = (hash[d] || 0) + 1;
    });
    let z = Object.keys(hash).sort((a, b) => a - b);
    let newhash = {};
    z.forEach((d, i) => (newhash[d] = i));
    return A.map(d => newhash[d] + 1);
};

var breakPalindrome = function(A) {
    if (A.length == 1) return '';

    let dict = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ];
    let max=''
    for (let i = 0; i < A.length; i++) {
        max+='z'        
    }
    let hash = {};
    dict.forEach((d, i) => (hash[d] = i));

    let minimum=max
    let compare = S => {
        if (S < minimum&&S!=A&&!isPalindrome(S)) minimum = S;
    };

    let isPalindrome=S=>{
        for (let i = 0; i <  Math.floor(S.length/2); i++) {
                if(S[i]!==S[S.length-1-i])return false            
        }
        return true
    }
    // let arr=A.split('')
    for (let i = 0; i < A.length; i++) {
        let temp=[...A]
        for (let j = 0; j < dict.length; j++) {
            temp[i]=dict[j]
            compare(temp.join(''))
        }
    }

    return minimum==max?'':minimum;
};

var diagonalSort = function(A) {
    

    for (let ii = 0; ii < A.length; ii++) {
        let Arr=[]
        for (let i=ii  ,j=0; i<A.length&&j<A[0].length ; i++,j++) {
            Arr.push(A[i][j])   
        }
        Arr=Arr.sort((a,b)=>a-b)

        for (let i=ii   ,j=0; i<A.length&&j<A[0].length ; i++,j++) {
            A[i][j]=Arr.shift()
        }

    }
    for (let jj = 1;jj < A[0].length; jj++) {
        let Arr=[]
        for (let j=jj, i=0; i<A.length&&j<A[0].length ; i++,j++) {
            Arr.push(A[i][j])   
        }
        Arr=Arr.sort((a,b)=>a-b)
        for (let j=jj, i=0; i<A.length&&j<A[0].length ; i++,j++) {
        A[i][j]=Arr.shift()
        }
    }
    
    return A
};


var maxValueAfterReverse = function(A) {
    let maxgain=-1
    let change=[3,3]

    let findVal=S=>{
        console.log(S)
        let sum=0
        S.forEach((d,i)=>{
            if(i!==S.length-1)sum+=Math.abs(S[i]-S[i+1])
        })
        return sum
    }
    for (let start = 0; start < A.length; start++) {
        for (let end = start+1; end < A.length; end++) {

            let temps,tempend,norms,normend
            if(start-1>=0){
                norms=Math.abs(A[start-1]-A[start])+Math.abs(A[start]-A[start+1])
                temps=Math.abs(A[start-1]-A[end])+Math.abs(A[end]-A[start+1])
            }
            else{
                norms=Math.abs(A[start]-A[start+1])
                temps=Math.abs(A[end]-A[start+1])
              
            }
            if( end+1<=A.length-1){
                normend=Math.abs(A[end]-A[end+1])+Math.abs(A[end-1]-A[end])
                tempend=Math.abs(A[start]-A[end+1])+Math.abs(A[end-1]-A[start])
            }
            else{
                normend=Math.abs(A[end-1]-A[end])
                tempend=Math.abs(A[end-1]-A[start])
            }
            let norm=norms+normend
            let temp=temps+tempend

            let gain=temp-norm
            console.log(norm,temp)

            if(gain>maxgain){
                maxgain=gain
                change[0]=start
                change[1]=end
            }   
        }       
    }

    let [starto,endo]=change
    console.log(change,maxgain)
    return Math.max(findVal(A),findVal(A.slice(0,starto).concat(A.slice(starto,endo+1).reverse()).concat(A.slice(endo+1)))
    )
};
console.log(maxValueAfterReverse(
   // [2,5,1,3,4]
   // [2,3,1,5,4]
   [2,4,9,24,2,1,10]
));

