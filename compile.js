function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}

Compile.prototype = {
  nodeToFragment(node, vm) {
    this.nodeLoop(node, vm);
  },
  nodeLoop(dom, vm) {
    var self = this;
    self.compileElement(dom, vm);
    if (dom.childNodes.length > 0) {
      dom.childNodes.forEach(element => {
        self.nodeLoop(element, vm);
        self.compileElement(element, vm);
      });
    } else {
      return;
    }
  },
  compileElement(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    if (node.nodeType === 1) {
      var attr = node.attributes;
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == "v-model") {
          var name = attr[i].nodeValue;
          node.addEventListener("input", e => {
            vm.data[name] = e.target.value;
          });
          new Watcher(vm, node, name, "value");
        }
        if (attr[i].nodeName == "v-text") {
          var name = attr[i].nodeValue;
          new Watcher(vm, node, name, "innerText");
        }
      }
    }
    if (node.nodeType === 3 && reg.test(node.nodeValue)) {
      node.nodeValue.match(reg);
      var name = RegExp.$1;
      new Watcher(vm, node, name, "nodeValue");
    }
  }
};
