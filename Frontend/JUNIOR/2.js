const arr = [1,2,3,4,5];

function moveArrByN(arr, n) {
	return arr.concat(arr.splice(0,arr.length-n));
}

console.log(moveArrByN(arr, 3));