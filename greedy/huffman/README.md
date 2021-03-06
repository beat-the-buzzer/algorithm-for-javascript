### 哈夫曼树问题

在初学编程的时候，我们都做过这样的题：将考试分数转化成等级，90分以上的为A，80~90的为B，70~80的为C，60~70的为D，60以下的为不及格。我们会写出这样的代码：

```js
if(score >= 90) {
  return '优秀';
} else if(score >=80) {
  return '良好';
} else if(score >=70) {
  return '中等';
} else if(score >= 60) {
  return '及格';
} else {
  return '不及格！！！';
}
```

显然这样的代码没有任何问题，但是我们考虑的点不在这里。我们要考虑，学生的分数呈正态分布，我们应该把频率最高的放在第一个，这样比较多的数据只需要比较一次，从而减少总的比较次数，提升效率。

如果这个例子不够清晰，我们再举出其他的例子：如果我们要去猜一个老教授的年龄，我们先猜老教授是否是1岁，如果不是，再猜老教授是否是2岁，以此类推。其实，这个问题和上面分数的问题是同一类问题。我们优化一下上面的分数问题。

假设优秀、良好、中等、及格、不及格这五种情况的频率分别是0.1、0.2、0.4、0.2、0.1。我们可以这样改写程序：

```js
if (score < 80) {
  if (score < 70) {
    if (score < 60) {
      return '不及格';
    } else {
      return '及格';
    }
  } else {
    return '中等';
  }
} else if (score < 90) {
  return '良好';
} else {
  return '优秀';
}
```

根据上面的频率，假设现在有100个学生，那么第一种情况的比较次数大约为：

```js
100*0.1*1 + 100*0.2*2 + 100*0.4*3 + 100*0.2*4 + 100*0.1*5 = 300(次)
```

第二种情况的比较次数大约为：

```js
100*0.1*3 + 100*0.2*3 + 100*0.4*2 + 100*0.2*2 + 100*0.1*2 = 230(次)
```

两种方法的差别还是不可忽视的。其实我们可以总结规律：把频率大的部分靠近树根，一次成功的概率会大大提升。

哈夫曼编码的思想其实和这个一样，用字符的使用频率作为权构建一颗哈夫曼树。构建方法是自底向上，进行合并。核心思想是`权值越大的元素离根越近`。

贪心策略：`每次从树的集合中取出没有双亲且权值最小的两棵树左右子树，构造出一棵新树。`

下面来看一下哈弗曼树的构建步骤：

以（7,18,3,32,5,26,12,8） 为例：

1、初始状态

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman01.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman01.png)

2、找到权值最小的两个节点，进行合并，如下图，我们把3和5合并成8

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman02.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman02.png)

3、对剩余节点和新合成的节点，再次寻找权值最小的两个节点，进行合并，7和8可以合成15，这里两个8，随机选择，不影响结果。

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman03.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman03.png)

4、下一步操作，选择8和12，合并成20

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman04.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman04.png)

5、下一步操作，15和18，合成33

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman05.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman05.png)

6、下一步操作，20和26，合并成46

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman06.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman06.png)

7、下一步操作，33和32，合并成65

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman07.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman07.png)

8、下一步操作，65和46，合并成111，此时只剩一个节点，这个节点作为根节点，算法结束

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman08.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman08.png)

看一下根节点的位置：

![https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman09.png](https://raw.githubusercontent.com/beat-the-buzzer/algorithm-for-javascript/master/static/huffman09.png)

如图，我们看到，距离根越近的节点，权值越大。
