import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';

var myApp
var responseText
var myApp

var PersonProperties = {};
var VirusProperties = {};

var collidee;
var MAX_PERSONS = 3;
var MAX_VIRUSES = 3

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
    var c = {}
    GetCharacteristics("virusentity");
    var spriteName = VirusProperties.type;
    
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
    CheckBehaviors("virusentity")
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
}

function update(){
     myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this); 
     myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);  
     myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);  
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

function SetVirusCharacteristics(virusType)
{
    VirusProperties.type = virusType;
}

function GetCharacteristic(chartype, target)
{
    var person = myApp.currentGameObject
    if(target == "Collidee")
    {
        person = collidee
    }
    
    if(chartype == "Age")
    {
        return person.age;
    }
    else if(chartype == "Status")
    {
        return person.status;
    }
    else if(chartype == "Type")
    {
        return person.type;
    }

    return "";

}


function SetCharacteristic(field,newValue)
{
    if(field == "Status")
    {
        myApp.currentGameObject.status = newValue;
        var spriteName = myApp.currentGameObject.type;
        if(myApp.currentGameObject.status == "Sick")
        {
            spriteName += "Sick";
        }
        myApp.currentGameObject.loadTexture(spriteName);
    }

    if(field == "Type")
    {
        myApp.currentGameObject.type = newValue;
        var spriteName = myApp.currentGameObject.type;
        if(myApp.currentGameObject.status == "Sick")
        {
            spriteName += "Sick";
        }
        myApp.currentGameObject.loadTexture(spriteName);
    }
        
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
        c = myApp.Persons.create(50, 300, spriteName);
    }
    else if(myApp.Persons.length == 1)
    {
        c = myApp.Persons.create(200, 300, spriteName);
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
    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors("personentity");
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
export class Activity3 {
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
  Persons;
  Viruses;
  

  constructor(router) {
    myApp = this;
    var url = window.location.protocol + '//' + window.location.hostname;
    Parse.initialize("myAppId");    
    Parse.serverURL = url + ":" + location.port + '/parse';
    this.router = router;
    this.activityName = "Part3";
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
  

  LoadInitialWorkspace()
  {
      myApp.workspace.clear();
      this.LoadLastSave();
      if(myApp.workspace.getAllBlocks().length == 0)
      {
        var url = "resources/InitialWorkspaces/Activity3.xml";
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

  handleCollision()
  {
    var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='collision')
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
  
  PersonVirusCollision(person,virus)
  {
      myApp.currentGameObject = person;
      GetCollisionBlockFromEntity(person,"Virus")
      
  }

  PersonPersonCollision(person1,person2)
  {
      myApp.currentGameObject = person1;
      collidee = person2;
      GetCollisionBlockFromEntity(person1,"Person")

      myApp.currentGameObject = person2;
      collidee = person1;
      GetCollisionBlockFromEntity(person2,"Person")
  }

  HealthyInfectedCollision(healthy, infected)
  {
      healthy.loadTexture('redball')
      myApp.healthyPersons.remove(healthy)
      myApp.infectedPersons.add(healthy)
  }

  HealerInfectedCollision(healer, infected)
  {
      infected.loadTexture('wizball')
      myApp.infectedPersons.remove(infected)
      myApp.healthyPersons.add(infected)
  }

  runSimulation()
  {
    myApp.LogEvent("RunSimulation")
    myApp.ResetPhaser();
    //Get WhenRun Head
    //Run code
    var test = Blockly.JavaScript.workspaceToCode(this.workspace)
    console.log(test);

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
  
  initApi(interpreter, scope) {
  // Add an API function for the alert() block.
      var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(window.alert(text));
      };
      interpreter.setProperty(scope, 'alert',
          interpreter.createNativeFunction(wrapper));

      wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(myApp.setColor(text));
      };
      interpreter.setProperty(scope, 'SetColor',
          interpreter.createNativeFunction(wrapper));
      
     wrapper = function() {
        var test = interpreter.createPrimitive(CreateEntity("Person"));
        return test;
      };
      interpreter.setProperty(scope, 'CreatePerson',
          interpreter.createNativeFunction(wrapper));

     wrapper = function(text) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(CreateEntity(text));
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

    wrapper = function(text) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(SetVirusCharacteristics(text));
        return test;
      };
      interpreter.setProperty(scope, 'SetVirusCharacteristics',
          interpreter.createNativeFunction(wrapper));

      wrapper = function(characteristic,newValue) {
        characteristic = characteristic ? characteristic.toString() : '';
        newValue = newValue ? newValue.toString() : ""
        var test = interpreter.createPrimitive(SetCharacteristic(characteristic,newValue));
        return test;
      };
      interpreter.setProperty(scope, 'SetCharacteristic',
          interpreter.createNativeFunction(wrapper));

      wrapper = function(characteristic,target) {
        characteristic = characteristic ? characteristic.toString() : '';
        target = target ? target.toString() : ""
        var test = interpreter.createPrimitive(GetCharacteristic(characteristic,target));
        return test;
      };
      interpreter.setProperty(scope, 'GetCharacteristic',
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
    
    PushObject()
    {
        myApp.LogEvent("SaveWorkspace")
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
        }
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

     LogOut() 
    {
        if (confirm("Are you sure you want to log out?") == true) 
        {
            myApp.LogEvent("LogOut")
            Parse.User.logOut();
            this.router.navigate('home');
        } 
        else 
        {
        }
    }

    onBlocklyChange(event)
    {
        var currentUser = Parse.User.current();
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
        }
    }

     ResetCode() 
    {
        if (confirm("Are you sure you want to reset the code to its initial state?") == true) 
        {
            myApp.LogEvent("ResetWorkspace")
            myApp.workspace.clear();
            var url = "resources/InitialWorkspaces/Activity3.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadWorkspaceCallback);
        } 
        else 
        {
        }
    }
    LogEvent(eventType)
    {
        var currentUser = Parse.User.current();
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
        }
    }


}