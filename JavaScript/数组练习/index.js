var numTotal = factorial(5);

function factorial(num){
	if(num <=1 ){
		return 1;
	}else {
		return num * arguments.callee(num-1);
	}
}
console.log(numTotal);
