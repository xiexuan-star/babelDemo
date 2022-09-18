## plugin的格式

```javascript
export default function (api, options, dirname) {
  // api中包含了babel的各个api，types/template等等
  return {
    inherits: parentPlugin,
    manipulateOptions(options, parserOptions) {
      options.xxx = '';
    },
    // pre/post 在遍历开始或结束时调用
    pre(file) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      }
    },
    post(file) {
      console.log(this.cache);
    }
  };
}

// 或直接以一个对象形式定义
export default plugin = {
  pre(state) {
    this.cache = new Map();
  },
  visitor: {
    StringLiteral(path, state) {
      this.cache.set(path.node.value, 1);
    }
  },
  post(state) {
    console.log(this.cache);
  }
};
```

## 插件的名称

babel plugin 名字的补全有这些规则：

- 如果是 ./ 开头的相对路径，不添加 babel plugin，比如 ./dir/plugin.js
- 如果是绝对路径，不添加 babel plugin，比如 /dir/plugin.js
- 如果是单独的名字 aa，会添加为 babel-plugin-aa，所以插件名字可以简写为 aa
- 如果是单独的名字 aa，但以 module 开头，则不添加 babel plugin，比如 module:aa
- 如果 @scope 开头，不包含 plugin，则会添加 babel-plugin，比如 @scope/mod 会变为 @scope/babel-plugin-mod
- babel 自己的 @babel 开头的包，会自动添加 plugin，比如 @babel/aa 会变成 @babel/plugin-aa

（preset也是一样）
