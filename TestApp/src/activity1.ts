var myApp
var responseText
var targetHeading
var myApp
var ball1;
var ball2;
var cursor;

var EntityProperties = {};

function preload() {
    myApp.game.load.image('wizball', 'assets/wizball.png');
    myApp.game.load.image('redball', 'assets/redwizball.png');
    myApp.game.load.image('blueball', 'assets/bluewizball.png');
    
    myApp.game.load.image('Man1', 'assets/Man1.png');
    myApp.game.load.image('Man2', 'assets/Man2.png');
    myApp.game.load.image('Woman1', 'assets/Woman1.png');
    myApp.game.load.image('Woman2', 'assets/Woman2.png');

    myApp.game.load.image('Man1Sick', 'assets/Man1_sick.png');
    myApp.game.load.image('Man2Sick', 'assets/Man2_sick.png');
    myApp.game.load.image('Woman1Sick', 'assets/Woman1_sick.png');
    myApp.game.load.image('Woman2Sick', 'assets/Woman2_sick.png');

}


function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    myApp.game.stage.backgroundColor = "#dbd6d7";
    myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
}

function update(){
    
}

function SetCharacteristics(type,age,status)
{
    EntityProperties.type = type;
    EntityProperties.age = age;
    EntityProperties.status = status;
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

function CreateLargeEntity(entityLabel)
{
    GetCharacteristics();


    var spriteName = EntityProperties.type;

    if(EntityProperties.status == "Sick")
    {
        spriteName += "Sick";
    }

    var c = myApp.game.add.sprite(200, 200, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.type = EntityProperties.type;
    c.age = EntityProperties.age;
    c.status = EntityProperties.status;

    var style = { font: "16px Courier", fill: "#000000" };
    var text1 = myApp.game.add.text(0, 0, "Age: "+c.age.toString(), style);
    var text2 = myApp.game.add.text(0, 0, "Type: "+c.type, style);
    var text3 = myApp.game.add.text(0, 0, "Status: "+c.status, style);

    text1.alignTo(c, Phaser.RIGHT_TOP, 16);
    text2.alignTo(c, Phaser.RIGHT_CENTER, 16);
    text3.alignTo(c, Phaser.RIGHT_BOTTOM, 16);
}
function MoveBallRight()
{
  ball1.body.velocity.x=100;
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
  

  constructor() {
    myApp = this;
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    
   /*                               
    this.WhenRunBlock = this.workspace.newBlock('functionheader');
    this.WhenRunBlock.initSvg();
    this.WhenRunBlock.render();
    this.WhenRunBlock.setMovable(false);
    this.WhenRunBlock.setDeletable(false);
    
    this.CollisionBlock = this.workspace.newBlock('collision');
    this.CollisionBlock.initSvg();
    this.CollisionBlock.render();
    this.CollisionBlock.moveBy(200,0)
    this.CollisionBlock.setMovable(false);
    this.CollisionBlock.setDeletable(false);
*/
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
  }
  
  
  detached()
  {
      myApp.game.destroy()
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
  LoadWorkspace()
  {
      var url = "resources/workspace.xml";
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

  setColor(targetColor)
  {
    if(targetColor == "RED")
    {
        ball2.loadTexture('redball');
    }
    else if(targetColor == "BLUE")
    {
        ball2.loadTexture('blueball');
    }
    myApp.game.physics.arcade.collide(ball1, ball2);
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
        var test = interpreter.createPrimitive(MoveBallRight());
        return test;
      };
      interpreter.setProperty(scope, 'MoveBallRight',
          interpreter.createNativeFunction(wrapper));    

      wrapper = function(text) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(CreateLargeEntity(text));
        return test;
      };
      interpreter.setProperty(scope, 'CreateLargeEntity',
          interpreter.createNativeFunction(wrapper));

      wrapper = function(text,number,status) {
        text = text ? text.toString() : '';
        status = status ? status.toString() : ""
        var test = interpreter.createPrimitive(SetCharacteristics(text,number,status));
        return test;
      };
      interpreter.setProperty(scope, 'SetCharacteristics',
          interpreter.createNativeFunction(wrapper));

    }
    
    


}