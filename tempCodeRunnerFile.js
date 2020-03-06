//simple BFS TLE
// var findCheapestPrice = function(n, flights, src, Target, maxStops) {

//   //source: [distances[i]]
//   let adjMatrix=[...Array(n)].map(d=>Array(n).fill(Infinity))
//   for (const [source,tar,cost] of flights) {
//     adjMatrix[source][tar]=cost
//   }



//   //nodes are like [costTillDestination,destination,previousStops]
//   let q=[[0,src,maxStops+1]]

//   let result=Infinity
  
//   while(q.length){
//       let [price,city,stops]=q.shift()
//       //you are guaranteed a correct result here because it will be the highest cost with a valid stops nubmer
//       if(Number(city)==Target){
//           result=Math.min(result,price)
//           continue
//       }

//       //this guarantees that the elements i will push to my q will be within the given previousstops range
//       if(stops>0){
//           for (const next in adjMatrix[city]) {
//               if(adjMatrix[Number(city)][next]===Infinity)continue
//               let cost=adjMatrix[Number(city)][next]
//               q.push([price+cost,next,stops-1])
//           }
//       }
//   }

//   return result===Infinity?-1:result

// };