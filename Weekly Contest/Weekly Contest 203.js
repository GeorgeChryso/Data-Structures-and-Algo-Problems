var mostVisited = function(n, rounds) {
    let max = -1;
    let sectors = [...Array(n)].map(d => 0);
    sectors[rounds[0] - 1] = 1;
    for (let i = 0; i < rounds.length - 1; i++) {
        let [prev, next] = [rounds[i] - 1, rounds[i + 1] - 1];

        if (next < prev) {
            next += n;
        }

        for (let j = prev + 1; j <= next; j++) {
            sectors[j % n]++;
            max = Math.max(max, sectors[j % n]);
        }
        console.log(sectors + '');
    }

    let result = [];
    for (let i = 0; i < sectors.length; i++) {
        if (sectors[i] == max) {
            result.push(i + 1);
        }
    }
    return result;
};

var maxCoins = function(piles) {
    piles.sort((a, b) => a - b);
    let result = 0;

    while (piles.length) {
        piles.pop();
        result += piles.pop();
        piles.shift();
    }
    return result;
};

var findLatestStep = function(arr, m) {
    if (m === arr.length) return m;
    let n = arr.length;
    arr = arr.map(d => d - 1);
    let A = [...Array(arr.length)].map(d => 0);
    let result = -2;
    let prefix = [...Array(n + 1)].map(d => 0);
    for (let round = 0; round < n; round++) {
        A[arr[round]] = 1;
        for (let i = arr[round] + 1; i <= n; i++) {
            prefix[i]++;
        }
        console.log(A + '', round,prefix[m+1],prefix[m+2]);
        console.log('' + prefix);
        if (prefix[m] == m && A[m] == 0) {
            console.log('s')
            result = round;
            continue;
        }
        if (prefix[n] - prefix[n - m] == m && A[n - m - 1] == 0) {
            console.log('e')
            result = round;
            continue;
        }

        for (let i = m + 1; i <= n - 1; i++) {
            if (
                prefix[i] - prefix[i - m] == m &&
                A[i - m - 1] == 0 &&
                A[i ] == 0
            ) {
                result = round;
                break;
            }
        }
    }
    return result + 1;
};
console.log(
    findLatestStep(
        //[3, 5, 1, 2, 4],1
        [9,7,8,3,1,6,5,2,10,4],5
    )
);
