// Reverse a singly linked list.

// Example:

// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL
// Follow up:

// A linked list can be reversed either iteratively or recursively. Could you implement both?




/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  
    var z=[]

    while(head){
        z.push(head.val)
        head=head.next
    }

    

   let  curr= new ListNode(z.pop())
        

    var next=(curr)=>{
        if(!z.length)return 
        curr.next=new ListNode(z.pop)
        return curr.next
    }
    return next(curr)
};