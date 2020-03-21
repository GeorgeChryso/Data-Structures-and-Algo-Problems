// A cinema has n rows of seats, numbered from 1 to n and there are ten seats in each row, labelled from 1 to 10 as shown in the figure above.

// Given the array reservedSeats containing the numbers of seats already reserved, for example, reservedSeats[i]=[3,8] means the seat located in row 3 and labelled with 8 is already reserved. 

// Return the maximum number of four-person families you can allocate on the cinema seats. A four-person family occupies fours seats in one row, that are next to each other. Seats across an aisle (such as [3,3] and [3,4]) are not considered to be next to each other, however, It is permissible for the four-person family to be separated by an aisle, but in that case, exactly two people have to sit on each side of the aisle.



//Bitwise O(n)  48/53 SLE / space limit exceeded
var maxNumberOfFamilies = function(n, reservedSeats) {
    
    var seats=[...Array(n)].map(d=>(1<<10)-1)
  
    for (const [i,j] of reservedSeats) {
        seats[i-1]^=(1<<j-1)
    }

    let freq={}
    for (const num of seats) {
        freq[num]=(freq[num]||0) +1
    }

    let m1=parseInt('0111100000',2)
    let m2=parseInt('0000011110',2)
    let m3=parseInt('0001111000',2)
    let result=0
    for (let [mask,v] of Object.entries(freq)) {
        result+=Math.max(Number((m3&mask)===m3),Number((m2&mask)===m2)+Number((m1&mask)===m1))*v
    }

    return result
};

// Greedy O(n) SLE / space limit exceeded
var maxNumberOfFamilies = function(n, reservedSeats) {
    
    var seats=[...Array(n)].map(d=>[1,1,1])

    for (let [i,j] of reservedSeats) {
        j-=1
        if(j==1||j==2)seats[i-1][0]=0

        if(j==3||j==4){
            seats[i-1][0]=0
            seats[i-1][1]=0
        }
        if(j==5||j==6){
            seats[i-1][1]=0
            seats[i-1][2]=0
        }

        if(j==7||j==8)seats[i-1][2]=0

    }
    return seats.reduce((acc,curr)=>acc+ Math.max(curr[1],curr[0]+curr[2]) ,0 ) 
};

// Sort() Passed NLOGN O(1) space
var maxNumberOfFamilies = function(n, reservedSeats) {
    
    reservedSeats.sort((a,b)=>a[0]-b[0])
    let l=1,m=1,r=1
    let currRow=0
    let result=-2
    for (let [i,j] of reservedSeats) {
        if(currRow!==i){
            if(i!=currRow+1) result+=(i-currRow-1)*2
            result+=Math.max(m,r+l)
            currRow=i
            l=1
            r=1
            m=1
        }
        
        if(j==2||j==3)l=0

        if(j==4||j==5){
            l=0
            m=0
        }
        if(j==6||j==7){
            m=0
            r=0
        }

        if(j==8||j==9)r=0

    }

    return result+Math.max(m,r+l)+(n-currRow)*2
};

//bitwise sort
// O(nlogn) runtime O(1) space PASSES
var maxNumberOfFamilies = function(n, reservedSeats) {
    
    reservedSeats.sort((a,b)=>a[0]-b[0])

    let mask=(1<<10)-1
    let m1=parseInt('0111100000',2), m2=parseInt('0000011110',2), m3=parseInt('0001111000',2)

    let UpdateResult=mask=>Math.max(Number((m3&mask)===m3),Number((m2&mask)===m2)+Number((m1&mask)===m1))
  
    let currRow=0,result=-2

    for (let [i,j] of reservedSeats) {
        
        if(currRow!==i){
            if(i!=currRow+1) result+=(i-currRow-1)*2 //a missing row gives me 2 seats 
            result+=UpdateResult(mask)
            currRow=i
            mask=(1<<10)-1
        }
        
        mask^=(1<<j-1)

    }
    //resultsofar + last iteration's contribution + the number of seats MISSING rows give me 
    return result+UpdateResult(mask)+(n-currRow)*2
};
