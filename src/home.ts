import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';

var myApp;

@inject(Router)
export class Home {
router;
username;
password;

constructor(router){
    this.router = router;
    myApp = this;
  }

attached()
{
    var url = window.location.protocol + '//' + window.location.hostname;
    Parse.initialize("myAppId");    
    Parse.serverURL = url + ":" + location.port + '/parse';
}

login()
{
    console.log("Logging in!")
    

    Parse.User.logIn(this.username,this.password, {
    success: user => {
     this.router.navigate("activity1");
    },
    error: function(user, error) {
      console.log("Failure: "+ error.message);
    }
    });

}

signup()
{
    var user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);

    user.signUp(null, {
    success: function(user) {
        alert("Success");
    },
    error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
    });
}

}