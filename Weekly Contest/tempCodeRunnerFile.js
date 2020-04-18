var numberOfArrays = function(s, k) {
    let mod = 1e9 + 7;
    let res = 0;
    if (s.length == 0) return 0;
    if (s.length == 1) return s <= k ? 1 : 0;

    for (var cutpoints = 0; cutpoints < 1 << (s.length - 1); cutpoints++) {
        var result = [];
        var lastcut = 0;
        let flag = true;
        for (var i = 0; i < s.length - 1; i++) {
            if (((1 << i) & cutpoints) !== 0) {
                let pot = s.slice(lastcut, i + 1);
                if (pot <= k && pot >= 1 &&( pot.length>1? pot[0] !== 0:true)) null;
                else {
                    flag = false;
                }
                result.push(pot);
                lastcut = i + 1;
            }
        }
        let got = s.slice(lastcut, i + 1);
        if (got <= k && got >= 1 && ( got.length>1? got[0] !== 0:true)) null;
        else {
            flag = false;
        }
        result.push(s.slice(lastcut));

        if (flag) {

            res = (res + 1) % mod;
        }
    }

    return res % mod;
};