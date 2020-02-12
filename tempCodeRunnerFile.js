                       return Math.max(dp[i-1][k]+bitCount(j),acc)
                            }
                            else{
                                return acc
                            }
                        },-1

                    )
                    
                }
                result=Math.max(result,dp[i][j])
            }
        }
    }

    return result
};
cons