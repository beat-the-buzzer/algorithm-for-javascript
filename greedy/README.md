### 贪心算法

一个贪心算法总是做出当前最好的选择，也就是说，它期望通过局部最优选择从而得到全局最优的解决方案。

使用贪心算法的条件：

 - 贪心选择性质：原问题的整体最优解可以通过一系列局部最优的选择得到

 -  最优子结构：一个问题的最优解包含其子问题的最优解

冒泡排序、选择排序，是否用到了贪心算法？

拿冒泡排序为例，每一次遍历，找到的最大的元素，下一次遍历，是在剩余的部分再去寻找最大的元素。贪心策略就是每一次从剩下的序列中选一个最大的数，把这些最大的数放在一起，就是排序后的结果。

贪心算法的其他例子及代码实现：

1、最优装载问题

海盗船载重量为C，每件财宝的重量为wi，如何装载最多数量的财宝？

[https://github.com/beat-the-buzzer/algorithm-for-javascript/blob/master/greedy/optimal-loading.js](https://github.com/beat-the-buzzer/algorithm-for-javascript/blob/master/greedy/optimal-loading.js)

2、背包问题

n种宝物，每种宝物都有对应的重量w和对应的价值v，一次只能运走m重量的宝物，一种宝物只能拿一样，宝物可以分割。如何带走最大价值的宝物？

[https://github.com/beat-the-buzzer/algorithm-for-javascript/blob/master/greedy/knapsack.js](https://github.com/beat-the-buzzer/algorithm-for-javascript/blob/master/greedy/knapsack.js)
