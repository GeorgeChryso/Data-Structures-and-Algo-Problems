// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

// Your algorithm's runtime complexity must be in the order of O(log n).

var search = function(A, target) {
    

    //search for the smallest element
    let lo=0,hi=A.length-1
    while(lo<hi){
        let mid=Math.floor((lo+hi)/2)
        if(A[mid]>A[hi]) lo=mid+1;
        else hi=mid;
    }

    //lo==hi is the pivot
    let rot=lo 
    lo=0
    hi=A.length-1
    while(lo<=hi){
         mid=(lo+hi)/2;
        let realmid=(mid+rot)%A.length;
        if(A[realmid]==target)return realmid;
        if(A[realmid]<target)lo=mid+1;
        else hi=mid-1;
    }
    return -1;
};