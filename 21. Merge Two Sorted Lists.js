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

// create the result array O(m+n) O(m+n)
var mergeTwoLists=(A,B)=>{
    function ListNode(val) {
        this.val = val;
            this.next = null;
        }

    var result=new ListNode()
    var pointer=result;
    var respoint=result
    while(A||B){
        if(A){
            while(B&&B.val<=A.val){
                pointer.next=new ListNode(B.val)
                pointer=pointer.next
                B=B.next
            }   
            pointer.next=new ListNode(A.val)
            pointer=pointer.next
            A=A.next
        }
        if(B){
            while(A&&A.val<=B.val){
                pointer.next=new ListNode(A.val)
                pointer=pointer.next
                A=A.next
            }   
            pointer.next=new ListNode(B.val)
            pointer=pointer.next
            B=B.next
        }


    }

    return respoint;
}

// needs work
var mergeTwoLists = function(l1, l2) {
    let itr = { val: 0, next: null };
  const head = itr;

  while (l1 || l2) {
    if (!l1) {
      itr.next = l2
      l2 = null;
    } else if (!l2) {
      itr.next = l1
      l1 = null;
    } else {
      if (l1.val < l2.val) {
        itr.next = l1;
        l1 = l1.next;
      } else {
        itr.next = l2;
        l2 = l2.next;
      }
    }

    itr = itr.next;
  }

  return head.next;
};


//
var mergeTwoLists = function(l1, l2) {
    let currentNode = { val: null, next: l1 && l2 ? l1.val > l2.val ? l2 : l1 : l1 || l2 };
    let rootNode = currentNode;
    
    while (currentNode !== null) {
        if (l1 !== null) {
            if (l2 !== null && l2.val <= l1.val) {
                currentNode.next = l2;
                currentNode = currentNode.next;
                l2 = l2.next;
            } else {
                currentNode.next = l1;
                currentNode = currentNode.next;
                l1 = l1.next;
            }
        } else {
            currentNode.next = l2;
            currentNode = currentNode.next;
            if (l2) l2 = l2.next;
        }
    }
    
    return rootNode.next;
};

console.log(mergeTwoLists(
    ArrayToLinkedList([1,2,3,4]),
    ArrayToLinkedList([1,3,4,5])
    )
)