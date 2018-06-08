package todo;

import haxe.macro.Expr;
import haxe.macro.Context;

class ConfigUtil{
    public static macro function getConfigProp( name : Expr ) {
        var nameStr = null;
        switch( name.expr ) {
        case EConst(c):
            switch( c ) {
            case CString(s): nameStr = s;
            default:
            }
        default:
        };
        if( nameStr == null )
            Context.error("Constant string expected", name.pos);

        var config = haxe.Json.parse(sys.io.File.getContent("aws-config.json"));
        var data = Reflect.field(config, nameStr);

        return Context.makeExpr(data, name.pos);
    }
}

