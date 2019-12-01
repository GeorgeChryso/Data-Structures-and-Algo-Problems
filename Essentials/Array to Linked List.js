var ArrayToLinkedList=(arr)=>{
    function ListNode(val) {
        this.val = val;
            this.next = null;
        }

    let head=new ListNode(arr[0])

    let start=head
    for (let i = 1; i < test.length; i++) {
        head.next=new ListNode(arr[i])    
        head=head.next
    }
    return start
}