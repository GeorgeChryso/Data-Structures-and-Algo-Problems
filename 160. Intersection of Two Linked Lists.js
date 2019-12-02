// Write a program to find the node at which the intersection of two singly linked lists begins.

// Notes:

// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.

//wrong because i m not just looking for the first value that is the same, i m looking for the first shared REFERENCE instead;
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

// so in order to check for the first shared reference i Store every reference of each node to a map and the moment i come across an already seen one, i return it, otherwise i return null

//that would be O(n) time and space;
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
