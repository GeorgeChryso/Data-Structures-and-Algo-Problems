// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Follow up:
// What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

// Example:

// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7

// more elegant
/* Essentially create nodes liek that

    l1-> 7-> 1 -> 2  -> 3  -> 4
    l2->          8  -> 9  -> 5
    -------------------
         7<- 1 <- 10 <- 12 <- 9
    And then transform your created list so it transfers the remainder
         7<- 1 <- 10 <- 2  <- 9  
                        remainder =1
         7<- 1 <- 1  <- 2  <- 9  
                        remainder =1
         7<- 2 <- 1  <- 2  <- 9  
                        remainder =0
         7<- 2 <- 1  <- 2  <- 9  <=need to reverse taht 

result=> 7-> 2 -> 1  -> 2  -> 9

*/
var addTwoNumbers = function(l1, l2) {
    let findListLength=(head,result=0)=>head?findListLength(head.next,result+1):result,
    n=findListLength(l1),m=findListLength(l2)
    if(m>n)
        temp=l1,l1=l2,l2=temp,tempn=n,n=m,m=tempn //ensure l1 is the bigger list
    
    let prev=null,node
    for (let i = 0; i <n; i++){
        node=new ListNode(l1.val)
        if(i>=n-m)
            node.val+=l2.val,
            l2=l2.next
        l1=l1.next
        node.next=prev,
        prev=node
    }
    let remainder=0,head=prev
    while(prev){
            prev.val+=remainder
            remainder=(prev.val-(prev.val%10))/10
            prev.val%=10
            if(!prev.next&&remainder>0)
                prev.next=new ListNode(0)
            prev=prev.next 
    }
    return reverseLinkedList(head)
};

let reverseLinkedList=head=>{
    let prev=null,temp
    while(head)
        temp=head.next,
        head.next=prev,
        prev=head,
        head=temp
    return prev
}