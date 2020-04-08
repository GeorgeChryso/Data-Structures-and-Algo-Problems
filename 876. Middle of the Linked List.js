


// Given a non-empty, singly linked list with head node head, return a middle node of linked list.

// If there are two middle nodes, return the second middle node.




var middleNode = function(head) {
    if(head==null||head.next==null)return head

    let start=head
    let counter=0
    while(start!=null){
        counter++
        start=start.next
    }

    let middle=Math.floor(counter/2)
    start=head
    counter=0
    while(counter<middle){
        start=start.next
        counter++
    }
    return start
};