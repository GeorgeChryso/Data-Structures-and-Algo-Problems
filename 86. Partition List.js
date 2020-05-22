
// Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.





// extra space
var partition = function(head, x) {
    
    let p1=[],p2=[]
    let start=head
    while(start){
        start.val<x?p1.push(start.val):p2.push(start.val)
        start=start.next
    }
    p1=p1.concat(p2)
    start=head
    while(start){
        start.val=p1.shift()
        start=start.next
    }

    return head
};


//in place. 2 pointers
var partition = function(head, x) {
    let start=head
    if(!start)return start
    let p1=new ListNode(0),p2=new ListNode(0)
    let result=p1,q=p2
    while(start){
        if(start.val<x){
            p1.next=start
            p1=start
        }
        else{
            p2.next=start
            p2=start
        }
        start=start.next
    }
    p2.next=null
    p1.next=q.next
    return result.next
};