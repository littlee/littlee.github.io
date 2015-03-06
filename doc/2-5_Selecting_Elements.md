# jQuery 核心：选择元素
[TOC]
jQuery 最基本的概念是“选择一些元素，对它们做点什么”。jQuery 支持大多数的 CSS3 选择器，也支持某些非标准的选择器。
对于完整的选择器参考，请访问[api.jquery.com 上的选择器文档](http://api.jquery.com/category/selectors/)。

## 通过 ID 选择元素
```js
$('#myId');
```

## 通过类名选择元素
```js
$('.myClass');
```

## 通过属性选择元素
```js
$('input[name='first_name']'); // 注意，这在旧式浏览器上面运行很慢
```

## 通过复合的 CSS 选择器选择元素
```js
$('#contents ul.people li');
```

## 伪选择器
```js
$('a.external:first');
$('tr:odd');

$('#myForm :input');
$('div:visible');

$('div:gt(2)');

$('div:animated');
```

**注意：** 当使用 `:visible` 和 `:hidden` 伪选择器的时候，jQuery 测试元素的真实可见性，不是它的 CSS 的 `visibility` 或 `display` 属性。jQuery 查看元素的实际高度和宽度是否大于零。

即使如此，这个检测对 `<tr>` 元素无效。在 `<tr>` 的情况下，jQuery 就检测 CSS 的 `display` 属性，且如果其 `display` 属性为 `none` 则认为元素是隐藏的。

未加入到 DOM 的元素经常被认为是隐藏的，即使 CSS 会对它们起作用，将他们渲染成可见。查看[操作元素](http://learn.jquery.com/manipulating-elements)部分来学习如何创建和添加元素到 DOM 里面。

## 选择选择器
选择好的选择器是一个提高 JavaScript 性能的方法。增加一点明确性——例如，在通过类名选择元素的时候包含元素类型，会有很大的作用。另一方面，太多的明确性是一件不好的事。一个选择器，例如 `#myTable thead tr th.special` 具有过度的杀伤力，如果是一个像这样的选择器 `#myTable th.special` 会把事情做好。

jQuery 提供了许多基于属性的选择器，允许我们使用简单的正则表达式来选择基于任意内容的属性的选择集。
```js
$('a[rel$='thinger']');
```
虽然这在必要是会有帮助，但是他们在旧式浏览器也同样是炒鸡地慢。在任何可能的情况下，使用 ID，类名，标签名来进行选择。

### 我的选择集包含元素吗？
一旦你进行了选择，你会经常想知道，你是否有可以操作的东西。一个常见的错误用法：
```js
// 这样不会起作用
if ($('div.foo')) {
    // code
}
```
这样不会起作用。当使用 `$()` 进行选择的时候，经常返回一个对象，且对象的值会等同于 `true`。即使选择集没有包含任何元素，在 `if` 语句里面的代码依然会运行。

确定是否有任何元素的最佳方法是检测选择集的 `.length` 属性，这个属性告许你有多少元素被选择到。如果答案是 0，`.length` 属性作为一个布尔值使用的时候会等同于 `false` 。
```js
// 检测选择集是否包含元素
if ($('div.foo').length) {
    // code
}
```

### 保存选择集
jQuery 不会为你缓存元素。如果你已经进行了一次你可能还会再次需要的选择，你需要讲选择集保存在一个变量中而不是重复进行选择。
```js
var div = $('div');
```
一旦选择集保存在一个变量中，你可以在变量上调用 jQuery 方法，就像你在原生的对象上调用一样。

一次选择只会获取某一时刻页面上的元素。如果元素后来添加到页面，你不得不重复选择，否则就得把元素添加到保存在变量中的选择集。保存的选择集不会在 DOM 改变时魔法般的更新。

### 提取和过滤选择集
有时选择集包含的多过你想要的。jQuery 提供几个提取和过滤选择集的方法。
```js
$('div.foo').has('p'); // 包含 <p> 标签的 div.foo
$('h1').not('.bar'); // 不带 bar 类名的 h1 元素
$('ul li').filter('.current') // 带有 current 类名的无序列表元素
$('ul li').first(); // 仅第一个无序列表元素
$('ul li').eq(5); // 第六个
```

### 表单元素的选择
jQuery 提供了几个帮助我们在表单里找到元素的伪选择器。这些是非常有帮助的，因为很难通过标准的 CSS 选择器来区分表单元素的状态或者类型。

#### :checked
不要被 *:checkbox* 迷惑，`:checked` 选择已勾选的复选框，但记住，这个选择器对已选择的单选按钮也起作用，和 `<select>` 元素（使用 `:selected` 选择器仅对于 `<select>` 元素）。
```js
$('form :checked');
```

#### :disabled
使用 `:disabled` 伪选择器讲所有带有 `disabled` 属性的 `<input>` 元素作为目标：
```js
$('form :disabled');
```
为了得到使用 `:disabled` 的最佳性能，先使用标准的 jQuery 选择器选择元素，再使用 `.filter(':disabled')`，或者在伪选择器之前插入标签名或者其他选择器。

#### :enabled
基本上的 *:disabled* 伪选择器的倒置，`:enabled` 伪选择器将任何 *没有* `disabled` 属性的元素做为目标。
```js
$('form :enabled');
```
为了得到使用 `:enabled` 的最佳性能，先使用标准的 jQuery 选择器选择元素，再使用 `.filter(':enabled')`，或者在伪选择器之前插入标签名或者其他选择器。

#### :input
使用 `:input` 选择器选择所有的 `<input>`, `<textarea>`, `<select>`, `<button>`元素：
```js
$('form :input');
```

#### :selected
使用 `:selected` 伪选择器将任何 `<option>` 被选中的元素做为目标：
```js
$('form :selected');
```
为了得到使用 `:selected` 的最佳性能，先使用标准的 jQuery 选择器选择元素，再使用 `.filter(':selected')`，或者在伪选择器之前插入标签名或者其他选择器。

#### 通过类型选择
jQuery 提供了根据类型选择特定表单元素的伪选择器：

* :password
* :reset
* :radio
* :text
* :submit
* :checkbox
* :button
* :image
* :file
