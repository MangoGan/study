### 27.Remove Element

[leetcode传送门](https://leetcode.com/problems/remove-element/description/)

### 题目大意

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

### 思路

对数组元素进行遍历，对于需要删除的元素，它的存储空间就可以被其他元素占用，所以就是将需要保留的元素，从index=0的位置进行数组进行重新赋值，那么返回index即可。

### 代码

```javascript

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    if (nums.length <= 0) return null;
    
    var j = 0;

    nums.forEach((item, i) => {
        if (item != val) {
            nums[j] = item;
            ++j;
        }
    });
       
    return j;
};

```
