// You have k servers numbered from 0 to k-1 that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but cannot handle more than one request at a time. The requests are assigned to servers according to a specific algorithm:

// The ith (0-indexed) request arrives.
// If all servers are busy, the request is dropped (not handled at all).
// If the (i % k)th server is available, assign the request to that server.
// Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the ith server is busy, try to assign the request to the (i+1)th server, then the (i+2)th server, and so on.
// You are given a strictly increasing array arrival of positive integers, where arrival[i] represents the arrival time of the ith request, and another array load, where load[i] represents the load of the ith request (the time it takes to complete). Your goal is to find the busiest server(s). A server is considered busiest if it handled the most number of requests successfully among all the servers.

// Return a list containing the IDs (0-indexed) of the busiest server(s). You may return the IDs in any order.

 

// Example 1:


// Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
// Output: [1] 
// Explanation:
// All of the servers start out available.
// The first 3 requests are handled by the first 3 servers in order.
// Request 3 comes in. Server 0 is busy, so it's assigned to the next available server, which is 1.
// Request 4 comes in. It cannot be handled since all servers are busy, so it is dropped.
// Servers 0 and 2 handled one request each, while server 1 handled two requests. Hence server 1 is the busiest server.
// Example 2:

// Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
// Output: [0]
// Explanation:
// The first 3 requests are handled by first 3 servers.
// Request 3 comes in. It is handled by server 0 since the server is available.
// Server 0 handled two requests, while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.
// Example 3:

// Input: k = 3, arrival = [1,2,3], load = [10,12,11]
// Output: [0,1,2]
// Explanation: Each server handles a single request, so they are all considered the busiest.
// Example 4:

// Input: k = 3, arrival = [1,2,3,4,8,9,10], load = [5,2,10,3,1,2,2]
// Output: [1]
// Example 5:

// Input: k = 1, arrival = [1], load = [1]
// Output: [0]
 

// Constraints:

// 1 <= k <= 105
// 1 <= arrival.length, load.length <= 105
// arrival.length == load.length
// 1 <= arrival[i], load[i] <= 109
// arrival is strictly increasing.




//Okay, this was definitely a tuffie





// Approach 1: I need to keep track of time, at any given moment there can happen 2 things
// a task assignment to a server OR
// a server can free itself up, by finishing its request
// To keep a sense of time, i can use a priority queue (minBinaryHeap)
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

// TLE (last case not passed)
// N*lg(N)*K
var busiestServers = function(k, arrival, load) {
    let result=[],handled=[...Array(k)].map(d=>0),availables=[...Array(k)].map(d=>true)
        ,max=0

    // Ascending time pq
    let pq=new Heap()
    pq.comparator = (a,b)=>a[0]==b[0]?a[2]-b[2]:a[0]-b[0];// if time is the same always prefer to free servers first, and then allocate tasks

    //push every quadruplet to the priority queue
    for (let i = 0; i < arrival.length; i++) 
         pq.push([arrival[i],load[i],Infinity,i%k]) 
         //[ arrival time, load[i], tosetFree, preferedServer to allocate]

    // process each element according to time 
    while(pq.length()){
        let [currtime,toload,toget,toassign]=pq.poll()
        
        if(toget!==Infinity)//if a server is freed
            availables[toget]=true
        
        if(toload!==0)//if there needs to be a task allocation on a server
            for (let i = toassign; i <toassign+k; i++) //search every server in a circular way
                if(availables[i%k]==true){
                    let server=i%k
                    handled[server]++
                    max=Math.max(max,handled[server])
                    availables[server]=false
                    pq.push([currtime+toload,0,server,0])
                    break
                }                
    }
    //create the answer
    for (let i = 0; i < handled.length; i++) 
        if(handled[i]==max)
            result.push(i)        
    
    return result
};



//Approach 2 : Barely TLE (hard pass)
// Smarter, instead of managing time, just manage servers
// O(N*K)
var busiestServers = ( k, arrival, load ) => {
    // keep track of how many requests each server handled
    const handled = Array(k).fill(0) 
    
    // keep track of when each server will be available again
    const servers = Array(k).fill(0) //servers[i]= t means server i will be free at time t

    let max = 0,n=arrival.length
    for (let i = 0; i <n; i++) {
        // search for an available server (i%k being the first preferred one)
        let serverIndex = -1,arrivalTime=arrival[i]      
        for (let j = i%k; j < k+i%k; j++) 
            if ( servers[j%k] <= arrivalTime ){// if the j%k-ths server is available sooner than arrivalTime
                serverIndex =j%k              // assign it this task at time t
                handled[ serverIndex ]++ //increment the handled cos i used the server
                max = Math.max( max, handled[ serverIndex ] ) //keep the max result
                servers[ serverIndex ] = arrivalTime + load[i] 
                //free the used server at time arrivalTime+load[i]
                break
            } 
    }

    let res=[]
    for(let i=0;i<k;i++)
        if(handled[i]==max)
            res.push(i)
    return res
}


// Approach 3: 
//splay trees / red black trees / Self Balancing BST
// Ordered Set, is a set that is always sorted

// The idea is to use an Ordered Set to keep track of the available servers
// in comprarison to a priority queue, an ordered set cannot contain duplicates.
// so it would be of the form {1,3,5,6} , always sorted
// when i add a new server it would be also sorted {1,3,4,5,6}
// Then, i can use a function of that data strucutre: 
// Ordered Set ceiling (x), which returns the first item in the set bigger than x  
// IN O(LOGN) time, which is amazing and exactly what i need here

// O(N*log(N+K))
var busiestServers = ( k, arrival, load ) => {
    let max = 0,n=arrival.length

    const handled = Array(k).fill(0) // handled counter for each server
    
    let available= new TreeMap() //available servers
    for (let i = 0; i < k; i++) 
        available.add(i) // all servers are available at the begining
    

    // this heap will ONLY keep track of the to be freed elements
    let pq=new Heap() //data type [timetofree,server to be freed]
    pq.comparator((a,b)=>a[0]-b[0])

    for (let i = 0; i <n; i++) {
        // search for an available server (i%k being the first preferred one)
        let serverIndex = -1,arrivalTime=arrival[i],endTime=arrival[i]+load[i]      
        
        //first free up ever available server 
        while(pq.length()&&pq.peek()[0]<=arrivalTime){
            let [time,serverToFree]=pq.poll()
            available.add(serverToFree)
        }

        //then assign the arrivalTime
        if(available.size()==0) // all busy
            continue
        serverIndex=available.ceiling(i%k) // get the first available server than i%k
        if(serverIndex==null)//nothing available bigger than i%k
            serverIndex=available.lower() //so just get the lower available server

        max = Math.max( max, handled[ serverIndex ] ) //keep the max result
        handled[ serverIndex ]++ //increment the handled cos i used the server

        available.remove(serverIndex) //no loger availables server
        pq.push([endTime,serverIndex]) // but it will be freed on endTime
    }

    let res=[]
    for(let i=0;i<k;i++)
        if(handled[i]==max)
            res.push(i)
    return res
}