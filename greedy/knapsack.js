class Treasure {
  constructor(w, v) {
    // 传入重量和价值
    this.w = w;
    this.v = v;
    this.p = v / w;
  }
}

var wArr = [4, 2, 9, 5, 5, 8, 5, 4, 5, 5];
var vArr = [3, 8, 18, 6, 8, 20, 5, 6, 7, 15];
var len = wArr.length;
var treasureArr = [];

for (var i = 0; i < len; i++) {
  treasureArr[i] = new Treasure(wArr[i], vArr[i]);
}
// 得到对象数组

treasureArr.sort(function (a, b) { return b.p - a.p }); // 按照单位重量的价值进行排序（从大到小）

var m = 30; // 总的承重
var sum = 0; // 运走的总价值

for (var j = 0; j < len; j++) {
  if (m > treasureArr[j].w) {
    // 如果可以把第j个物品装满，就去装
    m -= treasureArr[j].w;
    sum += treasureArr[j].v;
  } else {
    // 如果第j个物品装不满，就把剩余的重量用这个物品装满
    sum += m * treasureArr[j].p;
    break;
  }
}
console.log('带走财宝的总价值：' + sum);




