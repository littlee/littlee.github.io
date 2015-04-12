# jQuery 核心：CSS，样式，尺寸

[TOC]

jQuery 包含了一个便利的方法来获取和设置元素的 CSS 属性：

```js
// Getting CSS Properties:
$('h1').css('fontSize');
$('h1').css('font-size');
```

```js
// Setting CSS Properties:
$('h1').css('fontSize', '100px');
$('h1').css({
    fontSize: '100px',
    color: 'red'
});
```

注意第二个方法的参数的样式——一个带有多个属性的对象。这是一个常见的向函数传递多参数的方法，且 jQuery 的许多设置器方法接受对象来一次性设置多个值。

包含横杆的 CSS 样式在 JavaScript 中通常需要转换为驼峰写法。例如，当 CSS 样式 `font-size` 在 JavaScript 用作一个属性名的时候会被写成 `fontSize`。不过，当以字符串形式传递一个 CSS 属性给设置器方法的时候不会有影响，在这种情况下，驼峰写法和横杆写法都会起作用。

并不推荐在生产环境中将 `.css()` 做为一个设置器使用，但是当传递一个对象来设置 CSS 的时候，CSS 属性会变成驼峰写法而不是横杆写法。

## 使用 CSS 类来设置样式
作为一个获取器，`.css()` 方法是很有价值的。但是，它一般需要在生产环境中避免作为一个设置器使用，因为一般最好保持展现的信息在 JavaScript 代码之外。相反，编写 CSS 规则类来描述多样的视觉状态，然后修改元素的类。

```js
// Working with classes.
 
var h1 = $('h1');
 
h1.addClass('big');
h1.removeClass('big');
h1.toggleClass('big');
 
if ( h1.hasClass('big') ) {
    ...
}
```

类还可以用来保存元素的状态信息，例如声明一个元素被选择。

## 尺寸
jQuery  提供了各式各样的方法来获取和修改元素尺寸和位置。

下面的代码对 jQuery 中的尺寸功能做了一个简短的展示。

```js
// Basic dimensions methods.
 
// Sets the width of all <h1> elements.
$( "h1" ).width( "50px" );
 
// Gets the width of the first <h1> element.
$( "h1" ).width();
 
// Sets the height of all <h1> elements.
$( "h1" ).height( "50px" );
 
// Gets the height of the first <h1> element.
$( "h1" ).height();
 
 
// Returns an object containing position information for
// the first <h1> relative to its "offset (positioned) parent".
$( "h1" ).position();
```