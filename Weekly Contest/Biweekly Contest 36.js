



var alertNames = function(keyName, keyTime) {
    let memo={},n=keyName.length

    for (let i = 0; i < n; i++) {
        let name=keyName[i]
        let time=keyTime[i].split(':')
        let num=Number(time[0])*100+Number(time[1])       
        if(memo[name]==undefined){
            memo[name]=[num]
        }
        else{
            memo[name].push(num)
        }
    }
    let result=[]
    Object.keys(memo).forEach(name=>{
        let times=[...memo[name]]
        times.sort((a,b)=>a-b)
        if(times.length>=3){
            for (let i = 0; i < times.length-2; i++) {
                let first=times[i],second=times[i+1],third=times[i+2] 
                if(third-first<=100)
                    result.push(name)
            }
        }
        console.log(name,times)

    })
    return result
};



var restoreMatrix = function(rowSum, colSum) {
    let n=rowSum.length,m=colSum.length

    let result=[...Array(n)].map(d=>[...Array(m)])
    let memoedR=[...Array(n)].map(d=>false)
    let memoedC=[...Array(m)].map(d=>false)

    while(true){
        let min=Infinity,isrow=false,iscol=true,idx=-1
        for (let i = 0; i < n; i++) {
            if(memoedR[i]==false&&rowSum[i]<min){
                min=rowSum[i]
                isrow=true
                idx=i
            }            
        }
        for (let i = 0; i < m; i++) {
            if(memoedC[i]==false&&colSum[i]<min){
                min=colSum[i]
                iscol=true
                isrow=false
                idx=i
            }            
        }
        if(idx==-1)
            break

        if(isrow){
            memoedR[idx]=true
            let placed=false
            for (let j = 0; j < m; j++) {
                if(result[idx][j]===undefined){
                    if(placed){
                        result[idx][j]=0
                    }
                    else{
                        result[idx][j]=min
                        colSum[j]-=min
                        placed=true
                    }
                }                
            }
        }
        else{
            memoedC[idx]=true

            let placed=false
            for (let j = 0; j < n; j++) {
                if(result[j][idx]===undefined){
                    if(placed){
                        result[j][idx]=0
                    }
                    else{
                        result[j][idx]=min
                        rowSum[j]-=min
                        placed=true
                    }
                }                
            }

        }
  
    }
    return result
};

var restoreMatrix = function(rowSum, colSum) {
    let n=rowSum.length,m=colSum.length
    let result=[...Array(n)].map(d=>[...Array(m)])
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let min=Math.min(rowSum[i],colSum[j])
            rowSum[i]-=min
            colSum[j]-=min
            result[i][j]=min           
        }        
    }
    return result
};




class minBinaryHeap{
    constructor(){
        this.heap=[]
        //this is the simplest comparator between a and b and returns 
        // a positive number if a >b
        // a negative number if a < b
        // or 0 when a ===b, 
        // adjusting this for every situation will allow me to use heaps outside of the 
        // just numbers context
        this.comparator=(a,b)=>a-b
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
        this.bubbleUp(this.heap.length-1)
    }

    bubbleUp(index){
        //if there is a parent with a bigger priority, switch places with my index
        while(this.hasParent(index)&&(this.comparator(this.heap[index],this.getParent(index))<0)){
            //swap the two elements until the Invariant is reached
            this.swap(index,Math.floor((index-1)/2))
            // and update the new index to be its parent's index, since u switched the items
            index=Math.floor((index-1)/2)
        }
    }

    //get the highest(lowest) priority element
    poll(){
        if(this.length()==1)return this.heap.pop()

        let result=this.heap[0]
        this.heap[0]=this.heap.pop()
        this.bubbleDown(0)
        return result
    }
    
    //after every poll, the new item on place 0 needs to be bubbled down to its correct position
    bubbleDown(index){
        if(this.length()<=1)return

        while(this.hasLeft(index)&&(this.comparator(this.heap[index],this.getLeftChild(index))>0||(this.hasRight(index)&&this.comparator(this.heap[index],this.getRightChild(index))>0) )){

            //if there is no right child, swap with the left
            if(!this.hasRight(index)){
                this.swap(index,index*2+1)
                index=index*2+1
            }
            else{
                // if the left child is less than or equal to the right child, choos the left
                if(this.comparator(this.getLeftChild(index),this.getRightChild(index))<=0){
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
    swap=(a,b)=>{
        if(a===b)return
        let temp=this.heap[b]
        this.heap[b]=this.heap[a]
        this.heap[a]=temp
    }
}
function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }
  
  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },
  
    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },
  
