var w = [4, 10, 7, 11, 3, 5, 14, 2];

// 首先对重量进行排序
w.sort(function (a, b) { return a - b });

var carry = 30; // 船的载重量

var temp = 0; // 已经在船上的重量
var ans = 0; // 已经在船上的数量

for (var i = 0; i < w.length; i++) {
  temp += w[i]; // 把财宝放到船上
  if (temp <= carry) {
    ans++; // 没超重-> 计数
  } else {
    break; // 超重 -> 直接退出循环
  }
}
console.log('最后带走的财宝数量：' + ans);

var temp1 = 0;
var ans1 = 0;

for (var j = 0; j < w.length; j++) {
  temp1 += w[j];
  if (temp1 >= carry) {
    if (temp1 == carry) {
      ans1 = j + 1; // 正好装潢 -> 最后一个可以放
    } else {
      ans1 = j; // 已经超出，最后一个不能放
    }
  }
}
console.log('最后带走的财宝数量：' + ans1);

