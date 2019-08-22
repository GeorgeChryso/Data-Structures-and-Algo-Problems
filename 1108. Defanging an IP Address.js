'use strict'

// Given a valid(IPv4) IP address, return a defanged version of that IP address.

// A defanged IP address replaces every period "." with "[.]".

var defangIPaddr = function (address) {
    return address.replace(/\./g, '\[.\]')
};


console.log(defangIPaddr(
    "255.100.50.0"
))