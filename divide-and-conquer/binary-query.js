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

console.log(binaryQuery(arrTest, 32));
console.log(binaryQuery(arrTest, 10));