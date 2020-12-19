# how and why to give up on vue

## hard to debug when rendering error occurs

When a rendering error comes up, Vue can only tell you which component's template is wrong without extra helpful information. And all the error stack trace link to `vue.runtime.esm.js`

![](./md/01/vue_render_error.png)

This is because `@vue/cli` use `mode: 'development'` in webpack config, which will set `devtool` to `'eval'`

So, let's try to change the `devtool` to `source-map` in `vue.config.js`, and restart our dev server again

```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
};
```

The error stack trace link to the `App.vue` now. This is better, we can know which file is wrong exactly

![](./md/01/vue_render_error_2.png)

BUT, when click the file link, the `App.vue` show up in devtool is far different from our original vue file

![](./md/01/vue_render_error_3.png)

This is because `<template />` tag in vue SFC file have to be compiled before running on the browser...

emmm... we still don't know which line is wrong in `App.vue`

## vetur: "rename symbol" feature missing

90% of programing is naming things, and the rename symbol feature in vs code does really help during the precious development time.

vetur is the most popular extension for vue, but the "rename symbol" feature is missing when editing an vue SFC file. This has been an issue on the github repo of vetur since 2017

https://github.com/vuejs/vetur/issues/610

## declaration ceremony

## custom directive

## massive API design

vue.js 2 has 104 API

try running the code below in its API doc site https://cn.vuejs.org/v2/api/

```js
document.querySelectorAll('.menu-root .menu-sub .section-link');
```

though vue provide a DSL for us to get more done with less code, but it is hard to MASTER vue, and in the meantime, the vue 3 is coming...

`DSL === '都是泪'` and the framework designed with "Minimal API Surface Area" idea is way more flexible, https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html
