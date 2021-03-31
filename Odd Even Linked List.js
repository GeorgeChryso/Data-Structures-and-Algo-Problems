var oddEvenList = function(head) {
    
    if(!head)return head
    let odd=head
    let even=head.next
    let start=even

    while(even != null && even.next != null){

        odd.next = odd.next.next; 
        even.next = even.next.next; 
        odd = odd.next;
        even = even.next;
    }
    odd.next=start
    return head
};