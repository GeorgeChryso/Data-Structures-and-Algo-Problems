// You are given equations in the format A / B = k, where A and B are variables represented as strings, and k is a real number (floating-point number). Given some queries, return the answers. If the answer does not exist, return -1.0.

// The input is always valid. You may assume that evaluating the queries will result in no division by zero and there is no contradiction.





var calcEquation = function(equations, values, queries) {
    var memory = {};
    equations.forEach((eq, i) => {
        var num1 = eq[0];
        var num2 = eq[1];
        if (!memory[num1]) {
            memory[num1] = { [num2]: values[i] };
        } else {
            memory[num1][num2] = values[i];
        }
        if (!memory[num2]) {
            memory[num2] = { [num1]: 1 / values[i] };
        } else {
            memory[num2][num1] = 1 / values[i];
        }
    });
    return queries.map(function(query) {
        var num1 = query[0];
        var num2 = query[1];
        
        if (!memory[num1] || !memory[num2]) return -1;
        
        // BFS
        var visited = {};
        var serachList = [num1];
        var accHistory = [1];
        
        while(serachList.length > 0) {
            const searchItem = serachList.shift();
            const acc = accHistory.shift();
            
            if (searchItem === num2) return acc;
            if (visited[searchItem]) continue;
            Object.keys(memory[searchItem]).forEach(function(n) {
                serachList.push(n);
                accHistory.push(acc * memory[searchItem][n]);
            });
            visited[searchItem] = true;
        }
        return -1;
    });
    
};