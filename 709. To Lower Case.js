var toLowerCase = function (str) {
    return str.toLowerCase()
};

var toLowerCase = function (str) {
    return str.replace(/([A-Z])/g, c=>String.fromCharCode(c.charCodeAt(0) + 32))
};

