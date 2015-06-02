# 高级插件概念

[TOC]

### 为默认插件设置提供公共接口

为上面的代码显露默认是插件设置，是我们可以，也应该做的一个改善。这很重要，因为它让插件用户可以简单地通过一小段代码来覆盖或者自定义插件。并且，这也是我们开始利用好函数对象的地方。
```js
// 插件定义
$.fn.hilight = function(options) {
    // 通过提供的选项拓展默认选项
    // 注意到 extend 的第一个函数是一个空对象
    // 这防止覆盖我们的默认对象
    var opt = $.extend({}, $.fn.hilight.defaults. options);

    // 我们的插件实现代码从这里开始
};

$.fn.defaults = {
    foreground: 'red',
    background: 'yellow'
};
```

现在用户可以在他们的脚本里包含像这样的一行代码：
```js
$.fn.hilight.defaults.foreground = 'blue';
```

现在我们可以像这样调用插件方法，且它会使用蓝色的前景色：
```js
$('#myDiv').hilight();
```

如你所见，我们已经允许用户通过编写单行代码来改变插件的默认前景色。且用户依然可以选择性地覆盖这个新的默认值，当他们需要的时候：
```js
$.fn.hilight.defaults.foreground = 'blue';

$('.hilightDiv').hilight();

$('#green').hilight({
    foreground: 'green'
});
```

### 为可应用的二层函数提供公共接口
这点与前面的点相辅相成并且是一个有趣的拓展你的插件的方法（并且让其他人拓展你的插件）。例如，我们的插件实现可能定义了一个函数叫做 “format”，这个函数格式化高亮文本。我们的插件现在看起来应该像这样，在 hilight 函数下面带有 format 函数的默认实现：
```js
$.fn.hilight = function (options) {
    return this.each(function () {
        var elem = $(this);
        // ...
        var markup = elem.html();
        // 调用 format 函数
        markup = $.fn.hilight.format(markup);
        elem.html(markup);
    });
};

$.fn.hilight.format = function (txt) {
    return '<strong>' + txt + '</strong>';
};
```

我们可以同样简单地支持选项对象的另一个属性，允许提供一个回调函数来覆盖默认的格式化。这是支持你的插件自定义另一个不错的方法。这里展示的技巧进一步通过明确地暴露格式化函数以便于它被重新定义。通过这个技巧，让其他人传送他们自己的对你的插件的覆盖提供了可能，换句话说，这意味着其他人可以对你的插件编写插件。

就我们在这篇文章构建的琐碎示例插件来看，你可能会想知道什么时候可以用到它。一个现实生活中的例子是 Cycle 插件。Cycle 插件是一个幻灯片插件，支持一些内置的过渡效果 —— 滚动，滑动，淡出，等等。但说真的，没有办法定义每个人想应用的单一类型的效果。且这是这个拓展性可以用到的地方。Cycle 插件暴露了一个 “transition” 对象，让用户可以添加他们自己的自定义过渡定义。在插件中的定义像是这样：
```js
$.fn.cycle.transition = {
    // ...
};
```

这个技巧使其他人定义和传送过渡定义到 Cycle 插件成为可能。

### 保持私有函数私有化

暴露你的插件的部分以供覆盖的技巧是很强大的。但是你需要谨慎考虑你要暴露的部分。一旦暴露，你需要谨记在心，任何调用参数或语义的改变都可能破坏向后兼容。作为一般原则，如果你不确定是否应该暴露一个特定的函数，你最好不要。

那如果我们定义更多没有凌乱命名空间且没有暴露实现的函数会怎样呢？这是一个闭包的工作。为了说明，我们会增加另一个函数到我们的插件里面，叫做 “debug”。debug 函数会把选择的元素的数量输出到控制台。为了创建一个闭包，我们把整个插件定义包装在一个函数里面。
```js
// 创建闭包
(function($) {
 
    // 插件定义
    $.fn.hilight = function( options ) {
        debug( this );
        // ...
    };
 
    // 私有调试函数
    function debug( obj ) {
        if ( window.console && window.console.log ) {
            window.console.log( "hilight selection count: " + obj.length );
        }
    };
 
    // ...
 
// 闭包结束
})(jQuery);
```

