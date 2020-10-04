





var specialArray = function (nums) {
    nums.sort((a,b)=>a-b)
    for (let i = 0; i < nums[nums.length - 1] + 1; i++) {
        let count = 0
        for (let j = 0; j < nums.length; j++) {
            if (i <= nums[j])
                count++
        }
        if (count == i)
            return i
    }
    return -1
};



var isEvenOddTree = function(root) {
    if(root.val%2==0)
        return false
    let q=[root]
    let currlevel=1
    while(q.length){ 
        let temp=[]   
     
        for (let node of q) {
            
            if(node&&node.left){
                temp.push(node.left)
            }
            if(node&&node.right){
                temp.push(node.right)
            }
        }
        
        if(currlevel%2==0){
            if(temp.length&&temp[0].val%2==0)
                return false
            for (let i = 0; i < temp.length-1; i++) {
                if(temp[i].val>=temp[i+1].val||temp[i].val%2==0||temp[i+1].val%2==0)
                    return false                
            }
        }
        else{
            if(temp.length&&temp[0].val%2==1)
                return false
            for (let i = 0; i < temp.length-1; i++) {
                if(temp[i].val<=temp[i+1].val||temp[i].val%2==1||temp[i+1].val%2==1)
                    return false                
            }
        }

        q=temp
        currlevel++
    }
    return true
};



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
    for (let deg = 0; deg <= 360; deg+=1) {
        
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
            if(orientattion([x1,y1],location,pointA)===1&&orientattion([x1,y1],location,pointB)===2){
                counter++
            }
        }
        console.log(pointA,pointB)
        console.log((angle+deg)/2)

        res=Math.max(counter,res)
    }

    return res

};


console.log(
    visiblePoints(
        [[2,1],[2,2],[3,4],[1,1]], 90,  [1,1]
    )
)