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
    //GetCharacteristics();
    var spriteName = "Virus1"

    var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
    c.scale = new Phaser.Point(1,1);
    c.anchor.set(.5);
    c.body.immovable = true;

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
    
    c.scale = new Phaser.Point(.3,.3);
    c.anchor.set(.5);
    c.type = PersonProperties.type;
    c.age = PersonProperties.age;
    c.status = PersonProperties.status;
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
function createDemoSimulation()
{
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

function create() {
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


function GetCollisionBlockFromEntity(person,target)
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


export class Activity5 {
  workspace = {};
  interpreter = {};
  toolbox;
  game = {};
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
      //console.log("Updating Chart: "+myApp.TimeStamp.toString());
      myApp.TimeStamp += myApp.SampleRate;
      var healthyCount = 5 //myApp.healthyPersons.length
      var sickCount = 10 //myApp.infectedPersons.length
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

  LoadInitialWorkspace()
  {
      var url = "resources/InitialWorkspaces/Activity5.xml";
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
    
    


}