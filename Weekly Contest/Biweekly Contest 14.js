

//All answers must be in uppercase letters.

var toHexspeak = function(num) {
    var dict={}
    dict['A']=true
    dict['B']=true
    dict['C']=true
    dict['D']=true
    dict['E']=true
    dict['F']=true
    dict['I']=true
    dict['O']=true
    dict['1']=true
    dict['0']=true

   var z=new Number(num).toString(16).toUpperCase().split("")
    for (let i = 0; i < z.length; i++) {
        if(dict[z[i]]===undefined)return "ERROR"
        else{
            if(z[i]==='0')z[i]="O"
            if(z[i]==="1")z[i]="I"
        }     
    }
    return z.join("")
};





var toHexspeak = function(num) {
    var dict=new Set(["A","B","C","D","E","F","I","O","0","1",0,1])

   var z= parseInt(num).toString(16).toUpperCase().split("")
    for (let i = 0; i < z.length; i++) {
        if(!dict.has(z[i]))return "ERROR"
        else{
            if(z[i]==="0")z[i]="O"
            if(z[i]==="1")z[i]="I"
        }     
    }
    return z.join("")
};
console.log(toHexspeak(
    "252"

))



var removeInterval = function(intervals, toBeRemoved) {
    var result=[]
    var rmIntersecion=(A,B)=>{
        var [startA,endA]=A
        var [startB,endB]=B
    

        if(endA<=startB||endB<=startA){
            result.push(A)
            return
        }
        if( startA>=startB && endA <=endB){
            return
        }

        if( startA<startB && startB<=endA && endA<=endB){

            result.push([startA,startB])
            return
        }
        

        if(startB<=startA && endB >=startA&&endB<=endA){
            result.push([endB,endA])
            return
        }
        
        if( startA<=startB && startB<= endA){


              if( endB>endA){
                result.push([startA,startB])
              }
              else{
                result.push([startA,startB])
                result.push([endB,endA])
                return
              }
        }
        else{
            result.push(A) 
            return
        }

     
    
    }

     intervals.forEach(d=>rmIntersecion(d,toBeRemoved))
     return result
};


console.log(removeInterval(
    [[-5,-4],[-3,-2],[1,2],[3,5],[8,9]],
    [-1,4]
))

