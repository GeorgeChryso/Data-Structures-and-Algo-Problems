/i)<diff2){
                    diff2=Math.abs(i-tar2/i)
                    result2=[i,tar2/i]   
             
                }
                else  flag2=true

            }
         }

    }
    if(diff1<diff2)return result1
    return result2
};