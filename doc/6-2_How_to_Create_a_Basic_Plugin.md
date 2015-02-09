# 如何创建基本的插件
[原文链接](http://learn.jquery.com/plugins/basic-plugin-creation/)
有时你想让一段函数可以为你的代码所利用。例如，也许你想在一个jQuery选择上调用一个简单的方法，并对其执行一系列操作。在这种情况下，你可能需要编写一个插件。

## jQuery 工作方式：对象方法
在我们编写插件之前，首先必须理解一点jQuery的工作方式。看下这段代码：
```js
$('a').css('color', 'red');
```
这是一段非常基础的 jQuery 代码，但是你知道幕后都发生了什么吗？无论何时你使用 `$` 函数去选择元素的时候，它返回一个 jQuery 对象。这个对象包含了所有你一直使用的方法（`.css()`, `.click()`, 等等）以及所有匹配你的选择器的元素。jQuery对象从 `$.fn` 对象获得这些方法，这个对象包含了所有的jQuery对象方法，如果我们想编写自己的方法，它必须也包含这些。

## 基本插件编写
比如说我们想要创建一个使元素的文本变为绿色的插件。我们需要做的是添加一个叫`greenify`的函数到`$.fn`，然后它就可以像其他 jQuery 对象方法使用。
```js
$.fn.greenify = function() {
    this.css( "color", "green" );
};

$( "a" ).greenify(); // 使所有链接变绿
```
注意在使用另一个方法`.css()`的时候，我们使用`this`，而不是`$(this)`。这是因为我们的 `greenify` 函数也是`.css()`的同一个对象的一部分。

## 链式调用
这也行，但是我们需要为我们的插件做一点事使其能在真实世界存活得更久。jQuery的一个特性是链式调用，当你在选择器上链接五六个动作时就是链式调用。这个是使所有jQuery对象方法再次返回原来的jQuery对象（也有例外：`.width()` 不带参数调用的时候返回元素的宽度，且不支持链式调用）。多加一行代码即可使我们的插件能进行链式调用。
```js
$.fn.greenify = function () {
    this.css('color', 'green');
    return this;
}

$('a').greenify().addClass('greenfied');
```

## 保护$别名并添加作用域
`$`变量在JavaScript库中非常流行，如果你将其他库与jQuery一起使用，你不得不通过`jQuery.noConflict()`让jQuery不使用`$`。即使如此，这会破坏我们的插件，由于它是在假设jQuery使用了`$`作为别名的情况下编写的。为了与其他插件一起使用，并且依然使用jQuery的`$`别名，我们需要将我们所有的代码放在一个[立即调用函数表达式](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)里面，再传递jQuery函数，将参数命名为`$`。
```js
(function ($) {
    $.fn.greenify = function () {
        this.css('color', 'green');
        return this;
    }
}(jQuery));
```
补充一下，“立即调用函数表达式”的主要目的是允许我们使用自己的私有变量。假设我们需要一个不同颜色的绿色，并存放那个在一个变量中。
```js
(function ($) {
    var shade = "#556b2f";
    $.fn.greenify = function() {
        this.css( "color", shade );
        return this;
    }; 
}(jQuery));
```

## 最小化插件的足迹
编写插件的时候，最佳实践只占用一个`$.fn`的位置，这样减少了你的插件被重写的几率，也减少了你的插件重写其他插件的几率。一句话，这样是不好的：
```js
(function ($) {
    $.fn.openPopup = function () {};
    $.fn.closePopup = function () ();
}(jQuery));
```
只占用一个位置会更好，并使用参数来控制动作。
```js
(function ($) {
    $.fn.popup = function (action) {
        if (action === 'open') {
            // Open popup code
        }
        if (action === 'close') {
            // Close popup code
        }
    }
}(jQuery))
```

## 使用`.each()`方法
典型的jQuery对象会包含任意数目的DOM元素的引用，这也是为什么jQuery对象经常被称为集合。如果你想要对任何特定的元素进行操作（例如获取data属性，计算特定的位置），则你需要使用`.each()`来遍历元素。
```js
$.fn.myNewPlugin = function () {
    return this.each(function () {
        // Do something to each element here
    });
};
```
注意到我们返回`.each()`的结果集，而不是返回`this`。因为`.each()`已经可以进行链式调用，它返回我们之后返回的`this`。这是一个目前为止处理链式调用更好的方法。

## 接受选项
随着你的插件愈加复杂，让你的插件通过接受选项进行自定义是一个好主意。最简单的方法是，尤其是对于许多选项的情况，就是接受一个对象字面量。让我们修改一下greenify插件使其接受选项。
```js
(function ($) {
    $.fn.greenify = function (options) {
        var settings = $.extend({
            color: '#556b2f',
            backgroundColor: 'white'
        }, options);

        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
    }; 
}(jQuery));
```
使用的栗子：
```js
$('div').greenify({
    color: 'orange'
});
```
颜色的默认值通过`$.extend()`被重写为橙色。

## 总结
这是一个简单的插件例子，使用了我们讨论过的技术：
```js
(function ($) {
    $.fn.showLinkLocation = function () {
        this.filter('a').each(function () {
            var link = $(this);
            link.append(' (' + link.attr('href') + ') ');
        });
        return this;
    };
}(jQuery));

$('a').showLinkLocation();
```
这个插件可以优化成这样：
```js
(function ($) {
    $.fn.showLinkLocation = function () {
        this.filter('a').append(function () {
            return ' (' + this.href + ')';
        });
        return this;
    };
});
```
我们使用`.append()`的能力接收一个回调函数，且回调函数的返回值会确定对集合的每个元素追加什么。同时也注意到我们不使用`.attr()`方法来检索`href`属性，因为原生的DOM API给了我们对href属性更简易的访问。