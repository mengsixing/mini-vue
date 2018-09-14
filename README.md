# mini-vue

Vue.js 官网介绍响应式原理图。

![vue render 图](https://cn.vuejs.org/images/data.png)

## 第一部分 vue -> visual dom

简单流程如下：

1、先创建 Vue 实例，创建双向数据绑定，监听 data 中数据的 get，set 方法，建立与 Dep 的对应关系。

2、编译模板，在有使用 v-text 等双向数据的地方，new Watcher，建立 dom 和数据的对应关系。

3、在 new Watcher 中，进行依赖收集，把使用到的 data 记录到 Dep 中。

4、每当数据变更，便会触发 set 方法，然后调用 Dep.notify 通知使用到 data 的 watcher，去更新 dom。

### vue

调用 observer 绑定数据，调用 compile 编译视图。

### observer

observer 调用 defineReactive，作用是通过 Object.defineProperty 为数据定义上 getter\setter 方法，进行依赖收集后闭包中的 deps 会存放 watcher 对象。触发 setter 改变数据的时候会通知 deps 订阅者通知所有的 watcher 观察者对象进行试图的更新。

### compile

compile 从 view 中提取类似 v-text 指令，创建 watcher 来监听对应试图。

### watcher

watcher 是一个观察者对象。依赖收集以后 watcher 对象会被保存在 deps 中，数据变动的时候会由于 deps 通知 watcher 实例，然后由 watcher 实例回调 update 进行实图的更新。

### dep

dep 就是一个发布者，可以订阅多个观察者，依赖收集之后 deps 中会存在一个或多个 watcher 对象，在数据变更的时候通知所有的 watcher。

## 第二部分(更新时) visual dom -> dom

### DOM DIFF

#### 同层比较（判断节点是否相同）

判断两个 VNode 节点是否是同一个节点，需要满足以下条件：

- key 相同。
- tag（当前节点的标签名）相同。
- isComment（是否为注释节点）相同。
- 是否 data（当前节点对应的对象，包含了具体的一些数据信息，是一个 VNodeData 类型，可以参考 VNodeData 类型中的数据信息）都有定义。
- 当标签是 `<input>` 的时候，type 必须相同。

#### 不同节点（直接替换）

创建新的 DOM，移除旧的 DOM。

#### 相同节点

1.如果新旧 VNode 都是静态的，同时它们的 key 相同（代表同一节点），并且新的 VNode 是 clone 或者是标记了 once（标记 v-once 属性，只渲染一次），那么只需要替换 elm 以及 componentInstance 即可。

2.新老节点均有 children 子节点，则对子节点进行 diff 操作，调用 updateChildren，这个 updateChildren 也是 diff 的核心。

3.如果老节点没有子节点而新节点存在子节点，先清空老节点 DOM 的文本内容，然后为当前 DOM 节点加入子节点。

4.当新节点没有子节点而老节点有子节点的时候，则移除该 DOM 节点的所有子节点。

5.当新老节点都无子节点的时候，只是文本的替换。

##### 相同节点（更新 children）

1、比较 2 个数组，老节点树，和新节点树。

2、两头向中间比较，匹配后交换顺序。

3、新节点树先匹配完，就删除其余的老节点。

3、老节点树先匹配完，就把剩下的新节点全部插入。
