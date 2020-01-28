# chopstick

## 比如...
一个人失意了，连饭怎么吃都忘了。  
我们先教他吃饭，不需要跟他解释人为什么要吃饭，不需要跟他介绍川菜或者淮扬菜的特点或区别，也不需要告诉他各餐具的特点以“方便”他自由选择。  
也许需要做的，只是在你吃饭的时候，提醒他也过来，并且拿起你自己常用的餐具（筷子或刀叉），和你吃一样的饭。  
不会有人认为这违背了一个独立人格的自由意志，或者阻止了他认识其他菜系、学习各类餐具的使用技术。  
如果是我，我可能会推荐他使用筷子，原因大致有以下几点：
+ 从实用性上讲，熟练使用刀叉的人，和熟练使用筷子的人，对食物的运输能力差不多
+ 筷子显然更便宜，比刀叉便宜了不知多少倍
+ 如果有一天，餐具找不到了，去公园折一段树枝也能拿来当筷子
+ 当然，使用筷子这项技术，显然更难掌握，但是既然你一辈子都要吃饭，花几天适应一下，也算不了什么
+ 我喜欢用筷子，这是最重要的一点，上面的理由其实更像我找的借口

听说近来有人造出了自动夹菜机，并且很多新生儿都不再用刀叉或筷子，简直是疯了

## 特性
+ 简单，源码简单、使用简单，功能不强大
+ 提倡适当了解底层原理、适量阅读框架源码
+ 对于一种需求场景，不提供过多解决方案，尽量只保留一种
+ 不保留过时了的技术方案
+ 不过度保护使用者，因为既没这个能力，也认为没有这个需要

## 周边插件
> 有些需求必须提供多种解决方案，比如上传文件，我肯定首推 oss，但是本地存储也是常用的，如果都放进来，就很不舒服
> 还有就是有的东西可能用不到，比如可能你的项目中就没有上传文件的需求
> 这两种场景，采取插件形式

### 文件上传
+ 阿里云 oss（未完成）
+ 本地存储（未完成）
