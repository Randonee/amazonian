webpackJsonp([1],{

/***/ "./node_modules/css-loader/index.js!./src/todo/view/TodoView.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".todoView{\n    text-align: left;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);\n    background-color: white;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/haxe-loader/index.js?build/todo_view_TodoView!./":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable */ 
var $hx_exports = module.exports, $global = global;
var $s = $global.$hx_scope;
var todo_TodoAppSyncClient = $s.a, React_Component = $s.b, $extend = $s.c, $bind = $s.f, React = $s.e, $iterator = $s.g;
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.find = function(it,f) {
	var v = $iterator(it)();
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
var todo_view_TodoView = function(props) {
	this.loading = true;
	this.client = todo_TodoAppSyncClient.getInstance();
	React_Component.call(this,props);
	this.getTodos();
	this.state = { todos : []};
};
todo_view_TodoView.__name__ = true;
todo_view_TodoView.__super__ = React_Component;
todo_view_TodoView.prototype = $extend(React_Component.prototype,{
	render: function() {
		var _gthis = this;
		if(this.loading) {
			return { "$$typeof" : $$tre, type : "h2", props : { children : "Loading..."}, key : null, ref : null};
		}
		var todos = this.state.todos.map(function(v) {
			var text = v.text;
			var checkboxId = "checkboxId---" + v.id;
			var completed = v.completed;
			var liBody = { "$$typeof" : $$tre, type : "div", props : { className : "view", children : [{ "$$typeof" : $$tre, type : "input", props : { id : checkboxId, onChange : $bind(_gthis,_gthis.updateTodo), type : "checkbox", defaultChecked : completed, className : "toggle"}, key : null, ref : null},{ "$$typeof" : $$tre, type : "label", props : { children : text}, key : null, ref : null},{ "$$typeof" : $$tre, type : "button", props : { onClick : function() {
				_gthis.deleteTodo(v.id);
			}, className : "destroy"}, key : null, ref : null}]}, key : null, ref : null};
			return React.createElement("li",{ key : v.id, className : "foo"},liBody);
		});
		return { "$$typeof" : $$tre, type : "div", props : { className : "todoView", children : [React.createElement("input",{ ref : "todoInput", placeholder : "What needs to be done?", className : "new-todo", onKeyPress : $bind(this,this.handleTodoInpuKeyPress)}),{ "$$typeof" : $$tre, type : "ul", props : { className : "todo-list", children : todos}, key : null, ref : null}]}, key : null, ref : null};
	}
	,handleTodoInpuKeyPress: function(e) {
		if(e.key == "Enter") {
			this.addTodo();
		}
	}
	,getTodos: function() {
		var _gthis = this;
		var query = "{\n            todos{\n                id\n                text\n                completed\n                timeAdded\n            }\n        }\n        ";
		this.client.query(query).then(function(result) {
			_gthis.loading = false;
			console.log(result);
			var todos = result.data.todos;
			todos = todos.slice();
			todos.sort(function(a,b) {
				return Reflect.compare(b,a);
			});
			_gthis.setState({ todos : todos});
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,addTodo: function() {
		var _gthis = this;
		var text = this.refs.todoInput.value;
		if(text == "" || text == null) {
			return;
		}
		var query = "mutation AddTodo {\n            addTodo(text: \"" + text + "\", completed:false) {\n                id\n                text\n                completed\n                timeAdded\n            }\n        }";
		this.client.mutate(query).then(function(result) {
			console.log(result);
			var todos = [result.data.addTodo];
			todos = todos.concat(_gthis.state.todos);
			_gthis.setState({ todos : todos});
			_gthis.refs.todoInput.value = "";
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,updateTodo: function(e) {
		var _gthis = this;
		var node = e.target;
		var id = node.id.split("---")[1];
		var todo1 = Lambda.find(this.state.todos,function(t) {
			return t.id == id;
		});
		var text = todo1.text;
		var completed = node.checked;
		if(text == "" || text == null) {
			return;
		}
		var query = "mutation UpdateTodo {\n            updateTodo(id:\"" + id + "\" text: \"" + text + "\", completed:" + (completed == null ? "null" : "" + completed) + ") {\n                id\n                text\n                completed\n                timeAdded\n            }\n        }";
		this.client.mutate(query).then(function(result) {
			console.log(result);
			var todo2 = result.data.updateTodo;
			var todos = _gthis.state.todos.map(function(t1) {
				if(t1.id == todo2.id) {
					return todo2;
				}
				return t1;
			});
			_gthis.setState({ todos : todos});
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,deleteTodo: function(id) {
		var _gthis = this;
		console.log(id);
		var query = "mutation DeleteTodo {\n            deleteTodo(id: \"" + id + "\") {\n                id\n            }\n        }";
		this.client.mutate(query).then(function(result) {
			console.log(result);
			var todos = _gthis.state.todos.filter(function(v) {
				return v.id != id;
			});
			_gthis.setState({ todos : todos});
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,__class__: todo_view_TodoView
});
var $_, $fid = 0;
var __map_reserved = {};
var $$tre = (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;
todo_view_TodoView.STYLES = __webpack_require__("./src/todo/view/TodoView.css");
todo_view_TodoView.displayName = "TodoView";
$s.todo_view_TodoView = todo_view_TodoView; 

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/todo/view/TodoView.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./src/todo/view/TodoView.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js!./src/todo/view/TodoView.css", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js!./src/todo/view/TodoView.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});