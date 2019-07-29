// Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

// Example 1:

// Input: [[1,1],[2,2],[3,3]]
// Output: 3
// Explanation:
// ^
// |
// |        o
// |     o
// |  o  
// +------------->
// 0  1  2  3  4

//mostfrequenetelementofarray

function findMostFrequent(arr) {
    return arr
      .reduce((acc, cur, ind, arr) => {
        if (arr.indexOf(cur) === ind) {
          return [...acc, [cur, 1]];
        } else {
          acc[acc.indexOf(acc.find(e => e[0] === cur))] = [
            cur,
            acc[acc.indexOf(acc.find(e => e[0] === cur))][1] + 1
          ];
          return acc;
        }
      }, [])
      .sort((a, b) => b[1] - a[1])
      .filter((cur, ind, arr) => cur[1] === arr[0][1])
      .map(cur => cur[0]);
  }


//frequency
  function foo(z) {
    let b = [], prev=[];
   let arr=z.map((d)=>''+d[0]+''+d[1])
    .sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return Math.max(...b);
}

//posa pernan
    function posa(p,lin){
        var z=[]
        
        lin.forEach((c)=>
        {   
            var count=0;
            p.forEach( (d)=>{
                console.log(d,'perna apo',c,'?')
                if(c[0]!=undefined){
                    if(
                    d[1]==Math.round(c[0]*d[0]+c[1] )
                    
                    ){
                        console.log('perna')
                        count++
                    }
                    else{
                        console.log('den perna')
                    }
                }else{
                    if(c==d[0]){
                        count++
                    }
                    else{
                        console.log('den perna')
                    }
                }

                     }
                     )
              console.log('count='+count)       
           z.push(count)
        }
        )
        return Math.max(...z)
    }


var maxPoints = function(points) {
    

    
    if(points.length==0 || points.length==1){
        return  points.length;
    }

   
    var container={}
    for (let i = 0; i < points.length; i++) {
                for (let j =i+1 ; j < points.length; j++)
                {


                     if((points[i][0]-points[j][0])!=0){

                      let  a= (points[i][1]-points[j][1])/(points[i][0]-points[j][0])
                    let b=points[i][1]-(a*points[i][0])
                       
                        if (container['y='+a+'x+'+b]==undefined){
                            container['y='+a+'x+'+b]=[2,1]

                        }
                        else{   
                            if ( container['y='+a+'x+'+b][1]==0){
                            container['y='+a+'x+'+b][0]+=1

                            container['y='+a+'x+'+b][1]=1
                        }
                        


                    }
                    }
                    else 
                    {   
                     
                        
                        if (container['x='+points[i][0]]==undefined){
                            container['x='+points[i][0]]=[2,1]
                        }
                        else{
                            if (  container['x='+points[i][0]][1]==0){
                            container['x='+points[i][0]][0]+=1
                            container['x='+points[i][0]][1]=1
                        }

                        }

                        
                    }

                    

                    }

                    for (var property in container) {
                        if (container.hasOwnProperty(property)) {
                          container[property][1]=0
                        }
                      }


                }  
   // console.log(Object.keys(container))
    let z=[]
    for (var property in container) {
        if (container.hasOwnProperty(property)) {
          z.push(container[property][0])
        }
      }

    return Math.max(...z)

    }


    // console.log('points',points,'\n lines',lines)
    // console.log ('kalw posa')

            //   return  posa(points,lines) 
            



//ypoperiptoseis
// A(x1,y1) B(x2,y2)
//  eutheia // y pote? otan y1=y2 px (1,3) (2,3) => (0,3) to xw  
// eutheia // x pote? otan x1=x2 px  (2,1) (2,3 )
// oles oi alles

console.log
(
maxPoints(

    [[560,248],[0,16],[30,250],[950,187],[630,277],[950,187],[-212,-268],[-287,-222],[53,37],[-280,-100],[-1,-14],[-5,4],[-35,-387],[-95,11],[-70,-13],[-700,-274],[-95,11],[-2,-33],[3,62],[-4,-47],[106,98],[-7,-65],[-8,-71],[-8,-147],[5,5],[-5,-90],[-420,-158],[-420,-158],[-350,-129],[-475,-53],[-4,-47],[-380,-37],[0,-24],[35,299],[-8,-71],[-2,-6],[8,25],[6,13],[-106,-146],[53,37],[-7,-128],[-5,-1],[-318,-390],[-15,-191],[-665,-85],[318,342],[7,138],[-570,-69],[-9,-4],[0,-9],[1,-7],[-51,23],[4,1],[-7,5],[-280,-100],[700,306],[0,-23],[-7,-4],[-246,-184],[350,161],[-424,-512],[35,299],[0,-24],[-140,-42],[-760,-101],[-9,-9],[140,74],[-285,-21],[-350,-129],[-6,9],[-630,-245],[700,306],[1,-17],[0,16],[-70,-13],[1,24],[-328,-260],[-34,26],[7,-5],[-371,-451],[-570,-69],[0,27],[-7,-65],[-9,-166],[-475,-53],[-68,20],[210,103],[700,306],[7,-6],[-3,-52],[-106,-146],[560,248],[10,6],[6,119],[0,2],[-41,6],[7,19],[30,250]]

)

)