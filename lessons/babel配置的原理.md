## @babel/plugin-transform-runtime 的实现原理

babel 插件和 preset 生效的顺序是这样的: 先插件后 preset，插件从左往右，preset 从右往左。

这就导致了 @babel/plugin-transform-runtime 是在 @babel/preset-env 之前调用的，
提前做了 api 的转换，那到了 @babel/preset-env 就没什么可转了，也就实现了 polyfill 的抽取。
