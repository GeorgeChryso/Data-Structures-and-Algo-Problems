
// Sort a linked list in O(n log n) time using constant space complexity.

//insertion sort
var sortList = function(head) {
    if(head==null)return null

    let n=head;
    while(n!=null){
        if(n.next)n.next.prev=n
        n=n.next
    }

    let start=head.next
    while(start!=null){
        let key=start.val

        let q=start.prev
        while(q!=null&&q.val>key){
            q.next.val=q.val
            q=q.prev
        }

        if(q==null){
            head.val=key
        }
        else q.next.val=key

        start=start.next
    }   
    return head

};

//insertion sort without prev (slow)
var sortList = function(head) {
    if(head==null||head.next==null)return head
    
    class ListNode{
        constructor(val){
            this.next=null
            this.val=val
        }

    }

    let dummy = new ListNode(0)
    let prev=dummy
    let curr=head
    let next=null

    while(curr != null){
        next = curr.next;
        while(prev.next != null && prev.next.val < curr.val){
            prev = prev.next;
        }
        curr.next = prev.next;
        prev.next = curr;
        curr = next;
        prev = dummy;
    }
    return  dummy.next;

};


// mergesort