// 二分查找的实现

function binaryQuery(arr, x) {
  var low = 0;
  var high = arr.length - 1;
  while (low <= high) {
    var middle = parseInt((low + high) / 2);
    if (x === arr[middle]) {
      return middle; // 查到了，返回索引值
    } else if (x < arr[middle]) {
      high = middle - 1; // 如果要查的值比中点小，就去前半部分查
    } else {
      low = middle + 1; // 如果要查的数比中点大，就去后半部分查
    }
  }
  return -1; // 差不到，返回-1，类似indexOf方法
}

var arrTest = [1, 2, 4, 6, 8, 9, 11, 15, 22, 32, 44, 56, 62, 77, 86, 99, 100];

console.log(binaryQuery(arrTest, 32)); // 9
console.log(binaryQuery(arrTest, 10)); // -1

// 二分查找的递归实现
function binaryQueryRe(arr, x, low, high) {
  if (low > high) {
    return -1;
  }
  var mid = parseInt((low + high) / 2);
  if (x === arr[mid]) {
    return mid;
  } else if (x > arr[mid]) {
    return binaryQueryRe(arr, x, mid + 1, high);
  } else {
    return binaryQueryRe(arr, x, low, mid - 1);
  }
}

var arrTestRe = [1, 2, 4, 6, 8, 9, 11, 15, 22, 32, 44, 56, 62, 77, 86, 99, 100];

console.log(binaryQueryRe(arrTestRe, 32, 0, arrTestRe.length - 1)); // 9
console.log(binaryQueryRe(arrTestRe, 10, 0, arrTestRe.length - 1)); // -1