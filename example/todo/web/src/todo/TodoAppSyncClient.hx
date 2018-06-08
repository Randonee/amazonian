package todo;

import aws.appsync.AWSAppSyncClient;
import aws.cognito.CognitoUser;
import aws.cognito.*;
import apollo.gql.Tag.gql;

class TodoAppSyncClient{

    static var instance:TodoAppSyncClient;

    static public function getInstance(){
        if(instance == null)
            instance = new TodoAppSyncClient();

        return instance;
    }

    static inline var USER_POOL_ID = ConfigUtil.getConfigProp('userPoolId');
    static inline var CLIENT_ID =  ConfigUtil.getConfigProp('clientId');
    static inline var APP_SYNC_API_URL = ConfigUtil.getConfigProp('appSyncApiUrl');

    var userPool:CognitoUserPool;
    var cognitoUser:CognitoUser;
    var client:AWSAppSyncClient;

    private function new(){

        var poolData = {
            UserPoolId : USER_POOL_ID,
            ClientId : CLIENT_ID,
        };
        userPool = new CognitoUserPool(poolData);
    }


    public function login(username:String, password:String):js.Promise<Dynamic> {
        var details = new AuthenticationDetails({Username:username, Password:password});
        
        var userData:CognitoUserData = {
            Username : username,
            Pool : userPool
        };

        cognitoUser = new CognitoUser(userData);
        
        var promise = new js.Promise<Dynamic>(function(resolve, reject) {
            cognitoUser.authenticateUser(details, {
                onSuccess: function (result) {
                    client = new AWSAppSyncClient({
                        url : APP_SYNC_API_URL,
                        region: 'us-west-2',
                        auth:{
                            type: 'AMAZON_COGNITO_USER_POOLS',
                            apiKey: "null",
                            jwtToken: result.idToken.jwtToken
                        },
                        disableOffline: true
                    });

                    resolve(result.idToken.jwtToken);
                },

                onFailure: function(err) {
                    reject(err);
                },

            });
        });
        return promise;
    }

    public function createUser(username:String, password:String):js.Promise<Dynamic> {

        var promise = new js.Promise<Dynamic>(function(resolve, reject) {
            userPool.signUp(username, password, [], null, function(err, result){
                if (err) {
                    reject(err);
                    return;
                }
                var cognitoUser = result.user;
                resolve(cognitoUser);
            });
        });
        return promise;
    }


    public function confirmUser(username:String, code:String):js.Promise<Dynamic>{
        var userData:CognitoUserData = {
            Username : username,
            Pool : userPool
        };

        var cognitoUser = new CognitoUser(userData);
        
        var promise = new js.Promise<Dynamic>(function(resolve, reject) {
            cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
        return promise;
    }

    public function query(graphql:String):js.Promise<Dynamic>{
        return client.query({query:gql(graphql)});
    }

    public function mutate(graphql:String):js.Promise<Dynamic>{
        return client.mutate({mutation:gql(graphql)});
    }

}