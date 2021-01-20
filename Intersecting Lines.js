// class Fenwick2DPURQ{
//     constructor(A){
//         this.n=A.length
//         this.m=A[0].length
//         this.B=[...Array(this.n+1)].map(d=>[...Array(this.m+1)].map(d=>0))
//         for(let i = 1 ; i <= this.n ; ++i) 
//           for(let j = 1 ; j <= this.m ; ++j) 
//             this.upd(i, j, A[i-1][j-1]);
//     }
//     lowbit=i=>i&(-i)  
//     sum=(x,y)=>{
//         let ans = 0;
//         for(let i = x ; i > 0 ; i -= this.lowbit(i)) 
//           for(let j = y ; j > 0 ; j -= this.lowbit(j)) 
//             ans += this.B[i][j];
//         return ans;
//     }
//     // queries should be x1<= x2 && y1<=y2
//     //submatrix sum query //notice that the queries will have to be xE[1,n], yE[1,m] cos there is no 0-th element
//     query=(x1,y1,x2,y2)=>this.sum(x2, y2) - this.sum(x1 - 1, y2) - this.sum(x2, y1 - 1) + this.sum(x1 - 1, y1 - 1)
//     //update a point
//     upd=(x,y,val)=>{
//         for(let i = x ; i <= this.n ; i += this.lowbit(i)) 
//             for(let j = y ; j <= this.m ; j += this.lowbit(j)) 
//               this.B[i][j] += val;
//     }
// }
// class Solution {
//     solve(A, lo, hi) {
//         A=A.map(([m,b])=>[m*lo+b,m*hi+b])
//         let [miny,maxy]=[Infinity,-Infinity],
//             [minx,maxx]=[Infinity,-Infinity],n=A.length
//         if(n==1)
//             return 0
//         for(let i=0;i<n;i++)
//             miny=Math.min(miny,A[i][1]),
//             maxy=Math.max(maxy,A[i][1]),
//             minx=Math.min(minx,A[i][0]),
//             maxx=Math.max(maxx,A[i][0]) 

//         let m=Math.min(minx,miny),res=0
//         console.log(A)

//         let freq={},seen=new Set()


//         if(m<=0)
//             A=A.map(([a,b])=>[a-m+1,b-m+1]),
//             maxx=maxx-m+1,
//             maxy=maxy-m+1
//         A.forEach(([x,y])=>{
//             let ele=[x,y]+''
//             freq[ele]=(freq[ele]||0)+1
//         })
//         A.forEach(([x,y])=>{
//             let ele=[x,y]+''
//             if(freq[ele]>1&&!seen.has(ele))
//                 res+=freq[ele],
//                 seen.add(ele)
//         })
//         let B=[...Array(maxx+2)].map(d=>[...Array(maxy+2)].map(d=>0))
//         A.forEach(([x,y])=>B[x][y]=1)
//         console.log(A)
//         B.forEach(d=>console.log(d+''))
//         let Fenwick=new Fenwick2DPURQ(B)
//         for(let i=n-1;i>=0;i--){
//             let [cx,cy]=A[i]
//             if(seen.has(A[i]+''))
//                 continue
//             cx++,cy++
//             res+= Number(
//                     Fenwick.query(cx,1,maxx+1,cy) +Fenwick.query(1,cy,cx,maxy+1)>2  )
                 
//         }
//         return res
//     }
// }
// class FenwickSimple{
//     constructor(A){
//         A.unshift(0)
//         this.n=A.length
//         this.B1=[...Array( this.n+1)].map(d=>0)
//         for(let i=1;i< this.n;i++)
//             this.upd(i,A[i])
//     }
//     lowbit=i=>i&(-i)  
//     sum=(x)=>{
//         let sum=0
//         for(let i = x ; i > 0 ; i -= this.lowbit(i))
//             sum += this.B1[i]
//         return sum;
//     }
//     //updates the point at index x by v
//     upd=(x,v)=>{
//         for(let i=x;i<= this.n;i+=this.lowbit(i))
//             this.B1[i]+=v 
//     }
//     //queries the sum for a range
//     query=(l,r)=>this.sum(r)-this.sum(l-1)
// }
// class FenwickSimple{
//     constructor(A){
//         A.unshift(0)
//         this.n=A.length
//         this.B1=[...Array( this.n+1)].map(d=>0)
//         for(let i=1;i< this.n;i++)
//             this.upd(i,A[i])
//     }
//     lowbit=i=>i&(-i)  
//     sum=(x)=>{
//         let sum=0
//         for(let i = x ; i > 0 ; i -= this.lowbit(i))
//             sum += this.B1[i]
//         return sum;
//     }
//     //updates the point at index x by v
//     upd=(x,v)=>{
//         for(let i=x;i<= this.n;i+=this.lowbit(i))
//             this.B1[i]+=v 
//     }
//     //queries the sum for a range
//     query=(l,r)=>this.sum(r)-this.sum(l-1)
// }
// class Solution {
//     solve(A, lo, hi) {
//         A=A.map(([m,b])=>[m*lo+b,m*hi+b])
//                 console.log(A)
//         let n=A.length,freqx={},freqy={},seen=new Set(),original={},res=0
//         if(n==1)
//             return 0
//         A.sort((a,b)=>a[0]-b[0])
//         A.forEach(([x,y])=>{
//             freqx[x]=(freqx[x]||0)+1
//             freqy[y]=(freqy[y]||0)+1
//         })
//         let ys=[...Object.keys(freqy)].sort((a,b)=>a-b)
//         ys.forEach((d,i)=>original[d]=i)
//         A.forEach(([x,y],i)=>{
//             if((freqx[x]>1|| freqy[y]>1)&&!seen.has(i))
//                 seen.add(i),
//                 res++
//         })
//         let B=[...Array(ys.length+1)].map(d=>0)
//         let Fenwick=new FenwickSimple(B)
//         for(let i=n-1;i>=0;i--){
//             let [cx,cy]=A[i]
//             if(Fenwick.query(1,original[cy]+1)>0&&!seen.has(i))
//                 seen.add(i),
//                 res++
//             Fenwick.upd(original[cy]+1,1)
//         }
//         Fenwick=new FenwickSimple(B)
//         for(let i=0;i<n;i++){
//             let [cx,cy]=A[i]
//             if(Fenwick.query(original[cy]+1,ys.length+1)>0&&!seen.has(i))
//                 res++
//             Fenwick.upd(original[cy]+1,1)
//         }
//         return res
//     }
// }


 let a=[...Array(1<<31)]