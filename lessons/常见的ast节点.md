## Literal 字面量

StringLiteral/NumberLiteral..

## Identifier 标识符

变量名/属性名/参数名

## Statement 语句

独立的可执行单位

```javascript
break;
continue;
return;
debugger;
throw Error();
{}
;
try {} catch (e) {}
for (var i = 0; i < 10; i++) {}
while () {}
do {} while ()
// ...
```

## Declaration 声明语句(一种特殊的语句)

```javascript
const a = 1;

function b() {};

class C {}

import d from ''

export default e = 1;
export { e };
export * from 'e';
```

## Expression 表达式(特点是执行完之后有返回值)

```javascript
[1,2,3];

a = 1;

1+2;

1;

function(){}

()=>{}

class{}

a;

this;

super;

a::b;
```

## Class (ClassDeclaration)

ClassBody/ClassMethod/ClassProperty

## Module (ModuleDeclaration)

ImportSpecifier/ImportDefaultSpecifier/ImportNamespaceSpecifier

## Export (ExportDeclaration)

ExportNamedDeclaration/ExportDefaultDeclaration/ExportAllDeclaration

## Program & Directive

Program 是包裹具体执行语句的节点

Directive 则是代码中指令部分('use strict')

## File & Comment

File AST的最外层节点

Comment 对应CommentBlock/CommentLine

extra 表示一些额外信息，比如字符串的单/双引号




