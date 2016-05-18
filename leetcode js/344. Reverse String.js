/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    var reverse = "",
        i;
    for(i = s.length - 1;i >= 0;i--) {
        reverse += s.charAt(i);
    }
    return reverse;
};
