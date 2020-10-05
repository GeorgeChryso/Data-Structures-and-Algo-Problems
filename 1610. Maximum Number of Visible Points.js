// You are given an array points, an integer angle, and your location, where location = [posx, posy] and points[i] = [xi, yi] both denote integral coordinates on the X-Y plane.

// Initially, you are facing directly east from your position. You cannot move from your position, but you can rotate. In other words, posx and posy cannot be changed. Your field of view in degrees is represented by angle, determining how wide you can see from any given view direction. Let d be the amount in degrees that you rotate counterclockwise. Then, your field of view is the inclusive range of angles [d - angle/2, d + angle/2].
// You can see some set of points if, for each point, the angle formed by the point, your position, and the immediate east direction from your position is in your field of view.

// There can be multiple points at one coordinate. There may be points at your location, and you can always see these points regardless of your rotation. Points do not obstruct your vision to other points.

// Return the maximum number of points you can see.

// My perfect solution didnt work :( , for each point for each extra degree i check for orientation
// between the candidate point, the center location, and an extreme point on the given line
// whicch is obviouslyt overkill  and got me 3k place cos thats what I deserve obviously. 
// Now, if it did work it would be O(precision * N ) where precision is how precise i want my degrees to be
var visiblePoints = function(points, angle, location) {
    let orientattion=(A,B,C)=>{
        let xAB=B[0]-A[0],
            yAB=B[1]-A[1],
            xBC=C[0]-B[0],
            yBC=C[1]-B[1]
        let det=xAB*yBC-xBC*yAB
        
        if(det>0)
            return 2// counterclockwise
        if(det<0)
            return 1// clockwise
        return 0 //collinear
    }
    let res=0

    let [xs,ys]=location
    for (let deg = 0; deg <= 360; deg+=.001) {
        
        let ang1=(angle/2+deg)%360*(Math.PI / 180)
        let ang2=(-((angle)/2+deg)%360)*(Math.PI / 180)

        let b1=ys-Math.tan(ang1)*xs        
        let b2=ys-Math.tan(ang2)*xs        
        let pointA=[],pointB=[]


        if( (ang1>=270||ang1<=90) || ( ang1<=0&&ang1>=-90) || ang1<=-270 ) 
            pointA=[xs+1,(xs+1)*Math.tan(ang1)+b1]
        else
            pointA=[xs-1,(xs-1)*Math.tan(ang1)+b1]


        if((ang2>270||ang2<90) || ( ang2<0&&ang2>-90) || ang2<-270)
            pointB=[xs+1,(xs+1)*Math.tan(ang2)+b2]
        else
            pointB=[xs-1,(xs-1)*Math.tan(ang2)+b2]
  
        let counter=0
        for (const [x1,y1] of points) {
            if(orientattion([x1,y1],location,pointA)===1&&orientattion([x1,y1],location,pointB)===2)
                counter++
        }
        res=Math.max(counter,res)
    }

    return res

};


// The optimal solution on the other hand is much simpler 
// basically First i transform my points into degrees in regards to my location as the center
// I need to perform a sliding window to see how many points can fit within my window of length
// angle 
var visiblePoints = function(points, angle, location) {
    
    //Math.atan2(y,x) returns the ANGLE in RADIANS between the point (X,Y), the CENTER (0,0) and x'x
    // so Math.atan2(5,5) * (180/Math.pi) === 45 //transforms it from radians to degrees instead
    let [sx,sy]=location
    let onCenter=points.filter(([x,y])=>(x==sx&&y==sy)).length //if i m standing on a point i always count it

    points=points.filter(([x,y])=>!(x==sx&&y==sy)) //other than that i dont want it messing with my result

                 .map(([x,y])=>{
                    // i need to transform my center from (0,0) to location, hence (y-sy,x-sx)
                         return Math.atan2(y-sy,x-sx)*(180/Math.PI) //returns the degrees
                    })
                 .sort((a,b)=>a-b) 

    //I will now perform the circular array duplication trick in order to consider points from different view
    points=[...points,...points.map(d=>d+360)] 
    // so for example if a point is 340, it can go with a point that is 15
    // example : [0,60,230,250,359], angle=200
    // would become     [0,60,230,250,359,360,420,590,610,719]
    // would allow me to pick  *   *   *   *   * ,which is practically [230,250,359,0,60] 
    // (every element of my starting array), which are obviously visible with anangle fo 200 deg


    //now i will perform a sliding window that tracks the points visible from my current degree-my angle degrees
    let start=0,n=points.length,result=0
    for (let end = 0; end < n; end++) {
        while(start<end&&points[start]<points[end]-angle) //if the point of start is no bueno
            start++ // shrink the window until all the points are within angle degrees 
        result=Math.max(result,end-start+1)
    }
    return result+onCenter //the points i can see + the ones i ms tanding on

};
console.log(
    visiblePoints(
        [[2,1],[2,2],[3,4],[1,1]],
            90,
        [1,1]
    )
)