// For a web developer, it is very important to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length X and width Y satisfy the following requirements:

// 1. The area of the rectangular web page you designed must equal to the given target area.

// 2. The width Y should not be larger than the length X, which means X >= Y.

// 3. The difference between length X and width Y should be as small as possible.
// You need to output the length X and the width Y of the web page you designed in sequence.


var constructRectangle = function(A) {
    var X=1,Y=1
    var L=0,W=0
    var dist=Infinity
    while (X<=A )
    {   
        if(A%X==0){
            Y=1
            console.log(X)
            while(Y<=X){
                console.log("aads",X,Y,dist)

                if( X-Y<=dist && X*Y==A){
                    console.log('yo'+dist)
                    dist=X-Y
                    L=X
                    W=Y
                }
            Y++
            }
        }
        X++
    }

    return [L,W]
};

console.log(constructRectangle(
   6
))