// tldr given a tree, edges have some cost to delete them. Some nodes are bad, return the minimum cost such that no two bad nodes are connexted through a path.

// 2<=Nodes<=50
// 1<=edges<=50
// 1<=badNodes<=Nodes


// approach 1 brute forcy
// Try every combination of edges
// add them into a dsu
// see if each badNode is connected
// if not, consider the nodes ommited total cost as the result
// return the minimum such cost
// O(2^N *N^3)