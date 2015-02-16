[返回首页](http://littlee.github.io/)
# jQuery 如何工作
[TOC]
### jQuery 基础
这是一个基础的教程，被设计成来帮助你入门jQuery。如果你还没有建立一个测试页面，从下面的 HTML 代码开始吧：
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Demo</title>
</head>
<body>
    <a href="http://jquery.com/">jQuery</a>
    <script src="jquery.js"></script>
    <script>
 
    // Your code goes here.
 
    </script>
</body>
</html>
```
`<script>`元素的`src`属性必须指向 jQuery 的一个副本，从[下载jQuery](http://jquery.com/download/)页面下载一个 jQuery 的副本并将`jquery.js`文件保存在与你的 HTML 文件的同一个目录下。

*注意：当你下载 jQuery的时候，文件名可能会包含版本号，例如`jquery-x.y.z.js`。确保将文件重命名成`jquery.js`或者更改`src`属性使其匹配文件名。*

### 在文档准备好时运行代码
为了确保代码在浏览器加载完文档后运行，许多 JavaScript 开发者将他们的代码包装在一个 `onload` 函数里面：
```js
window.onload = function () {
    alert('welcome');
};
```
不幸的是，所有图片没有完成下载之前，代码不会运行，包括横幅广告。为了在文档准备好可以被操作的时候就运行代码，jQuery 拥有一个被称为 ready 事件的声明。
```js
$(document).ready(function () {
    // Your code here.
});
```
例如，在 ready 事件中，你可以为链接添加点击事件：
```js
$(document).ready(function () {
    $('a').click(function (event) {
        alert('Thanks for visiting!');
    });
});
```
复制上面的代码到你的 HTML 文件中。然后，保存文件，在浏览器中刷新你的测试页面。现在点击链接应该会显示一个弹出窗口，接着继续默认的行为，导航到 http://jquery.com.

对于 `click` 和大多数其他事件，你可以通过在事件处理器中调用 `event.preventDefault()` 阻止默认的行为：
```js
$(document).ready(function () {
    $('a').click(function (event) {
        alter('As you can see, the link no longer took you to jquery.com');
        event.preventDefault();
    });
});
```
尝试用上面的代码替换你刚才复制到 HTML 文件的第一段 jQuery 代码。保存文件然后再次刷新试试。

### 完整的例子
下面的例子说明了上面讨论的点击处理代码，直接嵌入到 HTML `body` 中。注意在实践过程中，把你的代码放在一个单独的 JS 文件并使用 `<script>` 元素的 `src` 加载到页面中会更好。

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Demo</title>
</head>
<body>
    <a href="http://jquery.com/">jQuery</a>
    <script src="jquery.js"></script>
    <script src="myCode.js"></script>
</body>
</html>
```

### 添加和移除一个 HTML 类
**重要：** *你必须将余下的 jQuery 例子放在 `ready` 事件中以便于你的代码会在文档准备好时执行。*

另外一个常有的任务是添加会移除一个类。

首先，在文档的 `<head>` 中添加一些样式信息，像这样：
```html
<style>
    a.test {
        font-weight: bold;
    }
</style>
```
接下来，在脚本加上 `.addClass()` 的调用。
```js
$('a').addClass('test');
```

### 特别的效果
jQuery 同时提供了一些简便的效果来帮助你使你的网站脱颖而出。例如，如果你创建一个这样的点击事件处理器：
```js
$('a').click(function (event) {
    event.preventDefault();
    $(this).hide('slow');
});
```
则链接会在点击的时候慢慢消失。

## 回调和函数
不像许多其他的编程语言，JavaScript 让你可以自由地到处传递延后执行的函数。*回调* 是一个作为参数传递给另一个函数并在其父函数完成后执行。回调很特殊，因为他们耐心地等待他们的父函数完成后才执行。
为了使用回调，知道图和传递他们到他们的父函数的很重要的。

### 不带参数的回调
如果一个回调没有参数，你可以像这样进行传递：
```js
$.get('myhtmlpage.html', myCallback);
```
当 `$.get()` 完成获取 `myhtmlpage.html` 时，`myCallback()` 才执行。

> **注意：**：这里的第二个参数是一个简单的函数名（但 *不是* 一个字符串，且没有括号）

### 带参数的回调
执行带参数的回调会有点棘手。
**错误的用法**
这个例子的代码不会正常运行：
```js
$.get('myhtmlpage.html', myCallback(param1, param2));
```
失败的原因代码会立即执行 `myCallback(param1, param2)` 并将 `myCallback()` 的 *返回值* 作为传递给 `$.get()` 的第二个参数。我们真正想要的是传递 `myCallback()` 这个函数，不是 `myCallback(param1, param2)` 的返回值（可能是或不是一个函数）。所以，怎样传递 `myCallback()` 并带有参数呢？

**正确的用法**
为了推迟 `myCallback()` 的带参数执行，你可以使用一个匿名函数做为一个包装器。注意 `function () {` 的使用。这个匿名函数只做一件事：带着 `param1` 和 `param2` 的值调用了 `myCallback()`。
```js
$.get('myhtmlpage.html', function () {
    myCallback(param1, param2);
});
```
当 `$.get()` 完成获取 `myhtmlpage.html` 页面的时候，它执行这个执行了 `myCallback(param1, param2)` 匿名函数。