import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';

var myApp
var responseText
var targetHeading
var myApp

var PersonProperties = {};
var VirusProperties = {};

var collidee;

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

function CreateMultipleEntities(num,type)
{
    console.log("Here")
    if(num <= 0)
        return;

    var x=0;

    if(type == "People")
    {
        for(x=0;x<num;x++)
        {
            CreatePerson();
        }
    }
    else if(type == "Hospital")
    {
        for(x=0;x<num;x++)
        {
            console.log("HOSPITAL")
        }

    }
    else if (type == "Viruses")
    {
        for(x=0;x<num;x++)
        {
            CreateVirus();
        }
    }
}
function CreateVirus()
{
    GetCharacteristics("virusentity");
    var spriteName = VirusProperties.type;

    var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.body.setSize(5,60,23,15)
    //c.body.immovable = true;

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors("virusentity")
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
    //c.body.immovable = true;
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
    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors("personentity");
}

function SetCharacteristics(type,age,status)
{
    PersonProperties.type = type;
    PersonProperties.age = age;
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

function create() {
    myApp.game.stage.backgroundColor = "#dbd6d7";
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


function update()
{
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.Persons, myApp.Hospitals, myApp.PersonHospitalCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);
}

function GetCharacteristics(entityType)
{
    //Get Entity Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')== entityType)
        {
          var in1 = xml.firstElementChild.firstElementChild;      
          var headless = new Blockly.Workspace();
          Blockly.Xml.domToBlock(in1, headless);
          var code = Blockly.JavaScript.workspaceToCode(headless);
          var interpreter = new Interpreter(code,myApp.initApi);
          interpreter.run()
          headless.dispose();
        }
    }
}

function ResetPhaser()
{
  myApp.game.world.removeAll(true,false,false)
  create();
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
            var headless = new Blockly.Workspace();
            Blockly.Xml.domToBlock(collisionBlock, headless);
            var code = Blockly.JavaScript.workspaceToCode(headless);
            var interpreter = new Interpreter(code,myApp.initApi);
            interpreter.run()
            headless.dispose();
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
            var headless = new Blockly.Workspace();
            Blockly.Xml.domToBlock(moveBlock, headless);
            var code = Blockly.JavaScript.workspaceToCode(headless);
            var interpreter = new Interpreter(code,myApp.initApi);
            interpreter.run()
            headless.dispose();
          }
        }
    }
    //Execute Move Block
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
        myApp.currentGameObject.body.velocity.x = Math.random() * 200 - 100;
        myApp.currentGameObject.body.velocity.y = Math.random() * 200 - 100;
    }
}

@inject(Router)
export class Activity2 {
  workspace = {};
  interpreter = {};
  toolbox;
  game = {};

  constructor(router) {
    myApp = this;
    var url = window.location.protocol + '//' + window.location.hostname;
    Parse.initialize("myAppId");    
    Parse.serverURL = url + ":" + location.port + '/parse';
    this.router = router;
    this.activityName = "Part2";
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
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

  detached()
  {
      myApp.game.destroy()
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
        var url = "resources/InitialWorkspaces/Activity2.xml";
        var client = new this.HttpClient();
        client.get(url, this.LoadWorkspaceCallback);
      }
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

  PersonHospitalCollision(person1, hospital)
  {
      console.log("Boop")
  }


  runSimulation()
  {
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

    LogOut() 
    {
        if (confirm("Are you sure you want to log out?") == true) 
        {
            Parse.User.logOut();
            this.router.navigate('home');
        } 
        else 
        {
        }
    }

     LoadLastSave()
    {
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

    


}