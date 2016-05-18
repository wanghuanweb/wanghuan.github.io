/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
/**
 * 用HashMap mark 来记录每个数字出现的次数。
 * secret.charAt(i) == guess.charAt(i)时bull++, 不改动mark.
 * 若是secret.charAt(i) != guess.charAt(i)时，secret扫过数字，mark对应count加一，guess扫过数字，mark对应count减一。
 * 若是mark[secret.charAt(i) - '0'] 小于0, 说明guess 已经更新过这个位置，此时numCow++.
 * 反过来若是 mark[guess.charAt(i) - '0'] 大于0, 说明secret 已经跟新过这个位置，此时numCow++.
 */
var getHint = function(secret, guess) {

    var len = secret.length,
        numBulls = 0,
        numCows = 0,
        mark = [0,0,0,0,0,0,0,0,0,0],
        string,
        i;

    for(i = 0; i < len; i++) {
        if(secret.charAt(i) === guess.charAt(i)) {
            numBulls++;
        } else {
            if(mark[secret.charAt(i) - '0']++ < 0) {
                numCows++;
            }
            if(mark[guess.charAt(i) - '0']-- > 0) {
                numCows++;
            }
        }
    }

    string = numBulls + "A" + numCows + "B";

    return string;

};
