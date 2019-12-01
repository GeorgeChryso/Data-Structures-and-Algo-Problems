// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4


// Time : ( O(Math.max(l1.length,l2.length)))
// Space: (O(Math.max(l1.length,l2.length)))

// Create two arrays from two LL, sort them, create the result LL
var mergeTwoLists = function(l1, l2) {
    // if there's a null , return the other one 
    if(!l1||!l2)return l1||l2


    let LinkedListToArray=(head)=>{
        var result=[]
        
        while(head){
           result.push(head.val) 
           head=head.next
        }
        
        return result
    }
    let ArrayToLinkedList=(arr)=>{
        function ListNode(val) {
            this.val = val;
                this.next = null;
            }
    
        let head=new ListNode(arr[0])
    
        let start=head
        for (let i = 1; i < arr.length; i++) {
            head.next=new ListNode(arr[i])    
            head=head.next
        }
        return start
    }



    let resultArray=LinkedListToArray(l1).concat(LinkedListToArray(l2)).sort((a,b)=>a-b)

    return ArrayToLinkedList(resultArray)
};



//wrong, remains to be solved
var mergeTwoLists = function(A, B) {
    function ListNode(val) {
        this.val = val;
            this.next = null;
        }

    var head=new ListNode(Infinity)
    var start=start
    while(A||B){
        
        if(A){
            while(A.val<=B.val){
                head.next=new ListNode(A.val)
                head=head.next
                A=A.next
            }
            head.next=new ListNode(B.val)
            head=head.next
            B=B.next
        }
        if(B){
            while(B.val<=A.val){
                head.next=new ListNode(B.val)
                head=head.next
                B=B.next
            }
            head.next=new ListNode(A.val)
            head=head.next
            A=A.next

        }
    }
    return temp
};

let ArrayToLinkedList=(arr)=>{
    function ListNode(val) {
        this.val = val;
            this.next = null;
        }

    let head=new ListNode(arr[0])

    let start=head
    for (let i = 1; i < arr.length; i++) {
        head.next=new ListNode(arr[i])    
        head=head.next
    }
    return start
}

console.log(mergeTwoLists(
    ArrayToLinkedList([1,2,3,4]),
    ArrayToLinkedList([1,3,4,5])
    )
)