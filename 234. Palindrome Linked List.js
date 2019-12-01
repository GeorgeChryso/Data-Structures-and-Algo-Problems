// Given a singly linked list, determine if it is a palindrome.

// Example 1:

// Input: 1->2
// Output: false
// Example 2:

// Input: 1->2->2->1
// Output: true
// Follow up:
// Could you do it in O(n) time and O(1) space?



var isPalindrome = function(head) {
    var res=[]
    
    while(head){
        res.push(head.val)
        head=head.next    
    }
    
    for (let i = 0; i < res.length; i++) {
        console.log(res[i],res[res.length-1-i])
        if(res[i]!==res[res.length-1-i])return false
        
        
    }
    return true
};