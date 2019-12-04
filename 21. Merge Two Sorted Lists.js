// Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

// Example:

// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4


// Time : ( O(Math.max(l1.length,l2.length)))
// Space: (O(Math.max(l1.length,l2.length)))





// testing material
var ArrayToLinkedList=(arr)=>{
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

let LinkedListToArray=(head)=>{
    var result=[]
    
    while(head){
       result.push(head.val) 
       head=head.next
    }
    
    return result
}





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






// O(n), O(1)
// essentially I rewire all the LL so that the result doesnt need extra space
var mergeTwoLists = function(A, B) {
    if(!A||!B)return A||B

    //this is the current node
    var mainLine
    if(A.val<=B.val){
        mainLine=A
    }
    else{
        mainLine=B
    }



    var start=mainLine


    while(A&&B){

        if(A.val<=B.val){

            // Notice that temp serves as saving temporary the continuation of my A LL, so that it doesnt get altered when I say (mainline.next=A and mainLine=mainLine.next
             let temp=A.next
            
            //my new element will be the smallest(A)
               mainLine.next=A
            // my new current element will be the next element
               mainLine=mainLine.next
               A=temp;

            // this would solve my problem without needing the temp
            // [A,mainline.next,mainLine]=[A.next,A,A]
            // mainline=mainLine.next

            //[A,mainLine,mainLine.next]=[A.next,A.next,A]
            continue
        }
        
        if(B.val<=A.val){
            let temp=B.next
            start.next=B
            start=start.next
            B=temp;
        }


    }



    // i m out of the while loop, so either A or B has reached their end. 
    // Note that the first List that reaches its end, means that my result, (mainline) has no option but to keep going from the non-fnished List
    if(!A && B){
        mainLine.next=B
    }
    if(!B && A){
        mainLine.next=A
    }

    return start
};



console.log(
    LinkedListToArray(mergeTwoLists(
//    ArrayToLinkedList([1,2,3,4]),ArrayToLinkedList([1,3,4,5]))
ArrayToLinkedList([2]),ArrayToLinkedList([1])

    )

)
)