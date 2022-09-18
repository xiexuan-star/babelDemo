## code-frame

### @babel/code-frame

```javascript
const { codeFrameColumns } = require('@babel/code-frame');

const res = codeFrameColumns(code, {
  start: { line: 2, column: 1 },
  end: { line: 3, column: 5 },
}, {
  highlightCode: true,
  message: '这里出错了'
});

console.log(res);

// 或者在traverse过程
path.buildCodeFrameError(path,options);
```

### @babel/highlight