我们的 debug 函数不能从闭包外面进行访问，因此对实现来说是私有的。

### Bob 和 Sue
我们假设 Bob 创建了一个不规范的新画廊插件（叫做 “炒鸡画廊”），插件接收一系列图片并使他们可导航。Bob 的插件丢了一堆动画让它看起来更生动，他尝试让插件尽可能地可自定义，最后成了这样一个东西：
```js
jQuery.fn.superGallery = function (options) {
    var defaults = {
        textColor: "#000",
        backgroundColor: "#fff",
        fontSize: "1em",
        delay: "quite long",
        getTextFromTitle: true,
        getTextFromRel: false,
        getTextFromAlt: false,
        animateWidth: true,
        animateOpacity: true,
        animateHeight: true,
        animationDuration: 500,
        clickImgToGoToNext: true,
        clickImgToGoToLast: false,
        nextButtonText: "next",
        previousButtonText: "previous",
        nextButtonTextColor: "red",
        previousButtonTextColor: "red"
    };

    var settings = $.extend( {}, defaults, options );
 
    return this.each(function() {
        // Plugin code would go here...
    });
};
```

你可能想到的第一件事（好吧，可能不是第一件）是这个插件如此巨大的前景，能容纳这个层次的自定义。如果插件不是虚构的，会比必要的大了许多。人们必须花费许多字节来进行自定义。

现在，我们的朋友 Bob 认为一切妥妥的；事实上，他对插件及其自定义的层次引以为傲。他相信所有的选项提供了更全能的解决方案，可以用在许多不同的情况。

Sue，我们的另一个朋友，决定使用这个插件。她配置好所有需要的选项，现在一个起作用的解决方案出现在她的面前。仅仅和这个插件玩了 5 分钟，她意识到画廊会看起来更好，如果每一张图片的宽度有更低速度的动画。她急忙了搜索 Bob 的文档，但是没有找到 animateWidthDuration 选项！

### 你看到问题了吗？
真正的问题不是你的插件有多少选项，而是你的插件有什么选项！

Bob 有点过头了。他提供的自定义层次，虽然看起来很高，实际上是很低的，特别是顾及了所有可能用户在使用插件的时候想去控制的选项。Bob 犯了一个错误，提供了一切可笑的特殊选项，导致他的插件更加难以自定义！

### 一个更好的模型
所以相当明显：Bob 需要一个新的自定义模型，一个不会放任控制或者抽象必须的细节。

Bob 被这种高层次的简单性吸引的原因是 jQuery 框架本身非常适合这种心态。提供一个 previousButtonTextColor 选项是漂亮且简单的，但是让我们面对现实，绝大多数插件的用户想要更多的控制选项！

这里是一些可以帮助你为你的插件创建一个更好的自定义选项的建议：

### 不要创建插件特性语法
使用你的插件的开发者不应该需要去学习一门新语言或者术语来完成工作。

Bob 认为他提供了最大化的自定义，带有 delay 选项（看上面）。他这样做是为了你可以指定四种不同的延迟，'quite short', 'very short', 'quite long', 'very long'：
```js
var delayDuration = 0;
switch (setting.delay) {
    case "very short":
        delayDuration = 100;
        break;
 
    case "quite short":
        delayDuration = 200;
        break;
 
    case "quite long":
        delayDuration = 300;
        break;
 
    case "very long":
        delayDuration = 400;
        break;
 
    default:
        delayDuration = 200;  
}
```

这不仅限制了用户控制的层次，而且占据了相当多的空间。12 行的代码只是定义了延迟时间是有点多，你不觉得吗？一个构造这个选项更好的方法是让插件用户使用数字指定时间数量，这样一来就不用处理选项。

这里的关键是，不要通过你的抽象限制用户的控制层次。你的抽象，无论是什么，可以如你所想的一样简单，但是确保使用你的插件的用户依然拥有对底层的控制。

### 提供元素的所有控制