### 动态规划法

算法思想：

> 动态规划法也是一种分治思想，但和分治法有所区别。分治法是把原问题分解成若干子问题，自顶向下求解各子问题，合并子问题的解。动态规划也是把原问题分解成子问题，然后自底向上，先求解最小的子问题，把结果存起来，在求解大的子问题的时候，可以去查到小问题的子问题的解，避免重复计算。

算法要素：

 - 最优子结构

最优子结构性质是指问题的最优解包含其子问题的最优解。最优子结构是使用动态规划法的基本条件。

 - 子问题重叠

 子问题重叠是指在求解子问题的过程中，有大量的子问题是重复的，那么只需要求解一次，然后把结果存在表中，以后使用时可以直接查询，不需要再次求解。

写到这里，我突然意识到，我们在写代码的时候，不知不觉使用了动态规划，只是我们自己没有意识到。看这样的例子：数组求和。

    const arr = [1, 2, 3, 4, 5];
    let sum = arr.reduce((a, b) => a + b);

`reduce`方法，可以理解为，把前i-1个元素的和存起来，因为我们求前i个元素的和，需要用到前面的值。

在讲动态规划法之前，还是先回忆一下前面说过的分治法，就拿归并排序为例。我们在上面说到，分治法是自顶向下求解问题，在归并排序的时候，我们写了一个函数，把左半边和又半边都有序的数组合并成一个有序的数组。这就是我们先解决的问题，如果这个问题解决了，我们再去划分，划分到最后，肯定剩下一个元素，这个元素一定是有序的，然后去做合并操作。归并排序的例子，对理解`自顶向下`有很大帮助，不过下面我们讲的动态规划，是`自底向上`。大家可以通过下面的例子，自己试着去理解一下：

1、斐波拉契数列问题（兔子序列）

我记得我在高中的时候，成功写出来斐波拉契数列的通项公式，我记得这个是用无理数来表示有理数，不过现在已经不记得了。不过，如果我把数学问题转化成算法问题，又会有新发现。

我们先写出通项公式：

    当 n = 1 时，S = 1
    当 n = 2 时，S = 1
    当 n >= 3 时， S = F(n-2) + F(n-1) 

所以：

    F(1) = 1;
    F(2) = 1;
    F(3) = F(1) + F(2) = 2;
    F(4) = F(2) + F(3) = 3;
    F(5) = F(3) + F(4) = 5;
    ...

代码如下：

    // 第一天为1 第二天为1，第n天应该求下标为n-1的值
    function Fib (n) {
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

显然，我们先在数组中存放了两个值，第三个值用前两个值计算得到的，以此类推。我们简单表示一下过程：

    F(5) 
    <=> F(4) + F(3)
    <=> F(3) + F(2) + F(2) + F(1)
    <=> F(2) + F(1) + F(2) + F(2) + F(1)

  按照我们之前分治法的思路，我们应该划分到不能划分为止，但是这里，我们在求出F(3)的时候，F(4)就不需要做无谓的划分了，直接F(3) + F(2)，节约了大量的计算。