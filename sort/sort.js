
// 选择排序算法实现
function selectSort(arr) {
  const arrCopy = [...arr]; // 复制一份数组
  const len = arrCopy.length;
  let tempIndex;
  for (let i = 0; i < len - 1; i++) {
    tempIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arrCopy[tempIndex] > arrCopy[j]) {
        tempIndex = j;
      }
    }
    // 一趟for循环，找到了最小的元素的索引j，下面就是交换这个最小的元素和第i个元素
    [arrCopy[tempIndex], arrCopy[i]] = [arrCopy[i], arrCopy[tempIndex]];
  }
  return arrCopy;
}
var arr = [9, 3, 11, 7, 10, 4, 12, 8, 1];
console.log(selectSort(arr));

// 冒泡排序算法实现
function bubbleSort(arr) {
  const arrCopy = [...arr];
  const len = arrCopy.length;
  for (let i = 0; i < len - 1; i++) {
    // 每次for循环，最大的元素都会沉底，所以内层的j每次都会减少
    for (let j = 0; j < len - 1 - i; j++) {
      if (arrCopy[j] > arrCopy[j + 1]) {
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
      }
    }
  }
  return arrCopy;
}
console.log(bubbleSort(arr));

// 归并排序算法实现

// 将有序的数组合并成一个有序的数组，
// [1,3,5,7,2,4,6,8]  左边一半有序 右边一半有序，整合成一个有序的数组
function merge(arr, low, high) {
  var arrCopy = [...arr]; // 复制一份原始数组，因为我们要对传入的数组本身进行操作。
  var i = low; // 上半部分的起始位置
  var mid = parseInt((low + high) / 2); // 上半部分的结束位置
  var j = mid + 1; // 下半部分的起始位置
  // high是下半部分的结束位置
  var k = low; // 这里和别的语言不一样
  while (i <= mid && j <= high) {
    if (arrCopy[i] < arrCopy[j]) {
      arr[k++] = arrCopy[i++];
    } else {
      arr[k++] = arrCopy[j++];
    }
  }
  // 可能后半部分遍历完了，前半部分还有剩余
  while (i <= mid) {
    arr[k++] = arrCopy[i++];
  }
  // 可能前半部分遍历完了，后半部分还有剩余
  while (j <= high) {
    arr[k++] = arrCopy[j++];
  }
}

function mergeSort(arr, low, high) {
  if (low < high) {
    var mid = parseInt((low + high) / 2);
    mergeSort(arr, 0, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, high);
  }
}

// 利用了浅拷贝，都是直接对参数arr进行了操作，结果就是外部的arr变量也随之发生了变化
// 注意： 归并排序直接接对原数组进行了操作
var arrTest = [9, 3, 11, 7, 10, 4, 12, 8, 1];
mergeSort(arrTest, 0, arrTest.length - 1);
console.log(arrTest);
