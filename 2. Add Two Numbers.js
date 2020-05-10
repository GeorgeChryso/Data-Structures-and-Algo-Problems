










/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let result=new ListNode()
    let node=result
    let carry=0
    //find the numbers of the lls
    while(l1||l2||carry){
        node.val=(l1?l1.val:0)+(l2?l2.val:0)+carry
        if(node.val>9){
            carry=1
            node.val%=10
        }
        else carry=0
        l1&&(l1=l1.next)
        l2&&(l2=l2.next)
        if(l1||l2||carry)node.next=new ListNode()
        node=node.next
    }
    return result
};