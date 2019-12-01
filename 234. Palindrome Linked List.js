// Given a singly linked list, determine if it is a palindrome.

// Example 1:

// Input: 1->2
// Output: false
// Example 2:

// Input: 1->2->2->1
// Output: true
// Follow up:
// Could you do it in O(n) time and O(1) space?


//Runtime O(n), Space O(n)
var isPalindrome = function(head) {
    //store the values on an array
    var res=[]
    
    while(head){
        res.push(head.val)
        head=head.next    
    }
    
    // check if the array is a palindrome
    // for (let i = 0; i < res.length; i++) {
    //     if(res[i]!==res[res.length-1-i])return false
    // }
    // return true

    //cooler syntax
    return res.some((d,i)=>d!==res[res.length-1-i])
};


// R:O(n) S:O(1), 
// essentially reverse the second half of the linked list using two pointers
var isPalindrome = function(head) {
    //store the values on an array
    var count=0
    
    // 2 pointers
    let fast=head;
    let slow=head;
    

    //fast moves at twice the speed, so when fast.next==null that means the end is reached
    while(fast && fast.next){
        slow=slow.next
        fast=fast.next.next
    }
    
    //gonna reverse the slow now, cos i know that slow is at the half of my LL 
    let [prev,current]=[null,slow]

    while(current.next){
        [prev,current,current.next]=[current,current.next,prev]
    }

    //  DONT FORGET THIS ESSENTIAL STEP, TO RESET BACK THE SLOW POINTER TO THE BEGINNING OF YOUR REVERSED ll
    slow=prev

    // resetting the fast
    fast=head
   

    //checking for palindrome
    while(slow){
        console.log(slow.val,fast.val)
        if(slow.val!==fast.val)return false
        [slow,fast]=[slow.next,fast.next]
    }

    return true
};