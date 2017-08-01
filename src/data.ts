import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';

var myApp
var responseText
var myApp

var PersonProperties = {};

var MAX_PERSONS = 1;
var MAX_VIRUSES = 0;

function preload() {
    myApp.game.load.image('Man1', 'assets/Man1.png');
    myApp.game.load.image('Man2', 'assets/Man2.png');
    myApp.game.load.image('Woman1', 'assets/Woman1.png');
    myApp.game.load.image('Woman2', 'assets/Woman2.png');

    myApp.game.load.image('Man1Sick', 'assets/Man1_sick.png');
    myApp.game.load.image('Man2Sick', 'assets/Man2_sick.png');
    myApp.game.load.image('Woman1Sick', 'assets/Woman1_sick.png');
    myApp.game.load.image('Woman2Sick', 'assets/Woman2_sick.png');

    myApp.game.load.image('Virus1', 'assets/Virus1.png');
    myApp.game.load.image('Virus2', 'assets/Virus2.png');
    myApp.game.load.image('Virus3', 'assets/Virus3.png');

    myApp.game.load.image('Hospital1', 'assets/Hospital1.png');
    myApp.game.load.image('Hospital2', 'assets/Hospital2.png');
    myApp.game.load.image('Hospital3', 'assets/Hospital3.png');
}


function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    myApp.game.stage.backgroundColor = "#dbd6d7";
    myApp.game.physics.startSystem(Phaser.Physics.ARCADE);

    myApp.Persons = myApp.game.add.group();
    myApp.Persons.enableBody = true;
    myApp.Persons.physicsBodyType = Phaser.Physics.ARCADE;

    myApp.Viruses = myApp.game.add.group();
    myApp.Viruses.enableBody = true;
    myApp.Viruses.physicsBodyType = Phaser.Physics.ARCADE;

    myApp.Hospitals = myApp.game.add.group();
    myApp.Hospitals.enableBody = true;
    myApp.Hospitals.physicsBodyType = Phaser.Physics.ARCADE;
}

function update(){
    
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, null, null, this);
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, null, null, this);
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Hospitals, null, null, this);
    myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);

}

function CreateMultipleEntities(num,type)
{
    if(num <= 0)
        return;

    var x=0;

    if(type == "People")
    {
        if(num > MAX_PERSONS)
            num = MAX_PERSONS;
        for(x=0;x<num;x++)
        {
            CreatePerson();
        }
    }
    else if (type == "Viruses")
    {
        if(num > MAX_VIRUSES)
            num = MAX_VIRUSES;
        for(x=0;x<num;x++)
        {
            CreateVirus();
        }
    }
    else if(type == "Hospital")
    {
        for(x=0;x<num;x++)
        {
            console.log("HOSPITAL")
        }

    }
}
function CreateVirus()
{
    //GetCharacteristics();
    var spriteName = "Virus1"

    var c = {};
    if(myApp.Viruses.length == 0)
    {
        c = myApp.Viruses.create(400, 300, spriteName);
    }
    else
    {
        c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    }

    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.body.setSize(5,60,23,15)

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
}

function CreateHospital()
{
     //GetCharacteristics();
    var spriteName = "Hospital1"

    var c = myApp.Hospitals.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    c.body.immovable = true;
}

function CreatePerson()
{
    GetCharacteristics("personentity");

    var spriteName = PersonProperties.type;

    if(PersonProperties.status == "Sick")
    {
        spriteName += "Sick";
    }

    var c = {}
    if(myApp.Persons.length == 0)
    {
        c = myApp.Persons.create(100, 300, spriteName);
    }
    else
    {
        c = myApp.Persons.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    }
    
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.type = PersonProperties.type;
    c.age = PersonProperties.age;
    c.status = PersonProperties.status;
   
    var style = { font: "16px Courier", fill: "#000000" };
    var text1 = myApp.game.add.text(16, -30, "Age: "+c.age, style);
    var text2 = myApp.game.add.text(16, 0, "Type: "+c.type, style);
    var text3 = myApp.game.add.text(16, 30, "Status: "+c.status, style);

    c.addChild(text1);
    c.addChild(text2);
    c.addChild(text3);

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors("personentity");
}


