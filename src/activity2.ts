var myApp
var responseText


var PersonProperties = {};
var VirusProperties = {};

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

function update()
{
     myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);    
}

function render()
{
   // if(myApp.DebugVirus){
   //     myApp.game.debug.body(myApp.DebugVirus)
   // }
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
        if(xml.getAttribute('type')=='entity')
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

unction SetCharacteristic(field,newValue)
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

function CreateEntity(entityLabel)
{
    if(entityLabel == "Person")
    {
        CreatePerson()
    }
    else if(entityLabel == "Virus")
    {
        CreateVirus()
    }
}

function CreateVirus()
{
    //GetCharacteristics();
    var spriteName = "Virus1"

    var c = myApp.Viruses.create(400, 300, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.body.setSize(5,60,23,15)
    c.body.immovable = true;
    myApp.DebugVirus = c;

    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
}

function CreatePerson()
{
    GetCharacteristics();

    var spriteName = PersonProperties.type;

    if(PersonProperties.status == "Sick")
    {
        spriteName += "Sick";
    }

    var c = myApp.Persons.create(100, 300, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.type = PersonProperties.type;
    c.age = PersonProperties.age;
    c.status = PersonProperties.status;
    myApp.currentGameObject = c;
    myApp.currentGameObject.body.collideWorldBounds = true;
    myApp.currentGameObject.body.bounce.set(1);
    CheckBehaviors();
}

function CheckBehaviors()
{
    //Get Move Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='entity')
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

function GetCollisionBlockFromEntity(person)
{
    //Get Move Block
    var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='entity')
        {
          //Get Behavior Blocks
          var childBlocks = xml.getElementsByTagName("block");
          var collisionBlock = null;
          for(var j=0; j<childBlocks.length; j++)
          {
            if(childBlocks[j].getAttribute('type') == "collision")
            {
                collisionBlock = childBlocks[j];
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

export class Activity2 {
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
  DebugVirus = null;
  

  constructor() {
    myApp = this;
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update, render:render });
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
      var url = "resources/InitialWorkspaces/Activity2.xml";
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
  
  PersonVirusCollision(person,virus)
  {
      console.log("Here")
      myApp.currentGameObject = person;
      //Get Collision Block(s)
      GetCollisionBlockFromEntity(person)
      //Check parameter
      //Execute code
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

      wrapper = function(characteristic,newValue) {
        characteristic = characteristic ? characteristic.toString() : '';
        newValue = newValue ? newValue.toString() : ""
        var test = interpreter.createPrimitive(SetCharacteristic(characteristic,newValue));
        return test;
      };
      interpreter.setProperty(scope, 'SetCharacteristic',
          interpreter.createNativeFunction(wrapper));   

    }
    
    


}