# JS Parser History

## 1.SpiderMonkey 与 estree标准

SpiderMonkey(c++) => esprima(js) ==estree(标准)==> espree(基于estree标准)

## 2.acorn

estree标准的实现

对estree标准AST节点与属性做了拓展，也支持一些其他语法的插件

babel parser(babylon) 基于acorn实现自己的parser

不是所有的 js parser 都是 estree 标准的，比如 terser、typescript 等都有自己的 AST 标准

## 3.babel parser 对 estree AST 的扩展
也就是，babel 基于 acorn 插件对 estree AST 做了如下扩展：

- 把 Literal 替换成了 StringLiteral、NumericLiteral、 BigIntLiteral、 BooleanLiteral、 NullLiteral、 RegExpLiteral
- 把 Property 替换成了 ObjectProperty 和 ObjectMethod
- 把 MethodDefinition 替换成了 ClassMethod
- Program 和 BlockStatement 支持了 directives 属性，也就是 'use strict' 等指令的解析，对应的 ast 是 Directive 和 DirectiveLiteral
- ChainExpression 替换为了 ObjectMemberExpression 和 OptionalCallExpression
- ImportExpression 替换为了 CallExpression 并且 callee 属性设置为 Import
