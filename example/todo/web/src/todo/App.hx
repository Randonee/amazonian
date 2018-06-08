package todo;

import Webpack.*;
import react.*;
import react.ReactMacro.jsx;
import todo.view.*;
import react.ReactComponent;


typedef AppState = {
    ?component: React.CreateElementType
}

class App extends react.ReactComponentOfState<AppState> {
    static var STYLES = require('./App.css');

	static public function main() {
		var app = js.Browser.document.createDivElement();
        js.Browser.document.body.appendChild(app);
		ReactDOM.render(React.createElement(App), app);
	}

	public function new() {
		super();
        this.state = {};
	}

    public function handleViewFinished(viewName:String){
       showView(viewName);
    }

    function showView(?viewName:String){
         switch(viewName){
            case "Login":
                Webpack.load(TodoView).then(function(_) {
					setState(cast { component:TodoView });
				});
            default:
                Webpack.load(LoginView).then(function(_) {
					setState(cast { component:LoginView });
				});
        }
    }

	override function componentDidMount() {
		showView();
    }

	override function render() {
        return jsx('
            <div className="todoapp">
                <header>
                <h1>Todo App</h1>
                </header>
                ${renderContent()}
            </div>
        ');
    }

	function renderContent() {
        if (state.component == null)
            return jsx('
                <span>Loading...</span>
            ');
        else
            return jsx('
                <state.component handleViewFinished={handleViewFinished}/>
        ');
    }
}

