# Dispatcher
接收 request，交给提 handler 处理

## 特点
+ 把一个文件夹下的所有 js 都当作 Controller
+ 文件夹名默认作为所有 handler 的 path
+ handler 可以在默认 path 的基础后追加字串（appendPath），或者，重新设置（path）。path 会覆盖 appendPath

## 将来可能……
+ 提供多文件夹、子文件夹、文件名正则匹配
