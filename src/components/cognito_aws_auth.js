// When using loose Javascript files:
// var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// Modules, e.g. Webpack:
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;


function auth(username, password) {
    console.log("auth function called")
    console.log('username',username)
    console.log('password',password)
    var authobj = {
        Username:username,
        Password:password
    }
    var cognitoUser;
    var poolData = {
    UserPoolId: 'ap-northeast-1_KmVF4L0g2', // Your user pool id here
    ClientId: '7miaa8camia3gkblm3ied3v58o', // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    console.log("userpool",userPool)

    var authenticatedetails  = new AmazonCognitoIdentity.AuthenticationDetails(
        authobj
    )
    var userdata = {
        Username:username,
        Pool:userPool
    }
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userdata);
    cognitoUser.authenticateUser(authenticatedetails,{
        onSuccess:async function(result){
            console.log("sucess")
        }
    })

}
export default auth