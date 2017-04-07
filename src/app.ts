import {Todo} from './todo';
import {UserVariable} from './UserVariable';

var responseText
var targetHeading
var myApp
var ball1;
var ball2;

function preload() {
    myApp.game.load.image('wizball', 'assets/wizball.png');
    myApp.game.load.image('redball', 'assets/redwizball.png');
    myApp.game.load.image('blueball', 'assets/bluewizball.png');
}


function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
    ball1 = myApp.game.add.sprite(100, 240, 'wizball');
    ball2 = myApp.game.add.sprite(400, 240, 'wizball');

    myApp.game.physics.arcade.enable([ball1, ball2]);

    ball1.body.collideWorldBounds = true;
    ball2.body.collideWorldBounds = true;
    ball1.body.bounce.set(1);
    ball2.body.bounce.set(1);
}


function update()
{
    myApp.game.physics.arcade.collide(ball1, ball2, myApp.handleCollision.bind(myApp), null, this);
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


export class App {
  workspace = {};
  interpreter = {};
  code = "";
  DisplayVarName = "";
  highlightPause = false;
  UserVariables: UserVariable[]=[];
  game = {};
  WhenRunBlock;
  CollisionBlock;
  
  constructor() {
    myApp = this;
  }

  //before view-model renders
  attached(){
    //alert("activate")
    this.workspace = Blockly.inject('blocklyDiv', 
                                  {media: '../Blockly/media/',
                                 // toolbox: '../toolbox.xml'});
                                  toolbox: document.getElementById('toolbox')});

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

    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });

    var url = "resources/PrimeTest.csv";
    var client = new HttpClient();
    client.get(url, ReadFile);

  }



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
      Blockly.Xml.domToWorkspace(xml, myApp.workspace);
  }
  LoadWorkspace()
  {
      var url = "resources/workspace.xml";
      var client = new HttpClient();
      client.get(url, this.LoadWorkspaceCallback);
  }

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

  runSimulation()
  {
    //Get WhenRun Head
    //Run code
    var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
    for (var i = 0; xml = allXml[i]; i++) {
        var xml = allXml[i];
        if(xml.getAttribute('type')=='functionheader')
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
    }
    
    


}