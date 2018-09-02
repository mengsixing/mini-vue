function Vue(options) {
    this.data = options.data;
    var data = this.data;
    // 创建双向数据绑定
    observer(data, this);
    var id = options.el;
    //编译模板
    new Compile(document.getElementById(id), this);
}
