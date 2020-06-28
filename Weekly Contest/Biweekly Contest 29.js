var average = function(salary) {
    salary.sort((a, b) => a - b);

    let min = salary[0];
    let max = salary[salary.length - 1];

    let sum = 0;
    let idx = 0;
    for (let i = 0; i < salary.length - 1; i++) {
        if (salary[i] !== min && salary[i] !== max) {
            sum += salary[i];
            idx++;
        }
    }

    return sum / idx;
};

var kthFactor = function(n, k) {
    let z = 0;
    for (let i = 0; i <= n; i++) {
        if (n % i === 0) {
            z++;
            if (z == k) return i;
        }
    }
    return -1;
};

var longestSubarray = function(nums) {
    let result = 0;
    let counts = [0];
    let count = 0;
    let ex = false;
    for (let i = 0; i < nums.length; i++) {
        let zerocount = 0;
        if (nums[i] === 0) {
            zerocount++;
            ex = true;
            if (zerocount === 1) counts.push(count);
            count = 0;
        } else {
            zerocount = 0;
            count++;
        }
    }
    if (count != 0) counts.push(count);
    counts.push(0);
    console.log(counts);
    for (let i = 0; i < counts.length - 1; i++) {
        result = Math.max(counts[i], result, counts[i] + counts[i + 1]);
    }

    if (ex == false) return result - 1;
    return Math.max(result);
};

var minNumberOfSemesters = function(n, dependencies, k) {
    let prev = {};
    let next = {};
    let previous = {};

    for (let i = 1; i <= n; i++) {
        previous[i] = new Set();
    }
    for (const [p, n] of dependencies) {
        prev[n] ? prev[n].push(p) : (prev[n] = [p]);
        next[p] ? next[p].push(n) : (next[p] = [n]);
        previous[n].add(p);
    }

    let start = new Set();
    let end = new Set();
    for (let i = 1; i <= n; i++) {
        if (prev[i] === undefined) start.add(i);
        if (next[i] === undefined && !start.has(i)) end.add(i);
    }
    let q = [];
    let result = 0;
    start.forEach(d => q.push(d));
    let processed = new Set();
    
    while(processed.size!=n){

        let nextu=[]
        for (let i = 1; i <=n; i++) {
            if(!processed.has(i)&&previous[i].size===0)nextu.push(i)
        }   
        let count = 0;


        while(nextu.length){
            let ele=nextu.shift()
            count++
            processed.add(ele)
            if(count==k){
                result++
                count=0
            }
            if(next[ele]!==undefined){
                for (const nx of next[ele]) {
                    previous[nx].delete(ele)
                }
            }
        }
        if(count)result++
    }

    return result;
};

console.log(
    minNumberOfSemesters(
        5,
        [
            [1, 5],
            [1, 3],
            [1, 2],
            [4, 2],
            [4, 5],
            [2, 5],
            [1, 4],
            [4, 3],
            [3, 5],
            [3, 2]
        ],
        3
    )
);
