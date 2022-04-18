## babel的用法，原理及一个plugin的实现

### 1.几个常见预设

所谓Preset就是一些Plugin组成的合集

#### 1.1 @babel/preset-env

一个智能预设，它可以将高版本JavaScript代码进行转译根据内置的规则转译成为低版本的javascript代码。

#### 1.2 @babel-preset-typescript

对于TypeScript代码，有两种方式去编译TypeScript代码成为JavaScript代码。

使用tsc命令，结合cli命令行参数方式或者tsconfig配置文件进行编译ts代码。

使用babel，通过babel-preset-typescript代码进行编译ts代码。

### 2.PluginList

https://babeljs.io/docs/en/plugins-list

### 3. 一些常见的配置

#### 3.1 在webpack中的配置

##### 3.1.1 babel-loader

```javascript
/**
 * @param sourceCode 源代码内容
 * @param options babel-loader相关参数
 * @returns 处理后的代码
 */
function babelLoader(sourceCode, options) {
  // 通过transform方法编译传入的源代码
  // core: @babel-core
  core.transform(sourceCode, {
    presets: ['babel-preset-env'],
    plugins: [...]
  })
  return targetCode
}
```

##### 3.1.2 babel-core

@babel/parse + @babel/generator

##### 3.1.3 babel-preset-env

babel转义规则预设

### 4. Polyfill

babel-prest-env仅仅只会转化最新的es语法，并不会转化对应的Api和实例方法,比如说ES 6中的Array.from静态方法。
babel是不会转译这个方法的，如果想在低版本浏览器中识别并且运行Array.from方法达到预期就需要额外引入polyfill进行在Array上添加实现这个方法。

#### 4.1 几个polyfill插件

##### 4.1.1 @babel/polyfill

通过向全局对象上添加属性的方式实现

##### 4.1.2 @babel/runtime

@babel/runtime更像是一种按需加载的解决方案，
比如哪里需要使用到Promise，@babel/runtime就会在他的文件顶部添加

```javascript
import promise from 'babel-runtime/core-js/promise'
```

babel-runtime无法做到智能化分析，需要我们手动引入。
babel-runtime编译过程中会重复生成冗余代码

##### 4.1.3 @babel/plugin-transform-runtime

@babel/plugin-transform-runtime插件会智能化的分析我们的项目中所使用到需要转译的js代码，从而实现模块化从babel-runtime中引入所需的polyfill实现。

### 5. babel插件开发

[astexplorer](https://astexplorer.net/)：一个在线的代码转译器，他可以按照目前业界主流的方式将任何代码转为AST。

[babel-handbook]()：babel插件开发中文手册文档。

[the-super-tiny-compiler-cn](https://github.com/starkwang/the-super-tiny-compiler-cn)
：一个github上的开源小型listp风格转化js编译器，强烈推荐对编译原理感兴趣的同学可以去看一看它的代码。

#### 5.1指南

@babel/core: 核心库

@babel/parser:babel解析器。

@babel/types: 包含手动构建 AST 和检查 AST 节点类型的方法(比如通过对应的api生成对应的节点)。

@babel/traverse: 用于对Ast的遍历，它维护了整棵树的状态(需要注意的是traverse对于ast是一种深度遍历)。

@babel/generator: 用于代码的生成，通过AST生成新的代码返回。
