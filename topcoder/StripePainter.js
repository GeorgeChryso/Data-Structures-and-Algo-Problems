


//  Problem Statement for StripePainter


//  Problem Statement
         
//  Karel is a frustrated painter who works by day in an electrical repair shop. Inspired by the color-coded bands on resistors, he is painting a series of long, narrow canvases with bold colored stripes. However, Karel is lazy and wants to minimize the number of brush strokes it takes to paint each canvas.
 
//  Abbreviating each color to a single uppercase letter, Karel would write the stripe pattern red-green-blue-green-red as "RGBGR" (quotes added for clarity). It would take him three brush strokes to paint this pattern. The first stroke would cover the entire canvas in red (RRRRR). The second stroke would leave a band of red on either side and fill in the rest with green (RGGGR). The final brush stroke would fill in the blue stripe in the center (RGBGR).
 
//  Given a stripe pattern stripes as a String, calculate the minimum number of brush strokes required to paint that pattern.
 
  
//  Definition
         
//  Class:	StripePainter
//  Method:	minStrokes
//  Parameters:	String
//  Returns:	int
//  Method signature:	int minStrokes(String stripes)
//  (be sure your method is public)
     
  
//  Notes
//  -	The blank canvas is an ugly color and must not show through.
  
//  Constraints
//  -	stripes will contain only uppercase letters ('A'-'Z', inclusive).
//  -	stripes will contain between 1 and 50 characters, inclusive.
  
//  Examples
//  0)	
         
//  "RGBGR"
//  Returns: 3
//  Example from introduction.
//  1)	
         
//  "RGRG"
//  Returns: 3
//  This example cannot be done in two strokes, even though there are only two colors. Suppose you tried to paint both red stripes in one stroke, followed by both green stripes in one stroke. Then the green stroke would cover up the second red stripe. If you tried to paint both green stripes first, followed the red stripes, then the red stroke would cover up the first green stripe.
//  2)	
         
//  "ABACADA"
//  Returns: 4
//  One long stroke in color 'A', followed by one stroke each in colors 'B', 'C', and 'D'.
//  3)	
         
//  "AABBCCDDCCBBAABBCCDD"
//  Returns: 7
//  4)	
         
//  "BECBBDDEEBABDCADEAAEABCACBDBEECDEDEACACCBEDABEDADD"
//  Returns: 26
//  This problem statement is the exclusive and proprietary property of TopCoder, Inc. Any unauthorized use or reproduction of this information without the prior written consent of TopCoder, Inc. is strictly prohibited. (c)2010, TopCoder, Inc. All rights reserved.

//reduces multielement array to 1 element for each color
//example "BBAB"=>"BAB", cos the length of consecutive colors does not matter
let reduce=S=>{
    let result=[S[0]]
    for (let i = 1; i < S.length; i++) 
        if(S[i]!=result[result.length-1]) 
            result.push(S[i])       
    return result
}


//range dp 
let StripePainter=S=>{
    S=reduce(S)
    if(S.length==1)return 1
    let n=S.length,memoidx={}
    for (let i = 0; i <n; i++) 
        if(memoidx[S[i]]===undefined)
            memoidx[S[i]]=[i]
        else        
            memoidx[S[i]].push(i)
    

    let dp=[...Array(n)].map(d=>[...Array(n)].map(d=>0))
    //dp[i][j] the min cost to paint range i:j
    //base cases
    //dp[i][i]=1 (1 element),dp[i,i+1]=2 BECAUSE I REDUCED: no two adjacent elements are the same
    for (let i = 0; i < n; i++) {
        dp[i][i]=1
        if(i<n-1)dp[i][i+1]=2        
    }

    for (let len = 3; len <=n; len++) {
        for (let i = 0; i <=n-len; i++) {
            let j=i+len-1, min=Infinity
            if(memoidx[S[i]].length){
                //for any possible previous same color with S[j] try:
                // paint i:prevIdx optimally(take the dp) + paint prevIdx:j with the color of S[j]
                // and then just take the remaining elements that are enclosed prevIdx+1:j-1 and paint them optimally
                // The thing is that we ve already calculated the dps of smaller lengths in previous steps, so that's why I just say take the optimal value
                for (let k =  memoidx[S[j]].length-1; k>=0; k--){
                    if(memoidx[S[j]][k]<i)break //we cant  consider same colors prior to i 
                    if(memoidx[S[j]][k]>=j)continue // we cant consider any item above j obviously
                    min=Math.min(min,dp[i][memoidx[S[j]][k]]+dp[memoidx[S[j]][k]+1][j-1])                
                }
            }
            //if there are no previous elements with the same color, just paint S[j] with its color and increase the used colors up to this idx by 1
            dp[i][j]=Math.min(dp[i][j-1]+1,min)
        }
    }

    return dp[0][n-1]
}


let tests=[
    "RGBGR","RGRG","ABACADA","AABBCCDDCCBBAABBCCDD","BECBBDDEEBABDCADEAAEABCACBDBEECDEDEACACCBEDABEDADD"
]


tests.forEach(
    d=>console.log(StripePainter(d))
)