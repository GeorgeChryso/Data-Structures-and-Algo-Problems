




var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l=1
        let h=n
        while(l<h){
            let mid=Math.floor(l+(h-l)/2)
            if(mid==0)return mid

            if(isBadVersion(mid)){
                if(isBadVersion(mid-1)){
                    h=mid-1
                    continue
                }
                return mid
            }
            else{
                l=mid+1
            }

        }
        return l
    };
};

console.log(solution())