# jQuery 核心：jQuery 对象
[TOC]

在创建新元素的（或者选择已存在元素）的时候，jQuery 返回保存一个集合中的元素。许多 jQuery 的开发者新手假定这个集合是一个数组。它毕竟包含 DOM 元素的领起始序列，一些相似的数组函数，以及一个 `.length` 属性。实际上，jQuery 对象远远比这个复杂。

## DOM 和 DOM 元素
文档对象模型（简称 DOM）是一个 HTML 文档的表示。它可能包含了任意数目的 DOM 元素。在较高的层面，一个 DOM 元素可以被认为是一块 web 页面。它可能包含文本与/或其他 DOM 元素。DOM 元素通过类型来描述，例如 `div`, `a`, 或者 `p`，以及任意数目的属性，例如 `src`, `href`, `class` 等等。对于更详尽的描述，请参考 [来自 W3C 的官方规范](http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-745549614)。

元素就像 JavaScript 对象一样拥有属性。在这些属性中，有诸如 `.tagName` 的属性，有诸如 `.appendChild()` 的方法。这些属性是使用 JavaScript 与 web 页面交互的唯一方法。

## jQuery 对象
直接操作 DOM 元素的结果是棘手的。jQuery 对象定义了许多方法来为开发者平滑经验。jQuery 对象的一些好处包括：

*兼容性* —— 元素方法的实现在不同浏览器提供商和版本之间多种多样。下面的代码段尝试设置保存在 `target` 的 `tr` 元素的内部 HTML：
```js
var target = document.getElementById('target');
target.innerHTML = '<td>Hello <b>world</b>!</td>';
```

这在许多情况下会正常工作，但是会在 IE 的大多数版本中失效。在那种情况下，推荐的解决方法是用纯 DOM 方法来代替。通过将 `target` 元素包装在一个 jQuery 对象中，这些边界情况会被处理，且会在支持的浏览器中达到期望中的结果：
```js
// 使用 jQuery 设置内部 HTML
var target = document.getElementById('target');
$(target).html('<td>Hello <b>world</b>!</td>');
```

*方便* —— 同时，存在着许多棘手的使用纯 DOM 方法来完成的常见的 DOM 操作用例。举个栗子，在 `target` 元素请求了一个相当冗长的 DOM 方法之后，插入一个保存在 `newElement` 中的对象。
```js
var target = document.getElementById('target');
var newElement = document.createElement('div');
target.parentNode.insertBefore(newElement, target.nextSibling);
```

通过将 `target` 元素包装在一个 jQuery 对象里面，同样的任务变得简单得多：
```js
var target = document.getElementById('target');
var newElement = document.createElement('div');
$(target).after(newElement)
```

在极大程度上，这些细节简化了你的目标的实现。

### 使元素成为 jQuery 对象
当 jQuery 函数附加一个 CSS 选择器调用时，它会返回一个包装了任何匹配这个选择器的元素的 jQuery 对象。举个栗子：
```js
var heading = $('h1');
```

现在 `heading` 包含了 *all* 全部已经存在页面上的 `h1` 标签。这个可以通过检查 `heading` 的 `.length` 属性进行验证：
```js
var heading = $('h1');
alter(heading.length);
```

如果页面拥有超过一个的 `h1` 标签，这个数字会比 1 大。如果页面没有 `h1` 标签，`.length` 属性会是 0。检查 `.length` 属性是一个确认选择器是否成功匹配一个或多个元素的常见方法。

如果目的只是选择第一个标题元素，需要多一个步骤。有许多方法可以实现这个目的，但是最直接的方法是 `.eq()` 函数。
```js
var heading = $('h1');
var firstHeading = heading.eq(0);
```

现在 `firstHeading` 是一个只包含了页面上第一个 `h1` 元素的 jQuery 对象。且因为 `firstHeading` 是一个 jQuery 对象，它拥有像 `.html()` 和 `.after()` 有用的方法。jQuery 还拥有一个提供相关功能的叫 `.get()` 的方法。不是返回一个 jQuery 包装的 DOM 元素，而是返回 DOM 元素本身。
```js
var firstHeadingElem = $('h1').get(0);
```

非此即彼，因为 jQuery 元素是“类数组”的，它支持使用方括号的数组下标：
```js
var firstHeadingElem = $('h1')[0];
```

无论哪种情况，`firstHeadingElem` 包含原生的 DOM 元素。这意味着他有诸如 `.innerHTML` 的属性和诸如 `.appendChild()` 的方法，但是没有诸如 `.html()` 或 `.after()` 的 jQuery 方法。`firstHeadingElem` 元素更难操作，但是有某些情况下需要用到。举个栗子，当在做比较的时候。

### 不是所有创建的 jQuery 对象都是相等的
有个重要的细节是，对于这个包装的行为，每一个被包装的对象是不同的。即使对象是同一个选择器创建或者包含了对相同的 DOM 的引用也一样。
```js
var logo1 = $('#logo');
var logo2 = $('#logo');
```

虽然 `logo1` 和 `logo2` 是通过相同的方法创建（且包装了相同的 DOM 元素），但是它们不是同一个对象。例如：
```js
alert($('#logo') === $('#logo')); // alert "false"
```

然而，两个对象都包含了同样的 DOM 元素。`.get()` 方法在测试两个 jQuery 对象是否拥有同样的 DOM 元素的时候是很有作用的。
```js
var logo1 = $('#logo');
var logo1Elem = logo.get(0);

var logo2 = $('#logo');
var logo2Elem = logo.get(0);

alert(logo1Elem === logo2Elem); // alert "true"
```

许多开发者给包含 jQuery 的对象的变量名添加 `$` 前缀，以起到区分的作用。这个惯例并没有任何奇妙的东西 —— 它只是帮助某些人来追踪不同变量包含的东西。上一个栗子可以按照这个惯例重写：
```js
var $logo1 = $('#logo');
var logo1 = logo.get(0);

var $logo2 = $('#logo');
var logo2 = logo.get(0);

alert(logo1 === logo2); // alert "true"
```

代码的功能与上面的栗子一致，但是它增加一点可读性。

不管使用哪一种命名惯例，区分 jQuery 对象和原生的 DOM 元素是很重要的。原生 DOM 方法和属性 jQuery 对象是没有提供的，且反之亦然。诸如 "event.target.closet is not a function" 和 "TypeError: Object[object Object] has no method 'setAttribute'" 说明这个常见错误的存在。

### jQuery 对象不是“活”的
把页面上所有的段落元素赋值给一个 jQuery 对象。
```js
var allParagraphs = $('p');
```

某些人可能会认为随着时间的推移，对象的内容会增长和收缩，在 `p` 元素添加到文档中或者从文档中移除。jQuery 对象不以这种方法表现。jQuery 对象包含的元素的集合不会改变，除非显式地进行修改。这意味着集合不是活的 —— 它不会随着文档的改变而自动更新。如果从 jQuery 对象的创建开始文档可能被改变，那么更新的方法是重新创建新元素。可以是简单地运行相同的选择器：
```js
allParagraphs = $('p');
```

### 包装起来
虽然 DOM 元素提供了创建交互式的 web 页面需要的所有的功能，但是处理起来会比较棘手。jQuery 对象包装这些对象来平滑这个经验并简化常见的任务。在通过 jQuery 创建或者选择元素的时候，结果集会被包装在一个新的 jQuery 对象里面。在需要原生 DOM 元素的时候，他们可以通过 `.get()` 方法或者数组类型下标进行访问。