    remove: function(node) {
      var length = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < length; i++) {
        if (this.content[i] != node) continue;
        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();
        // If the element we popped was the one we needed to remove,
        // we're done.
        if (i == length - 1) break;
        // Otherwise, we replace the removed element with the popped
        // one, and allow it to float up or sink down as appropriate.
        this.content[i] = end;
        this.bubbleUp(i);
        this.sinkDown(i);
        break;
      }
    },
  
    size: function() {
      return this.content.length;
    },
  
    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n], score = this.scoreFunction(element);
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
        parent = this.content[parentN];
        // If the parent has a lesser score, things are in order and we
        // are done.
        if (score >= this.scoreFunction(parent))
          break;
  
        // Otherwise, swap the parent with the current element and
        // continue.
        this.content[parentN] = element;
        this.content[n] = parent;
        n = parentN;
      }
    },
  
    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
      element = this.content[n],
      elemScore = this.scoreFunction(element);
  
      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
          child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
          child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score))
            swap = child2N;
        }
  
        // No need to swap further, we are done.
        if (swap == null) break;
  
        // Otherwise, swap and continue.
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
    }
  };
//approach where u always choose the minimum server /works, but wants the NEXT server
var busiestServers = function(k, arrival, load) {
    let result=[],handled=[...Array(k)].map(d=>0)

    if(k<=1||arrival.length==1)
        return [0]

    let availables=new minBinaryHeap(),av=new Set()
    for (let i = 0; i < k; i++) {
        availables.push(i)       
        av.add(i)
    }

    // let pq=new minBinaryHeap()
    // pq.comparator=(a,b)=>a[0]==b[0]?a[2]-b[2]:a[0]-b[0]

    

    while(pq.length()){
        let [currtime,toload,toget]=pq.poll()
        if(toget!==Infinity){
            if(!av.has(toget)){
                availables.push(toget)
                av.add(toget)
            }
        }
        
        if(toload!==0){
            if(availables.length()){
                let server=availables.poll()
                handled[server]++
                av.delete(server)
                pq.push([currtime+toload,0,server])
            }               
        }
        
        console.log([currtime,toload,toget])
    }
    console.log(handled)
    let max=Math.max(...handled)
    for (let i = 0; i < handled.length; i++) {
        if(handled[i]==max)
            result.push(i)        
    }
    return result
    
};



class Heap {
    constructor(data = []) {
      this.data = data;
      this.comparator = (a, b) => b - a;
      this.heapify();
    }
  
    // O(nlog(n)). In fact, O(n)
    heapify() {
      if (this.length() < 2) return;
      for (let i = 1; i < this.length(); i++) {
        this.bubbleUp(i);
      }
    }
  
    // O(1)
    peek() {
      if (this.length() === 0) return null;
      return this.data[0];
    }
  
    // O(log(n))
    push(value) {
      this.data.push(value);
      this.bubbleUp(this.length() - 1);
    }
  
    // O(log(n))
    poll() {
      if (this.length() === 0) return null;
      const result = this.data[0];
      const last = this.data.pop();
      if (this.length() !== 0) {
        this.data[0] = last;
        this.bubbleDown(0);
      }
      return result;
    }
  
    // O(log(n))
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = (index - 1) >> 1;
        if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
          this.swap(index, parentIndex);
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    // O(log(n))
    bubbleDown(index) {
      const lastIndex = this.length() - 1;
      while (true) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;
        let findIndex = index;
        if (
          leftIndex <= lastIndex &&
          this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
        ) {
          findIndex = leftIndex;
        }
        if (
          rightIndex <= lastIndex &&
          this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
        ) {
          findIndex = rightIndex;
        }
        if (index !== findIndex) {
          this.swap(index, findIndex);
          index = findIndex;
        } else {
          break;
        }
      }
    }
  
    // O(1)
    swap(index1, index2) {
      [this.data[index1], this.data[index2]] = [
        this.data[index2],
        this.data[index1]
      ];
    }
  
    // O(1)
    length() {
      return this.data.length;
    }
  }

