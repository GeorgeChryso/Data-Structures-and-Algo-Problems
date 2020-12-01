// You are given a two-dimensional list of integers edges where each element contains [u, v, distance] representing a weighted undirected graph. You are currently at node 0 and your home is the largest node. You can go from u to v if it's immediately connected and the shortest distance from u to home is larger than the shortest distance from v to home.

// Return the number of unique paths possible to go from node 0 to home. Mod the result by 10 ** 9 + 7.

// Constraints

// 1 ≤ n ≤ 100,000 where n is the length of edges
// 0 ≤ distance


/*
    1- All nodes arent necessarily connected
    2- The starting graph may contain cycles
    3- There is not always a path from 0 home

*/