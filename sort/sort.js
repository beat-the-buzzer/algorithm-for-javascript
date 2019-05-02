
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

// 快速排序算法实现

// 快速排序的思想就是，寻找一个基准，然后把比基准小的数放在基准左边，把比基准大的数放在右边。
// 然后对左右两边递归操作，即可完成排序

function partition1(arr, low, high) {
  var i = low;
  var j = high;
  var pivot = arr[low]; // 基准值
  while (i < j) {
    while (i < j && arr[j] > pivot) {
      j--; // 如果后面的元素比基准大，指针就往左走，这样就找到了右边比基准小的元素的索引
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 找到了右边比基准小的元素的索引，此时需要交换，然后左边指针加一
      i++; // 这样最左边的元素必然是比基准小的元素
    }
    while (i < j && arr[i] <= pivot) {
      i++; // 如果前面的元素比基准小，指针就往右走，这样就找到了左边比基准大的元素的索引
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 找到了左边比基准大的元素的索引，此时需要交换，然后右边指针减一
      j--; // 这样最右边的元素必然是比基准大的元素
    }
  }
  return i; // 最终得到基准值所在位置，并且此时基准左边都比基准小，右边都比基准大
}

var arrQuickTest = [5, 1, 7, 3, 9, 2, 8, 4, 6];
partition1(arrQuickTest, 0, arrQuickTest.length - 1); // 返回结果是4，也就是说，前四个都是比第五个小的，arrQuickTest变成[4, 1, 2, 3, 5, 9, 8, 7, 6]

// 接下来就是递归了，我们需要对前四和后四这两部分再次划分，当不能再划分的时候，说明已经拍好了
function quickSort1(arr, low, high) {
  var mid = partition1(arr, low, high); // 得到一次排序之后基准的位置
  if (low < high) {
    quickSort1(arr, low, mid - 1); // 比基准小的部分进行快速排序操作
    quickSort1(arr, mid + 1, high); // 比基准大的部分进行快速排序操作
    // mid的位置是正确的，不需要再次排序了
  }
}

quickSort1(arrQuickTest, 0, arrQuickTest.length - 1);
console.log(arrQuickTest);

// 快速排序优化
function partition2(arr, low, high) {
  var i = low;
  var j = high;
  var pivot = arr[low];
  while (i < j) {
    while (i < j && arr[j] > pivot) {
      j--;
    }
    while (i < j && arr[i] <= pivot) {
      i++;
    }
    // 得到右边比基准值小的值的索引和左边比基准值大的值的索引
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  // 经过上面的循环，和j应该相遇了，此时我们要看看下标为i的元素是否比基准大
  if(i <= high) { 
    // 书中的代码貌似会溢出，所以当i超出数组范围的时候，不作处理
    if (arr[i] > pivot) {
      // 此时交换基准和i-1对应的元素
      [arr[low], arr[i - 1]] = [arr[i - 1], arr[low]];
      return i - 1; // 返回基准位置
    }  else {
      [arr[low], arr[i]] = [arr[i], arr[low]];
      return i;
    }
  }
}

function quickSort2(arr, low, high) {
  var mid = partition2(arr, low, high); // 得到一次排序之后基准的位置
  if (low < high) {
    quickSort2(arr, low, mid - 1); // 比基准小的部分进行快速排序操作
    quickSort2(arr, mid + 1, high); // 比基准大的部分进行快速排序操作
    // mid的位置是正确的，不需要再次排序了
  }
}

var arrQuickTest2 = [5, 1, 7, 3, 9, 2, 8, 4, 6];
quickSort2(arrQuickTest2, 0, arrQuickTest2.length - 1);
console.log(arrQuickTest2);
