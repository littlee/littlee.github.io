# 优化选择器
原文地址： http://learn.jquery.com/performance/optimize-selectors/
选择器优化已不是以前那么重要，鉴于更多的浏览器实现了 `document.querySelectorAll()` ，选择的负担由 jQuery 转移到浏览器上。即使如此，还是要一些技巧要谨记于心。

## 基于ID的选择器
ID开头的选择器总是最好的。
```js
// 快
$( "#container div.robotarm" );
 
// 炒鸡快
$( "#container" ).find( "div.robotarm" );
```
`.find()` 方法更快是因为第一个选择表达式 `$( "#container" )` 不需要经过 [__Sizzle__]:http://sizzlejs.com/ 引擎处理——只带有ID的选择器表达式由 `document.getElementById()` 进行处理，这个做炒鸡快是因为这个方法是浏览器原生的。

## 明确性
对右手边的选择器要比左手边的更明确。
```js
// 优化前
$( "div.data .gonzalez" );
 
// 优化后
$( ".data td.gonzalez" );
```
如果可以，在最右边的选择器使用 `tag.class` ，而左边的选择器只用 `tag` 或 `.class`

## 避免过多的明确
```js
$( ".data table.attendees td.gonzalez" );
 
// 如果可以，丢弃中间的选择器会更好
$( ".data td.gonzalez" );
```
扁平的DOM可以提升选择器的性能，因为选择器引擎可以在寻找元素的时候遍历较少的层。

## 避免使用全局选择器
明确指定或暗含全局元素的表达式解析起来会灰常慢。

```js
$( ".buttons > *" ); // 开销炒鸡大
$( ".buttons" ).children(); // 好得很
 
$( ".category :radio" ); // 暗含全局选择器
$( ".category *:radio" ); // 同上，只是明确指定了全局选择
$( ".category input:radio" ); // 好得很
```
