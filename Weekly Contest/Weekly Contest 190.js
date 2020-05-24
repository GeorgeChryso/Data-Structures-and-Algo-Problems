var isPrefixOfWord = function(sentence, searchWord) {
    sentence = sentence.split(' ');

    let j = 1;
    for (const word of sentence) {
        let index = true;
        for (let i = 0; i < searchWord.length; i++) {
            if (word[i] !== searchWord[i]) {
                index = index && false;
            }
        }
        if (index) return j;
        j++;
    }
    return -1;
};

var maxVowels = function(s, k) {
    let set = new Set();
    let vowels = 0;
    let result = 0;
    set.add('a');
    set.add('e');
    set.add('i');
    set.add('o');
    set.add('u');

    if (s.length < k) return 0;
    for (let i = 0; i < k; i++) {
        vowels += Number(set.has(s[i]));
    }
    result = Math.max(vowels, result);

    for (let i = k; i < s.length; i++) {
        if (set.has(s[i - k])) vowels--;
        vowels += Number(set.has(s[i]));
        result = Math.max(vowels, result);
    }

    return result;
};

var pseudoPalindromicPaths = function(root) {
    let result = 0;
    if (!root.left && !root.right) return 1;
    let check = x => {
        let z = Object.values(x);
        let count = 0;
        for (let i = 0; i < z.length; i++) {
            if (z[i] % 2) count++;
        }
        return Number(count <= 1);
    };
    let dfs = (node, memo = {}, odds = 0) => {
        if (node === null) {
            return;
        }
        memo[node.val] = (memo[node.val] || 0) + 1;

        if (memo[node.val] % 2) odds++;
        else odds--;
        if (!node.left && !node.right) {
            result += Number(odds <= 1);
        }
        console.log(node.val, memo);
        dfs(node.left, memo, odds);
        dfs(node.right, memo, odds);
        memo[node.val]--;
    };

    dfs(root);
    return result;
};

var maxDotProduct = function(nums1, nums2) {
    let memo = [];
    for (let i = 0; i < nums1.length; i++) {
        let temp = [];
        for (let j = 0; j < nums2.length; j++) {
            temp.push(nums1[i] * nums2[j]);
        }
        memo.push([...temp]);
    }
    let result = -Infinity;
    let choices = [...Array(memo.length)].map(d =>
        [...Array(memo[0].length)].fill(-Infinity)
    );
    for (let j = memo[0].length - 1; j >= 1; j--) {
        for (let i = memo.length - 1; i >= 0; i--) {
            if (i === memo.length - 1) {
                choices[i][j] = memo[i][j];
            } else choices[i][j] = Math.max(choices[i + 1][j], memo[i][j]);
        }
    }
    for (let j = 0; j < choices.length; j++) {
        choices[j][0] = memo[j][0];
    }
    for (let i = 1; i < choices.length; i++) {
        for (let k = 0; k < choices[0].length; k++) {
            let sum = Math.max(choices[i - 1][k], 0);
            let flag=false
            for (let j = k + 1; j < choices[i].length; j++) {
                if(choices[i][j]===0)flag=true
                sum += Math.max(0, choices[i][j]);
            }
            result = Math.max(result, sum);
            if(!flag&&result==0)result=-1

        }
    }
    let flag=false
    for (let i = 0; i < choices[0].length; i++) {
        if(choices[choices.length - 1][i])
        result = Math.max(result, choices[choices.length - 1][i]);
        result = Math.max(result, choices[0][i]);
        if(!flag&&result==0)result=-1
    }

    return result;
};

console.log(
    maxDotProduct(
        // [2,1,-2,5], [3,0,-6]
        // [3,-2], [2,-6,7]
        [-1, -1],
        [1, 1]
    )
);
