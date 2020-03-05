// A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Now suppose you are given the locations and height of all the buildings as shown on a cityscape photo (Figure A), write a program to output the skyline formed by these buildings collectively (Figure B).
// The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi], where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively, and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0. You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.


// The output is a list of "key points" (red dots in Figure B) in the format of [ [x1,y1], [x2, y2], [x3, y3], ... ] that uniquely defines a skyline. A key point is the left endpoint of a horizontal line segment. Note that the last key point, where the rightmost building ends, is merely used to mark the termination of the skyline, and always has zero height. Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.


// The number of buildings in any input list is guaranteed to be in the range [0, 10000].
// The input list is already sorted in ascending order by the left x position Li.
// The output list must be sorted by the x position.
// There must be no consecutive horizontal lines of equal height in the output skyline. For instance, [...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should be merged into one in the final output as such: [...[2 3], [4 5], [12 7], ...]


/* B [Li,Ri,Hi]
*/
// O(n^2) runtime O(n) space
var getSkyline = function(B) {
    let mapped=[]

    //seperate its block to its top left corner and bottom right corner coordinates
    B.forEach(
        ([L,R,H])=>{
            mapped.push([L,H],[R,0])
        }
    )
    
    //if there is an overlapping block with bigger height, update the y of each of my new [x,y] elements 
    mapped=mapped.map(
        ([x,y])=>{
           let newy=0
           for (const [L,R,H] of B) {
               
               if(L<=x&&x<R){
                    newy=Math.max(H,newy)
               }
               if(L>x)break //this would be wrong if my input wasnt sorted in ascending L values
           }
           
           return [x,newy]
        }
    )
    
    
    //sort the array so i can remove the redundant elements
    mapped.sort((a,b)=>{
        // if my elements are overlapping on x, always choose the bigger y
        if(a[0]==b[0]){
            return b[1]-a[1]
        }
        return a[0]-b[0]
    })
    //remove the reduntant elements which are the ones with equal height with their previous element, as they are not needed to describe the skyline, and therefore 
    return mapped.filter(([x,y],i)=>i>=1?y!==mapped[i-1][1]:true)
};




//Math.max solution
var getSkyline = function(buildings) {
    if (buildings.length === 0) return [];

    let startEndHeightList = [];
    for (let building of buildings){
        let [start, end, height] = building;
        startEndHeightList.push([start, 0-height]);
        startEndHeightList.push([end, height]);
    }
    startEndHeightList.sort((a,b)=> a[0]===b[0] ? a[1]-b[1] : a[0]-b[0]) // ascending sort by x, y
    let result = [];
    let currHeights = [0]; // init with ground height 0
    let prevMaxHeight = 0;
    for (let i = 0; i < startEndHeightList.length; i++){
        let [pos, height] = startEndHeightList[i];
        if (height < 0){ // new building, add to currHeights
            currHeights.push(0-height);
        }else{ // end of building, add to map as 0
            let removeIdx = currHeights.indexOf(height);
            currHeights.splice(removeIdx,1);
        }

        let currMaxHeight = Math.max(...currHeights)
        if (currMaxHeight != prevMaxHeight) result.push([pos, currMaxHeight])
        prevMaxHeight = currMaxHeight;
    }
    return result;
}




//Tushar Roy theoretically O(nlogn) ,but O(n^2 due to splice)
var getSkyline = function(buildings) {
    //determine the start point and end point of a building, also mark it as start or end. It is sorted by rule 
    var buildingPoints = getBuildingPoints(buildings); 
    var res = [];
    var queue = [0];
    var max = 0;
    
    for (var point of buildingPoints) {
        // pick each point: if start => push height to queue, end => remove height from queue. the queue is increasing
        if (point.isStart) {
            // start => push height to queue, find the index by binarySearch
            var index = binarySearch(queue, point.height); //O(logn)
            //let index=0
            let target=point.height
            for (var i = 0; i < queue.length; i++) {
                if(queue[i]<=target&&(i==queue.length-1||queue[i+1]>=target)){
                    index=i
                    break
                }                
            }
            queue.splice(index, 0, point.height);
        }
        else {
            // remove height from queue
            var index = queue.indexOf(point.height);

            let binarySr=(target)=>{
                let left=0
                let right=queue.length-1

                while(left<right){
                    let mid = Math.floor(left + (right - left) / 2); 
                    //console.log(left,right,mid,queue)
                    if(queue[mid]===target&&(queue[mid-1]<target||mid===0))return mid
                    if(queue[mid]<target)left=mid+1
                    if(queue[mid]>=target)right=mid-1
                }
                return left
            }

            let index2=binarySr(point.height)

            console.log(index,index2,queue)
            queue.splice(index, 1);
        }
        
        // if the push or remove changes the maxHeight, mean it moves to another block, push that point (x, maxCurrentHeight) to res
        var currentMax = queue[queue.length - 1];
        if (max != currentMax) {
            max = currentMax;
            res.push([point.x, max]);
        }
    }
    
    return res;
};