function SetCharacteristics(type,age,status)
{
    PersonProperties.type = "";
    PersonProperties.age = "";
    PersonProperties.status = "";

    if(type.length > 0)
        PersonProperties.type = type;
    if(age.length > 0)
        PersonProperties.age = age;
    if(status.length > 0)
        PersonProperties.status = status;
}

function GetCharacteristics(entityType)
{
    //Get Entity Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')== entityType)
        {
          try
          {
            var in1 = xml.firstElementChild.firstElementChild;      
            var headless = new Blockly.Workspace();
            Blockly.Xml.domToBlock(in1, headless);
            var code = Blockly.JavaScript.workspaceToCode(headless);
            var interpreter = new Interpreter(code,myApp.initApi);
            interpreter.run()
            headless.dispose();
          }
          catch(error)
          {
              console.log("Error in GetCharacteristics for: "+entityType)
              console.log(code);
          }
        }
    }
}

function CheckBehaviors(entityType)
{
    //Get Move Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')== entityType)
        {
          //Get Behavior Blocks
          var childBlocks = xml.getElementsByTagName("block");
          var moveBlock = null;
          for(var j=0; j<childBlocks.length; j++)
          {
            if(childBlocks[j].getAttribute('type') == "move")
            {
                moveBlock = childBlocks[j];
            }
          }
          
          if(moveBlock != null)
          {
            try
            {
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(moveBlock, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code,myApp.initApi);
                interpreter.run()
                headless.dispose();
            }
            catch(error)
            {
                console.log("Error running CheckBehaviors for: " + entityType);
            }
          }
        }
    }
    //Execute Move Block
}

function GetCollisionBlockFromEntity(person,target)
{
    //Get Move Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='personentity')
        {
          //Get Behavior Blocks
          var childBlocks = xml.getElementsByTagName("block");
          var collisionBlock = null;
          for(var j=0; j<childBlocks.length; j++)
          {
            if(childBlocks[j].getAttribute('type') == "collision")
            {
                if(childBlocks[j].firstChild.innerText==target)
                {
                    collisionBlock = childBlocks[j];
                }
            }
          }
          
          if(collisionBlock != null)
          {
            try
            {
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(collisionBlock, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code,myApp.initApi);
                interpreter.run()
                headless.dispose();
            }
            catch(error)
            {
                console.log("Error in GetCollisionBlockFromEntity")
            }
            
          }
        }
    }
}

function MoveEntity(direction)
{

    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    if(direction == "Left")
    {
        myApp.currentGameObject.body.velocity.x = -100;
    }
    else if(direction == "Right")
    {
        myApp.currentGameObject.body.velocity.x = 100;
    }
    else if(direction == "Random")
    {
        myApp.currentGameObject.body.velocity.x = Math.random() * 100 - 50;
        myApp.currentGameObject.body.velocity.y = Math.random() * 100 - 50;
    }
}


function ResetPhaser()
{
  myApp.game.world.removeAll(true,false,false)
  create();
}

@inject(Router)
export class data {
  workspace = {};
  interpreter = {};
  toolbox;
  game = {};
  healthyPersons = {};
  infectedPersons = {};
  healers = {};
  ChartData;
  TimeStamp = 0;
  SampleRate;
  currentGameObject;
  Entities;
  

  constructor(router) {
    myApp = this;
    var url = window.location.protocol + '//' + window.location.hostname;
    Parse.initialize("myAppId");    
    Parse.serverURL = url + ":" + location.port + '/parse';
    this.router = router;
    this.activityName = "Part1";
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
  }
  
  
  detached()
  {
      myApp.PushObject();
      myApp.game.destroy()
      //Add Saving Code
      this.workspace.dispose();
  }

 
    
/////////////////Save/Load Functions
  SaveWorkspace()
  {
    var xml = Blockly.Xml.workspaceToDom(this.workspace);
    var xml_text = Blockly.Xml.domToPrettyText(xml);
    this.export(xml_text);
  }

  export(text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', 'workspace.xml');
    pom.style.display = 'none';
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
  }

  LoadWorkspace()
  {
      var url = "resources/workspace.xml";
      var client = new this.HttpClient();
      client.get(url, this.LoadWorkspaceCallback);
  }

