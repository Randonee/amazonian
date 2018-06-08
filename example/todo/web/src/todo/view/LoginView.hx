package todo.view;

import todo.TodoAppSyncClient;
import Webpack.*;
import react.ReactComponent;
import react.ReactMacro.jsx;
import js.html.*;


typedef LoginProps = {
    ?handleViewFinished:String->Void
}

typedef LoginState = {
    ?loginEmail:String,
    ?loginPassword:String,
    ?newUserEmail:String,
    ?newUserPassword:String,
    ?confirmEmail:String,
    ?code:String,
    ?showingForm:FormState
}

typedef LoginRefs = {
    loginEmail:InputElement,
    loginPassword:InputElement,
    newUserEmail:InputElement,
    newUserPassword:InputElement,
    confirmEmail:InputElement,
    codeInput:InputElement,
    showLoginButton:ButtonElement,
    showNewUserButton:ButtonElement,
    showConfirmUserButton:ButtonElement,
    loginForm:DivElement,
    newUserForm:DivElement,
    confirmUserForm:DivElement
}

enum FormState{
    LoginForm;
    NewUserForm;
    ConfirmUserForm;
}

class LoginView extends ReactComponentOf<LoginProps, LoginState, LoginRefs>{

    static var STYLES = require('./LoginView.css');

    var client = TodoAppSyncClient.getInstance();

    public function new(props:LoginProps) {
        super(props);
        this.state = {showingForm:LoginForm};
    }

    function createUser(event:Dynamic) {
        client.createUser(state.newUserEmail, state.newUserPassword).then(function(result:Dynamic):Dynamic{
            trace(result);
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function handleLogin(event:Dynamic) {
        client.login(state.loginEmail, state.loginPassword)
        .then(function(result:Dynamic):Dynamic{
            trace('access token: ' + result);
            props.handleViewFinished("Login");
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function confirmUser(){
        client.confirmUser(state.confirmEmail, state.code).then(function(result:Dynamic):Dynamic{
            trace(result);
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function showLogin(){
        this.setState({showingForm:LoginForm});
    }

    function showNewUser(){
        this.setState({showingForm:NewUserForm});
    }

    function showConfirm(){
        this.setState({showingForm:ConfirmUserForm});
    }

    override function componentDidMount() {
		handleChange(null);
    }

    override function render() {
        var showingForm = switch(this.state.showingForm){
            case LoginForm:
                jsx('
                    <div className="form" ref="loginForm">
                        <h3>Login</h3>
                        <div>
                            email: <input type="text" ref="loginEmail" onChange={handleChange} defaultValue=""/>
                        </div>
                        <div>
                            password: <input type="text" ref="loginPassword" onChange={handleChange} defaultValue=""/>
                        </div>
                        <button type="button" onClick={handleLogin}>Login</button>
                    </div>
                ');
            case NewUserForm:
                jsx('
                    <div className="form" ref="newUserForm">
                        <h3>Create New Account</h3>
                        <div>
                            email: <input type="text" ref="newUserEmail" onChange={handleChange} />
                        </div>
                        <div>
                            password: <input type="text" ref="newUserPassword" onChange={handleChange} />
                        </div>
                        <button type="button" onClick={createUser}>Create</button>
                    </div>
                ');
            case ConfirmUserForm:
                jsx('
                    <div className="form" ref="confirmForm">
                        <h3>Confirm Your New Account</h3>
                        <span>if you created a new account you should recieve an email with a code to be entered here:</span>
                        <div>
                            email: <input type="text" ref="confirmEmail" onChange={handleChange} />
                        </div>
                        <div>
                            code: <input type="text" ref="codeInput" onChange={handleChange} />
                        </div>
                        <div>
                            <button type="button" onClick={confirmUser}>Confirm</button>
                        </div>
                    </div>
                ');
        }


        return jsx('
            <div className="loginView">
                <div className="toolbar">
                    <button type="button" ref="showLoginButton" onClick={showLogin}>Login</button> | 
                    <button type="button" ref="showNewUserButton" onClick={showNewUser}>New Account</button> | 
                    <button type="button" ref="showConfirmUserButton" onClick={showConfirm}>Confirm User</button>
                </div>
                {showingForm}
            </div>
        ');
    }

    function handleChange(event:Dynamic){
        this.setState({
                        loginEmail: refs.loginEmail != null ? refs.loginEmail.value : "",
                        loginPassword: refs.loginPassword != null ? refs.loginPassword.value : "",
                        newUserEmail: refs.newUserEmail != null ? refs.newUserEmail.value : "",
                        newUserPassword: refs.newUserPassword != null ? refs.newUserPassword.value : "",
                        confirmEmail: refs.confirmEmail != null ? refs.confirmEmail.value : "",
                        code: refs.codeInput != null ? refs.codeInput.value : ""
                    });
    }

    
}
