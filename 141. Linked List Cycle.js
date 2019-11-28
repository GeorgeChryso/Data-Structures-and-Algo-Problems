// Given a linked list, determine if it has a cycle in it.

// To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.




var hasCycle = function(head) {
    if(head==null||head.val===null||head.next===null)return false  
    var map=new Map();
    while(head){
        if( map.has(head))return true
        map.set(head)
        head=head.next
    }
    return false
};