  LoadWorkspaceCallback(ResponseText)
  {
      var xml_text  = ResponseText;
      var xml = Blockly.Xml.textToDom(xml_text);
      myApp.workspace.clear();
      Blockly.Xml.domToWorkspace(xml, myApp.workspace);
  }
  
//you might need to change this one: var url = "resources/InitialWorkspaces/Activity1.xml";
  LoadInitialWorkspace()
  {
      myApp.workspace.clear();
      //this.LoadLastSave();
      rUserName="AB7"
      this.LoadGameScore(rUserName);
      if(myApp.workspace.getAllBlocks().length == 0)
      {
        var url = "resources/InitialWorkspaces/Activity1.xml";
        var client = new this.HttpClient();
        client.get(url, this.LoadWorkspaceCallback);
      }
      myApp.workspace.addChangeListener(myApp.onBlocklyChange);
  }

  LoadToolBoxCallback(ResponseText)
  {
      var xml_text  = ResponseText;
      var xml = Blockly.Xml.textToDom(xml_text);
      myApp.toolbox = xml;
      myApp.workspace = Blockly.inject('blocklyDiv', 
                                  {media: '../Blockly/media/',
                                   toolbox: myApp.toolbox});
      myApp.LoadInitialWorkspace();
  }
  LoadToolbox()
  {
      var url = "resources/EpidemicToolbox.xml";
      var client = new this.HttpClient();
      client.get(url, this.LoadToolBoxCallback);
  }
   HttpClient()
  {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }

            anHttpRequest.open( "GET", aUrl, true );            
            anHttpRequest.send( null );
        }
    }


/////////////////Phaser Helper functions
  ResetPhaser()
  {
    myApp.game.world.removeAll(true,false,false)
    create();
  }
//Read through the blcoks,interpret them to code and run the simulation
  runSimulation()
  {
    myApp.LogEvent("RunSimulation")
    myApp.ResetPhaser();
    //Get WhenRun Head
    //Run code
    var test = Blockly.JavaScript.workspaceToCode(this.workspace)
    //console.log(test);

    var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='simulation')
        {
          var headless = new Blockly.Workspace();
          Blockly.Xml.domToBlock(xml, headless);
          var code = Blockly.JavaScript.workspaceToCode(headless);
          var interpreter = new Interpreter(code,this.initApi);
          interpreter.run()
          headless.dispose();
        }
    }
  }
  
  initApi(interpreter, scope) 
  {
      var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(window.alert(text));
      };
      interpreter.setProperty(scope, 'alert',
          interpreter.createNativeFunction(wrapper));


     wrapper = function() {
        var test = interpreter.createPrimitive(CreatePerson("Person"));
        return test;
      };
      interpreter.setProperty(scope, 'CreatePerson',
          interpreter.createNativeFunction(wrapper));

     wrapper = function(text) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(CreatePerson(text));
        return test;
      };
      interpreter.setProperty(scope, 'CreateLargeEntity',
          interpreter.createNativeFunction(wrapper));

    wrapper = function(text) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(MoveEntity(text));
        return test;
      };
      interpreter.setProperty(scope, 'MoveEntity',
          interpreter.createNativeFunction(wrapper));

    wrapper = function(text,age,status) {
        text = text ? text.toString() : '';
        status = status ? status.toString() : ""
        age = age ? age.toString() : ""
        var test = interpreter.createPrimitive(SetCharacteristics(text,age,status));
        return test;
      };
      interpreter.setProperty(scope, 'SetCharacteristics',
          interpreter.createNativeFunction(wrapper));


    wrapper = function(number,text) {
            text = text ? text.toString() : '';
            number = number ? number.toString() : ""
            var test = interpreter.createPrimitive(CreateMultipleEntities(number,text));
            return test;
        };
        interpreter.setProperty(scope, 'CreateMultipleEntities',
            interpreter.createNativeFunction(wrapper));

    }
    

    /******************** This module has some useful information *****************/
   PushObject()
   {    

       /* myApp.LogEvent("SaveWorkspace")
        var currentUser = Parse.User.current();
        if(currentUser)
        {
            var xml = Blockly.Xml.workspaceToDom(this.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);

            var GameScore = Parse.Object.extend("GameScore");
            var gameScore = new GameScore();

            gameScore.set("workspace", xml_text) ;
            gameScore.set("username",currentUser.getUsername());
            gameScore.set("sessionToken",currentUser.getSessionToken());
            gameScore.set("ActivityName",this.activityName);
        
            gameScore.save(null, {
                success: function(gameScore) {
                    // Execute any logic that should take place after the object is saved.
                    alert('Workspace Saved!');
                },
                error: function(gameScore, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to save workspace, with error code: ' + error.message);
                }
            });
        }
        else
        {
            alert("User not logged in")
        }*/
   }
