// Remove all elements from a linked list of integers that have value val.


var removeElements = function(head, val) {
    while(head&&head.val==val)head=head.next
    if(!head)return null
    let node=head
    while(node){
        if(node.next&&node.next.val===val)node.next=node.next.next
        else node=node.next
    }
    return head
};