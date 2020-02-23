var daysBetweenDates = function(date1, date2) {
    let [year1,month1,day1]=date1.split('-')
    let [year2,month2,day2]=date2.split('-')

    let d1=new Date(String(month1+'/'+day1+'/'+year1))
    let d2=new Date(String(month2+'/'+day2+'/'+year2))
    let diff1=Math.abs(d2-d1)
    return Math.ceil(diff1/(1000*3600*24))

};




var validateBinaryTreeNodes = function(n, leftChild, rightChild) {
    let totalDict=new Set()

    let queue=[0]

    while(queue.length){
        let next=[]
        let tempSet=new Set()
        for (const item of queue) {
            if(totalDict.has(item))return false
            totalDict.add(item)
            
            let [l,r]=[leftChild.shift(),rightChild.shift()]

            if(l!=-1&&tempSet.has(l))return false
            tempSet.add(l)
            if(l!=-1)next.push(l)
            if(r!=-1&&tempSet.has(r))return false
            tempSet.add(r)
            if(r!=-1)next.push(r)

        }
        queue=next
    }
    if(leftChild.length||rightChild.length)return false
    return true
};



var closestDivisors = function(num) {
   // if(num==1)return [1,2]
    let tar1=num+1, tar2=num+2
    let diff1=Infinity,diff2=Infinity
    let result1=[],result2=[]
     
    for (let i = 1; i*i <= tar2; i++) {

        if((tar1%i)===0&&i<tar1){
            
            if(Number.isInteger(tar1/i)){
              
                if(Math.abs(i-tar1/i)<diff1){
                    diff1=Math.abs(i-tar1/i)
                    result1=[i,tar1/i] 
                   
               
                }
                else flag1=true
            
                
            }

         }      

         if((tar2%i)===0){
            
            if(Number.isInteger(tar2/i)){
              
                if(Math.abs(i-tar2/i)<diff2){
                    diff2=Math.abs(i-tar2/i)
                    result2=[i,tar2/i]   
             
                }

            }
         }

    }
    if(diff1<diff2)return result1
    return result2 
};

console.log(
    closestDivisors(
        855077252
    )
)


console.log(4**.5)