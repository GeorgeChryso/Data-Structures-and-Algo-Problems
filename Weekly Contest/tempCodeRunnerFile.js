 let A=B.sort((a,b)=>{
        let [s,e]=a
        let [d,k]=b

        if(s<d){
            if(e<=d)return -1
            else return 1
        }
        else {
            if(k<s)return -1
            else return 1
        }

    })