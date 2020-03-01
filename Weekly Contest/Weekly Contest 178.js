var smallerNumbersThanCurrent = function(nums) {
    return nums.map((d,i)=>nums.reduce((acc,curr,j)=>{
        if(curr<d&&i!=j)return acc+1
        return acc
    },0))
};

console.log(smallerNumbersThanCurrent(
    [8,1,2,2,3]
))

var rankTeams = function(votes) {
    let points={}

    for (const vote of votes) {
        for (let i = 0; i < vote.length; i++) {
            if(points[vote[i]]!==undefined)points[vote[i]]=[points[vote[i]][0]+vote.length-1-i,vote[i]]    
            else points[vote[i]]=[vote.length-1-i,vote[i]]
        }
    }
    return Object.values(points).sort(([v1,n1],[v2,n2])=>{
        if(v1>v2)return -1
        if(v1==v2)return n1.charCodeAt(0)-n2.charCodeAt(0)
        if(v2<v1)return 1
    }).map(([a,b])=>b).join('')

};

var rankTeams = function(votes) {
    let points={}
    for (let i = 0; i < votes.length; i++) {
        for (const vote of votes) {
            if(points[vote[i]]!==undefined)points[vote[i]][0]++
            else  points[vote[i]]=[1,vote[i]]
        }
    }

    console.log(points)

    return Object.values(points).sort(([v1,n1],[v2,n2])=>{
        if(v1==v2)return n1.charCodeAt(0)-n2.charCodeAt(0)
        else return v1-v2
    }).map(([a,b])=>b).join('')

};

console.log(
    rankTeams(
       // ["BCA","CAB","CBA","ABC","ACB","BAC"]
        ["FVSHJIEMNGYPTQOURLWCZKAX","AITFQORCEHPVJMXGKSLNZWUY","OTERVXFZUMHNIYSCQAWGPKJL","VMSERIJYLZNWCPQTOKFUHAXG","VNHOZWKQCEFYPSGLAMXJIUTR","ANPHQIJMXCWOSKTYGULFVERZ","RFYUXJEWCKQOMGATHZVILNSP","SCPYUMQJTVEXKRNLIOWGHAFZ","VIKTSJCEYQGLOMPZWAHFXURN","SVJICLXKHQZTFWNPYRGMEUAO","JRCTHYKIGSXPOZLUQAVNEWFM","NGMSWJITREHFZVQCUKXYAPOL","WUXJOQKGNSYLHEZAFIPMRCVT","PKYQIOLXFCRGHZNAMJVUTWES","FERSGNMJVZXWAYLIKCPUQHTO","HPLRIUQMTSGYJVAXWNOCZEKF","JUVWPTEGCOFYSKXNRMHQALIZ","MWPIAZCNSLEYRTHFKQXUOVGJ","EZXLUNFVCMORSIWKTYHJAQPG","HRQNLTKJFIEGMCSXAZPYOVUW","LOHXVYGWRIJMCPSQENUAKTZF","XKUTWPRGHOAQFLVYMJSNEIZC","WTCRQMVKPHOSLGAXZUEFYNJI"] //"VWFHSJARNPEMOXLTUKICZGYQ"
    )
)


var isSubPath = function(head, root) {
  
    


    let checkdown=(node)=>{
        let want=head
        let queue=[node]
        while(queue.length){
            let temp=[]
            if(want.next==null)return true
            for (const node of queue) {
                if(node.left&&node.left.val==want.next.val)temp.push(node.left)
                if(node.right&&node.right.val==want.next.val)temp.push(node.right)
            }
            if(!temp.length)return false
            queue=temp
            want=want.next
        }
        return false
    }

    let q=[root]

    while(q.length){
        let temp=[]
        for (const nodes of queue) {
            if(node.val===head.val&&checkdown(node))return true
            if(node.left)temp.push(node.left)
            if(node.right)temp.push(node.right)
        }
        q=temp
    }

    return false
};



var minCost = function(grid) {
    

    let dp=[...Array(grid.length)].map(d=>Array(grid[0].length).fill(0))
    // dp[i][j] is the minimum cost from [i][j] to the end[]
    //basecase 
    dp[grid.length-1][grid[0].length-1]=0


    for (let i = grid.length-1; i >=0; i--) {
        for (let j = grid[0].length-1; j>=0; j--) {
              if(i==grid.length-1&&j==grid[0].length-1)continue
              
              if(i==grid.length-1){
                  dp[i][j]=dp[i][j+1]+(grid[i][j]==1)?0:1
              }
              
        }        
    }

    return dp[0][0]
};