# jQuery 核心：遍历

[TOC]

一旦你用 jQuery 进行了初始的选择，你可以对选择的集合进行更深入的遍历。遍历可以分成三个基本部分：父节点，子节点，兄弟节点。对于这三个基本部分，jQuery 拥有丰富的易用的方法。注意到这些方法可以传递一个可选的字符串选择器，且一些方法可以接收另一个 jQuery 对象来过滤你的选择集。

## 父节点
从选择集寻找父节点的方法包括 `.parent()`, `.parents()`, `.parentsUntil()`, 和 `.closet()`。

```html
<div class="grandparent">
    <div class="parent">
        <div class="child">
            <span class="subchild"></span>
        </div>
    </div>
    <div class="surrogateParent1"></div>
    <div class="surrogateParent2"></div>
</div>
```

```js
// returns [ div.child ]
$('span.subchild').parent();

// return [ div.parent ]
$('span.subchild').parents('div.parent');

// returns [ div.child, div.parent, div.grandparent ]
$('span.subchild').parents();

// Selecting all the parents of an element up to, but NOT including the selector:
// returns [ div.child, div.parent ]
$('span.subchild').parentsUntil('div.grandparent');

// Selecting the closest parent, note that only one parent will be selected
// and that the initial element itself is included in the search:
// returns [ div.child ]
$('span.subchild').closest('div');

// returns [ div.child ] as the selector is also included in the search:
$('div.child').closest('div');
```

## 子节点
从选择集寻找子元素的方法包括 `.children()` 和 `.find()`。这两个方法的不同之处在于遍历的深度。有少数基本的方法只需要遍历的方向。`.children()` 只操作直接子节点，然而 `.find()` 可以递归地遍历子节点，子节点的子节点，子节点的子节点的子节点，等等。

```js
// Selecting an element's direct children:
 
// returns [ div.parent, div.surrogateParent1, div.surrogateParent2 ]
$('div.grandparent').children('div');
 
// Finding all elements within a selection that match the selector:
 
// returns [ div.child, div.parent, div.surrogateParent1, div.surrogateParent2 ]
$('div.grandparent').find('div');
```

## 兄弟节点
剩下的 jQuery 遍历方法全部通过寻找兄弟节点的选择集来解决。你可以使用 `.prev()` 找到前一个元素，使用 `.next()` 找到下一个元素，使用 `.siblings()` 找到两个方向的。还有另外一些方法建立在基本的方法上：`.nextAll()`, `.nextUntil()`, `.prevAll()` 和 `.prevUntil()`。

```js
// Selecting a next sibling of the selectors:
 
// returns [ div.surrogateParent1 ]
$('div.parent').next();
 
// Selecting a prev sibling of the selectors:
 
// returns [] as No sibling exists before div.parent
$('div.parent').prev();
 
// Selecting all the next siblings of the selector:
 
// returns [ div.surrogateParent1, div.surrogateParent2 ]
$('div.parent').nextAll();
 
// returns [ div.surrogateParent1 ]
$('div.parent').nextAll().first();
 
// returns [ div.surrogateParent2 ]
$('div.parent').nextAll().last();
 
// Selecting all the previous siblings of the selector:
 
// returns [ div.surrogateParent1, div.parent ]
$('div.surrogateParent2').prevAll();
 
// returns [ div.surrogateParent1 ]
$('div.surrogateParent2').prevAll().first();
 
// returns [ div.parent ]
$('div.surrogateParent2').prevAll().last();
```

使用 `.siblings()` 选择所有的兄弟节点：

```js 
// returns [ div.surrogateParent1, div.surrogateParent2 ]
$('div.parent').siblings();
 
// returns [ div.parent, div.surrogateParent2 ]
$('div.surrogateParent1').siblings();
```

当在文档中进行长距离遍历的时候需要小心，复杂的遍历需要保持不变的文档结构，即使你是唯一的程序的服务器端和客户端创建者很难保证。一步或两步的遍历是可以的，但是最好避免从一个容器走向另一个容器的遍历。