### 排序算法——手写排序

作为一名前端开发人员，我也有一颗学习算法的心。接下来我将使用JavaScript完成几种排序算法的实现，至少在面试的时候，手写排序，不会有障碍了。

排序算法是老生常谈的问题，网上的资料一大把，但是大多是用C/C++或者Java实现的。我觉得如果使用JavaScript来写排序，至少要体现这个语言特有的东西。在下面的代码里，我会对一些地方进行注释。

##### 选择排序

> 遍历数组，每次遍历，把较小数的索引存起来。第一次遍历，找到了最小的数，和数组的第一个元素进行交换，第二次遍历，从第二个开始，找到了剩余最小的数，和数组的第二个元素进行交换。以此类推。

下面展示我的代码和注释：

	// 选择排序算法实现
	function selectSort(arr) {
	  const arrCopy = [...arr]; // 复制一份数组
	  const len = arrCopy.length;
	  let tempIndex; // 保存最小的数的索引
	  for (let i = 0; i < len - 1; i++) {
	    tempIndex = i;
		// j是从i+1开始，因为每次趟下来最小的已经确定了，
	    for (let j = i + 1; j < len; j++) {
	      if (arrCopy[tempIndex] > arrCopy[j]) {
	        tempIndex = j;
	      }
	    }
	    // 一趟for循环，找到了最小的元素的索引，并且把它存在tempIndex中，下面就是交换这个最小的元素和第i个元素
	    [arrCopy[tempIndex], arrCopy[i]] = [arrCopy[i], arrCopy[tempIndex]];
	  }
	  return arrCopy;
	}
	
	const arr = [3,1,4,5,2,7,9,6,8];
	selectSort(arr);

这里有一些花操作，我会在这里慢慢展示。

1、交换的实现

我们平常想到交换两个数的方式就是弄一个临时变量，其实可以一行搞定。这里使用了ES6的数组结构赋值。

	let a = 1;
	let b = 2;
	[a, b] = [b, a];

##### 冒泡排序

> 遍历数组，比较相邻的两个数，如果前面的较大，就交换，这样一趟下来，最大的数必然在最后一个。最大的数慢慢沉下去，我称之为“石头算法”。

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

	const arr = [3, 1, 4, 5, 2, 7, 9, 6, 8];
	console.log(bubbleSort(arr)); // arr已经排完序

2、为什么要在一开始复制一份数组？

我在同一个JS文件里面写了两个排序算法，在没有复制数组，调用的时候，我是这样操作的：

	function selectSort(){...} // 没有复制数组
	function bubbleSort(){...} // 没有复制数组
	const arr = [3, 1, 4, 5, 2, 7, 9, 6, 8];
	console.log(selectSort(arr));
	console.log(bubbleSort(arr)); // arr已经排完序

如果我们不去复制一份数组，每次调用排序算法之后，原数组也被改变了。第二次调用的时候，传入的数组本来就是有序的。这是浅拷贝的问题，造成外部变量无意之间发生了改变。

#####  归并排序

归并排序的思想就是分治法，先分再合。先说“合”：我们需要写一个函数，这个函数可以把两个有序的数组合并成一个有序的数组。合并的方法是，给两个数组准备两个指针，并且准备一个空数组用于存储合并后的值。比较两个指针对应位置的值，较小的值存入准备的空数组中，然后较小的值对应的指针向后移动。简单举个例子：

	var A = [1,3,5];
	var B = [2,4];
	// 比较1和2，发现1较小，把1存在数组中：[1]
	// A的指针向后移动，比较3和2，把2存在数组中：[1,2]
	// B的指针向后移动；比较3和4，把3存在数组中：[1,2,3]
	...

有了这个方法，我们接下来就是去“分”。很显然，如果数组中只有一个元素，那么它肯定是有序的。所以我们每次把数组一分为二，直到不能分的时候，我们再去执行合并的操作，这样到最后，就是有序的数组了。

在代码里，我没有真正意义上去分割数组，数组永远还是这个数组，我使用了变量去分割，也就是说，我的合并函数，是把前半部分和后半部分都是有序的，这样的数组“合并”成一个有序的数组，举个例子：

	var arr = [1,3,5,7,2,4,6,8];

这个数组的前半部分是1、3、5、7，后半部分是2、4、6、8，都是有序的，我把这个数组“合并”成[1,2,3,4,5,6,7,8]，下面看看代码：

	function merge(arr, low, high) {
	  const arrCopy = [...arr]; // 复制一份原始数组，因为我们要对传入的数组本身进行操作。
	  let i = low; // 上半部分的起始位置
	  let mid = parseInt((low + high) / 2); // 上半部分的结束位置
	  let j = mid + 1; // 下半部分的起始位置
	  // high是下半部分的结束位置
	  let k = low;
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

low是数组的初始位置，high是数组的末位置。事实上，上面这个方法可以对数组的连续子集进行部分操作。

“分”的方法就是递归了，能分就分，不能分就开始合，其实就是看初始位置和末位置，如果初始位置小于末位置，说明至少有两个元素，还能继续分，否则，就去执行合并操作。

	function mergeSort(arr, low, high) {
	  if (low < high) {
	    const mid = parseInt((low + high) / 2);
	    mergeSort(arr, 0, mid);
	    mergeSort(arr, mid + 1, high);
	    merge(arr, low, high);
	  }
	}

	const arr = [3, 1, 4, 5, 2, 7, 9, 6, 8];
	mergeSort(arr);
	console.log(arr);

3、浅拷贝，也可以去利用

我在这里归并排序的写法就是直接对数组进行操作，所以我们可以直接对传入的参数进行操作，由于浅拷贝，这样做的结果就是改变了原数组。

> 总结： 不要小看了代码实现算法的过程，这个过程没有想象中那么轻松。一步一步把可运行的代码写出来，这样可以提升自己的境界。