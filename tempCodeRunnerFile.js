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
           // same idea, but different, but still the same
           mainLine.next=B
           B=B.next
           mainLine=mainLine.next
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
