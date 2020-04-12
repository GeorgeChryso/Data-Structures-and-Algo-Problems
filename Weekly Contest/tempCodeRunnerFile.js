


// var stringMatching = function(words) {

//     let result=new Set()
//     for (const a of words) {
//         for (const word of words) {
            
//             if(word.search(a)!=-1&&a!=word){
//                 result.add(a)
//                 break
//             }
//         }
//     }
    
//     let end=[]
//     result.forEach(d=>end.push(d))

//     return end
// };



// var processQueries = function(queries, m) {
//     let memo={

//     }
//     let P=[...Array(m)].map((d,i)=>{
//          memo[i+1]=i
//          return i+1
//     })
//     let result=[]
//     console.log(P)
//     for (const val of queries) {
        
//         let i=P.indexOf(val)
//         result.push(i)
//         for (let j =i; j>=1; j--) {
//             P[j]=P[j-1]            
//         }

//         P[0]=val

//     }
    
//     return result
// };  




// console.log(
//     processQueries(
//         [3,1,2,1],5
//     )
// )


// var entityParser = function(text) {
//     text=text.replace(new RegExp('&quot;','g'),'\\"')
//     text=text.replace(new RegExp('&apos;','g'),'\'')
//     text=text.replace(new RegExp('&amp;','g'),'&')
//     text=text.replace(new RegExp('&gt;','g'),'>')
//     text=text.replace(new RegExp('&lt;','g'),'<')
//     text=text.replace(new RegExp('&frasl;','g'),'/')

// return text
// };

// console.log(
//     entityParser(
//         "and I quote: &quot;...&quot;"

//     )
// )

