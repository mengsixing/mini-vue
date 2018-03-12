# mini-vue

Vue.js官网介绍响应式原理图。

![](https://cn.vuejs.org/images/data.png)

## 第一部分 vue->visual dom

### vue

调用observer绑定数据，调用compile编译视图

### observer

observer调用defineReactive，作用是通过Object.defineProperty为数据定义上getter\setter方法，进行依赖收集后闭包中的deps会存放watcher对象。触发setter改变数据的时候会通知deps订阅者通知所有的watcher观察者对象进行试图的更新。

### compile

compile从view中提取类似v-text指令，创建watcher来监听对应试图。

### watcher

watcher是一个观察者对象。依赖收集以后watcher对象会被保存在deps中，数据变动的时候会由于deps通知watcher实例，然后由watcher实例回调update进行实图的更新。

### dep

dep就是一个发布者，可以订阅多个观察者，依赖收集之后deps中会存在一个或多个watcher对象，在数据变更的时候通知所有的watcher。

## 第二部分(更新时) visual dom -> dom

### DOM DIFF

#### 同层比较（判断节点是否相同）

判断两个VNode节点是否是同一个节点，需要满足以下条件
key相同
tag（当前节点的标签名）相同
isComment（是否为注释节点）相同
是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
当标签是<input>的时候，type必须相同

#### 不同节点（直接替换）

创建新的DOM，移除旧的DOM。

#### 相同节点

1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。
2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。
3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
5.当新老节点都无子节点的时候，只是文本的替换。

##### 相同节点（更新children）

1、比较2个数组，老节点树，和新节点树
2、两头向中间比较，匹配后交换顺序。
3、新节点树先匹配完，就删除其余的老节点
3、老节点树先匹配完，就把剩下的新节点全部插入


