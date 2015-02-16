# jQuery 核心：避免与其他库的冲突
[TOC]

[原文链接](http://learn.jquery.com/using-jquery-core/avoid-conflicts-other-libraries/)
jQuery 库，事实上，以及它的插件，都包含在 `jQuery` 的命名空间里面。一般说来，全局对象也保存在 jQuery 的命名空间中，所以你不该让 jQuery 与任何其他库（比如 prototype.js, MooTools, 或是 YUI ）之间产生冲突。

即使如此，还是有一个警告：*默认情况下，jQuery 使用 `$` 作为 `jQuery` 的捷径*。因此，如果你正在使用其他使用 `$` 变量的 JavaScript 库，你会在使用 jQuery 的时候陷入冲突。为了避免这些冲突，你需要在 jQuery 载入页面之后和尝试在页面中使用 jQuery 之前立即将其设置为无冲突模式。

## 设置 jQuery 为无冲突模式
当你设置 jQuery 为无冲突模式的时候，你可以赋值一个新变量来代替 `$` 别名。
```html
<script src="other_library.js"></script>
<script scr="jquery.js"></script>
<script type="text/javascript">
    var $j = jQuery.noConflict();
    // $j 现在是 jQuery 函数的一个别名；创建新别名是可选的。

    $j(document).ready(function () {
        $j('div').hide();
    });
</script>
```
在上面的代码中，`$` 会回到它在原始库中表达的意义。你依然可以在你余下的程序代码中使用完成的函数名 `jQuery` 或者是新的别名 `$j`。新的别名可以命名为任何你喜欢的名字。

最后，如果你不想给完整的 `jQuery` 函数名定义另一个别名（你就是想用 `$` 而不在乎其他库里面的 `$` 方法），那么你还可以尝试另一个方法：简单地将 `$` 作为一个参数传递给你的 `jQuery(document).ready()` 函数。这是在你依然想得到简明的 jQuery 代码，但不想与其他库发生冲突的情况下最常使用的方法。
```html
<script src="other_library.js"></script>
<script scr="jquery.js"></script>
<script type="text/javascript">
    jQuery.noConflict();

    jQuery(document).ready(function ($) {
        $('div').hide();
    });
</script>
```
这或许是在你的大多数的代码中理想的解决方案，考虑到这将会修改更少的代码来达到完整的兼容性。

## 在引入其他库之前引入 jQuery
上面的代码段依赖于在其它库载入后才载入 jQuery。如果你想在引入其它库之前引入 jQuery，你可以在你想用 jQuery 完成一些工作的时候使用 `jQuery`，但是 `$` 将拥有在其它库里面表达的意思。这样就不用通过调用 `jQuery.noConflict()` 来放弃 `$` 别名。
```html
<script scr="jquery.js"></script>
<script src="other_library.js"></script>
<script type="text/javascript">
    jQuery(document).ready(function () {
        jQuery('div').hide();
    });

    window.onload = function () {
        var mainDiv = $('main');
    };
</script>
```

## 引用 jQuery 函数的总结
这里是一个关于当其它库在 `$` 变量发生冲突的时候引用 jQuery 函数的简要总结：

### 创建新别名
`jQuery.noConflict()` 这个方法返回了一个 jQuery 函数的引用，所以你可以在任何你喜欢的变量获取到它。
```js
var $jq = jQuery.noConflict();
```

### 使用立即调用函数表达式
你可以通过将你的代码包装在一个立即调用函数表达式里面来继续使用标准的 `$`；这也是在插件作者无从知道另一个库是否已经接管了 `$` 的情况下，编写 jQuery 插件的一个标准模式，
```js
jQuery.noConflict();
(function ($) {
    // your code here
})(jQuery);
```

### 使用传递给 `jQuery(document).ready()` 的参数
```js
jQuery(document).ready(function ($) {
    // your code here
});
```
或者使用更简明的语法：
```js
jQuery(function ($) {
    // your code here   
});
```