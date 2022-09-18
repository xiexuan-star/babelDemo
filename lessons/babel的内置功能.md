## 插件的类型

syntax plugin 用于解析特定的语法

transform plugin 用于ast转换

proposal plugin 是transform plugin的一种，为了与标准特性区分

## 插件的逻辑共用 helper

helper分2种，一种是runtime类型，一种是简化AST操作的工具函数

runtime类型的helper包括：regenerator,corejs,helper

### 找到需要转换的语法

在babel6中，需要手动指定需要转换的语法集合

babel7中，通过指定目标环境完成了语法版本细节的屏蔽, 然后通过@babel/preset-env预设进行转换

babel在@babel/compat-data包中维护了每个语法特性在不同环境中的支持版本

还有electron-to-chromium项目维护的所有electron版本到chromium版本的映射关系

### 指定目标环境 browserslist

通过类似以下这种query语法，查询浏览器的支持情况，更多语法可见 [browserslist的query文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist%23queries)

```shell
npx browserslist "last 1 version"
npx browserslist "supports es6-module"
```

通过browserslist将一些类似于"last 1 version, > 1%"这样的字符串转化为目标版本的具体数据

有了具体的版本，也有了不同特性支持的最低版本数据，那么就可以过滤出来需要处理的特性

这就是preset-env做的事情，按照目标环境按需引入插件

配置方式比如：

```json5
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        // useBuildIn表示polyfill(corejs)的引入方式，entry表示入口处全部引入，usage表示每个文件引用用到的，或者不引入
        "useBuildIns": "usage", // or "entry" or "false"
        // corejs的版本
        "corejs": 3 
      }
    ]
  ]
}
```

### @babel/preset-env的常见配置

```json5
{
  // 指定目标环境，也可以通过.browserslistrc文件中指定
  target: "",
  // include/exclude手动指定插件
  include: "",
  exclude: "",
  // 一般由bundler指定，值为一些常见的模块规范，默认值为auto
  module: "",
  // 开启debug，将在控制台打印过滤出的插件列表
  debug: true
}
```

### helper-env

preset-env 会在使用到新特性的地方注入 helper 到 AST 中，并且会引入用到的特性的 polyfill（corejs + regenerator)

这样会导致两个问题：

重复注入 helper 的实现，导致代码冗余

polyfill 污染全局环境

#### 解决 @babel/plugin-transform-runtime

解决这两个问题的思路就是抽离出来，然后作为模块引入，这样多个模块复用同一份代码就不会冗余了，而且 polyfill 是模块化引入的也不会污染全局环境。

### 新问题

当preset-env指定的环境中无需进行某个转换时，使用transform-runtime仍然会引入一些不需要的转换

原因: babel中的执行顺序是先plugin再preset，plugin从左到右，preset从右到左

### babel8

babel8 提供了 一系列 babel polyfill 的包 ，解决了 babel7 的 @babel/plugin-transform-runtime 的遗留问题，可以通过 targets 来按需精准引入 polyfill。

### 总结

babel 的功能都是通过插件完成的，但是直接指定插件太过麻烦，所以设计出了 preset，我们学习 babel 的内置功能基本等价于学习 preset 的使用。主要是 preset-env、preset-typescript 这些。
