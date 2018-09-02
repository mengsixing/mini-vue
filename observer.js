function defineReactive(obj, key) {
  var dep = new Dep();
  var _value = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        // 依赖收集
        dep.addSub(Dep.target);
      }
      return _value;
    },
    set(newValue) {
      if (newValue == _value) {
        return;
      }
      _value = newValue;
      // 通知watcher进行dom更新
      dep.notify();
    }
  });
}

function observer(obj, vm) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key);
  });
}
