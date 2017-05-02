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
}


function create() {
    //We're going to be using physics, so enable the Arcade Physics system
    //myApp.game.stage.backgroundColor = "#dbd6d7";
    myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
   
    myApp.healthyPersons = myApp.game.add.group();
    myApp.healthyPersons.enableBody = true;
    myApp.healthyPersons.physicsBodyType = Phaser.Physics.ARCADE;

    var scaleFactor = .1

    for (var i = 0; i < 100; i++)
    {
        var c = myApp.healthyPersons.create(myApp.game.world.randomX, Math.random() * 600, 'wizball', myApp.game.rnd.integerInRange(0, 36));
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
        var c = myApp.infectedPersons.create(myApp.game.world.randomX, Math.random() * 600, 'redball', myApp.game.rnd.integerInRange(0, 36));
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
        var c = myApp.healers.create(myApp.game.world.randomX, Math.random() * 600, 'blueball', myApp.game.rnd.integerInRange(0, 36));
        c.scale = new Phaser.Point(scaleFactor,scaleFactor);
        c.anchor.set(.5);
        c.name = 'healer' + i;
        c.body.collideWorldBounds = true;
        c.body.bounce.set(1);
    }
}


function update()
{
    myApp.game.physics.arcade.collide(myApp.healthyPersons, myApp.healthyPersons, null, null, this);
    myApp.game.physics.arcade.collide(myApp.infectedPersons, myApp.infectedPersons, null, null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.healers, null, null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.healthyPersons, null, null, this);
    
    
    myApp.game.physics.arcade.collide(myApp.healthyPersons, myApp.infectedPersons, myApp.HealthyInfectedCollision.bind(myApp), null, this);
    myApp.game.physics.arcade.collide(myApp.healers, myApp.infectedPersons, myApp.HealerInfectedCollision.bind(myApp), null, this);


    updateHeading(myApp.healthyPersons)
    updateHeading(myApp.infectedPersons)
    updateHeading(myApp.healers)
}


function SetCharacteristics(type,age)
{
    EntityProperties.type = type;
    EntityProperties.age = age;
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

    var sprite = EntityProperties.type;
    
    var c = myApp.game.add.sprite(200, 200, sprite);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.type = EntityProperties.type;
    c.age = EntityProperties.age;

    var style = { font: "16px Courier", fill: "#000000" };
    var text1 = myApp.game.add.text(0, 0, "Age: "+c.age.toString(), style);
    var text2 = myApp.game.add.text(0, 0, "Type: "+c.type, style);

    text1.alignTo(c, Phaser.RIGHT_TOP, 16);
    text2.alignTo(c, Phaser.RIGHT_CENTER, 16);
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
export class Activity5 {
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
  TimerId;

  constructor() {
    myApp = this;
  }

  //before view-model renders
  attached(){
    this.toolbox = this.LoadToolbox();
    this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });


    this.TimeStamp = 0;
    this.SampleRate = 1 ;

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.initChartData);
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
    
  /////////////////Chart Helper functions
  updateChartData()
  {
      console.log("Updating Chart: "+myApp.TimeStamp.toString());
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
      myApp.TimerId = window.setInterval(myApp.updateChartData,myApp.SampleRate*1000);
      myApp.drawChart();
  }

  detached()
  {
      myApp.ChartData = new google.visualization.DataTable();
      myApp.ChartData.addColumn('number','Time')
      myApp.ChartData.addColumn('number','Healthy')
      myApp.ChartData.addColumn('number','Sick')
      window.clearInterval(myApp.TimerId);

      myApp.game.destroy()
  }

  drawChart() {
        var data = myApp.ChartData;

        var options = {
          title: 'Sick vs Healthy',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
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
    myApp.ChartData = new google.visualization.DataTable();
    myApp.ChartData.addColumn('number','Time')
    myApp.ChartData.addColumn('number','Healthy')
    myApp.ChartData.addColumn('number','Sick')
    myApp.TimeStamp = 0;
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

      wrapper = function(text,number) {
        text = text ? text.toString() : '';
        var test = interpreter.createPrimitive(SetCharacteristics(text,number));
        return test;
      };
      interpreter.setProperty(scope, 'SetCharacteristics',
          interpreter.createNativeFunction(wrapper));

    }
    
    


}