# jQuery 核心：`$(document).ready()`
在文档没有准备好之前，页面不能被安全地操作。jQuery 为你检测这个准备好的状态。 在 `$(document).ready()` 里面的代码只会在页面 DOM 准备好运行 JavaScript 代码的时候运行一次。在 `$(window).load(function () {...}` 里面的代码会在整个页面准备好的时候运行，包括图片和 iframe 不仅仅是 DOM 。
```js
$(document).ready(function () {
    console.log('ready!');
});
```
经验丰富的开发者有时会使用速记法 `$()` 来代替 `$(document).ready()`。如果你正在编写的代码有可能是给没有 jQuery 经验的人看的，最好使用长的格式。
```js
$(function () {
    console.log('ready!');
});
```
你也可以传递一个已命名的函数给 `$(docuemnt).ready()` 而不是传递一个匿名函数。
```js
function readyFn () {
    // code to run when the document is ready.
}
$(document).ready(readyFn);
```
下面的例子展示了实践中的 `$(document).ready()` 和 `$(window).load()`。代码尝试在一个 `<iframe>` 里面加载一个网站 URL 并检测两个事件：
```html
<html>
<head>
    <script src="jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            console.log('document loaded');
        });

        $(window).load(function () {
            console.log('window loaded');
        });
    </script>
</head>
<body>
    <iframe src="http://somewhere.com"></iframe>
</body>
</html>
```