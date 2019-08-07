// Some people will make friend requests. The list of their ages is given and ages[i] is the age of the ith person. 

// Person A will NOT friend request person B (B != A) if any of the following conditions are true:

// age[B] <= 0.5 * age[A] + 7
// age[B] > age[A]
// age[B] > 100 && age[A] < 100
// Otherwise, A will friend request B.

// Note that if A requests B, B does not necessarily request A.  Also, people will not friend request themselves.

// How many total friend requests are made?

// Example 1:

// Input: [16,16]
// Output: 2
// Explanation: 2 people friend request each other.
// Example 2:

// Input: [16,17,18]
// Output: 2
// Explanation: Friend requests are made 17 -> 16, 18 -> 17.
// Example 3:

// Input: [20,30,100,110,120]
// Output: 
// Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.
 

// Notes:

// 1 <= ages.length <= 20000.
// 1 <= ages[i] <= 120.


var numFriendRequests = function(A) {
    
    var count=0;
    for(let i in A){
        if(A[i]<14){
            continue
        }
        for ( let j in A){
            if(A[j]<14){
                continue
            }
            if ( i==j )continue;
            if(A[j]>A[i] || A[j]<=0.5*A[i]+7){
                continue
            }
            count++
            }

        }
        return count


    }


    var numFriendRequests = function(A) {
    
        var count=0;
        var len=A.length-1
        A.sort((a,b)=>a-b).reduceRight((a,b,i)=>a+len-i)
        count+=a

    return A
       }



console.log(
    numFriendRequests(
        [20,30,100,20,120]
            )
    )

