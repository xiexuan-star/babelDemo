# babel的API

babel的编译流程分3步 parse/transform/generate

## 1.babel的各个包

@babel/parser 将源码转为AST

@babel/traverse 遍历AST，调用visitor函数修改AST

@babel/types 用于对节点类型进行判断

@babel/template 用于简化AST的创建逻辑

@babel/generator 用于将AST转换为目标代码字符串，同时生成sourcemap

@babel/code-frame 定位解析错误位置

@babel/core 提供整体功能

## 1.1 @babel/parser

基于acorn实现，拓展了很多语法

默认只解析js代码，jsx/flow/ts这些非标准语法需要指定语法插件

提供两个API，parse/parseExpression，parse返回的根节点为File，parseExpression返回的根节点为Expression

## 1.2 @babel/traverse

通过访问器处理节点，并且可以指定enter与exit两个阶段的回调

进入节点时enter，遍历完子节点后，exit

同一个 visitor 函数可以用于多个 AST 节点的处理，方式是指定一系列 AST，用 | 连接

```javascript
// 进入 FunctionDeclaration 和 VariableDeclaration 节点时调用
traverse(ast, {
  'FunctionDeclaration|VariableDeclaration'(path, state) {}
})
```

## 1.2.1 节点的别名

XxxStatement XxxDeclaration 等节点都可以只通过对应的大类访问 Statement/Declaration

## 1.2.2 遍历的参数 state与path

path(核心): 记录节点遍历时的路径，同时记录了父子，兄弟节点之间的关系

- path.node 指向当前节点
- path.parent 指向父级节点
- path.getSibling path.getNextSibling path.getPrevSibling 获取兄弟节点
- path.find 从当前节点向上查找
- path.get/set 获取/设置属性path

- path.scope 获取节点作用域信息

- path.isXxx 判断节点类型
- path.assertXxx 断言节点类型

- path.insertBefore、path.insertAfter 插入节点
- path.replaceWith、path.replaceWithMultiple、replaceWithSourceString 替换节点
- path.remove 删除节点

- path.skip 跳过当前节点的子节点的遍历
- path.stop 结束后续遍历

state: 遍历过程中在不同节点间传递数据

## 1.3 @babel/types

用于判断与创建AST

t.ifStatement(test,consequent,alternate)

t.isIfStatement(node,opts) opts可以指定属性值，增加更多判断的条件

t.assertIfStatement(node,opts) 与is不同的是，断言失败则会直接抛出异常

## 1.4 @babel/template

template.ast 返回的是整个 AST。

template.program 返回的是 Program 根节点。

template.expression 返回创建的 expression 的 AST

template.statements 返回创建的 statements 数组的 AST

## 1.5 @babel/generator

```javascript
const { code, map } = generate(ast, { sourceMaps: true, comments: true, minified: true })
```

## 1.6 @babel/code-frame

```javascript
const { codeFrameColumns } = require("@babel/code-frame");

try {
  throw new Error("xxx 错误");
} catch (err) {
  // 打印错误信息
  console.error(codeFrameColumns(`const name = guang`, {
    start: { line: 1, column: 14 }
  }, {
    highlightCode: true,
    message: err.message
  }));
}
```

## 1.7 @babel/code

babel的功能基于parser/types/template/code-frame/generator/traverse 6个包实现

@babel/core 便是使用这6个包，来提供编译，插件，预设功能的

## 1.7.1 @babel/core的API

```javascript
transformAsync("code();", options).then(result => {})
transformFileAsync("filename.js", options).then(result => {})
transformFromAstAsync(parsedAst, sourceCode, options).then(result => {})
```
