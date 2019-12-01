// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4


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

    let resultArray=LinkedListToArray(l1).concat(LinkedListToArray(l2)).sort((a,b)=>a-b)

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
    
    return ArrayToLinkedList(resultArray)
};