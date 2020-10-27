// Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Notice that you should not modify the linked list.

// Follow up:

// Can you solve it using O(1) (i.e. constant) memory?



//tortoise and the hare to detect IF there is a cycle




var detectCycle = function(head) {

    //tortoise and the hare floyd
    // aka: if the two pointers ever meet, tehre is a cycle
    let slow = head,fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    };
    // Let the point of intersection be P
    if (fast == null || fast.next == null) return null;
    // Let the start of the cycle be S

    // Distance(head,S)===Distance(P,S) 
    // So i can find S if i put my slow back at the beginning
    // and walk equal steps until they meet
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    //when they meet, that's the start of the cycle
    return slow;
};