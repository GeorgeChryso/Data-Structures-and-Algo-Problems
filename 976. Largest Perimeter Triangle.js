// Given an array A of positive lengths, return the largest perimeter of a triangle with non-zero area, formed from 3 of these lengths.

// If it is impossible to form any triangle of non-zero area, return 0.



var largestPerimeter = function(A) {
	A.sort(function(a, b) { return b - a; });    
	for(let i=0;i<A.length-2;i++){
		let sum = A[i+1] + A[i+2];
		if (sum > A[i]) return sum + A[i];
	 }
	return 0;  
}