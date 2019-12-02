// Write a program to find the node at which the intersection of two singly linked lists begins.

// Notes:

// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.

//wrong 
var getIntersectionNode = function(headA, headB) {
    var dict={}
    var counter=1

    var result=[Infinity]
    while( headA){
        dict[headA.val]=counter++
        headA=headA.next
    }

    while( headB){
        if(dict[headB.val]){
            if(result[0]>dict[headB.val]){
                result[0]=dict[headB.val]
                result[1]=headB
            }
        }
        headB=headB.next
    }

    return result[1]?result[1]:null
};  


var getIntersectionNode = function(headA, headB) {
    var dict=new Map();
  
    while( headA){
        dict.set(headA)
        headA=headA.next
    }

    while( headB){
        if(dict.has(headB))return headB;
        headB=headB.next
    }

    return null
};  