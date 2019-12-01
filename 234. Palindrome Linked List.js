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
    // 2 pointers
    let fast=head; //moves twice as fast to reach the end first
    let slow=head;
    

    //fast moves at twice the speed, so when fast.next==null that means the end is reached
    while(fast && fast.next){
        slow=slow.next
        fast=fast.next.next
    }
    if (fast != null){
        slow = slow.next;
    }
    
    //gonna reverse the slow now, cos i know that slow is at the half of my LL 
    let reverseList = function(head) {
        let [prev, current] = [null, head]
        while(current) {
          //  [current.next, prev, current] = [prev, current, current.next]
    
            [prev,current.next,current]=[current,prev,current.next]
        }
        return prev
    }
    
    //  DONT FORGET THIS ESSENTIAL STEP, TO RESET BACK THE SLOW POINTER TO THE BEGINNING OF YOUR REVERSED ll
    slow=reverseList(slow)

    // resetting the fast
    fast=head
   

    //checking for palindrome
    while(slow){
        if(slow.val!==fast.val)return false
        [slow,fast]=[slow.next,fast.next]
    }

    return true
};









// make it a double linked List , time O(n), space O(n)
var isPalindrome = function(head) {
    if (!head) {
        return true;
    }
    let tail = head;

    //set the previous for each elemenet
    while (tail.next) {
        tail.next.prev = tail;
        tail = tail.next;
    }


    //traverse from both ends and see if the tail and head match
    while (tail && head) {
        if (tail === head || tail.prev === head && tail.val === head.val) {
            return true;
        }
        if (tail.val !== head.val) {
            return false;
        }
        tail = tail.prev;
        head = head.next;
    }
    return true;
};