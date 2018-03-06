function defineReactive(obj, key) {
	var dep = new Dep();
	var _value=obj[key];
	Object.defineProperty(obj, key, {
		get() {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}
			return _value;
		},
		set(newValue) {
			if (newValue == _value) { return; }
			_value = newValue;
			dep.notify();
		}
	});
}

function observer(obj, vm) {
	Object.keys(obj).forEach((key) => {
		defineReactive(obj, key);
	});
}

