# jQuery 核心：操作元素
[TOC]

## 元素信息的获取与设置
改变一个已存在元素的方法多种多样。其中最常见的任务是改变内部的 HTML 或一个元素的属性。jQuery 提供了简单，跨浏览器的方法用来做这些操作。你还可以使用同一方法的获取器形式来获取元素的信息。更多关于获取器和设置其的信息，请参考[使用选择集](http://learn.jquery.com/working-with-selections/)部分。这里是一些你能用来获取和设置元素信息的方法：
* `.html()` —— 获取或设置 HTML 内容。
* `.text()` —— 获取或设置文本内容；HTML 会被剔除。
* `.attr()` —— 获取或设置提供的属性的值。
* `.width()` —— 获取或设置选择集中的第一个元素的像素宽度，作为一个整数。
* `.height()` —— 获取或设置选择集中的第一个元素的像素高度，作为一个整数。
* `.position()` —— 获取选择集中的第一个元素的位置信息对象，相对于它的第一个已定位的祖先。_这个只有获取器方法。_
* `.val()` —— 获取或设置表单元素的值。

改变元素的东西是琐碎的，但是记住，改变会影响选择集里的所有元素。如果你只是想改变一个元素，确保在调用设置其方法之前在选择集中指明它。
```js
// 改变一个元素的 HTML 内容。
$('#myDiv p:first').html('New <strong>first</strong> paragraph!');
```

## 移动，拷贝，以及移除元素
虽然有很多在 DOM 里移动元素的方法，但是一般有两个途径：
* 将选择的元素相对于另一个元素放置。
* 将一个元素相对于选择的元素放置。

举个例子，jQuery 提供了 `.insertAfter()` 和 `.after()`。`.insertAfter()` 方法将选择的元素置于参数提供的元素后面。`.after()` 方法将参数提供的元素置于选择的元素后面。其他几个方法遵循这个模式：`.insertBefore()` 与 `.before()`，`.appendTo()` 与 `.append()`，`.prependTo()` 与 `prepend()`。

使用方法最合理的方式，取决于被选择的元素，以及你是否需要对加入页面的元素保存一个引用。如果你需要保存一个引用，你会经常想使用第一种途径——将选择的元素相对于另一个元素放置——由于它返回你放置的元素。在这种情况下，`.insertBefore()`，`.insertBefore()`，`.appendTo()`，和 `.prependTo()` 应该作为选择的工具。
```js
// 使用不同方法移动元素
// 使第一个列表元素变为最后一个
var li = $('#myList li:first').appendTo('#myList');

// 解决相同问题的另一个方法
$('#myList').append($('#myList li:first'));

// 注意到我们无法访问移动的列表元素，
// 由于这个方法返回了列表本身。
```

## 拷贝元素
诸如 `.appendTo()` 方法可以移动元素，但是有时需要对元素进行复制。在这种情况下，优先使用 `.clone()`：
```js
// 拷贝一个元素
// 复制列表的第一个元素到列表的结尾
$('#myList li:first').clone().appendTo('#myList');
```

## 移除元素
有两种方法可以从页面中移除元素：`.remove()` 和 `.detach()`。当你想永久从页面上移除选择集的时候使用 `.remove()`。虽然 `.remove()` 确实返回移除的元素，但如果你将这些元素返回页面，他们不会有关联的数据和附加的事件。

如果你需要让数据和事件存留下来，使用 `.detach()`。就像 `.remove()`，它返回选择集，但是它同时维持着与选择集关联的数据和时间，所以你可以在后期将选择集恢复到页面。

如果你正在对一个元素做繁重的操作，`.detach()` 方法相当有价值。在这种情况下，从页面中 `.detach()` 元素是有利的，在你的代码里对它进行操作，完成的时候将它恢复到页面中，这在维持元素的数据和事件的同时，减弱了昂贵的 “DOM 接触”。

如果你想让元素留在页面上，但是移除它的内容，你可以使用 `.empty()` 方法来处理掉元素的内部 HTML。

## 创建新元素
jQuery 提供了繁琐的和简练的方法来创建新元素，使用用于进行选择的同一个方法 `$()`：
```js
// 从 HTML 字符串创建新元素
$('<p>This is a new paragraph.</p>');
$('<li class="new">new list item</li>');
```

```js
// 使用属性对象创建新元素
$('<a/>', {
    html: 'This is a <strong>new</strong> link',
    'class': 'new',
    href: 'foo.html'
});
```

注意在上面，属性对象是第二个参数，class 属性名是带引号的，然而属性名 `html` 和 `href` 没有带引号。属性名一般不用带引号，除非它们是保留字（此情况是 class 保留字）。

当你创建新元素的时候，它没有立即添加到页面中。有几种方法将元素添加到页面中，一旦它被创建。
```js
// 将新元素放置到页面上
var myNewElement = $('<p>new element</p>');
myNewElement.appendTo('#content');
myNewElement.insertAfter('ul:last'); // 这会从 #content 移除 p
$('ul').last().after(myNewElement.clone()); // 克隆 p 所以现在我们有两个
```

创建的元素不需要保存在变量中——你可以直接在 `$()` 后面调用方法将元素添加到页面。即使如此，很多时候你会想要一个对你添加的元素的引用，这样你就不必在以后进行选择。

你还可以将元素添加到页面的时候创建它，但是注意在这种情况下，你不能获得这个新创建元素的引用：
```js
// 创建元素的同时添加到页面中
$('ul').append('<li>list item</li>');
```

添加新元素到页面的语法很简单，所以这会引起我们忘记，重复地添加元素到 DOM 有巨大的性能消耗。如果你正往同一个容器添加许多元素，你会希望将所有的 HTML 合并成一个单字符串，然后追加字符串到容器而不是每次追加一个元素。使用一个数组来将所有的部分收集在一起，接着将它们合并成一个用于追加的单字符串：
```js
var myItems = [];
var myList = $('#myList');

for (var i = 0; i < 100; i++) {
    myItems.push('<li>item ' + i + '</li>');
}

myList.append(myItem.join(''));
```

## 操作属性
jQuery 的属性操作能力很广泛。基本的改变很简单，但是 `.attr()` 方法也允许更复杂的操作。它能设置一个明确的值，或者使用一个函数的返回值设置一个值。当使用函数语法的时候，函数接收两个参数：要改变属性的元素的零起始索引，以及要改变的属性现在的值。
```js
// 操作一个单一属性
$('#myDiv a:first').attr('href', 'newDestination.html');
```

```js
// 操作多个属性
$('#myDiv a:first').attr({
    href: 'newDestination.html',
    rel: 'nofollow'
});
```

```js
// 使用一个函数来确定属性的新值
$('#myDiv a:after').attr({
    rel: 'nofollow',
    href: function (idx, href) {
        return '/new/' + href;
    }
});

$('#myDiv a:first').attr('href', function (idx, href) {
    return '/new/' + href;
});
```