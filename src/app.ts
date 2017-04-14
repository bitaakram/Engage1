import {Todo} from './todo';
import {UserVariable} from './UserVariable';

var responseText
var targetHeading
var myApp
var ball1;
var ball2;
var cursor;




function preload() {
    myApp.game.load.image('wizball', 'assets/wizball.png');
    myApp.game.load.image('redball', 'assets/redwizball.png');
    myApp.game.load.image('blueball', 'assets/bluewizball.png');
}


function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    myApp.healthyPersons = myApp.game.add.group();
    myApp.healthyPersons.enableBody = true;
    myApp.healthyPersons.physicsBodyType = Phaser.Physics.ARCADE;

    var scaleFactor = .1

    for (var i = 0; i < 100; i++)
    {
        var c = myApp.healthyPersons.create(myApp.game.world.randomX, Math.random() * 500, 'wizball', myApp.game.rnd.integerInRange(0, 36));
        c.scale = new Phaser.Point(scaleFactor,scaleFactor);
        c.anchor.set(.5);
        c.name = 'healthyPerson' + i;
        c.body.collideWorldBounds = true;
        c.body.bounce.set(1);
    }

    myApp.infectedPersons = myApp.game.add.group();
    myApp.infectedPersons.enableBody = true;
    myApp.infectedPersons.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 5; i++)
    {
        var c = myApp.infectedPersons.create(myApp.game.world.randomX, Math.random() * 500, 'redball', myApp.game.rnd.integerInRange(0, 36));
        c.scale = new Phaser.Point(scaleFactor,scaleFactor);
        c.anchor.set(.5);
        c.name = 'infectedPerson' + i;
        c.body.collideWorldBounds = true;
        c.body.bounce.set(1);
    }

    
    myApp.healers = myApp.game.add.group();
    myApp.healers.enableBody = true;
    myApp.healers.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 25; i++)
    {
        var c = myApp.healers.create(myApp.game.world.randomX, Math.random() * 500, 'blueball', myApp.game.rnd.integerInRange(0, 36));
        c.scale = new Phaser.Point(scaleFactor,scaleFactor);
        c.anchor.set(.5);
        c.name = 'healer' + i;
        c.body.collideWorldBounds = true;
        c.body.bounce.set(1);
    }

    cursor = this.input.keyboard.createCursorKeys();
}


function update()
{
    myApp.game.physics.arcade.collide(myApp.healthyPersons, myApp.healthyPersons, myApp.handleCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.infectedPersons, myApp.infectedPersons, myApp.handleCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.healers, myApp.handleCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.healthyPersons, myApp.HealerInfectedCollision.bind(myApp), null, this);

    myApp.game.physics.arcade.collide(myApp.healthyPersons, myApp.infectedPersons, myApp.HealthyInfectedCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.infectedPersons, myApp.HealerInfectedCollision.bind(myApp), null, this);


    updateHeading(myApp.healthyPersons)
    updateHeading(myApp.infectedPersons)
    updateHeading(myApp.healers)

    if(cursor.up.isDown)
    {
      myApp.game.physics.arcade.velocityFromRotation(ball1.rotation, 300, ball1.body.velocity);
    }
    if(cursor.down.isDown)
    {
      myApp.game.physics.arcade.velocityFromRotation(ball1.rotation, 0, ball1.body.velocity);
    }

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
  ChartData;
  TimeStamp = 0;
  SampleRate;
  healthyPersons;
  infectedPersons;
  healers;
  
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

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.initChartData);
    
    this.SampleRate = 1;
  }

  updateChartData()
  {
      myApp.TimeStamp += myApp.SampleRate;
      var healthyCount = myApp.healthyPersons.length
      var sickCount = myApp.infectedPersons.length
      myApp.ChartData.addRow([myApp.TimeStamp,healthyCount,sickCount])
      myApp.drawChart();
  }

  initChartData()
  {
      myApp.ChartData = new google.visualization.DataTable();
      myApp.ChartData.addColumn('number','Time')
      myApp.ChartData.addColumn('number','Healthy')
      myApp.ChartData.addColumn('number','Sick')
      window.setInterval(myApp.updateChartData,myApp.SampleRate*1000);
      myApp.drawChart();
  }

  drawChart() {
        var data = myApp.ChartData;

        var options = {
          title: 'Title',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
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