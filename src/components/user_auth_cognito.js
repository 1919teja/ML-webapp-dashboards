var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
function auther(username,Password){
    var authenticationData = {
        Username: username,
        Password: Password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var poolData = {
        UserPoolId: 'ap-northeast-1_KmVF4L0g2', // Your user pool id here
        ClientId: '7miaa8camia3gkblm3ied3v58o', // Your client id here
        };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: username,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    console.log("cognitouser",cognitoUser)
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log("success")
    
            // //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            // AWS.config.region = '<region>';
    
            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            // 	IdentityPoolId: '...', // your identity pool id here
            // 	Logins: {
            // 		// Change the key below according to the specific region your user pool is in.
            // 		'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
            // 			.getIdToken()
            // 			.getJwtToken(),
            // 	},
            // });
    
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            // AWS.config.credentials.refresh(error => {
            //     if (error) {
            //         console.error(error);
            //     } else {
            //         // Instantiate aws sdk service objects now that the credentials have been updated.
            //         // example: var s3 = new AWS.S3();
            //         console.log('Successfully logged!');
            //     }
            // });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            const newPassword = prompt("New Password Required");
            delete userAttributes.email_verified;
            delete userAttributes.email;
            //this delete userAttributes.email is not used in older version of api's,present api's include this delete userAttributes.email to set permanent password.
            cognitoUser.completeNewPasswordChallenge(
                newPassword,
                userAttributes,
                this
            );
        },
    
        onFailure: function(err) {
            console.log("failed")
            alert(err.message || JSON.stringify(err));
            
        },
    });

}
 export default auther
