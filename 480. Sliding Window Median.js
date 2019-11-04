// Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

// Examples:
// [2,3,4] , the median is 3

// [2,3], the median is (2 + 3) / 2 = 2.5

// Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Your job is to output the median array for each window in the original array.



// no sliding window, just sorting, SLOW, REDUNTANT
var medianSlidingWindow = function(A, K) {
    if (K%2==0) {
        var result=[]
        
        for (let i = K-1; i < A.length; i++) {
            let sort=A.slice(i-K+1,i+1).sort((a,b)=>a-b)
            console.log(sort)
            result.push((sort[(sort.length)/2-1]+sort[sort.length/2])/2)

        }



        return result
    }
    else{
        var result=[]
        
        for (let i = K-1; i < A.length; i++) {
            let sort=A.slice(i-K+1,i+1).sort((a,b)=>a-b)
            result.push(sort[(sort.length-1)/2])
        }



        return result
    }
};


// 2 queues incomplete
var medianSlidingWindow = function(A,K) {
    var result=[]
    var current=A.slice(0,K).sort((a,b)=>a-b)
    var memo={}
    if(K%2==0){
        let curL=current.slice(0,K/2)
        let curR=current.slice(K/2)
        result.push((curL[curL.length-1]+curR[0])/2)
        for (let i = K; i < A.length; i++) {
            //add the to be deleted element
            if(memo[A[i-k]])memo[A[i-k]]++
            else memo[A[i-k]]=1 //to be deleted element
            // and delete it if its on the heap
            while(memo[curL[curL.length-1]]){
                curL.pop()
                memo[curL[curL.length-1]]--
            }
            while(memo[curR[0]]){
                curR.shift()
                memo[curR[0]]--
            }


            if(A[i]>=curR[0]){

            }
            else{

            }

        }

    }
    else{


    }

};






// class queue
const medianSlidingWindow = (nums, k) => {

    class Queue {
        constructor () { this.list = [] }
        size () { return this.list.length }
        removeNum (num) { this.list.splice(this.bs(num), 1) }
        addNum (num) { this.list.splice(this.bs(num), 0, num) }
      
        bs (num) {
          let [l, r] = [0, this.size() - 1]
          while (l <= r) {
            const mid = Math.floor((l + r) / 2)
            this.list[mid] < num ? l = mid + 1 : r = mid - 1
          }
          return l
        }
      
        getMedian () {
          const [n, half] = [this.size(), Math.floor(this.size() / 2)]
          return (n % 2 === 0) ? (this.list[half - 1] + this.list[half]) / 2 : this.list[half]
        }
      }
  
      

    return nums.reduce(([res, queue], num, i) => {
      queue.addNum(num)
      if (queue.size() > k) queue.removeNum(nums[i - k])
      if (queue.size() === k) res.push(queue.getMedian())
      return [res, queue]
    }, [[], new Queue()])[0]
}


//splicing the window, ineffective, runs ok 
var medianSlidingWindow = function(nums, k) {
    // create my window of size K and sort it
    const window = nums.slice(0, k).sort((a, b) => a - b);


    //calculate the median of the given array a
    const median = a => k % 2 === 0 ? (a[k/2 - 1] + a[k/2]) / 2 : a[~~(k/2)];




    const biset = target => {
        let l = 0, r = window.length;

        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (window[mid] >= target) r = mid;
            else l = mid + 1;
        }
        return l;
    };


    const ans = [median(window)];


    for (let i = 1; i <= nums.length - k; i++) {

        //pre einai i thesi tou nums[i-1] sto window mou
        const pre = biset(nums[i - 1]);
        // vgalto 
        window.splice(pre, 1);
        

        //cur einai ekei pou prepei na mpei to kainourgio stoixeio
        const cur = biset(nums[i + k - 1])
        //valto 
        window.splice(cur, 0, nums[i + k - 1])


        //upologise to neo median 
        ans.push(median(window));
    }
    return ans
}


console.log(medianSlidingWindow(
  // [1,3,-1,-3,5,3,6,7],3
  // [1,4,2,3],4
  [7,0,3,9,9,9,1,7,2,3],6
))
