package todo.view;


import react.React;
import todo.TodoAppSyncClient;
import Webpack.*;
import react.ReactComponent;
import react.ReactMacro.jsx;
import js.html.*;


typedef Todo = {id:String, text:String, completed:Bool};

typedef TodoProps = {
    ?handleViewFinished:String->Void
}

typedef TodoState = {
    todos:Array<Todo>
}

typedef TodoRefs = {
    todoInput:InputElement
}


class TodoView extends ReactComponentOf<TodoProps, TodoState, TodoRefs>{

    static var STYLES = require('./TodoView.css');

    var client = TodoAppSyncClient.getInstance();
    var loading = true;

    public function new(props:TodoProps) {
        super(props);
        getTodos();
        state = {todos:[]};
    }

    override function render() {
        if(loading)
            return jsx('<h2>Loading...</h2>');
        

        var todos = state.todos.map(function(v){

            var text = v.text;
            var checkboxId = "checkboxId---" + v.id;

            var completed = v.completed ;

            var liBody = jsx('<div className="view">
                    <input id=$checkboxId className="toggle" type="checkbox" defaultChecked="$completed" onChange={updateTodo}  />
                    <label>$text</label>
                    <button className="destroy" onClick={function(){deleteTodo(v.id);}}></button>
                </div>
            ');

            return React.createElement('li', {key:v.id, className:'foo'}, liBody);
        });

        return jsx('
            <div className="todoView">
                <input ref="todoInput" className="new-todo" placeholder="What needs to be done?" onKeyPress={handleTodoInpuKeyPress}  />
                <ul className="todo-list">
                    {todos}
                </ul>
            </div>
        ');
    }

    function handleTodoInpuKeyPress(e){
        if (e.key == 'Enter')
            addTodo();
    }

    function getTodos(){ 
        var query =
        '{
            todos{
                id
                text
                completed
                timeAdded
            }
        }
        ';


        client.query(query)
        .then(function(result:Dynamic):Dynamic{
            loading = false;
            trace(result);
            var todos:Array<Todo> = result.data.todos;
            todos = todos.copy();
            todos.sort(function(a,b) return Reflect.compare(b, a) );
            setState({todos:todos});
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function addTodo(){ 
        var text = refs.todoInput.value;
        if(text == "" || text == null)
            return;

        var query =
        'mutation AddTodo {
            addTodo(text: "$text", completed:false) {
                id
                text
                completed
                timeAdded
            }
        }';

        client.mutate(query)
        .then(function(result:Dynamic):Dynamic{
            trace(result);
            var todos:Array<Todo> = [result.data.addTodo];
            todos = todos.concat(state.todos);
            setState({todos:todos});
            refs.todoInput.value = "";
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function updateTodo(e){ 

        var node:InputElement = cast e.target;
        var id = node.id.split('---')[1];

        var todo = Lambda.find(state.todos, function(t){return t.id == id;});

        var text = todo.text;
        var completed = node.checked;

        if(text == "" || text == null)
            return;

        var query =
        'mutation UpdateTodo {
            updateTodo(id:"$id" text: "$text", completed:$completed) {
                id
                text
                completed
                timeAdded
            }
        }';

        client.mutate(query)
        .then(function(result:Dynamic):Dynamic{
            trace(result);
            var todo:Todo = result.data.updateTodo;
            var todos:Array<Todo> = state.todos.map(function(t){
                if(t.id == todo.id){
                    return todo;
                }
                return t;
            });
            setState({todos:todos});
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

    function deleteTodo(id){ 
        trace(id);
        var query =
        'mutation DeleteTodo {
            deleteTodo(id: "$id") {
                id
            }
        }';

        client.mutate(query)
        .then(function(result:Dynamic):Dynamic{
            trace(result);
            var todos = state.todos.filter(function(v) { return (v.id != id); } );
            setState({todos:todos});
            return result;
        }).catchError(function(error:Dynamic):Dynamic{
            trace(error);
            return error;
        });
    }

}