//   Pascal's Triangle II
//   Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.

//   Note that the row index starts from 0.

// Input: 3
// Output: [1,3,3,1]

var getRow = function(k) {
    if (k === 0) return [1];
    if (k === 1) return [1, 1];

    let old = [1, 1];
    let res;
    let n = 1;

    while (n != k+1) {
        res = [1];
        for (let i = 0; i <= n - 2; i++) {
            res.push(old[i] + old[i + 1]);
        }
        res.push(1);
        old = res;
        n++;
    }
    return old;
};

console.log(getRow(4));