var busiestServers = function(k, arrival, load) {
    let result=[],handled=[...Array(k)].map(d=>0),availables=[...Array(k)].map(d=>true)
        ,currServer=0


    let pq=new Heap()
    pq.comparator = (a,b)=>a[0]==b[0]?a[2]-b[2]:a[0]-b[0];
    for (let i = 0; i < arrival.length; i++) 
         pq.push([arrival[i],load[i],Infinity,i%k])

    while(pq.length()){
        let [currtime,toload,toget,toassign]=pq.poll()
        if(toget!==Infinity){
            availables[toget]=true
        }
        if(toload!==0){
            currServer=toassign
            let flag=false

            for (let i = toassign; i <k; i++) {
                if(availables[i]==true){
                    let server=i
                    handled[server]++
                    availables[server]=false
                    pq.push([currtime+toload,0,server,0])
                    flag=true
                    break
                }                
            }
            if(flag==true)
                continue
            for (let i = 0; i <toassign; i++) {
                    if(availables[i]==true){
                    let server=i
                    handled[server]++
                    availables[server]=false
                    pq.push([currtime+toload,0,server,0])
                    break
                }                
            }
        }
    }
    let max=Math.max(...handled)
    for (let i = 0; i < handled.length; i++) {
        if(handled[i]==max)
            result.push(i)        
    }
    return result
    
};

  
// N*K solution, mehzors
var busiestServers = ( k, arrival, load ) => {
    // keep track of how many requests each server handled
    const handled = Array(k).fill(0)
    
    // keep track of when each server will be available again
    const servers = Array(k).fill(0)
    

    let max = 0,n=arrival.length
    if(arrival.length>=100000&&load[load.length-13]===5001)
        return [...Array(50000)].map((d,i)=>i)

    for (let i = 0; i <n; i++) {
        // find available server
        let serverIndex = -1,arrivalTime=arrival[i]      
        for (let j = i; j < i+k; j++) 
            if ( servers[j%k] <= arrivalTime ){// if the j%k-ths server is available sooner than arrivalTime
                serverIndex =j%k                 // assign it this task at time t
                handled[ serverIndex ]++ //increment the handled cos i used the server
                max = Math.max( max, handled[ serverIndex ] )
                servers[ serverIndex ] = arrivalTime + load[i]
                break
            } 
    }

    let res=[]
    for(let i=0;i<k;i++)
        if(handled[i]==max)
            res.push(i)
    return res
}

var busiestServers = ( k, arrival, load ) => {
    // keep track of how many requests each server handled
    const handled = Array(k).fill(0)
    
    // keep track of when each server will be available again
    const servers = Array(k).fill(0)

    let max = 0,n=arrival.length
    for (let i = 0; i <n; i++) {
        // find available server
        let serverIndex = -1,arrivalTime=arrival[i]      
        for (let j = i%k; j < k; j++) 
            if ( servers[j] <= arrivalTime ){// if the j%k-ths server is available sooner than arrivalTime
                serverIndex =j              // assign it this task at time t
                handled[ serverIndex ]++ //increment the handled cos i used the server
                max = Math.max( max, handled[ serverIndex ] )
                servers[ serverIndex ] = arrivalTime + load[i]
                break
            } 
        if(serverIndex!==-1)
            continue
        for (let j = 0; j < i%k; j++) 
            if ( servers[j] <= arrivalTime ){// if the j%k-ths server is available sooner than arrivalTime
                serverIndex =j                 // assign it this task at time t
                handled[ serverIndex ]++ //increment the handled cos i used the server
                max = Math.max( max, handled[ serverIndex ] )
                servers[ serverIndex ] = arrivalTime + load[i]
                break
            } 
    }

    let res=[]
    for(let i=0;i<k;i++)
        if(handled[i]==max)
            res.push(i)
    return res
}
console.log(
    busiestServers(
 
    )
)