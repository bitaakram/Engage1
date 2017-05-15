var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('activity1',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myApp;
    var responseText;
    var myApp;
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
    function update() {
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, null, null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, null, null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Hospitals, null, null, this);
        myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);
    }
    function CreateMultipleEntities(num, type) {
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
        else if (type == "Viruses") {
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
    }
    function CreateVirus() {
        var spriteName = "Virus1";
        var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.body.setSize(5, 60, 23, 15);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
    }
    function CreateHospital() {
        var spriteName = "Hospital1";
        var c = myApp.Hospitals.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        c.body.immovable = true;
    }
    function CreatePerson() {
        GetCharacteristics();
        var spriteName = PersonProperties.type;
        if (PersonProperties.status == "Sick") {
            spriteName += "Sick";
        }
        var c = {};
        if (myApp.Persons.length == 0) {
            c = myApp.Persons.create(100, 300, spriteName);
        }
        else {
            c = myApp.Persons.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.type = PersonProperties.type;
        c.age = PersonProperties.age;
        c.status = PersonProperties.status;
        var style = { font: "16px Courier", fill: "#000000" };
        var text1 = myApp.game.add.text(16, -30, "Age: " + c.age.toString(), style);
        var text2 = myApp.game.add.text(16, 0, "Type: " + c.type, style);
        var text3 = myApp.game.add.text(16, 30, "Status: " + c.status, style);
        c.addChild(text1);
        c.addChild(text2);
        c.addChild(text3);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors();
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = type;
        PersonProperties.age = age;
        PersonProperties.status = status;
    }
    function GetCharacteristics() {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'personentity') {
                var in1 = xml.firstElementChild.firstElementChild;
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(in1, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code, myApp.initApi);
                interpreter.run();
                headless.dispose();
            }
        }
    }
    function CreatePerson1(entityLabel) {
        GetCharacteristics();
        var spriteName = PersonProperties.type;
        if (PersonProperties.status == "Sick") {
            spriteName += "Sick";
        }
        var c = myApp.Entities.create(200, 200, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.type = PersonProperties.type;
        c.age = PersonProperties.age;
        c.status = PersonProperties.status;
        var style = { font: "16px Courier", fill: "#000000" };
        var text1 = myApp.game.add.text(16, -30, "Age: " + c.age.toString(), style);
        var text2 = myApp.game.add.text(16, 0, "Type: " + c.type, style);
        var text3 = myApp.game.add.text(16, 30, "Status: " + c.status, style);
        c.addChild(text1);
        c.addChild(text2);
        c.addChild(text3);
        myApp.currentGameObject = c;
        CheckBehaviors();
    }
    function CheckBehaviors() {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'personentity') {
                var childBlocks = xml.getElementsByTagName("block");
                var moveBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "move") {
                        moveBlock = childBlocks[j];
                    }
                }
                if (moveBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(moveBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function MoveEntity(direction) {
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        if (direction == "Left") {
            myApp.currentGameObject.body.velocity.x = -100;
        }
        else if (direction == "Right") {
            myApp.currentGameObject.body.velocity.x = 100;
        }
        else if (direction == "Random") {
            myApp.currentGameObject.body.velocity.x = Math.random() * 100 - 50;
            myApp.currentGameObject.body.velocity.y = Math.random() * 100 - 50;
        }
    }
    function ResetPhaser() {
        myApp.game.world.removeAll(true, false, false);
        create();
    }
    function updateHeading(gameObj) {
        try {
            gameObj.forEach(function (element) {
                if (Math.floor(Math.random() * 20) === 0) {
                    var angle = 90 * (Math.PI / 180);
                    var DIST = 200;
                    var offset = (Math.floor(Math.random() * angle) - angle / 2);
                    var newX = element.position.x + Math.cos(element.rotation + offset) * DIST;
                    var newY = element.position.y + Math.sin(element.rotation + offset) * DIST;
                    element.heading = {
                        x: newX,
                        y: newY
                    };
                    myApp.game.physics.arcade.moveToXY(element, element.heading.x, element.heading.y);
                    var dx = element.heading.x - element.position.x;
                    var dy = element.heading.y - element.position.y;
                    element.rotation = Math.atan2(dy, dx);
                }
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    var Activity1 = (function () {
        function Activity1(router) {
            this.workspace = {};
            this.interpreter = {};
            this.game = {};
            this.healthyPersons = {};
            this.infectedPersons = {};
            this.healers = {};
            this.TimeStamp = 0;
            myApp = this;
            var url = window.location.protocol + '//' + window.location.hostname;
            Parse.initialize("myAppId");
            Parse.serverURL = url + ":" + location.port + '/parse';
            this.router = router;
            this.activityName = "Part1";
        }
        Activity1.prototype.attached = function () {
            this.toolbox = this.LoadToolbox();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
        };
        Activity1.prototype.detached = function () {
            myApp.game.destroy();
        };
        Activity1.prototype.SaveWorkspace = function () {
            var xml = Blockly.Xml.workspaceToDom(this.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);
            this.export(xml_text);
        };
        Activity1.prototype.export = function (text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', 'workspace.xml');
            pom.style.display = 'none';
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
        };
        Activity1.prototype.LoadWorkspace = function () {
            var url = "resources/workspace.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadWorkspaceCallback);
        };
        Activity1.prototype.LoadWorkspaceCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.workspace.clear();
            Blockly.Xml.domToWorkspace(xml, myApp.workspace);
        };
        Activity1.prototype.LoadInitialWorkspace = function () {
            myApp.workspace.clear();
            this.LoadLastSave();
            if (myApp.workspace.getAllBlocks().length == 0) {
                var url = "resources/InitialWorkspaces/Activity1.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
        };
        Activity1.prototype.LoadToolBoxCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.toolbox = xml;
            myApp.workspace = Blockly.inject('blocklyDiv', { media: '../Blockly/media/',
                toolbox: myApp.toolbox });
            myApp.LoadInitialWorkspace();
        };
        Activity1.prototype.LoadToolbox = function () {
            var url = "resources/EpidemicToolbox.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadToolBoxCallback);
        };
        Activity1.prototype.HttpClient = function () {
            this.get = function (aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                };
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            };
        };
        Activity1.prototype.ResetPhaser = function () {
            myApp.game.world.removeAll(true, false, false);
            create();
        };
        Activity1.prototype.handleCollision = function () {
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'collision') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity1.prototype.HealthyInfectedCollision = function (healthy, infected) {
            healthy.loadTexture('redball');
            myApp.healthyPersons.remove(healthy);
            myApp.infectedPersons.add(healthy);
        };
        Activity1.prototype.HealerInfectedCollision = function (healer, infected) {
            infected.loadTexture('wizball');
            myApp.infectedPersons.remove(infected);
            myApp.healthyPersons.add(infected);
        };
        Activity1.prototype.runSimulation = function () {
            myApp.ResetPhaser();
            var test = Blockly.JavaScript.workspaceToCode(this.workspace);
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'simulation') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity1.prototype.runCode = function () {
            this.paralellTest();
            var code = Blockly.JavaScript.workspaceToCode(this.workspace);
            console.log(code);
            var interpreter = new Interpreter(code, this.initApi);
            interpreter.run();
        };
        Activity1.prototype.initApi = function (interpreter, scope) {
            var wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(window.alert(text));
            };
            interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
            wrapper = function () {
                var test = interpreter.createPrimitive(CreatePerson("Person"));
                return test;
            };
            interpreter.setProperty(scope, 'CreatePerson', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(CreatePerson(text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateLargeEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(MoveEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'MoveEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text, age, status) {
                text = text ? text.toString() : '';
                status = status ? status.toString() : "";
                age = age ? age.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristics(text, age, status));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (number, text) {
                text = text ? text.toString() : '';
                number = number ? number.toString() : "";
                var test = interpreter.createPrimitive(CreateMultipleEntities(number, text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateMultipleEntities', interpreter.createNativeFunction(wrapper));
        };
        Activity1.prototype.PushObject = function () {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(this.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var GameScore = Parse.Object.extend("GameScore");
                var gameScore = new GameScore();
                gameScore.set("workspace", xml_text);
                gameScore.set("username", currentUser.getUsername());
                gameScore.set("sessionToken", currentUser.getSessionToken());
                gameScore.set("ActivityName", this.activityName);
                gameScore.save(null, {
                    success: function (gameScore) {
                        alert('Workspace Saved!');
                    },
                    error: function (gameScore, error) {
                        alert('Failed to save workspace, with error code: ' + error.message);
                    }
                });
            }
            else {
                alert("User not logged in");
            }
        };
        Activity1.prototype.LogOut = function () {
            if (confirm("Are you sure you want to log out?") == true) {
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity1.prototype.LoadLastSave = function () {
            var _this = this;
            console.log("Loading");
            var currentUser = Parse.User.current();
            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.equalTo("username", currentUser.getUsername());
            query.equalTo('ActivityName', this.activityName);
            query.descending("updatedAt");
            query.first({
                success: function (object) {
                    var text = object.attributes['workspace'];
                    _this.LoadWorkspaceCallback(text);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
        return Activity1;
    }());
    Activity1 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity1);
    exports.Activity1 = Activity1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEVBQUUsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQy9DLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDWixPQUFPLEVBQUUsVUFBQSxNQUFNO29CQUNYLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3pDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxLQUFLLEVBQUUsVUFBUyxLQUFLO29CQUNqQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEQsQ0FBQzthQUNBLENBQUMsQ0FBQztRQUNQLENBQUM7UUFHTCxnQkFBQztJQUFELENBM1RBLEFBMlRDLElBQUE7SUEzVFksU0FBUztRQURyQiwwQkFBTSxDQUFDLHVCQUFNLENBQUM7O09BQ0YsU0FBUyxDQTJUckI7SUEzVFksOEJBQVMiLCJmaWxlIjoiYWN0aXZpdHkxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Um91dGVyQ29uZmlndXJhdGlvbiwgUm91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbnZhciBteUFwcFxudmFyIHJlc3BvbnNlVGV4dFxudmFyIG15QXBwXG5cbnZhciBQZXJzb25Qcm9wZXJ0aWVzID0ge307XG5cblxuZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjEnLCAnYXNzZXRzL01hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yJywgJ2Fzc2V0cy9NYW4yLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xJywgJ2Fzc2V0cy9Xb21hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjInLCAnYXNzZXRzL1dvbWFuMi5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMVNpY2snLCAnYXNzZXRzL01hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjJTaWNrJywgJ2Fzc2V0cy9NYW4yX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjFTaWNrJywgJ2Fzc2V0cy9Xb21hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMlNpY2snLCAnYXNzZXRzL1dvbWFuMl9zaWNrLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czEnLCAnYXNzZXRzL1ZpcnVzMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMicsICdhc3NldHMvVmlydXMyLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMzJywgJ2Fzc2V0cy9WaXJ1czMucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ0hvc3BpdGFsMScsICdhc3NldHMvSG9zcGl0YWwxLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnSG9zcGl0YWwyJywgJ2Fzc2V0cy9Ib3NwaXRhbDIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdIb3NwaXRhbDMnLCAnYXNzZXRzL0hvc3BpdGFsMy5wbmcnKTtcblxuXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIC8vICBXZSdyZSBnb2luZyB0byBiZSB1c2luZyBwaHlzaWNzLCBzbyBlbmFibGUgdGhlIEFyY2FkZSBQaHlzaWNzIHN5c3RlbVxuICAgIG15QXBwLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjZGJkNmQ3XCI7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICBteUFwcC5QZXJzb25zID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5QZXJzb25zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlBlcnNvbnMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuXG4gICAgbXlBcHAuVmlydXNlcyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuVmlydXNlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5WaXJ1c2VzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIG15QXBwLkhvc3BpdGFscyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuSG9zcGl0YWxzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLkhvc3BpdGFscy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuICAgIFxuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25zLCBudWxsLCBudWxsLCB0aGlzKTtcbiAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUobXlBcHAuUGVyc29ucywgbXlBcHAuVmlydXNlcywgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLkhvc3BpdGFscywgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlZpcnVzZXMsIG15QXBwLlZpcnVzZXMsIG51bGwsIG51bGwsIHRoaXMpO1xuXG59XG5cbmZ1bmN0aW9uIENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtLHR5cGUpXG57XG4gICAgaWYobnVtIDw9IDApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB4PTA7XG5cbiAgICBpZih0eXBlID09IFwiUGVvcGxlXCIpXG4gICAge1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlUGVyc29uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlID09IFwiSG9zcGl0YWxcIilcbiAgICB7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhPU1BJVEFMXCIpXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09IFwiVmlydXNlc1wiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVZpcnVzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBDcmVhdGVWaXJ1cygpXG57XG4gICAgLy9HZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFwiVmlydXMxXCJcblxuICAgIHZhciBjID0gbXlBcHAuVmlydXNlcy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLmJvZHkuc2V0U2l6ZSg1LDYwLDIzLDE1KVxuICAgIC8vYy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlSG9zcGl0YWwoKVxue1xuICAgICAvL0dldENoYXJhY3RlcmlzdGljcygpO1xuICAgIHZhciBzcHJpdGVOYW1lID0gXCJIb3NwaXRhbDFcIlxuXG4gICAgdmFyIGMgPSBteUFwcC5Ib3NwaXRhbHMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICBjLnNjYWxlID0gbmV3IFBoYXNlci5Qb2ludCgxLDEpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbiAgICBjLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlUGVyc29uKClcbntcbiAgICBHZXRDaGFyYWN0ZXJpc3RpY3MoKTtcblxuICAgIHZhciBzcHJpdGVOYW1lID0gUGVyc29uUHJvcGVydGllcy50eXBlO1xuXG4gICAgaWYoUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAge1xuICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgIH1cblxuICAgIHZhciBjID0ge31cbiAgICBpZihteUFwcC5QZXJzb25zLmxlbmd0aCA9PSAwKVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlBlcnNvbnMuY3JlYXRlKDEwMCwgMzAwLCBzcHJpdGVOYW1lKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlBlcnNvbnMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICB9XG4gICAgXG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMudHlwZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcbiAgICBjLmFnZSA9IFBlcnNvblByb3BlcnRpZXMuYWdlO1xuICAgIGMuc3RhdHVzID0gUGVyc29uUHJvcGVydGllcy5zdGF0dXM7XG4gICBcbiAgICB2YXIgc3R5bGUgPSB7IGZvbnQ6IFwiMTZweCBDb3VyaWVyXCIsIGZpbGw6IFwiIzAwMDAwMFwiIH07XG4gICAgdmFyIHRleHQxID0gbXlBcHAuZ2FtZS5hZGQudGV4dCgxNiwgLTMwLCBcIkFnZTogXCIrYy5hZ2UudG9TdHJpbmcoKSwgc3R5bGUpO1xuICAgIHZhciB0ZXh0MiA9IG15QXBwLmdhbWUuYWRkLnRleHQoMTYsIDAsIFwiVHlwZTogXCIrYy50eXBlLCBzdHlsZSk7XG4gICAgdmFyIHRleHQzID0gbXlBcHAuZ2FtZS5hZGQudGV4dCgxNiwgMzAsIFwiU3RhdHVzOiBcIitjLnN0YXR1cywgc3R5bGUpO1xuXG4gICAgLy90ZXh0MS5hbGlnblRvKGMsIFBoYXNlci5SSUdIVF9UT1AsIDE2KTtcbiAgICAvL3RleHQyLmFsaWduVG8oYywgUGhhc2VyLlJJR0hUX0NFTlRFUiwgMTYpO1xuICAgIC8vdGV4dDMuYWxpZ25UbyhjLCBQaGFzZXIuUklHSFRfQk9UVE9NLCAxNik7XG5cbiAgICBjLmFkZENoaWxkKHRleHQxKTtcbiAgICBjLmFkZENoaWxkKHRleHQyKTtcbiAgICBjLmFkZENoaWxkKHRleHQzKTtcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIENoZWNrQmVoYXZpb3JzKCk7XG59XG5cblxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljcyh0eXBlLGFnZSxzdGF0dXMpXG57XG4gICAgUGVyc29uUHJvcGVydGllcy50eXBlID0gdHlwZTtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IGFnZTtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9IHN0YXR1cztcbn1cblxuXG5cbmZ1bmN0aW9uIEdldENoYXJhY3RlcmlzdGljcygpXG57XG4gICAgLy9HZXQgRW50aXR5IEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0ncGVyc29uZW50aXR5JylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBpbjEgPSB4bWwuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7ICAgICAgXG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhpbjEsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBDcmVhdGVQZXJzb24xKGVudGl0eUxhYmVsKVxue1xuICAgIEdldENoYXJhY3RlcmlzdGljcygpO1xuXG4gICAgdmFyIHNwcml0ZU5hbWUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG5cbiAgICBpZihQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9PSBcIlNpY2tcIilcbiAgICB7XG4gICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgfVxuXG4gICAgdmFyIGMgPSBteUFwcC5FbnRpdGllcy5jcmVhdGUoMjAwLCAyMDAsIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLnR5cGUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG4gICAgYy5hZ2UgPSBQZXJzb25Qcm9wZXJ0aWVzLmFnZTtcbiAgICBjLnN0YXR1cyA9IFBlcnNvblByb3BlcnRpZXMuc3RhdHVzO1xuXG4gICAgdmFyIHN0eWxlID0geyBmb250OiBcIjE2cHggQ291cmllclwiLCBmaWxsOiBcIiMwMDAwMDBcIiB9O1xuICAgIHZhciB0ZXh0MSA9IG15QXBwLmdhbWUuYWRkLnRleHQoMTYsIC0zMCwgXCJBZ2U6IFwiK2MuYWdlLnRvU3RyaW5nKCksIHN0eWxlKTtcbiAgICB2YXIgdGV4dDIgPSBteUFwcC5nYW1lLmFkZC50ZXh0KDE2LCAwLCBcIlR5cGU6IFwiK2MudHlwZSwgc3R5bGUpO1xuICAgIHZhciB0ZXh0MyA9IG15QXBwLmdhbWUuYWRkLnRleHQoMTYsIDMwLCBcIlN0YXR1czogXCIrYy5zdGF0dXMsIHN0eWxlKTtcblxuICAgIC8vdGV4dDEuYWxpZ25UbyhjLCBQaGFzZXIuUklHSFRfVE9QLCAxNik7XG4gICAgLy90ZXh0Mi5hbGlnblRvKGMsIFBoYXNlci5SSUdIVF9DRU5URVIsIDE2KTtcbiAgICAvL3RleHQzLmFsaWduVG8oYywgUGhhc2VyLlJJR0hUX0JPVFRPTSwgMTYpO1xuXG4gICAgYy5hZGRDaGlsZCh0ZXh0MSk7XG4gICAgYy5hZGRDaGlsZCh0ZXh0Mik7XG4gICAgYy5hZGRDaGlsZCh0ZXh0Myk7XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG5cbiAgICBDaGVja0JlaGF2aW9ycygpO1xufVxuXG5mdW5jdGlvbiBDaGVja0JlaGF2aW9ycygpXG57XG4gICAgLy9HZXQgTW92ZSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J3BlcnNvbmVudGl0eScpXG4gICAgICAgIHtcbiAgICAgICAgICAvL0dldCBCZWhhdmlvciBCbG9ja3NcbiAgICAgICAgICB2YXIgY2hpbGRCbG9ja3MgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJibG9ja1wiKTtcbiAgICAgICAgICB2YXIgbW92ZUJsb2NrID0gbnVsbDtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxjaGlsZEJsb2Nrcy5sZW5ndGg7IGorKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PSBcIm1vdmVcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb3ZlQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYobW92ZUJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKG1vdmVCbG9jaywgaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9FeGVjdXRlIE1vdmUgQmxvY2tcbn1cblxuZnVuY3Rpb24gTW92ZUVudGl0eShkaXJlY3Rpb24pXG57XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIGlmKGRpcmVjdGlvbiA9PSBcIkxlZnRcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IC0xMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmlnaHRcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IDEwMDtcbiAgICB9XG4gICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gXCJSYW5kb21cIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IE1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS55ID0gTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBSZXNldFBoYXNlcigpXG57XG4gIG15QXBwLmdhbWUud29ybGQucmVtb3ZlQWxsKHRydWUsZmFsc2UsZmFsc2UpXG4gIGNyZWF0ZSgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVIZWFkaW5nKGdhbWVPYmopXG57XG4gIHRyeVxuICB7XG4gICAgZ2FtZU9iai5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGlmKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSA9PT0gMClcbiAgICB7XG4gICAgICAgICAgdmFyIGFuZ2xlID0gOTAgKiAoTWF0aC5QSSAvIDE4MCk7IC8vIENvbnN0cmFpbnQgaW4gcmFkaWFuc1xuICAgICAgICAgIHZhciBESVNUID0gMjAwOyAvLyBXaXRoaW4gMjAwIHBpeGVscyBvZiBjdXJyZW50IHBvc2l0aW9uXG4gICAgICAgICAgLy8gR3JhYiBhbiBvZmZzZXQgYW5nbGUgYmFzZWQgb24gdGhlIGNvbnN0cmFpbnRcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuZ2xlKSAtICBhbmdsZS8yKTsgXG4gICAgICAgICAgLy8gR2V0IGEgcmFuZG9tIHBvaW50IHdpdGhpbiB0aGUgY29uc3RyYWludCBhbmdsZSBhdCBESVNUIGxlbmd0aCBhd2F5XG4gICAgICAgICAgdmFyIG5ld1ggPSBlbGVtZW50LnBvc2l0aW9uLnggKyBNYXRoLmNvcyhlbGVtZW50LnJvdGF0aW9uICsgb2Zmc2V0KSAqIERJU1Q7XG4gICAgICAgICAgdmFyIG5ld1kgPSBlbGVtZW50LnBvc2l0aW9uLnkgKyBNYXRoLnNpbihlbGVtZW50LnJvdGF0aW9uICsgb2Zmc2V0KSAqIERJU1Q7XG4gICAgICAgIFxuICAgICAgICAgIC8vc2FuaXRpc2VkID0gYXJlWW91T3V0c2lkZShuZXdYLCBuZXdZLCBfdGhpcy5nYW1lLndvcmxkKTtcbiAgICAgICAgXG4gICAgICAgICAgLy8gc2V0IHRoZSBuZXcgaGVhZGluZyBmb3IgdGhlIE5QQ1xuICAgICAgICAgIGVsZW1lbnQuaGVhZGluZyA9IHtcbiAgICAgICAgICAgIHg6IG5ld1gsXG4gICAgICAgICAgICB5OiBuZXdZXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSW52b2tlIHRoZSBtb3ZlVG9YWSBmdW5jdGlvbiBvZiB0aGUgYXJjYWRlIHBoeXNpY3MgdG8gbW92ZSBOUENcbiAgICAgICAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLm1vdmVUb1hZKGVsZW1lbnQsIGVsZW1lbnQuaGVhZGluZy54LCBlbGVtZW50LmhlYWRpbmcueSk7XG4gICAgICAgICAgdmFyIGR4ID0gZWxlbWVudC5oZWFkaW5nLnggLSBlbGVtZW50LnBvc2l0aW9uLng7XG4gICAgICAgICAgdmFyIGR5ID0gZWxlbWVudC5oZWFkaW5nLnkgLSBlbGVtZW50LnBvc2l0aW9uLnk7XG4gICAgICAgICAgLy8gUm90YXRlIHRoZSBOUEMgdG93YXJkIHRoZSBuZXcgaGVhZGluZ1xuICAgICAgICAgIGVsZW1lbnQucm90YXRpb24gPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG4gICAgICB9fSk7XG4gICAgfVxuICAgIGNhdGNoKGVycilcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSlcbiAgICB9XG59XG5cblxuQGluamVjdChSb3V0ZXIpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHkxIHtcbiAgd29ya3NwYWNlID0ge307XG4gIGludGVycHJldGVyID0ge307XG4gIHRvb2xib3g7XG4gIGdhbWUgPSB7fTtcbiAgaGVhbHRoeVBlcnNvbnMgPSB7fTtcbiAgaW5mZWN0ZWRQZXJzb25zID0ge307XG4gIGhlYWxlcnMgPSB7fTtcbiAgQ2hhcnREYXRhO1xuICBUaW1lU3RhbXAgPSAwO1xuICBTYW1wbGVSYXRlO1xuICBjdXJyZW50R2FtZU9iamVjdDtcbiAgRW50aXRpZXM7XG4gIFxuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcikge1xuICAgIG15QXBwID0gdGhpcztcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBQYXJzZS5pbml0aWFsaXplKFwibXlBcHBJZFwiKTsgICAgXG4gICAgUGFyc2Uuc2VydmVyVVJMID0gdXJsICsgXCI6XCIgKyBsb2NhdGlvbi5wb3J0ICsgJy9wYXJzZSc7XG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgdGhpcy5hY3Rpdml0eU5hbWUgPSBcIlBhcnQxXCI7XG4gIH1cblxuICAvL2JlZm9yZSB2aWV3LW1vZGVsIHJlbmRlcnNcbiAgYXR0YWNoZWQoKXtcbiAgICB0aGlzLnRvb2xib3ggPSB0aGlzLkxvYWRUb29sYm94KCk7XG4gICAgdGhpcy5nYW1lID0gbmV3IFBoYXNlci5HYW1lKDYwMCwgNjAwLCBQaGFzZXIuQVVUTywgJ3BoYXNlckRpdicsIHsgcHJlbG9hZDogcHJlbG9hZCwgY3JlYXRlOiBjcmVhdGUsIHVwZGF0ZTogdXBkYXRlIH0pO1xuICB9XG4gIFxuICBcbiAgZGV0YWNoZWQoKVxuICB7XG4gICAgICBteUFwcC5nYW1lLmRlc3Ryb3koKVxuICAgICAgLy9BZGQgU2F2aW5nIENvZGVcbiAgfVxuXG4gXG4gICAgXG4vLy8vLy8vLy8vLy8vLy8vL1NhdmUvTG9hZCBGdW5jdGlvbnNcbiAgU2F2ZVdvcmtzcGFjZSgpXG4gIHtcbiAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpO1xuICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuICAgIHRoaXMuZXhwb3J0KHhtbF90ZXh0KTtcbiAgfVxuXG4gIGV4cG9ydCh0ZXh0KSB7XG4gICAgdmFyIHBvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICAgIHBvbS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3dvcmtzcGFjZS54bWwnKTtcbiAgICBwb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvbSk7XG4gICAgcG9tLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb20pO1xuICB9XG5cbiAgTG9hZFdvcmtzcGFjZSgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy93b3Jrc3BhY2UueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgfVxuXG4gIExvYWRXb3Jrc3BhY2VDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgQmxvY2tseS5YbWwuZG9tVG9Xb3Jrc3BhY2UoeG1sLCBteUFwcC53b3Jrc3BhY2UpO1xuICB9XG4gIFxuXG4gIExvYWRJbml0aWFsV29ya3NwYWNlKClcbiAge1xuICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICB0aGlzLkxvYWRMYXN0U2F2ZSgpO1xuICAgICAgaWYobXlBcHAud29ya3NwYWNlLmdldEFsbEJsb2NrcygpLmxlbmd0aCA9PSAwKVxuICAgICAge1xuICAgICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvSW5pdGlhbFdvcmtzcGFjZXMvQWN0aXZpdHkxLnhtbFwiO1xuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgICBjbGllbnQuZ2V0KHVybCwgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2spO1xuICAgICAgfVxuICB9XG5cbiAgTG9hZFRvb2xCb3hDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLnRvb2xib3ggPSB4bWw7XG4gICAgICBteUFwcC53b3Jrc3BhY2UgPSBCbG9ja2x5LmluamVjdCgnYmxvY2tseURpdicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZWRpYTogJy4uL0Jsb2NrbHkvbWVkaWEvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJveDogbXlBcHAudG9vbGJveH0pO1xuICAgICAgbXlBcHAuTG9hZEluaXRpYWxXb3Jrc3BhY2UoKTtcbiAgfVxuICBMb2FkVG9vbGJveCgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9FcGlkZW1pY1Rvb2xib3gueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFRvb2xCb3hDYWxsYmFjayk7XG4gIH1cbiAgIEh0dHBDbGllbnQoKVxuICB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oYVVybCwgYUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYW5IdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICBpZiAoYW5IdHRwUmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgYW5IdHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIGFVcmwsIHRydWUgKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vUGhhc2VyIEhlbHBlciBmdW5jdGlvbnNcbiAgUmVzZXRQaGFzZXIoKVxuICB7XG4gICAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgICBjcmVhdGUoKTtcbiAgfVxuXG4gIGhhbmRsZUNvbGxpc2lvbigpXG4gIHtcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J2NvbGxpc2lvbicpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKHhtbCwgaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsdGhpcy5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgSGVhbHRoeUluZmVjdGVkQ29sbGlzaW9uKGhlYWx0aHksIGluZmVjdGVkKVxuICB7XG4gICAgICBoZWFsdGh5LmxvYWRUZXh0dXJlKCdyZWRiYWxsJylcbiAgICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLnJlbW92ZShoZWFsdGh5KVxuICAgICAgbXlBcHAuaW5mZWN0ZWRQZXJzb25zLmFkZChoZWFsdGh5KVxuICB9XG5cbiAgSGVhbGVySW5mZWN0ZWRDb2xsaXNpb24oaGVhbGVyLCBpbmZlY3RlZClcbiAge1xuICAgICAgaW5mZWN0ZWQubG9hZFRleHR1cmUoJ3dpemJhbGwnKVxuICAgICAgbXlBcHAuaW5mZWN0ZWRQZXJzb25zLnJlbW92ZShpbmZlY3RlZClcbiAgICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLmFkZChpbmZlY3RlZClcbiAgfVxuXG4gIHJ1blNpbXVsYXRpb24oKVxuICB7XG4gICAgbXlBcHAuUmVzZXRQaGFzZXIoKTtcbiAgICAvL0dldCBXaGVuUnVuIEhlYWRcbiAgICAvL1J1biBjb2RlXG4gICAgdmFyIHRlc3QgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKVxuICAgIC8vY29uc29sZS5sb2codGVzdCk7XG5cbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J3NpbXVsYXRpb24nKVxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayh4bWwsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLHRoaXMuaW5pdEFwaSk7XG4gICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcnVuQ29kZSgpe1xuICAgIHRoaXMucGFyYWxlbGxUZXN0KCk7XG4gICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKTtcbiAgICBjb25zb2xlLmxvZyhjb2RlKTtcbiAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgLypcbiAgICBCbG9ja2x5LkphdmFTY3JpcHQuSU5GSU5JVEVfTE9PUF9UUkFQID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgZXZhbChjb2RlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhbGVydChNU0dbJ2JhZENvZGUnXS5yZXBsYWNlKCclMScsIGUpKTtcbiAgICB9XG4gICAgKi9cbiAgfVxuXG4gIFxuICBpbml0QXBpKGludGVycHJldGVyLCBzY29wZSkge1xuICAvLyBBZGQgYW4gQVBJIGZ1bmN0aW9uIGZvciB0aGUgYWxlcnQoKSBibG9jay5cbiAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKHdpbmRvdy5hbGVydCh0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdhbGVydCcsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG5cbiAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVQZXJzb24oXCJQZXJzb25cIikpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZVBlcnNvbicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZVBlcnNvbih0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlTGFyZ2VFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKE1vdmVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ01vdmVFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0LGFnZSxzdGF0dXMpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIGFnZSA9IGFnZSA/IGFnZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpY3ModGV4dCxhZ2Usc3RhdHVzKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWNzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbihudW1iZXIsdGV4dCkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgICAgIG51bWJlciA9IG51bWJlciA/IG51bWJlci50b1N0cmluZygpIDogXCJcIlxuICAgICAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlTXVsdGlwbGVFbnRpdGllcyhudW1iZXIsdGV4dCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICAgIH07XG4gICAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlTXVsdGlwbGVFbnRpdGllcycsXG4gICAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB9XG4gICAgIFxuICAgUHVzaE9iamVjdCgpXG4gICB7XG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgR2FtZVNjb3JlID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIkdhbWVTY29yZVwiKTtcbiAgICAgICAgICAgIHZhciBnYW1lU2NvcmUgPSBuZXcgR2FtZVNjb3JlKCk7XG5cbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ3b3Jrc3BhY2VcIiwgeG1sX3RleHQpIDtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ1c2VybmFtZVwiLGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJBY3Rpdml0eU5hbWVcIix0aGlzLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZ2FtZVNjb3JlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZSwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICB9XG5cbiAgICBMb2dPdXQoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/XCIpID09IHRydWUpIFxuICAgICAgICB7XG4gICAgICAgICAgICBQYXJzZS5Vc2VyLmxvZ091dCgpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJ2hvbWUnKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgTG9hZExhc3RTYXZlKClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZ1wiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBQYXJzZS5RdWVyeShHYW1lU2NvcmUpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKFwidXNlcm5hbWVcIiwgY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oJ0FjdGl2aXR5TmFtZScsdGhpcy5hY3Rpdml0eU5hbWUpXG4gICAgICAgIHF1ZXJ5LmRlc2NlbmRpbmcoXCJ1cGRhdGVkQXRcIik7XG4gICAgICAgIHF1ZXJ5LmZpcnN0KHtcbiAgICAgICAgc3VjY2Vzczogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gb2JqZWN0LmF0dHJpYnV0ZXNbJ3dvcmtzcGFjZSddXG4gICAgICAgICAgICB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('activity2',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myApp;
    var responseText;
    var targetHeading;
    var myApp;
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
    function CreateMultipleEntities(num, type) {
        console.log("Here");
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
        else if (type == "Viruses") {
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
    }
    function CreateVirus() {
        GetCharacteristics("virusentity");
        var spriteName = VirusProperties.type;
        var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.body.setSize(5, 60, 23, 15);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("virusentity");
    }
    function CreateHospital() {
        var spriteName = "Hospital1";
        var c = myApp.Hospitals.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
    }
    function CreatePerson() {
        GetCharacteristics("personentity");
        var spriteName = PersonProperties.type;
        if (PersonProperties.status == "Sick") {
            spriteName += "Sick";
        }
        var c = {};
        if (myApp.Persons.length == 0) {
            c = myApp.Persons.create(100, 300, spriteName);
        }
        else {
            c = myApp.Persons.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.type = PersonProperties.type;
        c.age = PersonProperties.age;
        c.status = PersonProperties.status;
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("personentity");
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = type;
        PersonProperties.age = age;
        PersonProperties.status = status;
    }
    function SetVirusCharacteristics(virusType) {
        VirusProperties.type = virusType;
    }
    function GetCharacteristic(chartype, target) {
        var person = myApp.currentGameObject;
        if (target == "Collidee") {
            person = collidee;
        }
        if (chartype == "Age") {
            return person.age;
        }
        else if (chartype == "Status") {
            return person.status;
        }
        else if (chartype == "Type") {
            return person.type;
        }
        return "";
    }
    function SetCharacteristic(field, newValue) {
        if (field == "Status") {
            myApp.currentGameObject.status = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
                spriteName += "Sick";
            }
            myApp.currentGameObject.loadTexture(spriteName);
        }
        if (field == "Type") {
            myApp.currentGameObject.type = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
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
    function update() {
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Hospitals, myApp.PersonHospitalCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);
    }
    function GetCharacteristics(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                var in1 = xml.firstElementChild.firstElementChild;
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(in1, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code, myApp.initApi);
                interpreter.run();
                headless.dispose();
            }
        }
    }
    function ResetPhaser() {
        myApp.game.world.removeAll(true, false, false);
        create();
    }
    function GetCollisionBlockFromEntity(person, target) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'personentity') {
                var childBlocks = xml.getElementsByTagName("block");
                var collisionBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "collision") {
                        if (childBlocks[j].firstChild.innerText == target) {
                            collisionBlock = childBlocks[j];
                        }
                    }
                }
                if (collisionBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(collisionBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function CheckBehaviors(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                var childBlocks = xml.getElementsByTagName("block");
                var moveBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "move") {
                        moveBlock = childBlocks[j];
                    }
                }
                if (moveBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(moveBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function MoveEntity(direction) {
        if (direction == "Left") {
            myApp.currentGameObject.body.velocity.x = -100;
        }
        else if (direction == "Right") {
            myApp.currentGameObject.body.velocity.x = 100;
        }
        else if (direction == "Random") {
            myApp.currentGameObject.body.velocity.x = Math.random() * 200 - 100;
            myApp.currentGameObject.body.velocity.y = Math.random() * 200 - 100;
        }
    }
    var Activity2 = (function () {
        function Activity2(router) {
            this.workspace = {};
            this.interpreter = {};
            this.game = {};
            myApp = this;
            var url = window.location.protocol + '//' + window.location.hostname;
            Parse.initialize("myAppId");
            Parse.serverURL = url + ":" + location.port + '/parse';
            this.router = router;
            this.activityName = "Part2";
        }
        Activity2.prototype.attached = function () {
            this.toolbox = this.LoadToolbox();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
        };
        Activity2.prototype.HttpClient = function () {
            this.get = function (aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                };
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            };
        };
        Activity2.prototype.detached = function () {
            myApp.game.destroy();
        };
        Activity2.prototype.SaveWorkspace = function () {
            var xml = Blockly.Xml.workspaceToDom(this.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);
            this.export(xml_text);
        };
        Activity2.prototype.export = function (text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', 'workspace.xml');
            pom.style.display = 'none';
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
        };
        Activity2.prototype.LoadWorkspaceCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.workspace.clear();
            Blockly.Xml.domToWorkspace(xml, myApp.workspace);
        };
        Activity2.prototype.LoadInitialWorkspace = function () {
            myApp.workspace.clear();
            this.LoadLastSave();
            if (myApp.workspace.getAllBlocks().length == 0) {
                var url = "resources/InitialWorkspaces/Activity2.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
        };
        Activity2.prototype.LoadToolBoxCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.toolbox = xml;
            myApp.workspace = Blockly.inject('blocklyDiv', { media: '../Blockly/media/',
                toolbox: myApp.toolbox });
            myApp.LoadInitialWorkspace();
        };
        Activity2.prototype.LoadToolbox = function () {
            var url = "resources/EpidemicToolbox.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadToolBoxCallback);
        };
        Activity2.prototype.ResetPhaser = function () {
            myApp.game.world.removeAll(true, false, false);
            create();
        };
        Activity2.prototype.handleCollision = function () {
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'collision') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity2.prototype.HealthyInfectedCollision = function (healthy, infected) {
            healthy.loadTexture('redball');
            myApp.healthyPersons.remove(healthy);
            myApp.infectedPersons.add(healthy);
        };
        Activity2.prototype.HealerInfectedCollision = function (healer, infected) {
            infected.loadTexture('wizball');
            myApp.infectedPersons.remove(infected);
            myApp.healthyPersons.add(infected);
        };
        Activity2.prototype.PersonVirusCollision = function (person, virus) {
            myApp.currentGameObject = person;
            GetCollisionBlockFromEntity(person, "Virus");
        };
        Activity2.prototype.PersonPersonCollision = function (person1, person2) {
            myApp.currentGameObject = person1;
            collidee = person2;
            GetCollisionBlockFromEntity(person1, "Person");
            myApp.currentGameObject = person2;
            collidee = person1;
            GetCollisionBlockFromEntity(person2, "Person");
        };
        Activity2.prototype.PersonHospitalCollision = function (person1, hospital) {
            console.log("Boop");
        };
        Activity2.prototype.runSimulation = function () {
            myApp.ResetPhaser();
            var test = Blockly.JavaScript.workspaceToCode(this.workspace);
            console.log(test);
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'simulation') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity2.prototype.initApi = function (interpreter, scope) {
            var wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(window.alert(text));
            };
            interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(myApp.setColor(text));
            };
            interpreter.setProperty(scope, 'SetColor', interpreter.createNativeFunction(wrapper));
            wrapper = function () {
                var test = interpreter.createPrimitive(CreateEntity("Person"));
                return test;
            };
            interpreter.setProperty(scope, 'CreatePerson', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(CreateEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateLargeEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(MoveEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'MoveEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text, age, status) {
                text = text ? text.toString() : '';
                status = status ? status.toString() : "";
                age = age ? age.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristics(text, age, status));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(SetVirusCharacteristics(text));
                return test;
            };
            interpreter.setProperty(scope, 'SetVirusCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, newValue) {
                characteristic = characteristic ? characteristic.toString() : '';
                newValue = newValue ? newValue.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristic(characteristic, newValue));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, target) {
                characteristic = characteristic ? characteristic.toString() : '';
                target = target ? target.toString() : "";
                var test = interpreter.createPrimitive(GetCharacteristic(characteristic, target));
                return test;
            };
            interpreter.setProperty(scope, 'GetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (number, text) {
                text = text ? text.toString() : '';
                number = number ? number.toString() : "";
                var test = interpreter.createPrimitive(CreateMultipleEntities(number, text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateMultipleEntities', interpreter.createNativeFunction(wrapper));
        };
        Activity2.prototype.PushObject = function () {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(this.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var GameScore = Parse.Object.extend("GameScore");
                var gameScore = new GameScore();
                gameScore.set("workspace", xml_text);
                gameScore.set("username", currentUser.getUsername());
                gameScore.set("sessionToken", currentUser.getSessionToken());
                gameScore.set("ActivityName", this.activityName);
                gameScore.save(null, {
                    success: function (gameScore) {
                        alert('Workspace Saved!');
                    },
                    error: function (gameScore, error) {
                        alert('Failed to save workspace, with error code: ' + error.message);
                    }
                });
            }
            else {
                alert("User not logged in");
            }
        };
        Activity2.prototype.LogOut = function () {
            if (confirm("Are you sure you want to log out?") == true) {
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity2.prototype.LoadLastSave = function () {
            var _this = this;
            var currentUser = Parse.User.current();
            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.equalTo("username", currentUser.getUsername());
            query.equalTo('ActivityName', this.activityName);
            query.descending("updatedAt");
            query.first({
                success: function (object) {
                    var text = object.attributes['workspace'];
                    _this.LoadWorkspaceCallback(text);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
        return Activity2;
    }());
    Activity2 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity2);
    exports.Activity2 = Activity2;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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WUFDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDWixPQUFPLEVBQUUsVUFBQSxNQUFNO29CQUNYLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQ3pDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFDRCxLQUFLLEVBQUUsVUFBUyxLQUFLO29CQUNqQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEQsQ0FBQzthQUNBLENBQUMsQ0FBQztRQUNQLENBQUM7UUFLTCxnQkFBQztJQUFELENBcFZBLEFBb1ZDLElBQUE7SUFwVlksU0FBUztRQURyQiwwQkFBTSxDQUFDLHVCQUFNLENBQUM7O09BQ0YsU0FBUyxDQW9WckI7SUFwVlksOEJBQVMiLCJmaWxlIjoiYWN0aXZpdHkyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Um91dGVyQ29uZmlndXJhdGlvbiwgUm91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbnZhciBteUFwcFxudmFyIHJlc3BvbnNlVGV4dFxudmFyIHRhcmdldEhlYWRpbmdcbnZhciBteUFwcFxuXG52YXIgUGVyc29uUHJvcGVydGllcyA9IHt9O1xudmFyIFZpcnVzUHJvcGVydGllcyA9IHt9O1xuXG52YXIgY29sbGlkZWU7XG5cbmZ1bmN0aW9uIHByZWxvYWQoKSB7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4xJywgJ2Fzc2V0cy9NYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMicsICdhc3NldHMvTWFuMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMScsICdhc3NldHMvV29tYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4yJywgJ2Fzc2V0cy9Xb21hbjIucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjFTaWNrJywgJ2Fzc2V0cy9NYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yU2ljaycsICdhc3NldHMvTWFuMl9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xU2ljaycsICdhc3NldHMvV29tYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjJTaWNrJywgJ2Fzc2V0cy9Xb21hbjJfc2ljay5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMxJywgJ2Fzc2V0cy9WaXJ1czEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czInLCAnYXNzZXRzL1ZpcnVzMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMycsICdhc3NldHMvVmlydXMzLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdIb3NwaXRhbDEnLCAnYXNzZXRzL0hvc3BpdGFsMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ0hvc3BpdGFsMicsICdhc3NldHMvSG9zcGl0YWwyLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnSG9zcGl0YWwzJywgJ2Fzc2V0cy9Ib3NwaXRhbDMucG5nJyk7XG5cblxuXG59XG5cbmZ1bmN0aW9uIENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtLHR5cGUpXG57XG4gICAgY29uc29sZS5sb2coXCJIZXJlXCIpXG4gICAgaWYobnVtIDw9IDApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB4PTA7XG5cbiAgICBpZih0eXBlID09IFwiUGVvcGxlXCIpXG4gICAge1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlUGVyc29uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlID09IFwiSG9zcGl0YWxcIilcbiAgICB7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhPU1BJVEFMXCIpXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09IFwiVmlydXNlc1wiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVZpcnVzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBDcmVhdGVWaXJ1cygpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKFwidmlydXNlbnRpdHlcIik7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBWaXJ1c1Byb3BlcnRpZXMudHlwZTtcblxuICAgIHZhciBjID0gbXlBcHAuVmlydXNlcy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLmJvZHkuc2V0U2l6ZSg1LDYwLDIzLDE1KVxuICAgIC8vYy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbiAgICBDaGVja0JlaGF2aW9ycyhcInZpcnVzZW50aXR5XCIpXG59XG5cbmZ1bmN0aW9uIENyZWF0ZUhvc3BpdGFsKClcbntcbiAgICAgLy9HZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFwiSG9zcGl0YWwxXCJcblxuICAgIHZhciBjID0gbXlBcHAuSG9zcGl0YWxzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgLy9jLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlUGVyc29uKClcbntcbiAgICBHZXRDaGFyYWN0ZXJpc3RpY3MoXCJwZXJzb25lbnRpdHlcIik7XG5cbiAgICB2YXIgc3ByaXRlTmFtZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcblxuICAgIGlmKFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID09IFwiU2lja1wiKVxuICAgIHtcbiAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9XG4gICAgaWYobXlBcHAuUGVyc29ucy5sZW5ndGggPT0gMClcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZSgxMDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLnR5cGUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG4gICAgYy5hZ2UgPSBQZXJzb25Qcm9wZXJ0aWVzLmFnZTtcbiAgICBjLnN0YXR1cyA9IFBlcnNvblByb3BlcnRpZXMuc3RhdHVzO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIENoZWNrQmVoYXZpb3JzKFwicGVyc29uZW50aXR5XCIpO1xufVxuXG5mdW5jdGlvbiBTZXRDaGFyYWN0ZXJpc3RpY3ModHlwZSxhZ2Usc3RhdHVzKVxue1xuICAgIFBlcnNvblByb3BlcnRpZXMudHlwZSA9IHR5cGU7XG4gICAgUGVyc29uUHJvcGVydGllcy5hZ2UgPSBhZ2U7XG4gICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHZpcnVzVHlwZSlcbntcbiAgICBWaXJ1c1Byb3BlcnRpZXMudHlwZSA9IHZpcnVzVHlwZTtcbn1cblxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcnR5cGUsIHRhcmdldClcbntcbiAgICB2YXIgcGVyc29uID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3RcbiAgICBpZih0YXJnZXQgPT0gXCJDb2xsaWRlZVwiKVxuICAgIHtcbiAgICAgICAgcGVyc29uID0gY29sbGlkZWVcbiAgICB9XG4gICAgXG4gICAgaWYoY2hhcnR5cGUgPT0gXCJBZ2VcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICByZXR1cm4gcGVyc29uLnN0YXR1cztcbiAgICB9XG4gICAgZWxzZSBpZihjaGFydHlwZSA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24udHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcblxufVxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljKGZpZWxkLG5ld1ZhbHVlKVxue1xuICAgIGlmKGZpZWxkID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuXG4gICAgaWYoZmllbGQgPT0gXCJUeXBlXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlID0gbmV3VmFsdWU7XG4gICAgICAgIHZhciBzcHJpdGVOYW1lID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3QudHlwZTtcbiAgICAgICAgaWYobXlBcHAuY3VycmVudEdhbWVPYmplY3Quc3RhdHVzID09IFwiU2lja1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgICAgICB9XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmxvYWRUZXh0dXJlKHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICAgICAgXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICBteUFwcC5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiI2RiZDZkN1wiO1xuICAgIG15QXBwLlBlcnNvbnMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLlBlcnNvbnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuUGVyc29ucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBteUFwcC5WaXJ1c2VzID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5WaXJ1c2VzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlZpcnVzZXMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuXG4gICAgbXlBcHAuSG9zcGl0YWxzID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5Ib3NwaXRhbHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuSG9zcGl0YWxzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbn1cblxuXG5mdW5jdGlvbiB1cGRhdGUoKVxue1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25QZXJzb25Db2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpO1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5WaXJ1c2VzLCBteUFwcC5QZXJzb25WaXJ1c0NvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLkhvc3BpdGFscywgbXlBcHAuUGVyc29uSG9zcGl0YWxDb2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpO1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5WaXJ1c2VzLCBteUFwcC5WaXJ1c2VzLCBudWxsLCBudWxsLCB0aGlzKTtcbn1cblxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWNzKGVudGl0eVR5cGUpXG57XG4gICAgLy9HZXQgRW50aXR5IEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0gZW50aXR5VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgIHZhciBpbjEgPSB4bWwuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7ICAgICAgXG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhpbjEsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBSZXNldFBoYXNlcigpXG57XG4gIG15QXBwLmdhbWUud29ybGQucmVtb3ZlQWxsKHRydWUsZmFsc2UsZmFsc2UpXG4gIGNyZWF0ZSgpO1xufVxuXG5mdW5jdGlvbiBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uLHRhcmdldClcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0ncGVyc29uZW50aXR5JylcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBjb2xsaXNpb25CbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJjb2xsaXNpb25cIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5maXJzdENoaWxkLmlubmVyVGV4dD09dGFyZ2V0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKGNvbGxpc2lvbkJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKGNvbGxpc2lvbkJsb2NrLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tCZWhhdmlvcnMoZW50aXR5VHlwZSlcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0gZW50aXR5VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBtb3ZlQmxvY2sgPSBudWxsO1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGNoaWxkQmxvY2tzLmxlbmd0aDsgaisrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmdldEF0dHJpYnV0ZSgndHlwZScpID09IFwibW92ZVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vdmVCbG9jayA9IGNoaWxkQmxvY2tzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZihtb3ZlQmxvY2sgIT0gbnVsbClcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2sobW92ZUJsb2NrLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0V4ZWN1dGUgTW92ZSBCbG9ja1xufVxuXG5mdW5jdGlvbiBNb3ZlRW50aXR5KGRpcmVjdGlvbilcbnsgIFxuICAgIGlmKGRpcmVjdGlvbiA9PSBcIkxlZnRcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IC0xMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmlnaHRcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IDEwMDtcbiAgICB9XG4gICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gXCJSYW5kb21cIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueCA9IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDA7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueSA9IE1hdGgucmFuZG9tKCkgKiAyMDAgLSAxMDA7XG4gICAgfVxufVxuXG5AaW5qZWN0KFJvdXRlcilcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eTIge1xuICB3b3Jrc3BhY2UgPSB7fTtcbiAgaW50ZXJwcmV0ZXIgPSB7fTtcbiAgdG9vbGJveDtcbiAgZ2FtZSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcikge1xuICAgIG15QXBwID0gdGhpcztcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBQYXJzZS5pbml0aWFsaXplKFwibXlBcHBJZFwiKTsgICAgXG4gICAgUGFyc2Uuc2VydmVyVVJMID0gdXJsICsgXCI6XCIgKyBsb2NhdGlvbi5wb3J0ICsgJy9wYXJzZSc7XG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgdGhpcy5hY3Rpdml0eU5hbWUgPSBcIlBhcnQyXCI7XG4gIH1cblxuICAvL2JlZm9yZSB2aWV3LW1vZGVsIHJlbmRlcnNcbiAgYXR0YWNoZWQoKXtcbiAgICB0aGlzLnRvb2xib3ggPSB0aGlzLkxvYWRUb29sYm94KCk7XG4gICAgdGhpcy5nYW1lID0gbmV3IFBoYXNlci5HYW1lKDYwMCwgNjAwLCBQaGFzZXIuQVVUTywgJ3BoYXNlckRpdicsIHsgcHJlbG9hZDogcHJlbG9hZCwgY3JlYXRlOiBjcmVhdGUsIHVwZGF0ZTogdXBkYXRlIH0pO1xuICB9XG5cbkh0dHBDbGllbnQoKVxuICAgIHtcbiAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihhVXJsLCBhQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBhbkh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgIGlmIChhbkh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiBhbkh0dHBSZXF1ZXN0LnN0YXR1cyA9PSAyMDApXG4gICAgICAgICAgICAgICAgICAgIGFDYWxsYmFjayhhbkh0dHBSZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Qub3BlbiggXCJHRVRcIiwgYVVybCwgdHJ1ZSApOyAgICAgICAgICAgIFxuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5zZW5kKCBudWxsICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgZGV0YWNoZWQoKVxuICB7XG4gICAgICBteUFwcC5nYW1lLmRlc3Ryb3koKVxuICB9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vL1NhdmUvTG9hZCBGdW5jdGlvbnNcbiAgU2F2ZVdvcmtzcGFjZSgpXG4gIHtcbiAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpO1xuICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuICAgIHRoaXMuZXhwb3J0KHhtbF90ZXh0KTtcbiAgfVxuXG4gIGV4cG9ydCh0ZXh0KSB7XG4gICAgdmFyIHBvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICAgIHBvbS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3dvcmtzcGFjZS54bWwnKTtcbiAgICBwb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvbSk7XG4gICAgcG9tLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb20pO1xuICB9XG5cbiAgTG9hZFdvcmtzcGFjZUNhbGxiYWNrKFJlc3BvbnNlVGV4dClcbiAge1xuICAgICAgdmFyIHhtbF90ZXh0ICA9IFJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC50ZXh0VG9Eb20oeG1sX3RleHQpO1xuICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICBCbG9ja2x5LlhtbC5kb21Ub1dvcmtzcGFjZSh4bWwsIG15QXBwLndvcmtzcGFjZSk7XG4gIH1cblxuICBMb2FkSW5pdGlhbFdvcmtzcGFjZSgpXG4gIHtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgdGhpcy5Mb2FkTGFzdFNhdmUoKTtcbiAgICAgIGlmKG15QXBwLndvcmtzcGFjZS5nZXRBbGxCbG9ja3MoKS5sZW5ndGggPT0gMClcbiAgICAgIHtcbiAgICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL0luaXRpYWxXb3Jrc3BhY2VzL0FjdGl2aXR5Mi54bWxcIjtcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgICAgIH1cbiAgfVxuXG4gIExvYWRUb29sQm94Q2FsbGJhY2soUmVzcG9uc2VUZXh0KVxuICB7XG4gICAgICB2YXIgeG1sX3RleHQgID0gUmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLnRleHRUb0RvbSh4bWxfdGV4dCk7XG4gICAgICBteUFwcC50b29sYm94ID0geG1sO1xuICAgICAgbXlBcHAud29ya3NwYWNlID0gQmxvY2tseS5pbmplY3QoJ2Jsb2NrbHlEaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVkaWE6ICcuLi9CbG9ja2x5L21lZGlhLycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xib3g6IG15QXBwLnRvb2xib3h9KTtcbiAgICAgIG15QXBwLkxvYWRJbml0aWFsV29ya3NwYWNlKCk7XG4gIH1cblxuICBMb2FkVG9vbGJveCgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9FcGlkZW1pY1Rvb2xib3gueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFRvb2xCb3hDYWxsYmFjayk7XG4gIH1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy9QaGFzZXIgSGVscGVyIGZ1bmN0aW9uc1xuICBSZXNldFBoYXNlcigpXG4gIHtcbiAgICBteUFwcC5nYW1lLndvcmxkLnJlbW92ZUFsbCh0cnVlLGZhbHNlLGZhbHNlKVxuICAgIGNyZWF0ZSgpO1xuICB9XG5cbiAgaGFuZGxlQ29sbGlzaW9uKClcbiAge1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nY29sbGlzaW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBIZWFsdGh5SW5mZWN0ZWRDb2xsaXNpb24oaGVhbHRoeSwgaW5mZWN0ZWQpXG4gIHtcbiAgICAgIGhlYWx0aHkubG9hZFRleHR1cmUoJ3JlZGJhbGwnKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMucmVtb3ZlKGhlYWx0aHkpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMuYWRkKGhlYWx0aHkpXG4gIH1cblxuICBIZWFsZXJJbmZlY3RlZENvbGxpc2lvbihoZWFsZXIsIGluZmVjdGVkKVxuICB7XG4gICAgICBpbmZlY3RlZC5sb2FkVGV4dHVyZSgnd2l6YmFsbCcpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMucmVtb3ZlKGluZmVjdGVkKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMuYWRkKGluZmVjdGVkKVxuICB9XG5cbiAgUGVyc29uVmlydXNDb2xsaXNpb24ocGVyc29uLHZpcnVzKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sXCJWaXJ1c1wiKVxuICAgICAgXG4gIH1cblxuICBQZXJzb25QZXJzb25Db2xsaXNpb24ocGVyc29uMSxwZXJzb24yKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjE7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjI7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMSxcIlBlcnNvblwiKVxuXG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjI7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjE7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMixcIlBlcnNvblwiKVxuICB9XG5cbiAgUGVyc29uSG9zcGl0YWxDb2xsaXNpb24ocGVyc29uMSwgaG9zcGl0YWwpXG4gIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQm9vcFwiKVxuICB9XG5cblxuICBydW5TaW11bGF0aW9uKClcbiAge1xuICAgIG15QXBwLlJlc2V0UGhhc2VyKCk7XG4gICAgLy9HZXQgV2hlblJ1biBIZWFkXG4gICAgLy9SdW4gY29kZVxuICAgIHZhciB0ZXN0ID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZSh0aGlzLndvcmtzcGFjZSlcbiAgICBjb25zb2xlLmxvZyh0ZXN0KTtcblxuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nc2ltdWxhdGlvbicpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKHhtbCwgaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsdGhpcy5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaW5pdEFwaShpbnRlcnByZXRlciwgc2NvcGUpIHtcbiAgLy8gQWRkIGFuIEFQSSBmdW5jdGlvbiBmb3IgdGhlIGFsZXJ0KCkgYmxvY2suXG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZSh3aW5kb3cuYWxlcnQodGV4dCkpO1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnYWxlcnQnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShteUFwcC5zZXRDb2xvcih0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDb2xvcicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuICAgICAgXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlRW50aXR5KFwiUGVyc29uXCIpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVQZXJzb24nLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZUxhcmdlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShNb3ZlRW50aXR5KHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdNb3ZlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0LGFnZSxzdGF0dXMpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIGFnZSA9IGFnZSA/IGFnZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpY3ModGV4dCxhZ2Usc3RhdHVzKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWNzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRWaXJ1c0NoYXJhY3RlcmlzdGljcyh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0VmlydXNDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSB7XG4gICAgICAgIGNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWMgPyBjaGFyYWN0ZXJpc3RpYy50b1N0cmluZygpIDogJyc7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBuZXdWYWx1ZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpYyxuZXdWYWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihjaGFyYWN0ZXJpc3RpYyx0YXJnZXQpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID8gdGFyZ2V0LnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKEdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLHRhcmdldCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0dldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7IFxuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24obnVtYmVyLHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyID8gbnVtYmVyLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtYmVyLHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVNdWx0aXBsZUVudGl0aWVzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7ICAgIFxuXG4gICAgfVxuICAgIFxuICAgIFB1c2hPYmplY3QoKVxuICAgIHtcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gUGFyc2UuVXNlci5jdXJyZW50KCk7XG4gICAgICAgIGlmKGN1cnJlbnRVc2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpO1xuICAgICAgICAgICAgdmFyIHhtbF90ZXh0ID0gQmxvY2tseS5YbWwuZG9tVG9QcmV0dHlUZXh0KHhtbCk7XG5cbiAgICAgICAgICAgIHZhciBHYW1lU2NvcmUgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiR2FtZVNjb3JlXCIpO1xuICAgICAgICAgICAgdmFyIGdhbWVTY29yZSA9IG5ldyBHYW1lU2NvcmUoKTtcblxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcIndvcmtzcGFjZVwiLCB4bWxfdGV4dCkgO1xuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcInVzZXJuYW1lXCIsY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwic2Vzc2lvblRva2VuXCIsY3VycmVudFVzZXIuZ2V0U2Vzc2lvblRva2VuKCkpO1xuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcIkFjdGl2aXR5TmFtZVwiLHRoaXMuYWN0aXZpdHlOYW1lKTtcbiAgICAgICAgXG4gICAgICAgICAgICBnYW1lU2NvcmUuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZ2FtZVNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgYWZ0ZXIgdGhlIG9iamVjdCBpcyBzYXZlZC5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1dvcmtzcGFjZSBTYXZlZCEnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihnYW1lU2NvcmUsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgaWYgdGhlIHNhdmUgZmFpbHMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGlzIGEgUGFyc2UuRXJyb3Igd2l0aCBhbiBlcnJvciBjb2RlIGFuZCBtZXNzYWdlLlxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRmFpbGVkIHRvIHNhdmUgd29ya3NwYWNlLCB3aXRoIGVycm9yIGNvZGU6ICcgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiVXNlciBub3QgbG9nZ2VkIGluXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBMb2dPdXQoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/XCIpID09IHRydWUpIFxuICAgICAgICB7XG4gICAgICAgICAgICBQYXJzZS5Vc2VyLmxvZ091dCgpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoJ2hvbWUnKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgIExvYWRMYXN0U2F2ZSgpXG4gICAge1xuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBQYXJzZS5RdWVyeShHYW1lU2NvcmUpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKFwidXNlcm5hbWVcIiwgY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oJ0FjdGl2aXR5TmFtZScsdGhpcy5hY3Rpdml0eU5hbWUpXG4gICAgICAgIHF1ZXJ5LmRlc2NlbmRpbmcoXCJ1cGRhdGVkQXRcIik7XG4gICAgICAgIHF1ZXJ5LmZpcnN0KHtcbiAgICAgICAgc3VjY2Vzczogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gb2JqZWN0LmF0dHJpYnV0ZXNbJ3dvcmtzcGFjZSddXG4gICAgICAgICAgICB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFxuXG5cbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('activity3',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myApp;
    var responseText;
    var myApp;
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
    }
    function CreateMultipleEntities(num, type) {
        console.log("Here");
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
        else if (type == "Viruses") {
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
    }
    function create() {
        myApp.game.stage.backgroundColor = "#dbd6d7";
        myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
        myApp.Persons = myApp.game.add.group();
        myApp.Persons.enableBody = true;
        myApp.Persons.physicsBodyType = Phaser.Physics.ARCADE;
        myApp.Viruses = myApp.game.add.group();
        myApp.Viruses.enableBody = true;
        myApp.Viruses.physicsBodyType = Phaser.Physics.ARCADE;
    }
    function update() {
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = type;
        PersonProperties.age = age;
        PersonProperties.status = status;
    }
    function SetVirusCharacteristics(virusType) {
        VirusProperties.type = virusType;
    }
    function GetCharacteristic(chartype, target) {
        var person = myApp.currentGameObject;
        if (target == "Collidee") {
            person = collidee;
        }
        if (chartype == "Age") {
            return person.age;
        }
        else if (chartype == "Status") {
            return person.status;
        }
        else if (chartype == "Type") {
            return person.type;
        }
        return "";
    }
    function SetCharacteristic(field, newValue) {
        if (field == "Status") {
            myApp.currentGameObject.status = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
                spriteName += "Sick";
            }
            myApp.currentGameObject.loadTexture(spriteName);
        }
        if (field == "Type") {
            myApp.currentGameObject.type = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
                spriteName += "Sick";
            }
            myApp.currentGameObject.loadTexture(spriteName);
        }
    }
    function GetCharacteristics(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                var in1 = xml.firstElementChild.firstElementChild;
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(in1, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code, myApp.initApi);
                interpreter.run();
                headless.dispose();
            }
        }
    }
    function CreateVirus() {
        GetCharacteristics("virusentity");
        var spriteName = VirusProperties.type;
        var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.body.setSize(5, 60, 23, 15);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("virusentity");
    }
    function CreateHospital() {
        var spriteName = "Hospital1";
        var c = myApp.Hospitals.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        c.body.immovable = true;
    }
    function CreatePerson() {
        GetCharacteristics("personentity");
        var spriteName = PersonProperties.type;
        if (PersonProperties.status == "Sick") {
            spriteName += "Sick";
        }
        var c = {};
        if (myApp.Persons.length == 0) {
            c = myApp.Persons.create(100, 300, spriteName);
        }
        else {
            c = myApp.Persons.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.type = PersonProperties.type;
        c.age = PersonProperties.age;
        c.status = PersonProperties.status;
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("personentity");
    }
    function CheckBehaviors(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                var childBlocks = xml.getElementsByTagName("block");
                var moveBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "move") {
                        moveBlock = childBlocks[j];
                    }
                }
                if (moveBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(moveBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function GetCollisionBlockFromEntity(person, target) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'personentity') {
                var childBlocks = xml.getElementsByTagName("block");
                var collisionBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "collision") {
                        if (childBlocks[j].firstChild.innerText == target) {
                            collisionBlock = childBlocks[j];
                        }
                    }
                }
                if (collisionBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(collisionBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function MoveEntity(direction) {
        if (direction == "Left") {
            myApp.currentGameObject.body.velocity.x = -100;
        }
        else if (direction == "Right") {
            myApp.currentGameObject.body.velocity.x = 100;
        }
        else if (direction == "Random") {
            myApp.currentGameObject.body.velocity.x = Math.random() * 100 - 50;
            myApp.currentGameObject.body.velocity.y = Math.random() * 100 - 50;
        }
    }
    function ResetPhaser() {
        myApp.game.world.removeAll(true, false, false);
        create();
    }
    var Activity3 = (function () {
        function Activity3(router) {
            this.workspace = {};
            this.interpreter = {};
            this.game = {};
            this.healthyPersons = {};
            this.infectedPersons = {};
            this.healers = {};
            this.TimeStamp = 0;
            myApp = this;
            var url = window.location.protocol + '//' + window.location.hostname;
            Parse.initialize("myAppId");
            Parse.serverURL = url + ":" + location.port + '/parse';
            this.router = router;
            this.activityName = "Part3";
        }
        Activity3.prototype.attached = function () {
            this.toolbox = this.LoadToolbox();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
        };
        Activity3.prototype.detached = function () {
            myApp.game.destroy();
        };
        Activity3.prototype.SaveWorkspace = function () {
            var xml = Blockly.Xml.workspaceToDom(this.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);
            this.export(xml_text);
        };
        Activity3.prototype.export = function (text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', 'workspace.xml');
            pom.style.display = 'none';
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
        };
        Activity3.prototype.LoadWorkspace = function () {
            var url = "resources/workspace.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadWorkspaceCallback);
        };
        Activity3.prototype.LoadWorkspaceCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.workspace.clear();
            Blockly.Xml.domToWorkspace(xml, myApp.workspace);
        };
        Activity3.prototype.LoadInitialWorkspace = function () {
            myApp.workspace.clear();
            this.LoadLastSave();
            if (myApp.workspace.getAllBlocks().length == 0) {
                var url = "resources/InitialWorkspaces/Activity3.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
        };
        Activity3.prototype.LoadToolBoxCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.toolbox = xml;
            myApp.workspace = Blockly.inject('blocklyDiv', { media: '../Blockly/media/',
                toolbox: myApp.toolbox });
            myApp.LoadInitialWorkspace();
        };
        Activity3.prototype.LoadToolbox = function () {
            var url = "resources/EpidemicToolbox.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadToolBoxCallback);
        };
        Activity3.prototype.HttpClient = function () {
            this.get = function (aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                };
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            };
        };
        Activity3.prototype.ResetPhaser = function () {
            myApp.game.world.removeAll(true, false, false);
            create();
        };
        Activity3.prototype.handleCollision = function () {
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'collision') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity3.prototype.PersonVirusCollision = function (person, virus) {
            myApp.currentGameObject = person;
            GetCollisionBlockFromEntity(person, "Virus");
        };
        Activity3.prototype.PersonPersonCollision = function (person1, person2) {
            myApp.currentGameObject = person1;
            collidee = person2;
            GetCollisionBlockFromEntity(person1, "Person");
            myApp.currentGameObject = person2;
            collidee = person1;
            GetCollisionBlockFromEntity(person2, "Person");
        };
        Activity3.prototype.HealthyInfectedCollision = function (healthy, infected) {
            healthy.loadTexture('redball');
            myApp.healthyPersons.remove(healthy);
            myApp.infectedPersons.add(healthy);
        };
        Activity3.prototype.HealerInfectedCollision = function (healer, infected) {
            infected.loadTexture('wizball');
            myApp.infectedPersons.remove(infected);
            myApp.healthyPersons.add(infected);
        };
        Activity3.prototype.runSimulation = function () {
            myApp.ResetPhaser();
            var test = Blockly.JavaScript.workspaceToCode(this.workspace);
            console.log(test);
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'simulation') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity3.prototype.initApi = function (interpreter, scope) {
            var wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(window.alert(text));
            };
            interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(myApp.setColor(text));
            };
            interpreter.setProperty(scope, 'SetColor', interpreter.createNativeFunction(wrapper));
            wrapper = function () {
                var test = interpreter.createPrimitive(CreateEntity("Person"));
                return test;
            };
            interpreter.setProperty(scope, 'CreatePerson', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(CreateEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateLargeEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(MoveEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'MoveEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text, age, status) {
                text = text ? text.toString() : '';
                status = status ? status.toString() : "";
                age = age ? age.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristics(text, age, status));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(SetVirusCharacteristics(text));
                return test;
            };
            interpreter.setProperty(scope, 'SetVirusCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, newValue) {
                characteristic = characteristic ? characteristic.toString() : '';
                newValue = newValue ? newValue.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristic(characteristic, newValue));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, target) {
                characteristic = characteristic ? characteristic.toString() : '';
                target = target ? target.toString() : "";
                var test = interpreter.createPrimitive(GetCharacteristic(characteristic, target));
                return test;
            };
            interpreter.setProperty(scope, 'GetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (number, text) {
                text = text ? text.toString() : '';
                number = number ? number.toString() : "";
                var test = interpreter.createPrimitive(CreateMultipleEntities(number, text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateMultipleEntities', interpreter.createNativeFunction(wrapper));
        };
        Activity3.prototype.PushObject = function () {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(this.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var GameScore = Parse.Object.extend("GameScore");
                var gameScore = new GameScore();
                gameScore.set("workspace", xml_text);
                gameScore.set("username", currentUser.getUsername());
                gameScore.set("sessionToken", currentUser.getSessionToken());
                gameScore.set("ActivityName", this.activityName);
                gameScore.save(null, {
                    success: function (gameScore) {
                        alert('Workspace Saved!');
                    },
                    error: function (gameScore, error) {
                        alert('Failed to save workspace, with error code: ' + error.message);
                    }
                });
            }
            else {
                alert("User not logged in");
            }
        };
        Activity3.prototype.LoadLastSave = function () {
            var _this = this;
            console.log("Loading");
            var currentUser = Parse.User.current();
            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.equalTo("username", currentUser.getUsername());
            query.equalTo('ActivityName', this.activityName);
            query.descending("updatedAt");
            query.first({
                success: function (object) {
                    var text = object.attributes['workspace'];
                    _this.LoadWorkspaceCallback(text);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
        Activity3.prototype.LogOut = function () {
            if (confirm("Are you sure you want to log out?") == true) {
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        return Activity3;
    }());
    Activity3 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity3);
    exports.Activity3 = Activity3;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDN0MsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEQsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFdEQsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDMUQsQ0FBQztJQUVEO1FBQ0ssS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEgsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckgsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtB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QVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQ0QsSUFBSSxDQUNKLENBQUM7WUFDRCxDQUFDO1FBQ0wsQ0FBQztRQUlMLGdCQUFDO0lBQUQsQ0E5VkEsQUE4VkMsSUFBQTtJQTlWWSxTQUFTO1FBRHJCLDBCQUFNLENBQUMsdUJBQU0sQ0FBQzs7T0FDRixTQUFTLENBOFZyQjtJQTlWWSw4QkFBUyIsImZpbGUiOiJhY3Rpdml0eTMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSb3V0ZXJDb25maWd1cmF0aW9uLCBSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxudmFyIG15QXBwXG52YXIgcmVzcG9uc2VUZXh0XG52YXIgbXlBcHBcblxudmFyIFBlcnNvblByb3BlcnRpZXMgPSB7fTtcbnZhciBWaXJ1c1Byb3BlcnRpZXMgPSB7fTtcblxudmFyIGNvbGxpZGVlO1xuXG5mdW5jdGlvbiBwcmVsb2FkKCkgeyAgICBcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjEnLCAnYXNzZXRzL01hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yJywgJ2Fzc2V0cy9NYW4yLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xJywgJ2Fzc2V0cy9Xb21hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjInLCAnYXNzZXRzL1dvbWFuMi5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMVNpY2snLCAnYXNzZXRzL01hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjJTaWNrJywgJ2Fzc2V0cy9NYW4yX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjFTaWNrJywgJ2Fzc2V0cy9Xb21hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMlNpY2snLCAnYXNzZXRzL1dvbWFuMl9zaWNrLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czEnLCAnYXNzZXRzL1ZpcnVzMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMicsICdhc3NldHMvVmlydXMyLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMzJywgJ2Fzc2V0cy9WaXJ1czMucG5nJyk7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtLHR5cGUpXG57XG4gICAgY29uc29sZS5sb2coXCJIZXJlXCIpXG4gICAgaWYobnVtIDw9IDApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB4PTA7XG5cbiAgICBpZih0eXBlID09IFwiUGVvcGxlXCIpXG4gICAge1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlUGVyc29uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlID09IFwiSG9zcGl0YWxcIilcbiAgICB7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhPU1BJVEFMXCIpXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09IFwiVmlydXNlc1wiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVZpcnVzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAvLyAgV2UncmUgZ29pbmcgdG8gYmUgdXNpbmcgcGh5c2ljcywgc28gZW5hYmxlIHRoZSBBcmNhZGUgUGh5c2ljcyBzeXN0ZW1cbiAgICBteUFwcC5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiI2RiZDZkN1wiO1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgIFxuICAgIG15QXBwLlBlcnNvbnMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLlBlcnNvbnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuUGVyc29ucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBteUFwcC5WaXJ1c2VzID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5WaXJ1c2VzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlZpcnVzZXMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKXtcbiAgICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLlZpcnVzZXMsIG15QXBwLlBlcnNvblZpcnVzQ29sbGlzaW9uLmJpbmQobXlBcHApLCBudWxsLCB0aGlzKTsgXG4gICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25QZXJzb25Db2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpOyAgXG4gICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5WaXJ1c2VzLCBteUFwcC5WaXJ1c2VzLCBudWxsLCBudWxsLCB0aGlzKTsgIFxufVxuXG5mdW5jdGlvbiBTZXRDaGFyYWN0ZXJpc3RpY3ModHlwZSxhZ2Usc3RhdHVzKVxue1xuICAgIFBlcnNvblByb3BlcnRpZXMudHlwZSA9IHR5cGU7XG4gICAgUGVyc29uUHJvcGVydGllcy5hZ2UgPSBhZ2U7XG4gICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHZpcnVzVHlwZSlcbntcbiAgICBWaXJ1c1Byb3BlcnRpZXMudHlwZSA9IHZpcnVzVHlwZTtcbn1cblxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcnR5cGUsIHRhcmdldClcbntcbiAgICB2YXIgcGVyc29uID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3RcbiAgICBpZih0YXJnZXQgPT0gXCJDb2xsaWRlZVwiKVxuICAgIHtcbiAgICAgICAgcGVyc29uID0gY29sbGlkZWVcbiAgICB9XG4gICAgXG4gICAgaWYoY2hhcnR5cGUgPT0gXCJBZ2VcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICByZXR1cm4gcGVyc29uLnN0YXR1cztcbiAgICB9XG4gICAgZWxzZSBpZihjaGFydHlwZSA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24udHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcblxufVxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljKGZpZWxkLG5ld1ZhbHVlKVxue1xuICAgIGlmKGZpZWxkID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuXG4gICAgaWYoZmllbGQgPT0gXCJUeXBlXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlID0gbmV3VmFsdWU7XG4gICAgICAgIHZhciBzcHJpdGVOYW1lID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3QudHlwZTtcbiAgICAgICAgaWYobXlBcHAuY3VycmVudEdhbWVPYmplY3Quc3RhdHVzID09IFwiU2lja1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgICAgICB9XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmxvYWRUZXh0dXJlKHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICAgICAgXG59XG5cbmZ1bmN0aW9uIEdldENoYXJhY3RlcmlzdGljcyhlbnRpdHlUeXBlKVxue1xuICAgIC8vR2V0IEVudGl0eSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09IGVudGl0eVR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaW4xID0geG1sLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkOyAgICAgIFxuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soaW4xLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ3JlYXRlVmlydXMoKVxue1xuICAgIEdldENoYXJhY3RlcmlzdGljcyhcInZpcnVzZW50aXR5XCIpO1xuICAgIHZhciBzcHJpdGVOYW1lID0gVmlydXNQcm9wZXJ0aWVzLnR5cGU7XG5cbiAgICB2YXIgYyA9IG15QXBwLlZpcnVzZXMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICBjLnNjYWxlID0gbmV3IFBoYXNlci5Qb2ludCgxLDEpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG4gICAgYy5ib2R5LnNldFNpemUoNSw2MCwyMywxNSlcbiAgICAvL2MuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoXCJ2aXJ1c2VudGl0eVwiKVxufVxuXG5mdW5jdGlvbiBDcmVhdGVIb3NwaXRhbCgpXG57XG4gICAgIC8vR2V0Q2hhcmFjdGVyaXN0aWNzKCk7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBcIkhvc3BpdGFsMVwiXG5cbiAgICB2YXIgYyA9IG15QXBwLkhvc3BpdGFscy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIGMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVQZXJzb24oKVxue1xuICAgIEdldENoYXJhY3RlcmlzdGljcyhcInBlcnNvbmVudGl0eVwiKTtcblxuICAgIHZhciBzcHJpdGVOYW1lID0gUGVyc29uUHJvcGVydGllcy50eXBlO1xuXG4gICAgaWYoUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAge1xuICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgIH1cblxuICAgIHZhciBjID0ge31cbiAgICBpZihteUFwcC5QZXJzb25zLmxlbmd0aCA9PSAwKVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlBlcnNvbnMuY3JlYXRlKDEwMCwgMzAwLCBzcHJpdGVOYW1lKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlBlcnNvbnMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICB9XG4gICAgXG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMudHlwZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcbiAgICBjLmFnZSA9IFBlcnNvblByb3BlcnRpZXMuYWdlO1xuICAgIGMuc3RhdHVzID0gUGVyc29uUHJvcGVydGllcy5zdGF0dXM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoXCJwZXJzb25lbnRpdHlcIik7XG59XG5mdW5jdGlvbiBDaGVja0JlaGF2aW9ycyhlbnRpdHlUeXBlKVxue1xuICAgIC8vR2V0IE1vdmUgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSBlbnRpdHlUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgLy9HZXQgQmVoYXZpb3IgQmxvY2tzXG4gICAgICAgICAgdmFyIGNoaWxkQmxvY2tzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmxvY2tcIik7XG4gICAgICAgICAgdmFyIG1vdmVCbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJtb3ZlXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW92ZUJsb2NrID0gY2hpbGRCbG9ja3Nbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKG1vdmVCbG9jayAhPSBudWxsKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhtb3ZlQmxvY2ssIGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vRXhlY3V0ZSBNb3ZlIEJsb2NrXG59XG5cbmZ1bmN0aW9uIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sdGFyZ2V0KVxue1xuICAgIC8vR2V0IE1vdmUgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdwZXJzb25lbnRpdHknKVxuICAgICAgICB7XG4gICAgICAgICAgLy9HZXQgQmVoYXZpb3IgQmxvY2tzXG4gICAgICAgICAgdmFyIGNoaWxkQmxvY2tzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmxvY2tcIik7XG4gICAgICAgICAgdmFyIGNvbGxpc2lvbkJsb2NrID0gbnVsbDtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxjaGlsZEJsb2Nrcy5sZW5ndGg7IGorKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PSBcImNvbGxpc2lvblwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmZpcnN0Q2hpbGQuaW5uZXJUZXh0PT10YXJnZXQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25CbG9jayA9IGNoaWxkQmxvY2tzW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoY29sbGlzaW9uQmxvY2sgIT0gbnVsbClcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soY29sbGlzaW9uQmxvY2ssIGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBNb3ZlRW50aXR5KGRpcmVjdGlvbilcbntcblxuICAgXG4gICAgaWYoZGlyZWN0aW9uID09IFwiTGVmdFwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gLTEwMDtcbiAgICB9XG4gICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gXCJSaWdodFwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJhbmRvbVwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIFJlc2V0UGhhc2VyKClcbntcbiAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgY3JlYXRlKCk7XG59XG5cbkBpbmplY3QoUm91dGVyKVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5MyB7XG4gIHdvcmtzcGFjZSA9IHt9O1xuICBpbnRlcnByZXRlciA9IHt9O1xuICB0b29sYm94O1xuICBnYW1lID0ge307XG4gIGhlYWx0aHlQZXJzb25zID0ge307XG4gIGluZmVjdGVkUGVyc29ucyA9IHt9O1xuICBoZWFsZXJzID0ge307XG4gIENoYXJ0RGF0YTtcbiAgVGltZVN0YW1wID0gMDtcbiAgU2FtcGxlUmF0ZTtcbiAgY3VycmVudEdhbWVPYmplY3Q7XG4gIFBlcnNvbnM7XG4gIFZpcnVzZXM7XG4gIFxuXG4gIGNvbnN0cnVjdG9yKHJvdXRlcikge1xuICAgIG15QXBwID0gdGhpcztcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBQYXJzZS5pbml0aWFsaXplKFwibXlBcHBJZFwiKTsgICAgXG4gICAgUGFyc2Uuc2VydmVyVVJMID0gdXJsICsgXCI6XCIgKyBsb2NhdGlvbi5wb3J0ICsgJy9wYXJzZSc7XG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgdGhpcy5hY3Rpdml0eU5hbWUgPSBcIlBhcnQzXCI7XG4gIH1cblxuICAvL2JlZm9yZSB2aWV3LW1vZGVsIHJlbmRlcnNcbiAgYXR0YWNoZWQoKXtcbiAgICB0aGlzLnRvb2xib3ggPSB0aGlzLkxvYWRUb29sYm94KCk7XG4gICAgdGhpcy5nYW1lID0gbmV3IFBoYXNlci5HYW1lKDYwMCwgNjAwLCBQaGFzZXIuQVVUTywgJ3BoYXNlckRpdicsIHsgcHJlbG9hZDogcHJlbG9hZCwgY3JlYXRlOiBjcmVhdGUsIHVwZGF0ZTogdXBkYXRlIH0pO1xuICB9XG4gIFxuICBcbiAgZGV0YWNoZWQoKVxuICB7XG4gICAgICBteUFwcC5nYW1lLmRlc3Ryb3koKVxuICAgICAgLy9BZGQgU2F2aW5nIENvZGVcbiAgfVxuXG4gXG4gICAgXG4vLy8vLy8vLy8vLy8vLy8vL1NhdmUvTG9hZCBGdW5jdGlvbnNcbiAgU2F2ZVdvcmtzcGFjZSgpXG4gIHtcbiAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpO1xuICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuICAgIHRoaXMuZXhwb3J0KHhtbF90ZXh0KTtcbiAgfVxuXG4gIGV4cG9ydCh0ZXh0KSB7XG4gICAgdmFyIHBvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICAgIHBvbS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3dvcmtzcGFjZS54bWwnKTtcbiAgICBwb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvbSk7XG4gICAgcG9tLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb20pO1xuICB9XG5cbiAgTG9hZFdvcmtzcGFjZSgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy93b3Jrc3BhY2UueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgfVxuXG4gIExvYWRXb3Jrc3BhY2VDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgQmxvY2tseS5YbWwuZG9tVG9Xb3Jrc3BhY2UoeG1sLCBteUFwcC53b3Jrc3BhY2UpO1xuICB9XG4gIFxuXG4gIExvYWRJbml0aWFsV29ya3NwYWNlKClcbiAge1xuICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICB0aGlzLkxvYWRMYXN0U2F2ZSgpO1xuICAgICAgaWYobXlBcHAud29ya3NwYWNlLmdldEFsbEJsb2NrcygpLmxlbmd0aCA9PSAwKVxuICAgICAge1xuICAgICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvSW5pdGlhbFdvcmtzcGFjZXMvQWN0aXZpdHkzLnhtbFwiO1xuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgICBjbGllbnQuZ2V0KHVybCwgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2spO1xuICAgICAgfVxuICB9XG5cbiAgTG9hZFRvb2xCb3hDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLnRvb2xib3ggPSB4bWw7XG4gICAgICBteUFwcC53b3Jrc3BhY2UgPSBCbG9ja2x5LmluamVjdCgnYmxvY2tseURpdicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZWRpYTogJy4uL0Jsb2NrbHkvbWVkaWEvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJveDogbXlBcHAudG9vbGJveH0pO1xuICAgICAgbXlBcHAuTG9hZEluaXRpYWxXb3Jrc3BhY2UoKTtcbiAgfVxuICBMb2FkVG9vbGJveCgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9FcGlkZW1pY1Rvb2xib3gueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFRvb2xCb3hDYWxsYmFjayk7XG4gIH1cbiAgIEh0dHBDbGllbnQoKVxuICB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oYVVybCwgYUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYW5IdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICBpZiAoYW5IdHRwUmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgYW5IdHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIGFVcmwsIHRydWUgKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vUGhhc2VyIEhlbHBlciBmdW5jdGlvbnNcbiAgUmVzZXRQaGFzZXIoKVxuICB7XG4gICAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgICBjcmVhdGUoKTtcbiAgfVxuXG4gIGhhbmRsZUNvbGxpc2lvbigpXG4gIHtcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J2NvbGxpc2lvbicpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKHhtbCwgaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsdGhpcy5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgUGVyc29uVmlydXNDb2xsaXNpb24ocGVyc29uLHZpcnVzKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sXCJWaXJ1c1wiKVxuICAgICAgXG4gIH1cblxuICBQZXJzb25QZXJzb25Db2xsaXNpb24ocGVyc29uMSxwZXJzb24yKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjE7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjI7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMSxcIlBlcnNvblwiKVxuXG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjI7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjE7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMixcIlBlcnNvblwiKVxuICB9XG5cbiAgSGVhbHRoeUluZmVjdGVkQ29sbGlzaW9uKGhlYWx0aHksIGluZmVjdGVkKVxuICB7XG4gICAgICBoZWFsdGh5LmxvYWRUZXh0dXJlKCdyZWRiYWxsJylcbiAgICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLnJlbW92ZShoZWFsdGh5KVxuICAgICAgbXlBcHAuaW5mZWN0ZWRQZXJzb25zLmFkZChoZWFsdGh5KVxuICB9XG5cbiAgSGVhbGVySW5mZWN0ZWRDb2xsaXNpb24oaGVhbGVyLCBpbmZlY3RlZClcbiAge1xuICAgICAgaW5mZWN0ZWQubG9hZFRleHR1cmUoJ3dpemJhbGwnKVxuICAgICAgbXlBcHAuaW5mZWN0ZWRQZXJzb25zLnJlbW92ZShpbmZlY3RlZClcbiAgICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLmFkZChpbmZlY3RlZClcbiAgfVxuXG4gIHJ1blNpbXVsYXRpb24oKVxuICB7XG4gICAgbXlBcHAuUmVzZXRQaGFzZXIoKTtcbiAgICAvL0dldCBXaGVuUnVuIEhlYWRcbiAgICAvL1J1biBjb2RlXG4gICAgdmFyIHRlc3QgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKVxuICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdzaW11bGF0aW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBpbml0QXBpKGludGVycHJldGVyLCBzY29wZSkge1xuICAvLyBBZGQgYW4gQVBJIGZ1bmN0aW9uIGZvciB0aGUgYWxlcnQoKSBibG9jay5cbiAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKHdpbmRvdy5hbGVydCh0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdhbGVydCcsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKG15QXBwLnNldENvbG9yKHRleHQpKTtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENvbG9yJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG4gICAgICBcbiAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkoXCJQZXJzb25cIikpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZVBlcnNvbicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZUVudGl0eSh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlTGFyZ2VFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKE1vdmVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ01vdmVFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQsYWdlLHN0YXR1cykge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBzdGF0dXMudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgYWdlID0gYWdlID8gYWdlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljcyh0ZXh0LGFnZSxzdGF0dXMpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRWaXJ1c0NoYXJhY3RlcmlzdGljcycsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24oY2hhcmFjdGVyaXN0aWMsbmV3VmFsdWUpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSA/IG5ld1ZhbHVlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLHRhcmdldCkge1xuICAgICAgICBjaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljID8gY2hhcmFjdGVyaXN0aWMudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPyB0YXJnZXQudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcmFjdGVyaXN0aWMsdGFyZ2V0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnR2V0Q2hhcmFjdGVyaXN0aWMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTsgXG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihudW1iZXIsdGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBudW1iZXIgPSBudW1iZXIgPyBudW1iZXIudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlTXVsdGlwbGVFbnRpdGllcyhudW1iZXIsdGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZU11bHRpcGxlRW50aXRpZXMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTsgICAgXG5cbiAgICB9XG4gICAgXG4gICAgUHVzaE9iamVjdCgpXG4gICAge1xuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgICAgICB2YXIgZ2FtZVNjb3JlID0gbmV3IEdhbWVTY29yZSgpO1xuXG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwiQWN0aXZpdHlOYW1lXCIsdGhpcy5hY3Rpdml0eU5hbWUpO1xuICAgICAgICBcbiAgICAgICAgICAgIGdhbWVTY29yZS5zYXZlKG51bGwsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihnYW1lU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBhZnRlciB0aGUgb2JqZWN0IGlzIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnV29ya3NwYWNlIFNhdmVkIScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGdhbWVTY29yZSwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBpZiB0aGUgc2F2ZSBmYWlscy5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaXMgYSBQYXJzZS5FcnJvciB3aXRoIGFuIGVycm9yIGNvZGUgYW5kIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc2F2ZSB3b3Jrc3BhY2UsIHdpdGggZXJyb3IgY29kZTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBsb2dnZWQgaW5cIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBMb2FkTGFzdFNhdmUoKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkaW5nXCIpXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICB2YXIgR2FtZVNjb3JlID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIkdhbWVTY29yZVwiKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gbmV3IFBhcnNlLlF1ZXJ5KEdhbWVTY29yZSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oXCJ1c2VybmFtZVwiLCBjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgcXVlcnkuZXF1YWxUbygnQWN0aXZpdHlOYW1lJyx0aGlzLmFjdGl2aXR5TmFtZSlcbiAgICAgICAgcXVlcnkuZGVzY2VuZGluZyhcInVwZGF0ZWRBdFwiKTtcbiAgICAgICAgcXVlcnkuZmlyc3Qoe1xuICAgICAgICBzdWNjZXNzOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgdmFyIHRleHQgPSBvYmplY3QuYXR0cmlidXRlc1snd29ya3NwYWNlJ11cbiAgICAgICAgICAgIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKHRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3I6IFwiICsgZXJyb3IuY29kZSArIFwiIFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgIExvZ091dCgpIFxuICAgIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nIG91dD9cIikgPT0gdHJ1ZSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIFBhcnNlLlVzZXIubG9nT3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZScpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cblxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('activity5',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myApp;
    var responseText;
    var targetHeading;
    var myApp;
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
    function CreateMultipleEntities(num, type) {
        console.log("Here");
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
        else if (type == "Viruses") {
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
    }
    function CreateVirus() {
        var spriteName = "Virus1";
        var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.body.immovable = true;
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
    }
    function CreateHospital() {
        var spriteName = "Hospital1";
        var c = myApp.Hospitals.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        c.body.immovable = true;
    }
    function CreatePerson() {
        GetCharacteristics();
        var spriteName = PersonProperties.type;
        if (PersonProperties.status == "Sick") {
            spriteName += "Sick";
        }
        var c = {};
        if (myApp.Persons.length == 0) {
            c = myApp.Persons.create(100, 300, spriteName);
        }
        else {
            c = myApp.Persons.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
        c.scale = new Phaser.Point(.3, .3);
        c.anchor.set(.5);
        c.type = PersonProperties.type;
        c.age = PersonProperties.age;
        c.status = PersonProperties.status;
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors();
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = type;
        PersonProperties.age = age;
        PersonProperties.status = status;
    }
    function GetCharacteristic(chartype, target) {
        var person = myApp.currentGameObject;
        if (target == "Collidee") {
            person = collidee;
        }
        if (chartype == "Age") {
            return person.age;
        }
        else if (chartype == "Status") {
            return person.status;
        }
        else if (chartype == "Type") {
            return person.type;
        }
        return "";
    }
    function SetCharacteristic(field, newValue) {
        if (field == "Status") {
            myApp.currentGameObject.status = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
                spriteName += "Sick";
            }
            myApp.currentGameObject.loadTexture(spriteName);
        }
        if (field == "Type") {
            myApp.currentGameObject.type = newValue;
            var spriteName = myApp.currentGameObject.type;
            if (myApp.currentGameObject.status == "Sick") {
                spriteName += "Sick";
            }
            myApp.currentGameObject.loadTexture(spriteName);
        }
    }
    function createDemoSimulation() {
        myApp.game.physics.startSystem(Phaser.Physics.ARCADE);
        myApp.healthyPersons = myApp.game.add.group();
        myApp.healthyPersons.enableBody = true;
        myApp.healthyPersons.physicsBodyType = Phaser.Physics.ARCADE;
        var scaleFactor = .1;
        for (var i = 0; i < 100; i++) {
            var c = myApp.healthyPersons.create(myApp.game.world.randomX, Math.random() * 600, 'wizball', myApp.game.rnd.integerInRange(0, 36));
            c.scale = new Phaser.Point(scaleFactor, scaleFactor);
            c.anchor.set(.5);
            c.name = 'healthyPerson' + i;
            c.body.collideWorldBounds = true;
            c.body.bounce.set(1);
        }
        myApp.infectedPersons = myApp.game.add.group();
        myApp.infectedPersons.enableBody = true;
        myApp.infectedPersons.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 5; i++) {
            var c = myApp.infectedPersons.create(myApp.game.world.randomX, Math.random() * 600, 'redball', myApp.game.rnd.integerInRange(0, 36));
            c.scale = new Phaser.Point(scaleFactor, scaleFactor);
            c.anchor.set(.5);
            c.name = 'infectedPerson' + i;
            c.body.collideWorldBounds = true;
            c.body.bounce.set(1);
        }
        myApp.healers = myApp.game.add.group();
        myApp.healers.enableBody = true;
        myApp.healers.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 25; i++) {
            var c = myApp.healers.create(myApp.game.world.randomX, Math.random() * 600, 'blueball', myApp.game.rnd.integerInRange(0, 36));
            c.scale = new Phaser.Point(scaleFactor, scaleFactor);
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
    function update() {
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Hospitals, myApp.PersonHospitalCollision.bind(myApp), null, this);
    }
    function GetCharacteristics() {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'entity') {
                var in1 = xml.firstElementChild.firstElementChild;
                var headless = new Blockly.Workspace();
                Blockly.Xml.domToBlock(in1, headless);
                var code = Blockly.JavaScript.workspaceToCode(headless);
                var interpreter = new Interpreter(code, myApp.initApi);
                interpreter.run();
                headless.dispose();
            }
        }
    }
    function CreateLargeEntity(entityLabel) {
        GetCharacteristics();
        var sprite = EntityProperties.type;
        var c = myApp.game.add.sprite(200, 200, sprite);
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.type = EntityProperties.type;
        c.age = EntityProperties.age;
        var style = { font: "16px Courier", fill: "#000000" };
        var text1 = myApp.game.add.text(0, 0, "Age: " + c.age.toString(), style);
        var text2 = myApp.game.add.text(0, 0, "Type: " + c.type, style);
        text1.alignTo(c, Phaser.RIGHT_TOP, 16);
        text2.alignTo(c, Phaser.RIGHT_CENTER, 16);
    }
    function ResetPhaser() {
        myApp.game.world.removeAll(true, false, false);
        create();
    }
    function updateHeading(gameObj) {
        try {
            gameObj.forEach(function (element) {
                if (Math.floor(Math.random() * 20) === 0) {
                    var angle = 90 * (Math.PI / 180);
                    var DIST = 200;
                    var offset = (Math.floor(Math.random() * angle) - angle / 2);
                    var newX = element.position.x + Math.cos(element.rotation + offset) * DIST;
                    var newY = element.position.y + Math.sin(element.rotation + offset) * DIST;
                    element.heading = {
                        x: newX,
                        y: newY
                    };
                    myApp.game.physics.arcade.moveToXY(element, element.heading.x, element.heading.y);
                    var dx = element.heading.x - element.position.x;
                    var dy = element.heading.y - element.position.y;
                    element.rotation = Math.atan2(dy, dx);
                }
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    function GetCollisionBlockFromEntity(person, target) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'entity') {
                var childBlocks = xml.getElementsByTagName("block");
                var collisionBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "collision") {
                        if (childBlocks[j].firstChild.innerText == target) {
                            collisionBlock = childBlocks[j];
                        }
                    }
                }
                if (collisionBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(collisionBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function CheckBehaviors() {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == 'entity') {
                var childBlocks = xml.getElementsByTagName("block");
                var moveBlock = null;
                for (var j = 0; j < childBlocks.length; j++) {
                    if (childBlocks[j].getAttribute('type') == "move") {
                        moveBlock = childBlocks[j];
                    }
                }
                if (moveBlock != null) {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(moveBlock, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        }
    }
    function MoveEntity(direction) {
        if (direction == "Left") {
            myApp.currentGameObject.body.velocity.x = -100;
        }
        else if (direction == "Right") {
            myApp.currentGameObject.body.velocity.x = 100;
        }
        else if (direction == "Random") {
            myApp.currentGameObject.body.velocity.x = Math.random() * 200 - 100;
            myApp.currentGameObject.body.velocity.y = Math.random() * 200 - 100;
        }
    }
    var Activity5 = (function () {
        function Activity5(router) {
            this.workspace = {};
            this.interpreter = {};
            this.game = {};
            this.TimeStamp = 0;
            myApp = this;
            var url = window.location.protocol + '//' + window.location.hostname;
            Parse.initialize("myAppId");
            Parse.serverURL = url + ":" + location.port + '/parse';
            this.router = router;
            this.activityName = "Part4";
        }
        Activity5.prototype.attached = function () {
            this.toolbox = this.LoadToolbox();
            this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaserDiv', { preload: preload, create: create, update: update });
            this.TimeStamp = 0;
            this.SampleRate = 1;
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(this.initChartData);
        };
        Activity5.prototype.HttpClient = function () {
            this.get = function (aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function () {
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                };
                anHttpRequest.open("GET", aUrl, true);
                anHttpRequest.send(null);
            };
        };
        Activity5.prototype.updateChartData = function () {
            myApp.TimeStamp += myApp.SampleRate;
            var healthyCount = 5;
            var sickCount = 10;
            myApp.ChartData.addRow([myApp.TimeStamp, healthyCount, sickCount]);
            myApp.drawChart();
        };
        Activity5.prototype.initChartData = function () {
            myApp.ChartData = new google.visualization.DataTable();
            myApp.ChartData.addColumn('number', 'Time');
            myApp.ChartData.addColumn('number', 'Healthy');
            myApp.ChartData.addColumn('number', 'Sick');
            myApp.TimerId = window.setInterval(myApp.updateChartData, myApp.SampleRate * 1000);
            myApp.drawChart();
        };
        Activity5.prototype.detached = function () {
            myApp.ChartData = new google.visualization.DataTable();
            myApp.ChartData.addColumn('number', 'Time');
            myApp.ChartData.addColumn('number', 'Healthy');
            myApp.ChartData.addColumn('number', 'Sick');
            window.clearInterval(myApp.TimerId);
            myApp.game.destroy();
        };
        Activity5.prototype.drawChart = function () {
            var data = myApp.ChartData;
            var options = {
                title: 'Sick vs Healthy',
                curveType: 'function',
                legend: { position: 'bottom' }
            };
            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);
        };
        Activity5.prototype.SaveWorkspace = function () {
            var xml = Blockly.Xml.workspaceToDom(this.workspace);
            var xml_text = Blockly.Xml.domToPrettyText(xml);
            this.export(xml_text);
        };
        Activity5.prototype.export = function (text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', 'workspace.xml');
            pom.style.display = 'none';
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
        };
        Activity5.prototype.LoadWorkspaceCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.workspace.clear();
            Blockly.Xml.domToWorkspace(xml, myApp.workspace);
        };
        Activity5.prototype.LoadInitialWorkspace = function () {
            myApp.workspace.clear();
            this.LoadLastSave();
            if (myApp.workspace.getAllBlocks().length == 0) {
                var url = "resources/InitialWorkspaces/Activity5.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
        };
        Activity5.prototype.LoadToolBoxCallback = function (ResponseText) {
            var xml_text = ResponseText;
            var xml = Blockly.Xml.textToDom(xml_text);
            myApp.toolbox = xml;
            myApp.workspace = Blockly.inject('blocklyDiv', { media: '../Blockly/media/',
                toolbox: myApp.toolbox });
            myApp.LoadInitialWorkspace();
        };
        Activity5.prototype.LoadToolbox = function () {
            var url = "resources/EpidemicToolbox.xml";
            var client = new this.HttpClient();
            client.get(url, this.LoadToolBoxCallback);
        };
        Activity5.prototype.ResetPhaser = function () {
            myApp.ChartData = new google.visualization.DataTable();
            myApp.ChartData.addColumn('number', 'Time');
            myApp.ChartData.addColumn('number', 'Healthy');
            myApp.ChartData.addColumn('number', 'Sick');
            myApp.TimeStamp = 0;
            myApp.game.world.removeAll(true, false, false);
            create();
        };
        Activity5.prototype.setColor = function (targetColor) {
            if (targetColor == "RED") {
                ball2.loadTexture('redball');
            }
            else if (targetColor == "BLUE") {
                ball2.loadTexture('blueball');
            }
            myApp.game.physics.arcade.collide(ball1, ball2);
        };
        Activity5.prototype.handleCollision = function () {
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'collision') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity5.prototype.HealthyInfectedCollision = function (healthy, infected) {
            healthy.loadTexture('redball');
            myApp.healthyPersons.remove(healthy);
            myApp.infectedPersons.add(healthy);
        };
        Activity5.prototype.HealerInfectedCollision = function (healer, infected) {
            infected.loadTexture('wizball');
            myApp.infectedPersons.remove(infected);
            myApp.healthyPersons.add(infected);
        };
        Activity5.prototype.PersonVirusCollision = function (person, virus) {
            myApp.currentGameObject = person;
            GetCollisionBlockFromEntity(person, "Virus");
        };
        Activity5.prototype.PersonPersonCollision = function (person1, person2) {
            myApp.currentGameObject = person1;
            collidee = person2;
            GetCollisionBlockFromEntity(person1, "Person");
            myApp.currentGameObject = person2;
            collidee = person1;
            GetCollisionBlockFromEntity(person2, "Person");
        };
        Activity5.prototype.PersonHospitalCollision = function (person1, hospital) {
            console.log("Boop");
        };
        Activity5.prototype.runSimulation = function () {
            myApp.ResetPhaser();
            var test = Blockly.JavaScript.workspaceToCode(this.workspace);
            console.log(test);
            var allXml = Blockly.Xml.workspaceToDom(this.workspace).childNodes;
            for (var i = 0; xml = allXml[i]; i++) {
                var xml = allXml[i];
                if (xml.getAttribute('type') == 'simulation') {
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(xml, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, this.initApi);
                    interpreter.run();
                    headless.dispose();
                }
            }
        };
        Activity5.prototype.initApi = function (interpreter, scope) {
            var wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(window.alert(text));
            };
            interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                return interpreter.createPrimitive(myApp.setColor(text));
            };
            interpreter.setProperty(scope, 'SetColor', interpreter.createNativeFunction(wrapper));
            wrapper = function () {
                var test = interpreter.createPrimitive(CreateEntity("Person"));
                return test;
            };
            interpreter.setProperty(scope, 'CreatePerson', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(CreateEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateLargeEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text) {
                text = text ? text.toString() : '';
                var test = interpreter.createPrimitive(MoveEntity(text));
                return test;
            };
            interpreter.setProperty(scope, 'MoveEntity', interpreter.createNativeFunction(wrapper));
            wrapper = function (text, age, status) {
                text = text ? text.toString() : '';
                status = status ? status.toString() : "";
                age = age ? age.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristics(text, age, status));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristics', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, newValue) {
                characteristic = characteristic ? characteristic.toString() : '';
                newValue = newValue ? newValue.toString() : "";
                var test = interpreter.createPrimitive(SetCharacteristic(characteristic, newValue));
                return test;
            };
            interpreter.setProperty(scope, 'SetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (characteristic, target) {
                characteristic = characteristic ? characteristic.toString() : '';
                target = target ? target.toString() : "";
                var test = interpreter.createPrimitive(GetCharacteristic(characteristic, target));
                return test;
            };
            interpreter.setProperty(scope, 'GetCharacteristic', interpreter.createNativeFunction(wrapper));
            wrapper = function (number, text) {
                text = text ? text.toString() : '';
                number = number ? number.toString() : "";
                var test = interpreter.createPrimitive(CreateMultipleEntities(number, text));
                return test;
            };
            interpreter.setProperty(scope, 'CreateMultipleEntities', interpreter.createNativeFunction(wrapper));
        };
        Activity5.prototype.PushObject = function () {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(this.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var GameScore = Parse.Object.extend("GameScore");
                var gameScore = new GameScore();
                gameScore.set("workspace", xml_text);
                gameScore.set("username", currentUser.getUsername());
                gameScore.set("sessionToken", currentUser.getSessionToken());
                gameScore.set("ActivityName", this.activityName);
                gameScore.save(null, {
                    success: function (gameScore) {
                        alert('Workspace Saved!');
                    },
                    error: function (gameScore, error) {
                        alert('Failed to save workspace, with error code: ' + error.message);
                    }
                });
            }
            else {
                alert("User not logged in");
            }
        };
        Activity5.prototype.LoadLastSave = function () {
            var _this = this;
            console.log("Loading");
            var currentUser = Parse.User.current();
            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.equalTo("username", currentUser.getUsername());
            query.equalTo('ActivityName', this.activityName);
            query.descending("updatedAt");
            query.first({
                success: function (object) {
                    var text = object.attributes['workspace'];
                    _this.LoadWorkspaceCallback(text);
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
        Activity5.prototype.LogOut = function () {
            if (confirm("Are you sure you want to log out?") == true) {
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        return Activity5;
    }());
    Activity5 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity5);
    exports.Activity5 = Activity5;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUNELElBQUksQ0FDSixDQUFDO1lBQ0QsQ0FBQztRQUNMLENBQUM7UUFFTCxnQkFBQztJQUFELENBaFpBLEFBZ1pDLElBQUE7SUFoWlksU0FBUztRQURyQiwwQkFBTSxDQUFDLHVCQUFNLENBQUM7O09BQ0YsU0FBUyxDQWdackI7SUFoWlksOEJBQVMiLCJmaWxlIjoiYWN0aXZpdHk1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Um91dGVyQ29uZmlndXJhdGlvbiwgUm91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cblxudmFyIG15QXBwXG52YXIgcmVzcG9uc2VUZXh0XG52YXIgdGFyZ2V0SGVhZGluZ1xudmFyIG15QXBwXG5cbnZhciBQZXJzb25Qcm9wZXJ0aWVzID0ge307XG52YXIgVmlydXNQcm9wZXJ0aWVzID0ge307XG5cbnZhciBjb2xsaWRlZTtcblxuZnVuY3Rpb24gcHJlbG9hZCgpIHtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjEnLCAnYXNzZXRzL01hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yJywgJ2Fzc2V0cy9NYW4yLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xJywgJ2Fzc2V0cy9Xb21hbjEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjInLCAnYXNzZXRzL1dvbWFuMi5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMVNpY2snLCAnYXNzZXRzL01hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjJTaWNrJywgJ2Fzc2V0cy9NYW4yX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjFTaWNrJywgJ2Fzc2V0cy9Xb21hbjFfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMlNpY2snLCAnYXNzZXRzL1dvbWFuMl9zaWNrLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czEnLCAnYXNzZXRzL1ZpcnVzMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMicsICdhc3NldHMvVmlydXMyLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMzJywgJ2Fzc2V0cy9WaXJ1czMucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ0hvc3BpdGFsMScsICdhc3NldHMvSG9zcGl0YWwxLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnSG9zcGl0YWwyJywgJ2Fzc2V0cy9Ib3NwaXRhbDIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdIb3NwaXRhbDMnLCAnYXNzZXRzL0hvc3BpdGFsMy5wbmcnKTtcblxuXG5cbn1cblxuZnVuY3Rpb24gQ3JlYXRlTXVsdGlwbGVFbnRpdGllcyhudW0sdHlwZSlcbntcbiAgICBjb25zb2xlLmxvZyhcIkhlcmVcIilcbiAgICBpZihudW0gPD0gMClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHg9MDtcblxuICAgIGlmKHR5cGUgPT0gXCJQZW9wbGVcIilcbiAgICB7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBDcmVhdGVQZXJzb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGUgPT0gXCJIb3NwaXRhbFwiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSE9TUElUQUxcIilcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJWaXJ1c2VzXCIpXG4gICAge1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlVmlydXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIENyZWF0ZVZpcnVzKClcbntcbiAgICAvL0dldENoYXJhY3RlcmlzdGljcygpO1xuICAgIHZhciBzcHJpdGVOYW1lID0gXCJWaXJ1czFcIlxuXG4gICAgdmFyIGMgPSBteUFwcC5WaXJ1c2VzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZUhvc3BpdGFsKClcbntcbiAgICAgLy9HZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFwiSG9zcGl0YWwxXCJcblxuICAgIHZhciBjID0gbXlBcHAuSG9zcGl0YWxzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgYy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVBlcnNvbigpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKCk7XG5cbiAgICB2YXIgc3ByaXRlTmFtZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcblxuICAgIGlmKFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID09IFwiU2lja1wiKVxuICAgIHtcbiAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9XG4gICAgaWYobXlBcHAuUGVyc29ucy5sZW5ndGggPT0gMClcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZSgxMDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KC4zLC4zKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMudHlwZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcbiAgICBjLmFnZSA9IFBlcnNvblByb3BlcnRpZXMuYWdlO1xuICAgIGMuc3RhdHVzID0gUGVyc29uUHJvcGVydGllcy5zdGF0dXM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoKTtcbn1cblxuZnVuY3Rpb24gU2V0Q2hhcmFjdGVyaXN0aWNzKHR5cGUsYWdlLHN0YXR1cylcbntcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLnR5cGUgPSB0eXBlO1xuICAgIFBlcnNvblByb3BlcnRpZXMuYWdlID0gYWdlO1xuICAgIFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID0gc3RhdHVzO1xufVxuXG5mdW5jdGlvbiBHZXRDaGFyYWN0ZXJpc3RpYyhjaGFydHlwZSwgdGFyZ2V0KVxue1xuICAgIHZhciBwZXJzb24gPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdFxuICAgIGlmKHRhcmdldCA9PSBcIkNvbGxpZGVlXCIpXG4gICAge1xuICAgICAgICBwZXJzb24gPSBjb2xsaWRlZVxuICAgIH1cbiAgICBcbiAgICBpZihjaGFydHlwZSA9PSBcIkFnZVwiKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBlcnNvbi5hZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYoY2hhcnR5cGUgPT0gXCJTdGF0dXNcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uc3RhdHVzO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiVHlwZVwiKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBlcnNvbi50eXBlO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuXG59XG5cblxuZnVuY3Rpb24gU2V0Q2hhcmFjdGVyaXN0aWMoZmllbGQsbmV3VmFsdWUpXG57XG4gICAgaWYoZmllbGQgPT0gXCJTdGF0dXNcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnN0YXR1cyA9IG5ld1ZhbHVlO1xuICAgICAgICB2YXIgc3ByaXRlTmFtZSA9IG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnR5cGU7XG4gICAgICAgIGlmKG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnN0YXR1cyA9PSBcIlNpY2tcIilcbiAgICAgICAge1xuICAgICAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5sb2FkVGV4dHVyZShzcHJpdGVOYW1lKTtcbiAgICB9XG5cbiAgICBpZihmaWVsZCA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnR5cGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgICAgICBcbn1cbmZ1bmN0aW9uIGNyZWF0ZURlbW9TaW11bGF0aW9uKClcbntcbiAgICAvL1dlJ3JlIGdvaW5nIHRvIGJlIHVzaW5nIHBoeXNpY3MsIHNvIGVuYWJsZSB0aGUgQXJjYWRlIFBoeXNpY3Mgc3lzdGVtXG4gICAgLy9teUFwcC5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IFwiI2RiZDZkN1wiO1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xuICAgXG4gICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLmhlYWx0aHlQZXJzb25zLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIHZhciBzY2FsZUZhY3RvciA9IC4xXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKVxuICAgIHtcbiAgICAgICAgdmFyIGMgPSBteUFwcC5oZWFsdGh5UGVyc29ucy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBNYXRoLnJhbmRvbSgpICogNjAwLCAnd2l6YmFsbCcsIG15QXBwLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIDM2KSk7XG4gICAgICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KHNjYWxlRmFjdG9yLHNjYWxlRmFjdG9yKTtcbiAgICAgICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICAgICAgYy5uYW1lID0gJ2hlYWx0aHlQZXJzb24nICsgaTtcbiAgICAgICAgYy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgICAgIGMuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIH1cblxuICAgIG15QXBwLmluZmVjdGVkUGVyc29ucyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuaW5mZWN0ZWRQZXJzb25zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLmluZmVjdGVkUGVyc29ucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKylcbiAgICB7XG4gICAgICAgIHZhciBjID0gbXlBcHAuaW5mZWN0ZWRQZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIE1hdGgucmFuZG9tKCkgKiA2MDAsICdyZWRiYWxsJywgbXlBcHAuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMzYpKTtcbiAgICAgICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoc2NhbGVGYWN0b3Isc2NhbGVGYWN0b3IpO1xuICAgICAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgICAgICBjLm5hbWUgPSAnaW5mZWN0ZWRQZXJzb24nICsgaTtcbiAgICAgICAgYy5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgICAgIGMuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIH1cblxuICAgIFxuICAgIG15QXBwLmhlYWxlcnMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLmhlYWxlcnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuaGVhbGVycy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1OyBpKyspXG4gICAge1xuICAgICAgICB2YXIgYyA9IG15QXBwLmhlYWxlcnMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgTWF0aC5yYW5kb20oKSAqIDYwMCwgJ2JsdWViYWxsJywgbXlBcHAuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMzYpKTtcbiAgICAgICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoc2NhbGVGYWN0b3Isc2NhbGVGYWN0b3IpO1xuICAgICAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgICAgICBjLm5hbWUgPSAnaGVhbGVyJyArIGk7XG4gICAgICAgIGMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgICAgICBjLmJvZHkuYm91bmNlLnNldCgxKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIG15QXBwLlBlcnNvbnMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLlBlcnNvbnMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuUGVyc29ucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBteUFwcC5WaXJ1c2VzID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5WaXJ1c2VzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlZpcnVzZXMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuXG4gICAgbXlBcHAuSG9zcGl0YWxzID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5Ib3NwaXRhbHMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuSG9zcGl0YWxzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcbn1cblxuXG5mdW5jdGlvbiB1cGRhdGUoKVxue1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25QZXJzb25Db2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpO1xuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5WaXJ1c2VzLCBteUFwcC5QZXJzb25WaXJ1c0NvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLkhvc3BpdGFscywgbXlBcHAuUGVyc29uSG9zcGl0YWxDb2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpO1xufVxuXG5mdW5jdGlvbiBHZXRDaGFyYWN0ZXJpc3RpY3MoKVxue1xuICAgIC8vR2V0IEVudGl0eSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J2VudGl0eScpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaW4xID0geG1sLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkOyAgICAgIFxuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soaW4xLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ3JlYXRlTGFyZ2VFbnRpdHkoZW50aXR5TGFiZWwpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKCk7XG5cbiAgICB2YXIgc3ByaXRlID0gRW50aXR5UHJvcGVydGllcy50eXBlO1xuICAgIFxuICAgIHZhciBjID0gbXlBcHAuZ2FtZS5hZGQuc3ByaXRlKDIwMCwgMjAwLCBzcHJpdGUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLnR5cGUgPSBFbnRpdHlQcm9wZXJ0aWVzLnR5cGU7XG4gICAgYy5hZ2UgPSBFbnRpdHlQcm9wZXJ0aWVzLmFnZTtcblxuICAgIHZhciBzdHlsZSA9IHsgZm9udDogXCIxNnB4IENvdXJpZXJcIiwgZmlsbDogXCIjMDAwMDAwXCIgfTtcbiAgICB2YXIgdGV4dDEgPSBteUFwcC5nYW1lLmFkZC50ZXh0KDAsIDAsIFwiQWdlOiBcIitjLmFnZS50b1N0cmluZygpLCBzdHlsZSk7XG4gICAgdmFyIHRleHQyID0gbXlBcHAuZ2FtZS5hZGQudGV4dCgwLCAwLCBcIlR5cGU6IFwiK2MudHlwZSwgc3R5bGUpO1xuXG4gICAgdGV4dDEuYWxpZ25UbyhjLCBQaGFzZXIuUklHSFRfVE9QLCAxNik7XG4gICAgdGV4dDIuYWxpZ25UbyhjLCBQaGFzZXIuUklHSFRfQ0VOVEVSLCAxNik7XG59XG5cbmZ1bmN0aW9uIFJlc2V0UGhhc2VyKClcbntcbiAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgY3JlYXRlKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUhlYWRpbmcoZ2FtZU9iailcbntcbiAgdHJ5XG4gIHtcbiAgICBnYW1lT2JqLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgaWYoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApID09PSAwKVxuICAgIHtcbiAgICAgICAgICB2YXIgYW5nbGUgPSA5MCAqIChNYXRoLlBJIC8gMTgwKTsgLy8gQ29uc3RyYWludCBpbiByYWRpYW5zXG4gICAgICAgICAgdmFyIERJU1QgPSAyMDA7IC8vIFdpdGhpbiAyMDAgcGl4ZWxzIG9mIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgICAgICAvLyBHcmFiIGFuIG9mZnNldCBhbmdsZSBiYXNlZCBvbiB0aGUgY29uc3RyYWludFxuICAgICAgICAgIHZhciBvZmZzZXQgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYW5nbGUpIC0gIGFuZ2xlLzIpOyBcbiAgICAgICAgICAvLyBHZXQgYSByYW5kb20gcG9pbnQgd2l0aGluIHRoZSBjb25zdHJhaW50IGFuZ2xlIGF0IERJU1QgbGVuZ3RoIGF3YXlcbiAgICAgICAgICB2YXIgbmV3WCA9IGVsZW1lbnQucG9zaXRpb24ueCArIE1hdGguY29zKGVsZW1lbnQucm90YXRpb24gKyBvZmZzZXQpICogRElTVDtcbiAgICAgICAgICB2YXIgbmV3WSA9IGVsZW1lbnQucG9zaXRpb24ueSArIE1hdGguc2luKGVsZW1lbnQucm90YXRpb24gKyBvZmZzZXQpICogRElTVDtcbiAgICAgICAgXG4gICAgICAgICAgLy9zYW5pdGlzZWQgPSBhcmVZb3VPdXRzaWRlKG5ld1gsIG5ld1ksIF90aGlzLmdhbWUud29ybGQpO1xuICAgICAgICBcbiAgICAgICAgICAvLyBzZXQgdGhlIG5ldyBoZWFkaW5nIGZvciB0aGUgTlBDXG4gICAgICAgICAgZWxlbWVudC5oZWFkaW5nID0ge1xuICAgICAgICAgICAgeDogbmV3WCxcbiAgICAgICAgICAgIHk6IG5ld1lcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJbnZva2UgdGhlIG1vdmVUb1hZIGZ1bmN0aW9uIG9mIHRoZSBhcmNhZGUgcGh5c2ljcyB0byBtb3ZlIE5QQ1xuICAgICAgICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvWFkoZWxlbWVudCwgZWxlbWVudC5oZWFkaW5nLngsIGVsZW1lbnQuaGVhZGluZy55KTtcbiAgICAgICAgICB2YXIgZHggPSBlbGVtZW50LmhlYWRpbmcueCAtIGVsZW1lbnQucG9zaXRpb24ueDtcbiAgICAgICAgICB2YXIgZHkgPSBlbGVtZW50LmhlYWRpbmcueSAtIGVsZW1lbnQucG9zaXRpb24ueTtcbiAgICAgICAgICAvLyBSb3RhdGUgdGhlIE5QQyB0b3dhcmQgdGhlIG5ldyBoZWFkaW5nXG4gICAgICAgICAgZWxlbWVudC5yb3RhdGlvbiA9IE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICAgIH19KTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKVxuICAgIHtcbiAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKVxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uLHRhcmdldClcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nZW50aXR5JylcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBjb2xsaXNpb25CbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJjb2xsaXNpb25cIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5maXJzdENoaWxkLmlubmVyVGV4dD09dGFyZ2V0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKGNvbGxpc2lvbkJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKGNvbGxpc2lvbkJsb2NrLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tCZWhhdmlvcnMoKVxue1xuICAgIC8vR2V0IE1vdmUgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdlbnRpdHknKVxuICAgICAgICB7XG4gICAgICAgICAgLy9HZXQgQmVoYXZpb3IgQmxvY2tzXG4gICAgICAgICAgdmFyIGNoaWxkQmxvY2tzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmxvY2tcIik7XG4gICAgICAgICAgdmFyIG1vdmVCbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJtb3ZlXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW92ZUJsb2NrID0gY2hpbGRCbG9ja3Nbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKG1vdmVCbG9jayAhPSBudWxsKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhtb3ZlQmxvY2ssIGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vRXhlY3V0ZSBNb3ZlIEJsb2NrXG59XG5cbmZ1bmN0aW9uIE1vdmVFbnRpdHkoZGlyZWN0aW9uKVxue1xuXG4gICBcbiAgICBpZihkaXJlY3Rpb24gPT0gXCJMZWZ0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJpZ2h0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAxMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmFuZG9tXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwO1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwO1xuICAgIH1cbn1cblxuQGluamVjdChSb3V0ZXIpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHk1IHtcbiAgd29ya3NwYWNlID0ge307XG4gIGludGVycHJldGVyID0ge307XG4gIHRvb2xib3g7XG4gIGdhbWUgPSB7fTtcbiAgQ2hhcnREYXRhO1xuICBUaW1lU3RhbXAgPSAwO1xuICBTYW1wbGVSYXRlO1xuICBUaW1lcklkO1xuICBhY3Rpdml0eU5hbWU7XG5cbiAgY29uc3RydWN0b3Iocm91dGVyKSB7XG4gICAgbXlBcHAgPSB0aGlzO1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIFBhcnNlLmluaXRpYWxpemUoXCJteUFwcElkXCIpOyAgICBcbiAgICBQYXJzZS5zZXJ2ZXJVUkwgPSB1cmwgKyBcIjpcIiArIGxvY2F0aW9uLnBvcnQgKyAnL3BhcnNlJztcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLmFjdGl2aXR5TmFtZSA9IFwiUGFydDRcIjtcbiAgfVxuXG4gIC8vYmVmb3JlIHZpZXctbW9kZWwgcmVuZGVyc1xuICBhdHRhY2hlZCgpe1xuICAgIHRoaXMudG9vbGJveCA9IHRoaXMuTG9hZFRvb2xib3goKTtcbiAgICB0aGlzLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoNjAwLCA2MDAsIFBoYXNlci5BVVRPLCAncGhhc2VyRGl2JywgeyBwcmVsb2FkOiBwcmVsb2FkLCBjcmVhdGU6IGNyZWF0ZSwgdXBkYXRlOiB1cGRhdGUgfSk7XG5cblxuICAgIHRoaXMuVGltZVN0YW1wID0gMDtcbiAgICB0aGlzLlNhbXBsZVJhdGUgPSAxIDtcblxuICAgIGdvb2dsZS5jaGFydHMubG9hZCgnY3VycmVudCcsIHsncGFja2FnZXMnOlsnY29yZWNoYXJ0J119KTtcbiAgICBnb29nbGUuY2hhcnRzLnNldE9uTG9hZENhbGxiYWNrKHRoaXMuaW5pdENoYXJ0RGF0YSk7XG4gIH1cblxuSHR0cENsaWVudCgpXG4gICAge1xuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKGFVcmwsIGFDYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGFuSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgaWYgKGFuSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIGFuSHR0cFJlcXVlc3Quc3RhdHVzID09IDIwMClcbiAgICAgICAgICAgICAgICAgICAgYUNhbGxiYWNrKGFuSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vcGVuKCBcIkdFVFwiLCBhVXJsLCB0cnVlICk7ICAgICAgICAgICAgXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0LnNlbmQoIG51bGwgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgLy8vLy8vLy8vLy8vLy8vLy9DaGFydCBIZWxwZXIgZnVuY3Rpb25zXG4gIHVwZGF0ZUNoYXJ0RGF0YSgpXG4gIHtcbiAgICAgIC8vY29uc29sZS5sb2coXCJVcGRhdGluZyBDaGFydDogXCIrbXlBcHAuVGltZVN0YW1wLnRvU3RyaW5nKCkpO1xuICAgICAgbXlBcHAuVGltZVN0YW1wICs9IG15QXBwLlNhbXBsZVJhdGU7XG4gICAgICB2YXIgaGVhbHRoeUNvdW50ID0gNSAvL215QXBwLmhlYWx0aHlQZXJzb25zLmxlbmd0aFxuICAgICAgdmFyIHNpY2tDb3VudCA9IDEwIC8vbXlBcHAuaW5mZWN0ZWRQZXJzb25zLmxlbmd0aFxuICAgICAgbXlBcHAuQ2hhcnREYXRhLmFkZFJvdyhbbXlBcHAuVGltZVN0YW1wLGhlYWx0aHlDb3VudCxzaWNrQ291bnRdKVxuICAgICAgbXlBcHAuZHJhd0NoYXJ0KCk7XG4gIH1cblxuICBpbml0Q2hhcnREYXRhKClcbiAge1xuICAgICAgbXlBcHAuQ2hhcnREYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICAgICAgbXlBcHAuQ2hhcnREYXRhLmFkZENvbHVtbignbnVtYmVyJywnVGltZScpXG4gICAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdIZWFsdGh5JylcbiAgICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ1NpY2snKVxuICAgICAgbXlBcHAuVGltZXJJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChteUFwcC51cGRhdGVDaGFydERhdGEsbXlBcHAuU2FtcGxlUmF0ZSoxMDAwKTtcbiAgICAgIG15QXBwLmRyYXdDaGFydCgpO1xuICB9XG5cbiAgZGV0YWNoZWQoKVxuICB7XG4gICAgICBteUFwcC5DaGFydERhdGEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKCk7XG4gICAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdUaW1lJylcbiAgICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ0hlYWx0aHknKVxuICAgICAgbXlBcHAuQ2hhcnREYXRhLmFkZENvbHVtbignbnVtYmVyJywnU2ljaycpXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChteUFwcC5UaW1lcklkKTtcblxuICAgICAgbXlBcHAuZ2FtZS5kZXN0cm95KClcbiAgfVxuXG4gIGRyYXdDaGFydCgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBteUFwcC5DaGFydERhdGE7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgdGl0bGU6ICdTaWNrIHZzIEhlYWx0aHknLFxuICAgICAgICAgIGN1cnZlVHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgICBsZWdlbmQ6IHsgcG9zaXRpb246ICdib3R0b20nIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJ2ZV9jaGFydCcpKTtcblxuICAgICAgICBjaGFydC5kcmF3KGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy9TYXZlL0xvYWQgRnVuY3Rpb25zXG4gIFNhdmVXb3Jrc3BhY2UoKVxuICB7XG4gICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcbiAgICB0aGlzLmV4cG9ydCh4bWxfdGV4dCk7XG4gIH1cblxuICBleHBvcnQodGV4dCkge1xuICAgIHZhciBwb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgcG9tLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICd3b3Jrc3BhY2UueG1sJyk7XG4gICAgcG9tLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb20pO1xuICAgIHBvbS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9tKTtcbiAgfVxuXG4gIExvYWRXb3Jrc3BhY2VDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgQmxvY2tseS5YbWwuZG9tVG9Xb3Jrc3BhY2UoeG1sLCBteUFwcC53b3Jrc3BhY2UpO1xuICB9XG5cbiAgTG9hZEluaXRpYWxXb3Jrc3BhY2UoKVxuICB7XG4gICAgICBteUFwcC53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICAgIHRoaXMuTG9hZExhc3RTYXZlKCk7XG4gICAgICBpZihteUFwcC53b3Jrc3BhY2UuZ2V0QWxsQmxvY2tzKCkubGVuZ3RoID09IDApXG4gICAgICB7XG4gICAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9Jbml0aWFsV29ya3NwYWNlcy9BY3Rpdml0eTUueG1sXCI7XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gICAgICB9XG4gIH1cblxuICBMb2FkVG9vbEJveENhbGxiYWNrKFJlc3BvbnNlVGV4dClcbiAge1xuICAgICAgdmFyIHhtbF90ZXh0ICA9IFJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC50ZXh0VG9Eb20oeG1sX3RleHQpO1xuICAgICAgbXlBcHAudG9vbGJveCA9IHhtbDtcbiAgICAgIG15QXBwLndvcmtzcGFjZSA9IEJsb2NrbHkuaW5qZWN0KCdibG9ja2x5RGl2JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21lZGlhOiAnLi4vQmxvY2tseS9tZWRpYS8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sYm94OiBteUFwcC50b29sYm94fSk7XG4gICAgICBteUFwcC5Mb2FkSW5pdGlhbFdvcmtzcGFjZSgpO1xuICB9XG5cbiAgTG9hZFRvb2xib3goKVxuICB7XG4gICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvRXBpZGVtaWNUb29sYm94LnhtbFwiO1xuICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRUb29sQm94Q2FsbGJhY2spO1xuICB9XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vUGhhc2VyIEhlbHBlciBmdW5jdGlvbnNcbiAgUmVzZXRQaGFzZXIoKVxuICB7XG4gICAgbXlBcHAuQ2hhcnREYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ1RpbWUnKVxuICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ0hlYWx0aHknKVxuICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ1NpY2snKVxuICAgIG15QXBwLlRpbWVTdGFtcCA9IDA7XG4gICAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgICBjcmVhdGUoKTtcbiAgfVxuXG4gIHNldENvbG9yKHRhcmdldENvbG9yKVxuICB7XG4gICAgaWYodGFyZ2V0Q29sb3IgPT0gXCJSRURcIilcbiAgICB7XG4gICAgICAgIGJhbGwyLmxvYWRUZXh0dXJlKCdyZWRiYWxsJyk7XG4gICAgfVxuICAgIGVsc2UgaWYodGFyZ2V0Q29sb3IgPT0gXCJCTFVFXCIpXG4gICAge1xuICAgICAgICBiYWxsMi5sb2FkVGV4dHVyZSgnYmx1ZWJhbGwnKTtcbiAgICB9XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKGJhbGwxLCBiYWxsMik7XG4gIH1cblxuICBoYW5kbGVDb2xsaXNpb24oKVxuICB7XG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdjb2xsaXNpb24nKVxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayh4bWwsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLHRoaXMuaW5pdEFwaSk7XG4gICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIEhlYWx0aHlJbmZlY3RlZENvbGxpc2lvbihoZWFsdGh5LCBpbmZlY3RlZClcbiAge1xuICAgICAgaGVhbHRoeS5sb2FkVGV4dHVyZSgncmVkYmFsbCcpXG4gICAgICBteUFwcC5oZWFsdGh5UGVyc29ucy5yZW1vdmUoaGVhbHRoeSlcbiAgICAgIG15QXBwLmluZmVjdGVkUGVyc29ucy5hZGQoaGVhbHRoeSlcbiAgfVxuXG4gIEhlYWxlckluZmVjdGVkQ29sbGlzaW9uKGhlYWxlciwgaW5mZWN0ZWQpXG4gIHtcbiAgICAgIGluZmVjdGVkLmxvYWRUZXh0dXJlKCd3aXpiYWxsJylcbiAgICAgIG15QXBwLmluZmVjdGVkUGVyc29ucy5yZW1vdmUoaW5mZWN0ZWQpXG4gICAgICBteUFwcC5oZWFsdGh5UGVyc29ucy5hZGQoaW5mZWN0ZWQpXG4gIH1cblxuICBQZXJzb25WaXJ1c0NvbGxpc2lvbihwZXJzb24sdmlydXMpXG4gIHtcbiAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gcGVyc29uO1xuICAgICAgR2V0Q29sbGlzaW9uQmxvY2tGcm9tRW50aXR5KHBlcnNvbixcIlZpcnVzXCIpXG4gICAgICBcbiAgfVxuXG4gIFBlcnNvblBlcnNvbkNvbGxpc2lvbihwZXJzb24xLHBlcnNvbjIpXG4gIHtcbiAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gcGVyc29uMTtcbiAgICAgIGNvbGxpZGVlID0gcGVyc29uMjtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24xLFwiUGVyc29uXCIpXG5cbiAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gcGVyc29uMjtcbiAgICAgIGNvbGxpZGVlID0gcGVyc29uMTtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24yLFwiUGVyc29uXCIpXG4gIH1cblxuICBQZXJzb25Ib3NwaXRhbENvbGxpc2lvbihwZXJzb24xLCBob3NwaXRhbClcbiAge1xuICAgICAgY29uc29sZS5sb2coXCJCb29wXCIpXG4gIH1cblxuXG4gIHJ1blNpbXVsYXRpb24oKVxuICB7XG4gICAgbXlBcHAuUmVzZXRQaGFzZXIoKTtcbiAgICAvL0dldCBXaGVuUnVuIEhlYWRcbiAgICAvL1J1biBjb2RlXG4gICAgdmFyIHRlc3QgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKVxuICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdzaW11bGF0aW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBpbml0QXBpKGludGVycHJldGVyLCBzY29wZSkge1xuICAvLyBBZGQgYW4gQVBJIGZ1bmN0aW9uIGZvciB0aGUgYWxlcnQoKSBibG9jay5cbiAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKHdpbmRvdy5hbGVydCh0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdhbGVydCcsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKG15QXBwLnNldENvbG9yKHRleHQpKTtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENvbG9yJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG4gICAgICBcbiAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkoXCJQZXJzb25cIikpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZVBlcnNvbicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZUVudGl0eSh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlTGFyZ2VFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKE1vdmVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ01vdmVFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQsYWdlLHN0YXR1cykge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBzdGF0dXMudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgYWdlID0gYWdlID8gYWdlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljcyh0ZXh0LGFnZSxzdGF0dXMpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSB7XG4gICAgICAgIGNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWMgPyBjaGFyYWN0ZXJpc3RpYy50b1N0cmluZygpIDogJyc7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBuZXdWYWx1ZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpYyxuZXdWYWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihjaGFyYWN0ZXJpc3RpYyx0YXJnZXQpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID8gdGFyZ2V0LnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKEdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLHRhcmdldCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0dldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7IFxuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24obnVtYmVyLHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyID8gbnVtYmVyLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtYmVyLHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVNdWx0aXBsZUVudGl0aWVzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7ICAgIFxuXG4gICAgfVxuXG4gICAgUHVzaE9iamVjdCgpXG4gICAge1xuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgICAgICB2YXIgZ2FtZVNjb3JlID0gbmV3IEdhbWVTY29yZSgpO1xuXG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwiQWN0aXZpdHlOYW1lXCIsdGhpcy5hY3Rpdml0eU5hbWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZ2FtZVNjb3JlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZSwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIExvYWRMYXN0U2F2ZSgpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmdcIilcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gUGFyc2UuVXNlci5jdXJyZW50KCk7XG4gICAgICAgIHZhciBHYW1lU2NvcmUgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiR2FtZVNjb3JlXCIpO1xuICAgICAgICB2YXIgcXVlcnkgPSBuZXcgUGFyc2UuUXVlcnkoR2FtZVNjb3JlKTtcbiAgICAgICAgcXVlcnkuZXF1YWxUbyhcInVzZXJuYW1lXCIsIGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKCdBY3Rpdml0eU5hbWUnLHRoaXMuYWN0aXZpdHlOYW1lKVxuICAgICAgICBxdWVyeS5kZXNjZW5kaW5nKFwidXBkYXRlZEF0XCIpO1xuICAgICAgICBxdWVyeS5maXJzdCh7XG4gICAgICAgIHN1Y2Nlc3M6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IG9iamVjdC5hdHRyaWJ1dGVzWyd3b3Jrc3BhY2UnXVxuICAgICAgICAgICAgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2sodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgTG9nT3V0KCkgXG4gICAge1xuICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0P1wiKSA9PSB0cnVlKSBcbiAgICAgICAge1xuICAgICAgICAgICAgUGFyc2UuVXNlci5sb2dPdXQoKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCdob21lJyk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia';
            config.map([
                { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home' },
                { route: ['activity1'], name: 'activity1', moduleId: './activity1', nav: true, title: 'Activity1' },
                { route: ['activity2'], name: 'activity2', moduleId: './activity2', nav: true, title: 'Activity2' },
                { route: ['activity3'], name: 'activity3', moduleId: './activity3', nav: true, title: 'Activity3' },
                { route: ['activity5'], name: 'activity5', moduleId: './activity5', nav: true, title: 'Activity5' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1FBbUJBLENBQUM7UUFmQyw2QkFBZSxHQUFmLFVBQWdCLE1BQU0sRUFBRSxNQUFNO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ1IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sRUFBRTtnQkFFL0UsRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRyxJQUFJLEVBQUUsV0FBVyxFQUFHLFFBQVEsRUFBRSxhQUFhLEVBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsV0FBVyxFQUFFO2dCQUNyRyxFQUFFLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFHLElBQUksRUFBRSxXQUFXLEVBQUcsUUFBUSxFQUFFLGFBQWEsRUFBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQUU7Z0JBQ3JHLEVBQUUsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUcsSUFBSSxFQUFFLFdBQVcsRUFBRyxRQUFRLEVBQUUsYUFBYSxFQUFHLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBRTtnQkFDckcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRyxJQUFJLEVBQUUsV0FBVyxFQUFHLFFBQVEsRUFBRSxhQUFhLEVBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsV0FBVyxFQUFFO2FBRXZHLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUM7UUFDSixVQUFDO0lBQUQsQ0FuQkEsQUFtQkMsSUFBQTtJQW5CWSxrQkFBRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlckNvbmZpZ3VyYXRpb24sIFJvdXRlcn0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgXG4gIHJvdXRlcjpSb3V0ZXJcblxuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpe1xuICAgICAgY29uZmlnLnRpdGxlID0gJ0F1cmVsaWEnO1xuXHRcdFxuICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICB7IHJvdXRlOiBbJycsJ2hvbWUnXSwgbmFtZTogJ2hvbWUnLCBtb2R1bGVJZDonLi9ob21lJywgbmF2OnRydWUsIHRpdGxlOidIb21lJyB9LFxuICAgICAgICAvLyB7IHJvdXRlOiBbJ3Rlc3QnXSwgIG5hbWU6ICd0ZXN0JywgIG1vZHVsZUlkOiAnLi90ZXN0JywgIG5hdjogdHJ1ZSwgdGl0bGU6J1Rlc3QnIH0sXG4gICAgICAgICB7IHJvdXRlOiBbJ2FjdGl2aXR5MSddLCAgbmFtZTogJ2FjdGl2aXR5MScsICBtb2R1bGVJZDogJy4vYWN0aXZpdHkxJywgIG5hdjogdHJ1ZSwgdGl0bGU6J0FjdGl2aXR5MScgfSxcbiAgICAgICAgIHsgcm91dGU6IFsnYWN0aXZpdHkyJ10sICBuYW1lOiAnYWN0aXZpdHkyJywgIG1vZHVsZUlkOiAnLi9hY3Rpdml0eTInLCAgbmF2OiB0cnVlLCB0aXRsZTonQWN0aXZpdHkyJyB9LFxuICAgICAgICAgeyByb3V0ZTogWydhY3Rpdml0eTMnXSwgIG5hbWU6ICdhY3Rpdml0eTMnLCAgbW9kdWxlSWQ6ICcuL2FjdGl2aXR5MycsICBuYXY6IHRydWUsIHRpdGxlOidBY3Rpdml0eTMnIH0sXG4gICAgICAgICB7IHJvdXRlOiBbJ2FjdGl2aXR5NSddLCAgbmFtZTogJ2FjdGl2aXR5NScsICBtb2R1bGVJZDogJy4vYWN0aXZpdHk1JywgIG5hdjogdHJ1ZSwgdGl0bGU6J0FjdGl2aXR5NScgfVxuICAgICAgICAgXG4gICAgICBdKTtcblxuICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLGtCQUFlO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGRlYnVnOiB0cnVlLFxuICB0ZXN0aW5nOiB0cnVlXG59O1xuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('home',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var myApp;
    var Home = (function () {
        function Home(router) {
            this.router = router;
            myApp = this;
        }
        Home.prototype.attached = function () {
            var url = window.location.protocol + '//' + window.location.hostname;
            Parse.initialize("myAppId");
            Parse.serverURL = url + ":" + location.port + '/parse';
        };
        Home.prototype.login = function () {
            var _this = this;
            console.log("Logging in!");
            Parse.User.logIn(this.username, this.password, {
                success: function (user) {
                    _this.router.navigate("activity1");
                },
                error: function (user, error) {
                    console.log("Failure: " + error.message);
                }
            });
        };
        Home.prototype.signup = function () {
            var user = new Parse.User();
            user.set("username", this.username);
            user.set("password", this.password);
            user.signUp(null, {
                success: function (user) {
                    alert("Success");
                },
                error: function (user, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };
        return Home;
    }());
    Home = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Home);
    exports.Home = Home;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBR0EsSUFBSSxLQUFLLENBQUM7SUFHVixJQUFhLElBQUk7UUFLakIsY0FBWSxNQUFNO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNmLENBQUM7UUFFSCx1QkFBUSxHQUFSO1lBRUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3JFLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQzNELENBQUM7UUFFRCxvQkFBSyxHQUFMO1lBQUEsaUJBY0M7WUFaRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBRzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDOUMsT0FBTyxFQUFFLFVBQUEsSUFBSTtvQkFDWixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxLQUFLLEVBQUUsVUFBUyxJQUFJLEVBQUUsS0FBSztvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2FBQ0EsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVELHFCQUFNLEdBQU47WUFFSSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNsQixPQUFPLEVBQUUsVUFBUyxJQUFJO29CQUNsQixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLFVBQVMsSUFBSSxFQUFFLEtBQUs7b0JBRXZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2FBQ0EsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELFdBQUM7SUFBRCxDQWxEQSxBQWtEQyxJQUFBO0lBbERZLElBQUk7UUFEaEIsMEJBQU0sQ0FBQyx1QkFBTSxDQUFDOztPQUNGLElBQUksQ0FrRGhCO0lBbERZLG9CQUFJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSb3V0ZXJDb25maWd1cmF0aW9uLCBSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxudmFyIG15QXBwO1xuXG5AaW5qZWN0KFJvdXRlcilcbmV4cG9ydCBjbGFzcyBIb21lIHtcbnJvdXRlcjtcbnVzZXJuYW1lO1xucGFzc3dvcmQ7XG5cbmNvbnN0cnVjdG9yKHJvdXRlcil7XG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gICAgbXlBcHAgPSB0aGlzO1xuICB9XG5cbmF0dGFjaGVkKClcbntcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBQYXJzZS5pbml0aWFsaXplKFwibXlBcHBJZFwiKTsgICAgXG4gICAgUGFyc2Uuc2VydmVyVVJMID0gdXJsICsgXCI6XCIgKyBsb2NhdGlvbi5wb3J0ICsgJy9wYXJzZSc7XG59XG5cbmxvZ2luKClcbntcbiAgICBjb25zb2xlLmxvZyhcIkxvZ2dpbmcgaW4hXCIpXG4gICAgXG5cbiAgICBQYXJzZS5Vc2VyLmxvZ0luKHRoaXMudXNlcm5hbWUsdGhpcy5wYXNzd29yZCwge1xuICAgIHN1Y2Nlc3M6IHVzZXIgPT4ge1xuICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcImFjdGl2aXR5MVwiKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbih1c2VyLCBlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJGYWlsdXJlOiBcIisgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICAgIH0pO1xuXG59XG5cbnNpZ251cCgpXG57XG4gICAgdmFyIHVzZXIgPSBuZXcgUGFyc2UuVXNlcigpO1xuICAgIHVzZXIuc2V0KFwidXNlcm5hbWVcIiwgdGhpcy51c2VybmFtZSk7XG4gICAgdXNlci5zZXQoXCJwYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkKTtcblxuICAgIHVzZXIuc2lnblVwKG51bGwsIHtcbiAgICBzdWNjZXNzOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIGFsZXJ0KFwiU3VjY2Vzc1wiKTtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbih1c2VyLCBlcnJvcikge1xuICAgICAgICAvLyBTaG93IHRoZSBlcnJvciBtZXNzYWdlIHNvbWV3aGVyZSBhbmQgbGV0IHRoZSB1c2VyIHRyeSBhZ2Fpbi5cbiAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gICAgfSk7XG59XG5cbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsbUJBQTBCLE9BQWdCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHO2FBQ1IscUJBQXFCLEVBQUU7YUFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLHFCQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLHFCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBZEQsOEJBY0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXVyZWxpYX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYTogQXVyZWxpYSkge1xuICBhdXJlbGlhLnVzZVxuICAgIC5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgIC5mZWF0dXJlKCdyZXNvdXJjZXMnKTtcblxuICBpZiAoZW52aXJvbm1lbnQuZGVidWcpIHtcbiAgICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoKTtcbiAgfVxuXG4gIGlmIChlbnZpcm9ubWVudC50ZXN0aW5nKSB7XG4gICAgYXVyZWxpYS51c2UucGx1Z2luKCdhdXJlbGlhLXRlc3RpbmcnKTtcbiAgfVxuXG4gIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbikge1xuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('text!activity1.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><span class=\"logo\">ENGAGE</span></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity1\">Part 1</a><ul><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity3\">Part 3</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"hint-button\" click.trigger=\"SaveWorkspace()\">Debug(SaveToDisk)</div><div class=\"instructions-button\" click.trigger=\"LoadLastSave()\">Load</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity2.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity2\">Part 2</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity3\">Part 3</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"hint-button\" click.trigger=\"SaveWorkspace()\">Debug(SaveToDisk)</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity3.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity3\">Part 3</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"hint-button\" click.trigger=\"SaveWorkspace()\">Debug(SaveToDisk)</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity5.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity4\">Part 4</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity3\">Part 3</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"hint-button\" click.trigger=\"SaveWorkspace()\">Debug(SaveToDisk)</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div><div id=\"curve_chart\" style=\"width:900px;height:500px\"></div></body></template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><h1>Welcome to Engage</h1><nav><form submit.trigger=\"login()\"><input type=\"text\" value.bind=\"username\"><br><input type=\"password\" value.bind=\"password\"><br><button type=\"submit\">Login</button></form><button type=\"button\" click.trigger=\"signup()\">Sign Up</button></nav></template>"; });
//# sourceMappingURL=app-bundle.js.map