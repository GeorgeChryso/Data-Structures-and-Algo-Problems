// Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

// Return the decimal value of the number in the linked list.
var getDecimalValue = function(head) {
    let result=head.val
    let z=head
    while( z=z.next){
        result=(result<<1)|z.val
        if(!z.next)break
    }
    return result
};