/*****************************************************************************
    LogOut() 
    {
      /*  if (confirm("Are you sure you want to log out?") == true) 
        {
            myApp.LogEvent("LogOut")
            Parse.User.logOut();
            this.router.navigate('home');
        } 
        else 
        {
        }*/
    

    ResetCode() 
    {
        if (confirm("Are you sure you want to reset the code to its initial state?") == true) 
        {
            myApp.LogEvent("ResetWorkspace")
            myApp.workspace.clear();
           // LoadGameScore(rUserName)
            var url = "resources/InitialWorkspaces/Activity2.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadWorkspaceCallback);
        } 
        else 
        {
        }
    }

    LoadGameScore(rUserName)
    {
      
      //currentUser=what you define;
      var GameScore = Parse.Object.extend("GameScore");
      var query = new Parse.Query(GameScore);
        query.equalTo("username", rUserName);
        query.equalTo('ActivityName',this.activityName)
        query.descending("updatedAt");
        query.first({
        success: object => {
            var text = object.attributes['workspace']
            this.LoadWorkspaceCallback(text);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
        });            
    }

    LoadLastSave()
    {
        myApp.LogEvent("LoadLastSave")
        var currentUser = Parse.User.current();
        var GameScore = Parse.Object.extend("GameScore");
        var query = new Parse.Query(GameScore);
        query.equalTo("username", currentUser.getUsername());
        query.equalTo('ActivityName',this.activityName)
        query.descending("updatedAt");
        query.first({
        success: object => {
            var text = object.attributes['workspace']
            this.LoadWorkspaceCallback(text);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
        });
    }
//******************** This module has some useful information ****************
    onBlocklyChange(event)
    {
        /*var currentUser = Parse.User.current();
        if(currentUser)
        {
            var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);

            var TraceLog = Parse.Object.extend("TraceLog");
            var traceLog = new TraceLog();
           
            traceLog.set("username",currentUser.getUsername());
            traceLog.set("sessionToken",currentUser.getSessionToken());
            traceLog.set("ActivityName",myApp.activityName);
            traceLog.set("EventType",event.type);
            traceLog.set("EventBlock",event.blockId);
            traceLog.set("workspace", xml_text) ;
        
            traceLog.save(null, {
                success: function(traceLog) {
                    // Execute any logic that should take place after the object is saved.
                    //alert('Workspace Saved!');
                },
                error: function(traceLog, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    console.log("Failed to save event: " + error.message);
                }
            });
        }
        else
        {
            console.log("Failed to save event:  User not logged in")
        }*/
    }
/******************** This module has some useful information *****************/
    LogEvent(eventType)
    {
/*        var currentUser = Parse.User.current();
        if(currentUser)
        {   

            var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);

            var TraceLog = Parse.Object.extend("TraceLog");
            var traceLog = new TraceLog();

            traceLog.set("username",currentUser.getUsername());
            traceLog.set("sessionToken",currentUser.getSessionToken());
            traceLog.set("ActivityName",myApp.activityName);
            traceLog.set("EventType",eventType);
            traceLog.set("workspace", xml_text) ;
        
            traceLog.save(null, {
                success: function(traceLog) {
                    // Execute any logic that should take place after the object is saved.
                    //alert('Workspace Saved!');
                },
                error: function(traceLog, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    console.log("Failed to save event: " + error.message);
                }
            });
        }
        else
        {
            console.log("Failed to save event:  User not logged in")
        }*/
    }

    /*var MongoClient = require('mongodb').MongoClient;

// Connect to the db
    MongoClient.connect("mongodb://localhost:27017/heroku_0r9t0hhq", function (err, db) {

      db.collection('GameScore', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);            
        });
        
    });
            
   
         if(err) throw err;

     //Write databse Insert/Update/Query code here..
                
  });
*/
}

