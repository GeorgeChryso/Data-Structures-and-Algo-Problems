// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Follow up:
// What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

// Example:

// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7



 function ListNode(val) {
        this.val = val;
        this.next = null;
    }

var addTwoNumbers = function(l1, l2) {
    let stack=[],stack2=[]
    while(l1){
        stack.push(l1.val)
        l1=l1.next
    }
    while(l2){
        stack2.push(l2.val)
        l2=l2.next
    }
    let start=null
    let carry=0
    while(stack.length||stack2.length||carry){
        let curr=(stack.length?stack.pop():0)+(stack2.length?stack2.pop():0)+carry
        if(curr>=10){
            carry=(curr-(curr%10))/10
            curr=curr%10
        }
        else{
            carry=0
        }
    //next node creation
        let node=new ListNode(curr)
        node.next=start
        start=node

    }
    return start
};