function binarySearch(arr, target) {
    var left = 0;
    var right = arr.length - 1;
    var mid = 0;
    
    while(left < right) {
        mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    
    if (arr[left] < target) return ++left;
    return left;
}

function getBuildingPoints(buildings) {
    var buildingPoints = [];
    for (var building of buildings) {
        var start = {};
        start.x = building[0];
        start.height = building[2];
        start.isStart = true;
        buildingPoints.push(start);
        
        var end = {};
        end.x = building[1];
        end.height = building[2];
        buildingPoints.push(end);
        end.isStart = false;
    }
    
    buildingPoints.sort(compPareBuildingPoint);
    
    return buildingPoints;
}

function compPareBuildingPoint(a, b) {
    //first compare by x.
    if (a.x != b.x) return a.x - b.x;
    else {
        //If they are same then use this logic
        //if two starts are compared then higher height building should be picked first
        //if two ends are compared then lower height building should be picked first
        //if one start and end is compared then start should appear before end
        return (a.isStart ? -a.height : a.height) - (b.isStart ? -b.height : b.height);
    }
}






//heap Solutiion todo
var getSkyline = function(B) {
    let points=[]

    //seperate its block to its top left corner and bottom right corner coordinates
    B.forEach(
        ([L,R,H])=>{
            points.push([L,-H],[R,H])
        }
    )
    points.sort((a,b)=>a[0]==b[0]?a[1]-b[1]:a[0]-b[0]) //nlogn
    console.log(points)
    let heap=new maxBinaryHeap()
    heap.comparator=([x1,y1],[x2,y2])=>y1-y2
    heap.valComparison=(a)=>a[1]
    let result=[]
    let pre=0
    let cur=0
    heap.push([0,0])
    for (const i in points) { //n*logn
        let [x,h]=points[i]
        if(h<0)heap.push([x,-h]) //logn
        else heap.remove(h)     //logn

        cur=heap.peek()[1]
        if(cur!=pre){
            result.push([x,cur])
            pre=cur
        }
    }
    return result
};

class maxBinaryHeap{
    constructor(){
        this.heap=[]
        this.comparator=(a,b)=>b-a
        this.valComparison=()=>null
        this.store={}
    }

    hasParent=index=>index>=1
    getParent=(index)=>this.heap[Math.floor((index-1)/2)]
    hasLeft=(index)=>2*index+1<=this.heap.length-1
    getLeftChild=(index)=>this.heap[2*index+1]
    hasRight=index=>2*index+2<=this.heap.length-1
    getRightChild=(index)=> this.heap[2*index+2]
    
    length=()=>this.heap.length
    peek=()=>this.heap[0]
    push(element){
        this.heap.push(element)
        //this element is pushed on the rightmost node of the lowest level
        // and needs  to be bubbled up accordingly
        if(this.store[this.valComparison(element)]!==undefined)
            this.store[this.valComparison(element)].add(this.heap.length-1)
        else{
            this.store[this.valComparison(element)]=new Set()
            this.store[this.valComparison(element)].add(this.heap.length-1)
        }
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(
            this.hasParent(index)&&
            (this.comparator(this.heap[index],this.getParent(index))>=0)
            ){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
        
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1){
            this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
            return this.heap.pop()
        }

        let result=this.heap[0]

        this.swap(0,this.heap.length-1)
        this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
        this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&( this.comparator(this.heap[index],this.getLeftChild(index))<0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))<0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
   
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))>=0){
                    //and swap
                  this.swap(index,index*2+1)
                  index=index*2+1
                }
                // else choose the right child
                else {
                    //and swap
                  this.swap(index,index*2+2)  
                  index=index*2+2  
                }
                
            }
        }
    }

    heapify() {
        if (this.length() < 2) return;
        for (let i = 1; i < this.length(); i++) {
          this.bubbleUp(i);
        }
      }


      // I have to create a remove function that works in O(logn time)
    remove=(height)=>{

        if(!this.store[height].size){
            return
        }
        else{
            let index=-1
          
            for (const value of this.store[height].values()) {
                index=value
                break;
            }
            this.swap(index,this.heap.length-1) 
            this.store[this.valComparison(this.heap[this.heap.length-1])].delete(this.heap.length-1)
            this.heap.pop() //O(1)
            this.bubbleDown(index) //logn
        }

    }


    swap=(a,b)=>{
        if(a===b)return
        if(this.valComparison(this.heap[a])!=this.valComparison(this.heap[b])){
            this.store[this.valComparison(this.heap[a])].delete(a)
            this.store[this.valComparison(this.heap[a])].add(b)
            this.store[this.valComparison(this.heap[b])].add(a)
            this.store[this.valComparison(this.heap[b])].delete(b)
        }
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}

 
// mergeSort commenting todo
var getSkyline = function(buildings) {
    const mergeSort = (start, end) => {
        if (end <= start) {
            if (end < start) return [];
            const building = buildings[end];
            return [[building[0],building[2]],[building[1],0]];
        }
        const mid = Math.floor((start + end) / 2);
        return merge(mergeSort(start, mid), mergeSort(mid + 1, end));
    }
    return mergeSort(0, buildings.length - 1);
};

function merge(leftBuildings, rightBuildings) {
    let leftY = 0;
    let rightY = 0;
    let left = 0;
    let right = 0;
    let x;
    let y;
    const res = [];
    while (left < leftBuildings.length || right < rightBuildings.length) {
        const leftX = left < leftBuildings.length ? leftBuildings[left][0] : Infinity;
        const rightX = right < rightBuildings.length ? rightBuildings[right][0] : Infinity;
        if (leftX < rightX) {
            [x,leftY] = leftBuildings[left++];
        } else if (leftX > rightX) {
            [x, rightY] = rightBuildings[right++];
        } else {
            [x, leftY] = leftBuildings[left++];
            [_, rightY] = rightBuildings[right++];
        }
        y = Math.max(leftY, rightY);
        if (res.length === 0 || y !== res[res.length - 1][1]) {
            res.push([x,y]);
        }
    }
    return res;
}




console.log(
    getSkyline(
        [[2,13,10],[10,17,25],[12,20,14]]
       // [[0,3,3],[1,5,3],[2,4,3],[3,7,3]]
        //[[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
            )
)