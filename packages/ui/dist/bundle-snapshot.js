(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component.options = options;

	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._yield = options._yield;
	component._bind = options._bind;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.p(changed, this._state);
	dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

'use strict';

const config = require('./lib/config');
const fingerprint = require('./lib/fingerprint');
const service = require('./lib/service');
const validation = require('./lib/validation');

class Api {
    constructor (config) {
        this.config = config;
    }

    async login (password) {
        const match = await fingerprint.compare(password, this.config.fingerprint);
        if (!match) {
            throw new Error('Master password is incorrect')
        }
        this.password = password;
        return match
    }

    generate (keyword) {
        return service.generate(keyword, this.password, this.config)
    }
}

exports.create = async () => {
    return config.load()
    .then(conf => {
      return new Api(conf)
    })
};

exports.config = config;
exports.validation = validation;

/* lib/ui/components/login/component.html generated by Svelte v1.40.2 */
function data() {
  return {
    password: ''
  }
}

var methods = {
  login (key) {
    console.log(key);
  },

  async doLogin () {
    const password = this.get('password');
    console.log(await api.login(password));
  }
};

function oncreate() {
  this.api = unstore.create();
}

function encapsulateStyles(node) {
	setAttribute(node, "svelte-862573298", "");
}

function add_css$1() {
	var style = createElement("style");
	style.id = 'svelte-862573298-style';
	style.textContent = "[svelte-862573298].aligner,[svelte-862573298] .aligner{display:flex;align-items:center;justify-content:center;height:100vh;min-height:100vh;flex-direction:column}[svelte-862573298].aligner-item,[svelte-862573298] .aligner-item{max-width:50%}[svelte-862573298].heading,[svelte-862573298] .heading{margin-bottom:5vh;font-size:14vh;font-family:'Baloo Tama'}input[svelte-862573298],[svelte-862573298] input{border:2px solid #fff;background:transparent;font-size:4vh}";
	appendNode(style, document.head);
}

function create_main_fragment$1(state, component) {
	var div, div_1, text_1, div_2, input, input_updating = false;

	function input_input_handler() {
		input_updating = true;
		component.set({ password: input.value });
		input_updating = false;
	}

	function keyup_handler(event) {
		component.login(event);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_1.textContent = "unstore";
			text_1 = createText("\n  ");
			div_2 = createElement("div");
			input = createElement("input");
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(div);
			div.className = "aligner";
			div_1.className = "heading aligner-item";
			div_2.className = "aligner-item";
			input.type = "password";
			addListener(input, "input", input_input_handler);
			addListener(input, "keyup", keyup_handler);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text_1, div);
			appendNode(div_2, div);
			appendNode(input, div_2);

			input.value = state.password;
		},

		p: function update(changed, state) {
			if (!input_updating) {
				input.value = state.password;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			removeListener(input, "keyup", keyup_handler);
		}
	};
}

function Component$1(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	if (!document.getElementById("svelte-862573298-style")) add_css$1();

	var _oncreate = oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(Component$1.prototype, methods, proto);

/* lib/ui/components/app/component.html generated by Svelte v1.40.2 */
function add_css() {
	var style = createElement("style");
	style.id = 'svelte-3826730395-style';
	style.textContent = "@font-face {}";
	appendNode(style, document.head);
}

function create_main_fragment(state, component) {

	var login = new Component$1({
		_root: component._root
	});

	return {
		c: function create() {
			login._fragment.c();
		},

		m: function mount(target, anchor) {
			login._mount(target, anchor);
		},

		p: noop,

		u: function unmount() {
			login._unmount();
		},

		d: function destroy$$1() {
			login.destroy(false);
		}
	};
}

function Component(options) {
	init(this, options);
	this._state = options.data || {};

	if (!document.getElementById("svelte-3826730395-style")) add_css();

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(Component.prototype, proto);

window.App = Component;

}());
