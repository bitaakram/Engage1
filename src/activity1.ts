var myApp
var responseText
var myApp

var PersonProperties = {};

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
    //GetCharacteristics();
    var spriteName = "Virus1"

    var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.body.setSize(5,60,23,15)
    //c.body.immovable = true;

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
    GetCharacteristics();

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
    var text1 = myApp.game.add.text(16, -30, "Age: "+c.age.toString(), style);
    var text2 = myApp.game.add.text(16, 0, "Type: "+c.type, style);
    var text3 = myApp.game.add.text(16, 30, "Status: "+c.status, style);

    //text1.alignTo(c, Phaser.RIGHT_TOP, 16);
    //text2.alignTo(c, Phaser.RIGHT_CENTER, 16);
    //text3.alignTo(c, Phaser.RIGHT_BOTTOM, 16);

    c.addChild(text1);
    c.addChild(text2);
    c.addChild(text3);

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors();
}




function SetCharacteristics(type,age,status)
{
    PersonProperties.type = type;
    PersonProperties.age = age;
    PersonProperties.status = status;
}



function GetCharacteristics()
{
    //Get Entity Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='personentity')
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

function CreatePerson1(entityLabel)
{
    GetCharacteristics();

    var spriteName = PersonProperties.type;

    if(PersonProperties.status == "Sick")
    {
        spriteName += "Sick";
    }

    var c = myApp.Entities.create(200, 200, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.type = PersonProperties.type;
    c.age = PersonProperties.age;
    c.status = PersonProperties.status;

    var style = { font: "16px Courier", fill: "#000000" };
    var text1 = myApp.game.add.text(16, -30, "Age: "+c.age.toString(), style);
    var text2 = myApp.game.add.text(16, 0, "Type: "+c.type, style);
    var text3 = myApp.game.add.text(16, 30, "Status: "+c.status, style);

    //text1.alignTo(c, Phaser.RIGHT_TOP, 16);
    //text2.alignTo(c, Phaser.RIGHT_CENTER, 16);
    //text3.alignTo(c, Phaser.RIGHT_BOTTOM, 16);

    c.addChild(text1);
    c.addChild(text2);
    c.addChild(text3);

    myApp.currentGameObject = c;

    CheckBehaviors();
}

function CheckBehaviors()
{
    //Get Move Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='personentity')
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

function updateHeading(gameObj)
{
  try
  {
    gameObj.forEach(element => {
    if(Math.floor(Math.random() * 20) === 0)
    {
          var angle = 90 * (Math.PI / 180); // Constraint in radians
          var DIST = 200; // Within 200 pixels of current position
          // Grab an offset angle based on the constraint
          var offset = (Math.floor(Math.random() * angle) -  angle/2); 
          // Get a random point within the constraint angle at DIST length away
          var newX = element.position.x + Math.cos(element.rotation + offset) * DIST;
          var newY = element.position.y + Math.sin(element.rotation + offset) * DIST;
        
          //sanitised = areYouOutside(newX, newY, _this.game.world);
        
          // set the new heading for the NPC
          element.heading = {
            x: newX,
            y: newY
          }

          // Invoke the moveToXY function of the arcade physics to move NPC
          myApp.game.physics.arcade.moveToXY(element, element.heading.x, element.heading.y);
          var dx = element.heading.x - element.position.x;
          var dy = element.heading.y - element.position.y;
          // Rotate the NPC toward the new heading
          element.rotation = Math.atan2(dy, dx);
      }});
    }
    catch(err)
    {
      console.log(err.message)
    }
}
export class Activity1 {
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
  

  constructor() {
    myApp = this;
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
  }
  
  
  detached()
  {
      myApp.game.destroy()
      //Add Saving Code
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
      var url = "resources/InitialWorkspaces/Activity1.xml";
      var client = new this.HttpClient();
      client.get(url, this.LoadWorkspaceCallback);
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
  runCode(){
    this.paralellTest();
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    console.log(code);
    var interpreter = new Interpreter(code,this.initApi);
    interpreter.run()
    /*
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
      eval(code);
    } catch (e) {
      alert(MSG['badCode'].replace('%1', e));
    }
    */
  }

  
  initApi(interpreter, scope) {
  // Add an API function for the alert() block.
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
     
    
   PushObject()
   {
        console.log("Push")
        var url = window.location.protocol + '//' + window.location.hostname

        Parse.initialize("myAppId");
        
        Parse.serverURL = url + '/parse'

        var xml = Blockly.Xml.workspaceToDom(this.workspace);
        var xml_text = Blockly.Xml.domToPrettyText(xml);

        var GameScore = Parse.Object.extend("GameScore");
        var gameScore = new GameScore();

        gameScore.set("workspace", xml_text) ;
        
        gameScore.save(null, {
        success: function(gameScore) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + gameScore.id);
        },
        error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
        });

   }


}