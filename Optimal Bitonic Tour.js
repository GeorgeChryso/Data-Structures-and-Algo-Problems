//CLRS 15-3



//greedy wrong
var OBT=(points)=>{
    let result=[]
    let distance=(a,b)=>Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
    let memo=new Set()
    points.sort((a,b)=>a[0]-b[0]) //sort x ascending
    console.log(points)
    let end=points[points.length-1], curr=0
    memo.add(curr)
    result.push(points[curr])

    while(memo.size!==points.length){
        let min=Infinity,minindex=0
        if(points[curr][0]<end[0]){
            for (let i = curr+1; i < points.length; i++) {
                if(!memo.has(i)&&distance(points[curr],points[i])<min){
                    min=distance(points[curr],points[i])
                    minindex=i
                }
            }
            memo.add(minindex)
            curr=minindex
            result.push(points[curr])
        }
        else{
            for (let i = curr-1; i>=0; i--) {
                if(!memo.has(i)&&distance(points[curr],points[i])<min){
                    min=distance(points[curr],points[i])
                    minindex=i
                }
            }
            memo.add(minindex)
            curr=minindex
            result.push(points[curr])
        }
    }

    return result
}

console.log(OBT([[1,0],[6,1],[8,2],[7,4],[2,5],[0,6],[5,4]]))