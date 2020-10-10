// "A Lannister Always Pays His Debts."

// That's true, now here is a chance for you to get paid by Jaime Lannister.

// In Jaime's army there are total N number of warriors.

// And all them are standing in a single row.

// Now Jaime wants to convey a message to his warriors. But it's very difficult to convey a message if warriors are standing in a single row.

// So, Jaime wants to break that single row into K rows. Such that in each row at least one warriors should be there.

// Also, there is an amount of unhappiness associated with each warrior x which is equal to : number of warriors in front of x (in his row) whose height is greater than the height of x. And, total unhappiness is sum of unhappiness of all warriors. Jaime wants that his army should be happy as much as possible.

// Now, Jaime wants you to break the single row into K rows such that total unhappiness should be minimum.

// Note : You just have to break the row, you are not allowed to change the position of the warriors.


// First line of input contain two integers N & K.

// Second line of input contain N number of integers, i th of which denote height of i th warrior standing in that single row (represented as H[i]).




var sistafuka = (n, m, Heights) => {
    //so let's first deal with the scoring function
    //dp[i][j]=minimum Unhapiness if i split the first j people into i+1 groups

    //dp[i][j]=Math.min( dp[i-1][k]+ unhapiness(k+1,j)  ) 0<=k<j

    //now unhapiness(k+1,j) is the total unhapiness of the group from k+1 until j
    // unhapiness[i][i]=0
    // unhapiness[i][i+1]=unhapiness[i][i]+ Heights[i]>=Heights[i+1]
    // unhapiness[i][j]= unhapiness[i][j-1]+ #people from[i,j-1] taller than A[j]

    // what bugs me is that for every unhapiness[i][j] i need an extra j-i steps
    // to count the taller than A[j] people infront of A[j]
    // that would take O(n**2) time to calculate

    // so what i want are queries O(1) [i,j] that return the Count of elements in [i,j-1] taller than A[j]
    //can prolly reduce this to nlogn with a priority queue or sth
    let tallerThan = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    for (let i = n - 1, count = 0; i >= 0; i--, count = 0)
        for (let j = i - 1; j >= 0; j--) {
            count += Number(Heights[j] >= Heights[i])
            tallerThan[j][i] = count
        }
    let unhapiness = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    for (let len = 2; len <= n; len++)
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1
            unhapiness[i][j] = unhapiness[i][j - 1] + tallerThan[i][j]
        }

    let dp = [...Array(m)].map(d => [...Array(n)].map(d => Infinity))
    //basecase
    for (let j = 0; j < n; j++)
        dp[0][j] = unhapiness[0][j] //cos it's only 1 group

    for (let i = 1; i < m - 1; i++)  // 0 splits in 2 , 1 splits in 3 ,... ,m-2 splits in m
        for (let j = i; j < n; j++)
            for (let k = 0; k < j; k++)
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + unhapiness[k + 1][j])

    for (let j = 0; j < n - 1; j++)
        dp[m - 2][j] += unhapiness[j + 1][n - 1] //cos it's only 1 group
    dp.forEach(d => console.log(d.map(d => d == Infinity ? `*` : d) + ''))

    return Math.min(...dp[m - 2])
}


// Divide and Conquer Optimization
// because monotonicity of k on j is proven by contradiction
var sistafuka = (n, m, Heights) => {
    let tallerThan = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    for (let i = n - 1, count = 0; i >= 0; i--, count = 0)
        for (let j = i - 1; j >= 0; j--) {
            count += Number(Heights[j] >= Heights[i])
            tallerThan[j][i] = count
        }
    let unhapiness = [...Array(n)].map(d => [...Array(n)].map(d => 0))
    for (let len = 2; len <= n; len++)
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1
            unhapiness[i][j] = unhapiness[i][j - 1] + tallerThan[i][j]
        }

    let dp = [...Array(m)].map(d => [...Array(n)].map(d => Infinity))
    //basecase
    for (let j = 0; j < n; j++)
        dp[0][j] = unhapiness[0][j] //cos it's only 1 group

    let DC = (i, ja, jb, ka, kb) => {
        if (ja > jb)
            return
        let mid = (ja + jb) >> 1, bestk = -1
        for (let k = ka; k <= Math.min(mid, kb); k++)
            //so whats important here is that i had to set k+1<=mid in order for 
            // every cell in dp to be completed, otherwise unhapiness[k+1] would 
            // cause problems
            // so the nature of the scoring function determines the structure of my DC solution
            if (k+1<=mid&&dp[i][mid] > dp[i - 1][k] + unhapiness[k + 1][mid]) {
                bestk = k
                dp[i][mid] = dp[i - 1][k] + unhapiness[k + 1][mid]
            }
        DC(i, ja, mid - 1, ka, bestk)
        DC(i, mid + 1, jb, bestk, kb)
    }
    for (let i = 1; i < m - 1; i++)
        DC(i, 0, n - 1, 0, n )

    for (let j = 0; j < n - 1; j++)
        dp[m - 2][j] += unhapiness[j + 1][n - 1] //cos it's only 1 group
    dp.forEach(d => console.log(d.map(d => d == Infinity ? `*` : d) + ''))

    return Math.min(...dp[m - 2])
}
console.log(
    sistafuka(
        6, 3, [20, 50, 30, 60, 40, 100] //0
    )
)
console.log(
    sistafuka(
        8, 3, [20, 50, 30, 60, 40, 100, 5, 1] //2
    )
)