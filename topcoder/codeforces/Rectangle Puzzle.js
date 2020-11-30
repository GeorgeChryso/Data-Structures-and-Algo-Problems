process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '',currentLine = 0,
    readline=_=>inputString[currentLine++]
process.stdin.on('data', inputStdin =>inputString += inputStdin);
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    function main() {
        let [w,h,a]=readline().split(' ').map(d=>Number(d))
        let result=solve(w,h,a)
        console.log(result.toString())
    }
    main();    
});

let solve=(ww,hh,a)=>{
    if(a>90)
        a=180-a

    let [w,h]=[Math.max(ww,hh),Math.min(ww,hh)]
    if(a==0)
        return  w*h
    if(a==90)
        return  h*h

        // Prove it, it's easy.

        // Normal case
    let t=Math.tan(Math.PI*a/180),tt=Math.tan(Math.PI*(90-a)/180)
    let k=(1+Math.sqrt(1+t**2))
    let x1= ( h-w*tt*k ) / ( t-tt*k*k) 
    x1=x1
    let h1=(t*x1)
    let q=(x1*(k-1))
    let x2=w-x1-q,h2=tt*x2
    let A1=(x1*h1),A2=(x2*h2)
    // console.log(aa,Math.atan2(w,h))
    if( aa<=2*Math.atan2(h/2,w/2))// if my angle is smaller than the angle created between 
        return w*h-A1-A2         // the lower side of of my rectangle and the point (w/2,h/2)
                                // 2* because Math.atan() returns the angle between the point and 0,0, but my lower side of my rec doesnt touch (0,0)    
   
    /*  2x trapezoids case
            ---x1--  ____
            _______/     /____
          h|      /     /      |
           |_____/     /_______|
           -x2- /_____/
                  
    */              
    let hypotenese=Math.sqrt(h**2+(h/t)**2)
     x1=(w+h/t-hypotenese) /2
     x2=x1-h/t
    return w*h- (x1+x2)*h
}
