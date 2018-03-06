# mini-vue

Vue.js官网介绍响应式原理图。

![](https://cn.vuejs.org/images/data.png)

## vue

调用observer绑定数据，调用compile编译视图

## observer

observer调用defineReactive，作用是通过Object.defineProperty为数据定义上getter\setter方法，进行依赖收集后闭包中的deps会存放watcher对象。触发setter改变数据的时候会通知deps订阅者通知所有的watcher观察者对象进行试图的更新。

## compile

compile从view中提取类似v-text指令，创建watcher来监听对应试图。

## watcher

watcher是一个观察者对象。依赖收集以后watcher对象会被保存在deps中，数据变动的时候会由于deps通知watcher实例，然后由watcher实例回调update进行实图的更新。

## dep

dep就是一个发布者，可以订阅多个观察者，依赖收集之后deps中会存在一个或多个watcher对象，在数据变更的时候通知所有的watcher。


