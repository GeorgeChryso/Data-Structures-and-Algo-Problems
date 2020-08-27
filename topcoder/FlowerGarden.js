// You are planting a flower garden with bulbs to give you joyous flowers throughout the year. However, you wish to plant the flowers such that they do not block other flowers while they are visible.

// 
// You will be given a int[] height, a int[] bloom, and a int[] wilt. Each type of flower is represented by the element at the same index of height, bloom, and wilt. height represents how high each type of flower grows, bloom represents the morning that each type of flower springs from the ground, and wilt represents the evening that each type of flower shrivels up and dies. Each element in bloom and wilt will be a number between 1 and 365 inclusive, and
// wilt[i] will always be greater than bloom[i]. You must plant all of the flowers of the same type in a single row for appearance, and you also want to have the tallest flowers as far forward as possible. However, if a flower type is taller than another type, and both types can be out of the ground at the same time, the shorter flower must be planted in front of the taller flower to prevent blocking. A flower blooms in the morning, and wilts in the evening, so even if one flower is blooming on the same day another flower is wilting, one can block the other.

// You should return a int[] which contains the elements of height in the order you should plant your flowers to acheive the above goals. The front of the garden is represented by the first element in your return value, and is where you view the garden from. The elements of height will all be unique, so there will always be a well-defined ordering.
// You should return a int[] which contains the elements of height in the order you should plant your flowers to acheive the above goals. The front of the garden is represented by the first element in your return value, and is where you view the garden from. The elements of height will all be unique, so there will always be a well-defined ordering.




// i can solve this but without dp
// and that's apparently WRONG because 
// a,b overlap, b,c overlap, but a and c may not overlap
// yet my approach puts c on the same group with a 
let flowerGarden=(height,bloom,wilt)=>{
    let trip=[]
    for (let i = 0; i < height.length; i++) 
        trip.push([height[i],bloom[i],wilt[i]])        
    //NlogN
    trip.sort((a,b)=>a[1]==b[1]? a[0]-b[0]:a[1]-b[1])
    //O(N)
    let res=[[trip[0][0]]]
    for (let i = 1; i < trip.length; i++) {
        let [h1,b1,w1]=trip[i-1] , [h2,b2,w2]=trip[i]      
        if(b2<=w1){
            trip[i]=[h2,b1,Math.max(w1,w2)]
            res[res.length-1].push(h2)
        }
        else
            res.push([h2])
    }
    //N*2logN
    for (let i = 0; i < res.length; i++) 
        res[i].sort((a,b)=>a-b)    

    res.sort((a,b)=>b[0]-a[0])
    return res.reduce((a,b)=>a.concat(b),[])
}




let tests=[
[[5,4,3,2,1],
[1,1,1,1,1],
[365,365,365,365,365],], //[ 1,  2,  3,  4,  5 ],

[[5,4,3,2,1],
    [1,5,10,15,20],
    [4,9,14,19,24],
    ], // [ 5,  4,  3,  2,  1 ],
[
    [5,4,3,2,1],
[1,5,10,15,20],
[5,10,15,20,25],

]  ,// [ 1,  2,  3,  4,  5 ],

[[5,4,3,2,1],
    [1,5,10,15,20],
    [5,10,14,20,25],
    ], //[ 3,  4,  5,  1,  2 ],
[	
    [1,2,3,4,5,6],
    [1,3,1,3,1,3],
    [2,4,2,4,2,4],
    ],//[ 2,  4,  6,  1,  3,  5 ],

[ 	
[3,2,5,4],
[1,2,11,10],
[4,3,12,13],
] //[ 4,  5,  2,  3 ],

]

tests.forEach(([a,b,c])=>console.log(flowerGarden(a,b,c)))