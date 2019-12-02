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


//two pointers O(n), O(1)
var getIntersectionNode = function(headA, headB) {
    if(!headA||!headB)return null
    var pointerA=headA
    var pointerB=headB
    let lastelementA=1
    let lastelementB=1

    //if a pointer reaches null, reset him to the other head
    //eventually they will meet at the intersection point
    while( pointerA || pointerB){
        
        //if they do not have the same last element they have no intersection
        if(lastelementA!==1&&lastelementB!==1&&lastelementA!==lastelementB)return null

        //if pointer A/B reaches its end, update the lastelement
       if(!pointerA){
           lastelementA=tempA
           pointerA=headB;
       }
       if(!pointerB){
           lastelementA=tempA
           pointerB=headA;
       }

       tempA=pointerA
       tempB=pointerB


       if(pointerA===pointerB)return pointerA
       pointerA=pointerA.next
       pointerB=pointerB.next
    }

    //If two lists have intersection, then their last nodes must be the same one. So when pA/pB reaches the end of a list, record the last element of A/B respectively. If the two last elements are not the same one, then the two lists have no intersections.
   

    return null
};  
