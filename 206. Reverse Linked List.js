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
  

    var prev = new ListNode(null)
    var curr = new ListNode(head)

    while( curr!==null){
        nextTemp= new ListNode(curr.next)
        curr.next=prev
        prev=curr;
        curr= nextTemp;

    }
    
    return prev
};

var reverseList = function(head){
  
    var tmp = null;
    var newHead = null;
    while(head !== null){
      tmp = head;
      head = head.next;
      tmp.next = newHead;
      newHead = tmp;
    }
    
    return newHead;
  }



  var reverseList = function(head) {
    //iteratively use a stack
    //1. add the node to the stack,
    //2. go to next node,
    //3. repeat until no more nodes,
    //4. then make a new linked list by popping off the stack.
    
    if (head === null || head.next === null) return head;
    
    let stack = [];
    
    while (head) {
        stack.push(head.val);
        head = head.next;
    }
    
    let n = new ListNode(stack.pop())
    let newHead = n;
    
    while(stack.length) {
        n.next = new ListNode(stack.pop());
        n = n.next;
    }
    n.next = null;
    return newHead;
};



var reverseList = function(head) {
    let [prev, current] = [null, head]
    while(current) {
        [current.next, prev, current] = [prev, current, current.next]
    }
    return prev
}