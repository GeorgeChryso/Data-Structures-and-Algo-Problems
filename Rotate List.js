// Given a linked list, rotate the list to the right by k places, where k is non-negative.

// Example 1:

// Input: 1->2->3->4->5->NULL, k = 2
// Output: 4->5->1->2->3->NULL
// Explanation:
// rotate 1 steps to the right: 5->1->2->3->4->NULL
// rotate 2 steps to the right: 4->5->1->2->3->NULL
// Example 2:

// Input: 0->1->2->NULL, k = 4
// Output: 2->0->1->NULL
// Explanation:
// rotate 1 steps to the right: 2->0->1->NULL
// rotate 2 steps to the right: 1->2->0->NULL
// rotate 3 steps to the right: 0->1->2->NULL
// rotate 4 steps to the right: 2->0->1->NULL


//Ο(n), O(1), just do what it says
var rotateRight = function(head, k) {
    if(!head||k==0|| (head&&!head.next))
        return head
    let next=head,curr=head,len=0
    //first find the length
    while(curr){
        curr=curr.next
        len++
    }
    k%=len //if k>=length, mod it so u can get the actual steps
    if(k==0) //if(k==0) no rotation is needed
        return head

    //otherwise u need to move len-k-1 steps from head
    // and make the cut on the next node
    curr=head
    for(let i=0;i<-1+len-k;i++)
        curr=curr.next
    let start=curr.next //my new root
    curr.next=null// this is the previous item( so my new end node)
    let q=start
    while(q.next)
        q=q.next
    q.next=next// i connect my ll to my old root
    
    return start
};