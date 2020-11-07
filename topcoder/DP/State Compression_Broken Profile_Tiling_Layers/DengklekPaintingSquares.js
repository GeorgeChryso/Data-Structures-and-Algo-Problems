// // Mr. Dengklek lives in the Kingdom of Ducks, where humans and ducks live together in peace and harmony.



// // One day, the queen of the kingdom challenged Mr. Dengklek with a perplexing puzzle: she gave Mr. Dengklek an N × M board made of wood that consists of N*M squares. She then asked Mr. Dengklek to paint the squares according to these rules:



// // Each square must be either colored or empty.
// // Each colored square must have an even number of adjacent colored squares. Two squares are adjacent if they share a side.
// Mr. Dengklek lives in the Kingdom of Ducks, where humans and ducks live together in peace and harmony.



// One day, the queen of the kingdom challenged Mr. Dengklek with a perplexing puzzle: she gave Mr. Dengklek an N × M board made of wood that consists of N*M squares. She then asked Mr. Dengklek to paint the squares according to these rules:



// Each square must be either colored or empty.
// Each colored square must have an even number of adjacent colored squares. Two squares are adjacent if they share a side.
// For example, here is one valid solution for N=4, M=7:


// Of course, finding one solution to the puzzle is easy: we do not color anything. Instead, the queen asked Mr. Dengklek a much harder question: to count all valid solutions of the puzzle. Help Mr. Dengklek count the solutions and return the result modulo 1,000,000,007. Two solutions are different if there is a square that is colored in one solution and not colored in the other solution.
 
// Definition
    	
// Class:	DengklekPaintingSquares
// Method:	numSolutions
// Parameters:	int, int
// Returns:	int
// Method signature:	int numSolutions(int N, int M)
// (be sure your method is public)
    
 
// Constraints
// -	N will be between 1 and 100, inclusive.
// -	M will be between 1 and 8, inclusive.
 
// Examples
// 0)	
    	
// 1
// 1
// Returns: 2
// Either Mr. Dengklek colors the square, or he does not. Both choices produce a valid solution.
// 1)	
    	
// 2
// 2
// Returns: 8
// Here are the 8 valid solutions:


// impossible, for now
// https://community.topcoder.com/stat?c=problem_statement&pm=11765&rd=14725
// http://sk765.blogspot.com/2012/02/dynamic-programming-with-profile_13.html

//theoretical approach:
// 1. Go through each row.
// 2. Try every possible combination for each row.
// 3. For each combination, see if it is valid by looking at the shape of the previous row, which will be given in ternary number.


// add extra conditions to the profile 
// that increases its base from 2->3 
let numSolutions=(n,m)=>{
    let mod=1e9+7
    //states
    // 0 : If (i)th square is not colored.
    // 1 : If (i)th square is colored, and has odd number of neighbors.
    // 2 : If (i)th square is colored, and has even number of neighbors.
    // so any profile can be written as a base 3 integer with length m 
    let dp=[...Array(n+1)].map(d=>[...Array(3**m)].map(d=>0))
    dp[0][0]=1





}


let tests=[
    [1,1],//2,
    [2,2],//8,
    [10,7],//133047026,
    [23,8],//238358301,
    [17, 4],//504929571,
    [33, 4],//360549211,
    [37, 3],//22962921,
    [45, 2],//772345493,
    [56, 5],//359935014,
    [75, 5],//697209289,
    [95, 4],//662160581,
    [100, 3],//76803773,
    [99, 8]//857844889
]
let outputs=[
    2,8,
133047026,
238358301,
    504929571,
    360549211,
    22962921,
    772345493,
    359935014,
    697209289,
    662160581,
    76803773,
857844889
]