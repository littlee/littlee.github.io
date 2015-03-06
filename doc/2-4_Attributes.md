# jQuery 核心：属性
一个元素的属性可以包含对你的程序有作用的信息，所以有能力去获取和设置它们是重要的。

## `.attr()` 方法
`.attr()` 方法扮演了获取器和设置器的角色。作为一个设置器，`.attr()` 可以接受一个键或一个值，或者一个包含了一个或多个键值对的对象。

`.attr()` 作为一个设置器：
```js
$('a').attr('href', 'allMyHrefsAreTheSameNow.html');
$('a').attr({
    title: 'all titles are the same too!',
    href: 'somethingNew.html'
});
```

`.attr()` 作为一个获取器：
```js
$('a').attr('href'); // 返回文档中的第一个元素的 href
```