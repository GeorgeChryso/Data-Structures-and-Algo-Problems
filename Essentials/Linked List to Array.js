let LinkedListToArray=(head)=>{
    var result=[]
    
    while(head){
       result.push(head.val) 
       head=head.next
    }
    
    return result
}