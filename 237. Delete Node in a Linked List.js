// Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.

// Given linked list -- head = [4,5,1,9], which looks like following:




var deleteNode = function(node) {
    node.val=node.next.val
    node.next=node.next.next
};