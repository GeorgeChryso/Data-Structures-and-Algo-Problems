/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function(IP) {
    let neither='Neither'
    let nums=[48,57]
    let upc=[65,70]
    let lowc=[97,102]
    
    if(IP.indexOf('.')===-1){
        IP=IP.split(':')
        if(IP.length!==8)return neither
        for(let num of IP){
            if(num.length>4)return neither
            if(num==='')return neither

            for(let letter of num){

                let c=letter.charCodeAt(0)
                if( (!(c>=48&&c<=57)) &&( !(c<=70&&c>=65) )&& (!(c<=102||c>=97)) )return neither
            }
        }
        return 'IPv6'
    }
    else{
        IP=IP.split('.')
        if(IP.length!==4)return neither
        
        for( let num of IP){
            if(num.length>3)return neither
            if(num===''||num[0]==='0')return neither
            for(let char of num){
                let c=char.charCodeAt(0)
                if(c<48||c>57)return neither
            }
            if(Number(num)>255)return neither
        }
        return 'IPv4'
        
    }
    
    return neither 
    
};
console.log(validIPAddress(
    "20EE:FGb8:85a3:0:0:8A2E:0370:7334"))