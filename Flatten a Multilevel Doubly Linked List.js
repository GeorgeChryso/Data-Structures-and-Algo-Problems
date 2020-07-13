
// You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

// Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.





var flatten = function(head) {
    let stack=[], node=head
    while(node&&(node.next||stack.length||node.child)){
        //has child?
        if(node.child){
            if(node.next)stack.push(node.next)
            node.child.prev=node
            node.next=node.child
            node.child=null
            node=node.next
        }
        else{
            //no child, has next?
            if(node.next){
                node=node.next
            }
            else{
                //no child no next. has stack?
                if(stack.length){
                    node.next=stack.pop()
                    node.next.prev=node
                    node=node.next
                }
            }
        }
    }
 
    return head
};