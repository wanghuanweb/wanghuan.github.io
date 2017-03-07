/*
 // Should equal 15
sum(1, 2, 3, 4, 5);
// Should equal 0
sum(5, null, -5);
// Should equal 10
sum('1.0', false, 1, true, 1, 'A', 1, 'B', 1, 'C', 1, 'D', 1,
  'E', 1, 'F', 1, 'G', 1);
// Should equal 0.3, not 0.30000000000000004
sum(0.1, 0.2);
*/
function sum() {
    var nResult = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
    nResult +=  (!isNaN(arguments[i]) && window.parseFloat(arguments[i]))||0;
    }
    return nResult.toFixed(3) * 1000 / 1000;
}
