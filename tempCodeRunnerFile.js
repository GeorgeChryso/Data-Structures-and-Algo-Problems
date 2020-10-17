        numberEdges+=edges.reduce((acc,[f,t])=>acc+((mask&(1<<(f-1)))!==0&&(mask&(1<<(t-1)))!==0)?1:0)
