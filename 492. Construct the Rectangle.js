// For a web developer, it is very important to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length X and width Y satisfy the following requirements:

// 1. The area of the rectangular web page you designed must equal to the given target area.

// 2. The width Y should not be larger than the length X, which means X >= Y.

// 3. The difference between length X and width Y should be as small as possible.
// You need to output the length X and the width Y of the web page you designed in sequence.


var constructRectangle = function(A) {
    var X=A,Y=X
    var L=0,W=0
    var dist=Infinity
    while (X>=1 )
    {  
        if(A%X==0){
            Y=X

            while(Y>=1)
            {   
                if(X-Y>dist)break
                console.log(X,Y,dist)
                if(X*Y==A ){
                    L=X
                    W=Y
                    dist=X-Y
                    break
                }
                Y--
            }
        }
        X--
    }

    return [L,W]
};


// Observation: W<=Math.sqrt(A)
var constructRectangle = function(area) {
    let w = Math.floor(Math.sqrt(area));
    
    while(area % w)
        w--;
    
    return [area/w, w];
};
console.log(constructRectangle(   
    2
))