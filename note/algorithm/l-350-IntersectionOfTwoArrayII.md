## 350. Intersection of Two Arrays II

[传送门](https://leetcode.com/problems/intersection-of-two-arrays-ii/description/)

### 题目
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

求两个数组的交集，可以有重复元素

### 思路

遍历一个数组，用map存，value为该元素的次数。遍历另一个数组去map中查找该元素，存在的话-1且将该元素记录

### 复杂度分析

map的查找是O(1)，所以总的时间复杂度就是O(n)

### 代码

```javascript

//map + array
var intersect = function(nums1, nums2) {
    let map = new Map(),
        res = [],
        count;
    
    nums1.forEach((item) => {
        count = map.get(item) || 0;
        map.set(item,  count + 1);
    });

    nums2.forEach(item => {
        count = map.get(item) || 0;
        if (count) {
            res.push(item);
            map.set(item, count - 1);
        }
    });
    
    return res;
};

```



