webpackJsonp([0],{

/***/ "./node_modules/css-loader/index.js!./src/todo/view/LoginView.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".loginView{\n}\n\n.form{\n    text-align: left;\n    display: inline-block;\n}\n\n.form span{\n    display: inline-block;\n    width:300px;\n    padding-bottom:15px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/haxe-loader/index.js?build/todo_view_LoginView!./":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable */ 
var $hx_exports = module.exports, $global = global;
var $s = $global.$hx_scope;
var todo_TodoAppSyncClient = $s.a, React_Component = $s.b, $extend = $s.c, Std = $s.d, React = $s.e, $bind = $s.f;
var todo_view_FormState = { __ename__ : true, __constructs__ : ["LoginForm","NewUserForm","ConfirmUserForm"] };
todo_view_FormState.LoginForm = ["LoginForm",0];
todo_view_FormState.LoginForm.__enum__ = todo_view_FormState;
todo_view_FormState.NewUserForm = ["NewUserForm",1];
todo_view_FormState.NewUserForm.__enum__ = todo_view_FormState;
todo_view_FormState.ConfirmUserForm = ["ConfirmUserForm",2];
todo_view_FormState.ConfirmUserForm.__enum__ = todo_view_FormState;
var todo_view_LoginView = function(props) {
	this.client = todo_TodoAppSyncClient.getInstance();
	React_Component.call(this,props);
	this.state = { showingForm : todo_view_FormState.LoginForm};
};
todo_view_LoginView.__name__ = true;
todo_view_LoginView.__super__ = React_Component;
todo_view_LoginView.prototype = $extend(React_Component.prototype,{
	createUser: function(event) {
		this.client.createUser(this.state.newUserEmail,this.state.newUserPassword).then(function(result) {
			console.log(result);
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,handleLogin: function(event) {
		var _gthis = this;
		this.client.login(this.state.loginEmail,this.state.loginPassword).then(function(result) {
			console.log("access token: " + Std.string(result));
			_gthis.props.handleViewFinished("Login");
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,confirmUser: function() {
		this.client.confirmUser(this.state.confirmEmail,this.state.code).then(function(result) {
			console.log(result);
			return result;
		})["catch"](function(error) {
			console.log(error);
			return error;
		});
	}
	,showLogin: function() {
		this.setState({ showingForm : todo_view_FormState.LoginForm});
	}
	,showNewUser: function() {
		this.setState({ showingForm : todo_view_FormState.NewUserForm});
	}
	,showConfirm: function() {
		this.setState({ showingForm : todo_view_FormState.ConfirmUserForm});
	}
	,componentDidMount: function() {
		this.handleChange(null);
	}
	,render: function() {
		var showingForm;
		var _g = this.state.showingForm;
		switch(_g[1]) {
		case 0:
			var showingForm1 = { "$$typeof" : $$tre, type : "h3", props : { children : "Login"}, key : null, ref : null};
			var showingForm2 = { "$$typeof" : $$tre, type : "div", props : { children : ["email: ",React.createElement("input",{ ref : "loginEmail", onChange : $bind(this,this.handleChange), defaultValue : "me@aaronspjut.com", type : "text"})]}, key : null, ref : null};
			var showingForm3 = { "$$typeof" : $$tre, type : "div", props : { children : ["password: ",React.createElement("input",{ ref : "loginPassword", onChange : $bind(this,this.handleChange), defaultValue : "passwordA1", type : "text"})]}, key : null, ref : null};
			showingForm = React.createElement("div",{ ref : "loginForm", className : "form"},showingForm1,showingForm2,showingForm3,{ "$$typeof" : $$tre, type : "button", props : { type : "button", onClick : $bind(this,this.handleLogin), children : "Login"}, key : null, ref : null});
			break;
		case 1:
			var showingForm4 = { "$$typeof" : $$tre, type : "h3", props : { children : "Create New Account"}, key : null, ref : null};
			var showingForm5 = { "$$typeof" : $$tre, type : "div", props : { children : ["email: ",React.createElement("input",{ ref : "newUserEmail", onChange : $bind(this,this.handleChange), type : "text"})]}, key : null, ref : null};
			var showingForm6 = { "$$typeof" : $$tre, type : "div", props : { children : ["password: ",React.createElement("input",{ ref : "newUserPassword", onChange : $bind(this,this.handleChange), type : "text"})]}, key : null, ref : null};
			showingForm = React.createElement("div",{ ref : "newUserForm", className : "form"},showingForm4,showingForm5,showingForm6,{ "$$typeof" : $$tre, type : "button", props : { type : "button", onClick : $bind(this,this.createUser), children : "Create"}, key : null, ref : null});
			break;
		case 2:
			var showingForm7 = { "$$typeof" : $$tre, type : "h3", props : { children : "Confirm Your New Account"}, key : null, ref : null};
			var showingForm8 = { "$$typeof" : $$tre, type : "span", props : { children : "if you created a new account you should recieve an email with a code to be entered here:"}, key : null, ref : null};
			var showingForm9 = { "$$typeof" : $$tre, type : "div", props : { children : ["email: ",React.createElement("input",{ ref : "confirmEmail", onChange : $bind(this,this.handleChange), type : "text"})]}, key : null, ref : null};
			var showingForm10 = { "$$typeof" : $$tre, type : "div", props : { children : ["code: ",React.createElement("input",{ ref : "codeInput", onChange : $bind(this,this.handleChange), type : "text"})]}, key : null, ref : null};
			var showingForm11 = $$tre;
			showingForm = React.createElement("div",{ ref : "confirmForm", className : "form"},showingForm7,showingForm8,showingForm9,showingForm10,{ $$typeof : showingForm11, type : "div", props : { children : { "$$typeof" : $$tre, type : "button", props : { type : "button", onClick : $bind(this,this.confirmUser), children : "Confirm"}, key : null, ref : null}}, key : null, ref : null});
			break;
		}
		return { "$$typeof" : $$tre, type : "div", props : { className : "loginView", children : [{ "$$typeof" : $$tre, type : "div", props : { className : "toolbar", children : [React.createElement("button",{ ref : "showLoginButton", type : "button", onClick : $bind(this,this.showLogin)},"Login")," | ",React.createElement("button",{ ref : "showNewUserButton", type : "button", onClick : $bind(this,this.showNewUser)},"New Account")," | ",React.createElement("button",{ ref : "showConfirmUserButton", type : "button", onClick : $bind(this,this.showConfirm)},"Confirm User")]}, key : null, ref : null},showingForm]}, key : null, ref : null};
	}
	,handleChange: function(event) {
		this.setState({ loginEmail : this.refs.loginEmail != null ? this.refs.loginEmail.value : "", loginPassword : this.refs.loginPassword != null ? this.refs.loginPassword.value : "", newUserEmail : this.refs.newUserEmail != null ? this.refs.newUserEmail.value : "", newUserPassword : this.refs.newUserPassword != null ? this.refs.newUserPassword.value : "", confirmEmail : this.refs.confirmEmail != null ? this.refs.confirmEmail.value : "", code : this.refs.codeInput != null ? this.refs.codeInput.value : ""});
	}
	,__class__: todo_view_LoginView
});
var $_, $fid = 0;
var __map_reserved = {};
var $$tre = (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;
todo_view_LoginView.STYLES = __webpack_require__("./src/todo/view/LoginView.css");
todo_view_LoginView.displayName = "LoginView";
$s.todo_view_LoginView = todo_view_LoginView; 

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/todo/view/LoginView.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./src/todo/view/LoginView.css");
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
		module.hot.accept("./node_modules/css-loader/index.js!./src/todo/view/LoginView.css", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js!./src/todo/view/LoginView.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});