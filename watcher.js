class Watcher{
    constructor(vm, node, name, type){
        Dep.target = this;// 把watcher交给dep
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.type = type;
        this.update(); // 触发observer的get，依赖收集
        Dep.target = null;
    }
    update() {
        //获取data中的属性值，触发observer的get
        var value = this.vm.data[this.name];
        //绑定值到页面template
        this.node[this.type] = value
    }
}
