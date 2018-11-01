### 336.Palindrome Pairs

[题目传送门](https://leetcode.com/problems/palindrome-pairs/description/)
[参考解法解释](https://blog.csdn.net/qq508618087/article/details/51443809)

### 题目

Given a list of unique words, find all pairs of distinct indices (i, j) in the given list, so that the concatenation of the two words, i.e. words[i] + words[j] is a palindrome.

××Example :××

Input: ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]] 
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]


### 思路

暴力想法是：对数组遍历，每个元素i与其他元素j拼接检测是否是回文串，所以时间复杂度是`O(n^2)`。
学习了别人的思路: 

1. 将数组元素的逆序作为key，元素位置index存在map中
2. 遍历数组arr，将元素arr[i]随机分为left和right部分，如果left是回文，那么在map中查找是否存在key为right的映射，如果存在则`arr[map.get(right)] + arr[i]`形成回文，如果right是回文，那么在map中查找是否存在key为left的映射，如果存在则`arr[i] + arr[map.get(left)]`形成回文
3. 特例，如果数组中存在空元素`''`，那么对于arr[i]为回文的，两个元素是可以形成回文的，以及元素自身不能与自身拼接

#### 时间复杂度

假定数组元素平均长度为k，遍历数组(n)，对元素进行分割（次数k次），对每次分割之后的left和right进行回文检测（总的是k/2），这样时间复杂度就是`O(n*k^2)`


### 代码

```javascript
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
    let map = new Map(),
        left,
        right,
        temp,
        result = [];
    
    words.forEach((item, i) => {
        map.set(item.split('').reverse().join(''), i);
    });
    
    words.forEach((item, i) => {
        for(let j = 0; j < item.length; j++) {
            left = item.slice(0, j);
            right = item.slice(j, item.length);
            
            //对元素本身是回文且存在空元素的情况进行处理,['a', '']
            if (j == 0 && isPalindrome(right) && right != '') {
                temp = map.get('');
                if (typeof temp == 'number') {
                    result.push([i, temp]);
                    result.push([temp, i]);            
                }
                
                continue;
            }
            
            if (isPalindrome(left)) {
                temp = map.get(right);
                if (typeof temp == 'number' && temp != i) {
                    result.push([temp, i]);                                
                }
            }
            
            if(isPalindrome(right)) {
                temp = map.get(left);
                if (typeof temp == 'number' && temp != i) {
                    result.push([i, temp]);                                
                }
            }
            
        }
    });
    
    return result;
    
    function isPalindrome(s) {
        for (var i = 0; i < Math.floor(s.length / 2); i++) {
            if (s[i] != s[s.length - i -1]) {
                return false;
            }
        }
        
        return true;
    }
};

```
