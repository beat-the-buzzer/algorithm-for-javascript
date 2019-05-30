function fib (n) {
  if(n < 1) {
    return -1;
  }
  var arr = [];
  arr[0] = 1;
  arr[1] = 1;
  for(var i = 2; i < n; i++) {
    arr[i] = arr[i-2] + arr[i-1];
  }
  return arr;
}

console.log(fib(5));