# 如何放弃 Vue

## 有渲染错误时难以调试

当 Vue 项目出现渲染错误时，如果错误是因为 `<template />` 标签内的语句引起的，控制台的报错信息只能说明是哪个文件的哪个组件发生了错误，而且，错误堆栈的文件链接都指向 `vue.runtime.esm.js` 文件，无法定位到具体是哪一行语句出现了错误。

![](./md/01/vue_render_error.png)

本文的项目使用了 `@vue/cli` 作为开发脚手架，在默认的开发环境中，会将 webpack 的 `mode` 选项设置为 `"development"`，这个模式会将 webpack 的 `devtool` 选项设置为 `"eval"`，这种配置方式虽然构建速度快，但是没有生成可用的 source map 文件。不过，即使将 `devtool` 调整为 `"source-map"`，开发体验也没有很好地改善。

修改 vue.config.js 文件调整 webpack 配置，重新启动开发服务器。

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
};
```

此时，错误堆栈指向了正确的文件。
![](./md/01/vue_render_error_2.png)

但是，点击文件链接后，发现文件内容与项目源代码相差甚远。
![](./md/01/vue_render_error_3.png)

这是因为 `<template />` 的内容需要经过编译，才可以在浏览器中运行。

## vetur: "Rename Symbol" 功能缺失

编程过程中，90% 的工作是给变量命名。VS Code 提供的重命名功能节省了许多宝贵的开发时间。vetur 是目前最流行的 vue 项目插件。可是，在 vue 单文件组件中无法使用重命名功能，早在 2017 年已经有使用者提出此问题，目前为止仍未解决。

https://github.com/vuejs/vetur/issues/610

除此之外，任何 vetur 没有处理好的功能都没办法正常使用

## 繁琐的声明仪式

- 每一个 props 都需要先声明一次才能使用
- 每一个组件都需要先 import 之后再到 components 属性中声明才能使用，相当于声明两次
- 而且，同样由于 vetur 的关系，在 components 属性的代码块中无法触发 VS Code 的自动导入

## 自定义指令的复杂度

- 自定义指令本身的的接口复杂度非常高，
- 提供了 5 个钩子，钩子回调的 binding 参数就有 6 个，其中 arg 与 value 的作用也容易混淆
- 一个没有良好命名的自定义指令经常会忘记其功能，初学者阅读自定义指令源码的的学习成本也是很高

## 庞大的 API 数量

打开 https://cn.vuejs.org/v2/api/ 然后在开发者工具中执行

```js
document.querySelectorAll('.menu-root .menu-sub .section-link');
```

就会发现 vue 2 有 104 个 API ！

虽然 vue 提供了一个 DSL 让我们用更少的代码做更多的事情，上手比较简单，但是，想要熟悉或者精通，还需要一个漫长的过程，在你没学完 vue 2 的时候，vue 3 已经出现了... ...

```js
DSL === '都是泪'; // true
```

从可持续发展的角度触发，我们应该学习模式而不是学习框架，这就是为什么以 [Minimal API Surface Area](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html) 原则设计的框架更加灵活。
