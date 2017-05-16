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
    var MAX_PERSONS = 1;
    var MAX_VIRUSES = 0;
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
            if (num > MAX_PERSONS)
                num = MAX_PERSONS;
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Viruses") {
            if (num > MAX_VIRUSES)
                num = MAX_VIRUSES;
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
    }
    function CreateVirus() {
        var spriteName = "Virus1";
        var c = {};
        if (myApp.Viruses.length == 0) {
            c = myApp.Viruses.create(400, 300, spriteName);
        }
        else {
            c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
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
        var style = { font: "16px Courier", fill: "#000000" };
        var text1 = myApp.game.add.text(16, -30, "Age: " + c.age, style);
        var text2 = myApp.game.add.text(16, 0, "Type: " + c.type, style);
        var text3 = myApp.game.add.text(16, 30, "Status: " + c.status, style);
        c.addChild(text1);
        c.addChild(text2);
        c.addChild(text3);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("personentity");
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = "";
        PersonProperties.age = "";
        PersonProperties.status = "";
        if (type.length > 0)
            PersonProperties.type = type;
        if (age.length > 0)
            PersonProperties.age = age;
        if (status.length > 0)
            PersonProperties.status = status;
    }
    function GetCharacteristics(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                try {
                    var in1 = xml.firstElementChild.firstElementChild;
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(in1, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
                catch (error) {
                    console.log("Error in GetCharacteristics for: " + entityType);
                    console.log(code);
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(moveBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error running CheckBehaviors for: " + entityType);
                    }
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(collisionBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error in GetCollisionBlockFromEntity");
                    }
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
            myApp.PushObject();
            myApp.game.destroy();
            this.workspace.dispose();
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
            myApp.workspace.addChangeListener(myApp.onBlocklyChange);
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
        Activity1.prototype.runSimulation = function () {
            myApp.LogEvent("RunSimulation");
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
            myApp.LogEvent("SaveWorkspace");
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
                myApp.LogEvent("LogOut");
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity1.prototype.ResetCode = function () {
            if (confirm("Are you sure you want to reset the code to its initial state?") == true) {
                myApp.LogEvent("ResetWorkspace");
                myApp.workspace.clear();
                var url = "resources/InitialWorkspaces/Activity1.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
            else {
            }
        };
        Activity1.prototype.LoadLastSave = function () {
            var _this = this;
            myApp.LogEvent("LoadLastSave");
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
        Activity1.prototype.onBlocklyChange = function (event) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", event.type);
                traceLog.set("EventBlock", event.blockId);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        Activity1.prototype.LogEvent = function (eventType) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", eventType);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        return Activity1;
    }());
    Activity1 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity1);
    exports.Activity1 = Activity1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSb3V0ZXJDb25maWd1cmF0aW9uLCBSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxudmFyIG15QXBwXG52YXIgcmVzcG9uc2VUZXh0XG52YXIgbXlBcHBcblxudmFyIFBlcnNvblByb3BlcnRpZXMgPSB7fTtcblxudmFyIE1BWF9QRVJTT05TID0gMTtcbnZhciBNQVhfVklSVVNFUyA9IDA7XG5cbmZ1bmN0aW9uIHByZWxvYWQoKSB7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4xJywgJ2Fzc2V0cy9NYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMicsICdhc3NldHMvTWFuMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMScsICdhc3NldHMvV29tYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4yJywgJ2Fzc2V0cy9Xb21hbjIucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjFTaWNrJywgJ2Fzc2V0cy9NYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yU2ljaycsICdhc3NldHMvTWFuMl9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xU2ljaycsICdhc3NldHMvV29tYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjJTaWNrJywgJ2Fzc2V0cy9Xb21hbjJfc2ljay5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMxJywgJ2Fzc2V0cy9WaXJ1czEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czInLCAnYXNzZXRzL1ZpcnVzMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMycsICdhc3NldHMvVmlydXMzLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdIb3NwaXRhbDEnLCAnYXNzZXRzL0hvc3BpdGFsMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ0hvc3BpdGFsMicsICdhc3NldHMvSG9zcGl0YWwyLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnSG9zcGl0YWwzJywgJ2Fzc2V0cy9Ib3NwaXRhbDMucG5nJyk7XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIC8vICBXZSdyZSBnb2luZyB0byBiZSB1c2luZyBwaHlzaWNzLCBzbyBlbmFibGUgdGhlIEFyY2FkZSBQaHlzaWNzIHN5c3RlbVxuICAgIG15QXBwLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjZGJkNmQ3XCI7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG5cbiAgICBteUFwcC5QZXJzb25zID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5QZXJzb25zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlBlcnNvbnMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuXG4gICAgbXlBcHAuVmlydXNlcyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuVmlydXNlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5WaXJ1c2VzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIG15QXBwLkhvc3BpdGFscyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuSG9zcGl0YWxzLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLkhvc3BpdGFscy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuICAgIFxuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShteUFwcC5QZXJzb25zLCBteUFwcC5QZXJzb25zLCBudWxsLCBudWxsLCB0aGlzKTtcbiAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUobXlBcHAuUGVyc29ucywgbXlBcHAuVmlydXNlcywgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLkhvc3BpdGFscywgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlZpcnVzZXMsIG15QXBwLlZpcnVzZXMsIG51bGwsIG51bGwsIHRoaXMpO1xuXG59XG5cbmZ1bmN0aW9uIENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtLHR5cGUpXG57XG4gICAgaWYobnVtIDw9IDApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciB4PTA7XG5cbiAgICBpZih0eXBlID09IFwiUGVvcGxlXCIpXG4gICAge1xuICAgICAgICBpZihudW0gPiBNQVhfUEVSU09OUylcbiAgICAgICAgICAgIG51bSA9IE1BWF9QRVJTT05TO1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlUGVyc29uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PSBcIlZpcnVzZXNcIilcbiAgICB7XG4gICAgICAgIGlmKG51bSA+IE1BWF9WSVJVU0VTKVxuICAgICAgICAgICAgbnVtID0gTUFYX1ZJUlVTRVM7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBDcmVhdGVWaXJ1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYodHlwZSA9PSBcIkhvc3BpdGFsXCIpXG4gICAge1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIT1NQSVRBTFwiKVxuICAgICAgICB9XG5cbiAgICB9XG59XG5mdW5jdGlvbiBDcmVhdGVWaXJ1cygpXG57XG4gICAgLy9HZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFwiVmlydXMxXCJcblxuICAgIHZhciBjID0ge307XG4gICAgaWYobXlBcHAuVmlydXNlcy5sZW5ndGggPT0gMClcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5WaXJ1c2VzLmNyZWF0ZSg0MDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5WaXJ1c2VzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuXG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMuYm9keS5zZXRTaXplKDUsNjAsMjMsMTUpXG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlSG9zcGl0YWwoKVxue1xuICAgICAvL0dldENoYXJhY3RlcmlzdGljcygpO1xuICAgIHZhciBzcHJpdGVOYW1lID0gXCJIb3NwaXRhbDFcIlxuXG4gICAgdmFyIGMgPSBteUFwcC5Ib3NwaXRhbHMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICBjLnNjYWxlID0gbmV3IFBoYXNlci5Qb2ludCgxLDEpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG5cbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbiAgICBjLmJvZHkuaW1tb3ZhYmxlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlUGVyc29uKClcbntcbiAgICBHZXRDaGFyYWN0ZXJpc3RpY3MoXCJwZXJzb25lbnRpdHlcIik7XG5cbiAgICB2YXIgc3ByaXRlTmFtZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcblxuICAgIGlmKFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID09IFwiU2lja1wiKVxuICAgIHtcbiAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9XG4gICAgaWYobXlBcHAuUGVyc29ucy5sZW5ndGggPT0gMClcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZSgxMDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLnR5cGUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG4gICAgYy5hZ2UgPSBQZXJzb25Qcm9wZXJ0aWVzLmFnZTtcbiAgICBjLnN0YXR1cyA9IFBlcnNvblByb3BlcnRpZXMuc3RhdHVzO1xuICAgXG4gICAgdmFyIHN0eWxlID0geyBmb250OiBcIjE2cHggQ291cmllclwiLCBmaWxsOiBcIiMwMDAwMDBcIiB9O1xuICAgIHZhciB0ZXh0MSA9IG15QXBwLmdhbWUuYWRkLnRleHQoMTYsIC0zMCwgXCJBZ2U6IFwiK2MuYWdlLCBzdHlsZSk7XG4gICAgdmFyIHRleHQyID0gbXlBcHAuZ2FtZS5hZGQudGV4dCgxNiwgMCwgXCJUeXBlOiBcIitjLnR5cGUsIHN0eWxlKTtcbiAgICB2YXIgdGV4dDMgPSBteUFwcC5nYW1lLmFkZC50ZXh0KDE2LCAzMCwgXCJTdGF0dXM6IFwiK2Muc3RhdHVzLCBzdHlsZSk7XG5cbiAgICBjLmFkZENoaWxkKHRleHQxKTtcbiAgICBjLmFkZENoaWxkKHRleHQyKTtcbiAgICBjLmFkZENoaWxkKHRleHQzKTtcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIENoZWNrQmVoYXZpb3JzKFwicGVyc29uZW50aXR5XCIpO1xufVxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljcyh0eXBlLGFnZSxzdGF0dXMpXG57XG4gICAgUGVyc29uUHJvcGVydGllcy50eXBlID0gXCJcIjtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IFwiXCI7XG4gICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBcIlwiO1xuXG4gICAgaWYodHlwZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLnR5cGUgPSB0eXBlO1xuICAgIGlmKGFnZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IGFnZTtcbiAgICBpZihzdGF0dXMubGVuZ3RoID4gMClcbiAgICAgICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIEdldENoYXJhY3RlcmlzdGljcyhlbnRpdHlUeXBlKVxue1xuICAgIC8vR2V0IEVudGl0eSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09IGVudGl0eVR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICB0cnlcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW4xID0geG1sLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkOyAgICAgIFxuICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKGluMSwgaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2goZXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIEdldENoYXJhY3RlcmlzdGljcyBmb3I6IFwiK2VudGl0eVR5cGUpXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tCZWhhdmlvcnMoZW50aXR5VHlwZSlcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0gZW50aXR5VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBtb3ZlQmxvY2sgPSBudWxsO1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGNoaWxkQmxvY2tzLmxlbmd0aDsgaisrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmdldEF0dHJpYnV0ZSgndHlwZScpID09IFwibW92ZVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vdmVCbG9jayA9IGNoaWxkQmxvY2tzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZihtb3ZlQmxvY2sgIT0gbnVsbClcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKG1vdmVCbG9jaywgaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJ1bm5pbmcgQ2hlY2tCZWhhdmlvcnMgZm9yOiBcIiArIGVudGl0eVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0V4ZWN1dGUgTW92ZSBCbG9ja1xufVxuXG5mdW5jdGlvbiBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uLHRhcmdldClcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0ncGVyc29uZW50aXR5JylcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBjb2xsaXNpb25CbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJjb2xsaXNpb25cIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5maXJzdENoaWxkLmlubmVyVGV4dD09dGFyZ2V0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKGNvbGxpc2lvbkJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhjb2xsaXNpb25CbG9jaywgaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBNb3ZlRW50aXR5KGRpcmVjdGlvbilcbntcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgaWYoZGlyZWN0aW9uID09IFwiTGVmdFwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gLTEwMDtcbiAgICB9XG4gICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gXCJSaWdodFwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJhbmRvbVwiKVxuICAgIHtcbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5yYW5kb20oKSAqIDEwMCAtIDUwO1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIFJlc2V0UGhhc2VyKClcbntcbiAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgY3JlYXRlKCk7XG59XG5cbkBpbmplY3QoUm91dGVyKVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5MSB7XG4gIHdvcmtzcGFjZSA9IHt9O1xuICBpbnRlcnByZXRlciA9IHt9O1xuICB0b29sYm94O1xuICBnYW1lID0ge307XG4gIGhlYWx0aHlQZXJzb25zID0ge307XG4gIGluZmVjdGVkUGVyc29ucyA9IHt9O1xuICBoZWFsZXJzID0ge307XG4gIENoYXJ0RGF0YTtcbiAgVGltZVN0YW1wID0gMDtcbiAgU2FtcGxlUmF0ZTtcbiAgY3VycmVudEdhbWVPYmplY3Q7XG4gIEVudGl0aWVzO1xuICBcblxuICBjb25zdHJ1Y3Rvcihyb3V0ZXIpIHtcbiAgICBteUFwcCA9IHRoaXM7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgUGFyc2UuaW5pdGlhbGl6ZShcIm15QXBwSWRcIik7ICAgIFxuICAgIFBhcnNlLnNlcnZlclVSTCA9IHVybCArIFwiOlwiICsgbG9jYXRpb24ucG9ydCArICcvcGFyc2UnO1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgIHRoaXMuYWN0aXZpdHlOYW1lID0gXCJQYXJ0MVwiO1xuICB9XG5cbiAgLy9iZWZvcmUgdmlldy1tb2RlbCByZW5kZXJzXG4gIGF0dGFjaGVkKCl7XG4gICAgdGhpcy50b29sYm94ID0gdGhpcy5Mb2FkVG9vbGJveCgpO1xuICAgIHRoaXMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdwaGFzZXJEaXYnLCB7IHByZWxvYWQ6IHByZWxvYWQsIGNyZWF0ZTogY3JlYXRlLCB1cGRhdGU6IHVwZGF0ZSB9KTtcbiAgfVxuICBcbiAgXG4gIGRldGFjaGVkKClcbiAge1xuICAgICAgbXlBcHAuUHVzaE9iamVjdCgpO1xuICAgICAgbXlBcHAuZ2FtZS5kZXN0cm95KClcbiAgICAgIC8vQWRkIFNhdmluZyBDb2RlXG4gICAgICB0aGlzLndvcmtzcGFjZS5kaXNwb3NlKCk7XG4gIH1cblxuIFxuICAgIFxuLy8vLy8vLy8vLy8vLy8vLy9TYXZlL0xvYWQgRnVuY3Rpb25zXG4gIFNhdmVXb3Jrc3BhY2UoKVxuICB7XG4gICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcbiAgICB0aGlzLmV4cG9ydCh4bWxfdGV4dCk7XG4gIH1cblxuICBleHBvcnQodGV4dCkge1xuICAgIHZhciBwb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgcG9tLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICd3b3Jrc3BhY2UueG1sJyk7XG4gICAgcG9tLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb20pO1xuICAgIHBvbS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9tKTtcbiAgfVxuXG4gIExvYWRXb3Jrc3BhY2UoKVxuICB7XG4gICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvd29ya3NwYWNlLnhtbFwiO1xuICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gIH1cblxuICBMb2FkV29ya3NwYWNlQ2FsbGJhY2soUmVzcG9uc2VUZXh0KVxuICB7XG4gICAgICB2YXIgeG1sX3RleHQgID0gUmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLnRleHRUb0RvbSh4bWxfdGV4dCk7XG4gICAgICBteUFwcC53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICAgIEJsb2NrbHkuWG1sLmRvbVRvV29ya3NwYWNlKHhtbCwgbXlBcHAud29ya3NwYWNlKTtcbiAgfVxuICBcblxuICBMb2FkSW5pdGlhbFdvcmtzcGFjZSgpXG4gIHtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgdGhpcy5Mb2FkTGFzdFNhdmUoKTtcbiAgICAgIGlmKG15QXBwLndvcmtzcGFjZS5nZXRBbGxCbG9ja3MoKS5sZW5ndGggPT0gMClcbiAgICAgIHtcbiAgICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL0luaXRpYWxXb3Jrc3BhY2VzL0FjdGl2aXR5MS54bWxcIjtcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIG15QXBwLndvcmtzcGFjZS5hZGRDaGFuZ2VMaXN0ZW5lcihteUFwcC5vbkJsb2NrbHlDaGFuZ2UpO1xuICB9XG5cbiAgTG9hZFRvb2xCb3hDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLnRvb2xib3ggPSB4bWw7XG4gICAgICBteUFwcC53b3Jrc3BhY2UgPSBCbG9ja2x5LmluamVjdCgnYmxvY2tseURpdicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZWRpYTogJy4uL0Jsb2NrbHkvbWVkaWEvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJveDogbXlBcHAudG9vbGJveH0pO1xuICAgICAgbXlBcHAuTG9hZEluaXRpYWxXb3Jrc3BhY2UoKTtcbiAgfVxuICBMb2FkVG9vbGJveCgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9FcGlkZW1pY1Rvb2xib3gueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFRvb2xCb3hDYWxsYmFjayk7XG4gIH1cbiAgIEh0dHBDbGllbnQoKVxuICB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oYVVybCwgYUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYW5IdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICBpZiAoYW5IdHRwUmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgYW5IdHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIGFVcmwsIHRydWUgKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vUGhhc2VyIEhlbHBlciBmdW5jdGlvbnNcbiAgUmVzZXRQaGFzZXIoKVxuICB7XG4gICAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgICBjcmVhdGUoKTtcbiAgfVxuXG4gIHJ1blNpbXVsYXRpb24oKVxuICB7XG4gICAgbXlBcHAuTG9nRXZlbnQoXCJSdW5TaW11bGF0aW9uXCIpXG4gICAgbXlBcHAuUmVzZXRQaGFzZXIoKTtcbiAgICAvL0dldCBXaGVuUnVuIEhlYWRcbiAgICAvL1J1biBjb2RlXG4gICAgdmFyIHRlc3QgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKVxuICAgIC8vY29uc29sZS5sb2codGVzdCk7XG5cbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J3NpbXVsYXRpb24nKVxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayh4bWwsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLHRoaXMuaW5pdEFwaSk7XG4gICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGluaXRBcGkoaW50ZXJwcmV0ZXIsIHNjb3BlKSBcbiAge1xuICAgICAgdmFyIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHJldHVybiBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUod2luZG93LmFsZXJ0KHRleHQpKTtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ2FsZXJ0JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cblxuICAgICB3cmFwcGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZVBlcnNvbihcIlBlcnNvblwiKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlUGVyc29uJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlUGVyc29uKHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVMYXJnZUVudGl0eScsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoTW92ZUVudGl0eSh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnTW92ZUVudGl0eScsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQsYWdlLHN0YXR1cykge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBzdGF0dXMudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgYWdlID0gYWdlID8gYWdlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljcyh0ZXh0LGFnZSxzdGF0dXMpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuXG4gICAgd3JhcHBlciA9IGZ1bmN0aW9uKG51bWJlcix0ZXh0KSB7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyID8gbnVtYmVyLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVNdWx0aXBsZUVudGl0aWVzKG51bWJlcix0ZXh0KSk7XG4gICAgICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgICAgfTtcbiAgICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVNdWx0aXBsZUVudGl0aWVzJyxcbiAgICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIH1cbiAgICAgXG4gICBQdXNoT2JqZWN0KClcbiAgIHsgICAgXG4gICAgICAgIG15QXBwLkxvZ0V2ZW50KFwiU2F2ZVdvcmtzcGFjZVwiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgICAgICB2YXIgZ2FtZVNjb3JlID0gbmV3IEdhbWVTY29yZSgpO1xuXG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwiQWN0aXZpdHlOYW1lXCIsdGhpcy5hY3Rpdml0eU5hbWUpO1xuICAgICAgICBcbiAgICAgICAgICAgIGdhbWVTY29yZS5zYXZlKG51bGwsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihnYW1lU2NvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBhZnRlciB0aGUgb2JqZWN0IGlzIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnV29ya3NwYWNlIFNhdmVkIScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGdhbWVTY29yZSwgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBpZiB0aGUgc2F2ZSBmYWlscy5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaXMgYSBQYXJzZS5FcnJvciB3aXRoIGFuIGVycm9yIGNvZGUgYW5kIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc2F2ZSB3b3Jrc3BhY2UsIHdpdGggZXJyb3IgY29kZTogJyArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgYWxlcnQoXCJVc2VyIG5vdCBsb2dnZWQgaW5cIilcbiAgICAgICAgfVxuICAgfVxuXG4gICAgTG9nT3V0KCkgXG4gICAge1xuICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0P1wiKSA9PSB0cnVlKSBcbiAgICAgICAge1xuICAgICAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJMb2dPdXRcIilcbiAgICAgICAgICAgIFBhcnNlLlVzZXIubG9nT3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZScpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBSZXNldENvZGUoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc2V0IHRoZSBjb2RlIHRvIGl0cyBpbml0aWFsIHN0YXRlP1wiKSA9PSB0cnVlKSBcbiAgICAgICAge1xuICAgICAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJSZXNldFdvcmtzcGFjZVwiKVxuICAgICAgICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvSW5pdGlhbFdvcmtzcGFjZXMvQWN0aXZpdHkxLnhtbFwiO1xuICAgICAgICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgICAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIExvYWRMYXN0U2F2ZSgpXG4gICAge1xuICAgICAgICBteUFwcC5Mb2dFdmVudChcIkxvYWRMYXN0U2F2ZVwiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBQYXJzZS5RdWVyeShHYW1lU2NvcmUpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKFwidXNlcm5hbWVcIiwgY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oJ0FjdGl2aXR5TmFtZScsdGhpcy5hY3Rpdml0eU5hbWUpXG4gICAgICAgIHF1ZXJ5LmRlc2NlbmRpbmcoXCJ1cGRhdGVkQXRcIik7XG4gICAgICAgIHF1ZXJ5LmZpcnN0KHtcbiAgICAgICAgc3VjY2Vzczogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gb2JqZWN0LmF0dHJpYnV0ZXNbJ3dvcmtzcGFjZSddXG4gICAgICAgICAgICB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uQmxvY2tseUNoYW5nZShldmVudClcbiAgICB7XG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIFRyYWNlTG9nID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIlRyYWNlTG9nXCIpO1xuICAgICAgICAgICAgdmFyIHRyYWNlTG9nID0gbmV3IFRyYWNlTG9nKCk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkFjdGl2aXR5TmFtZVwiLG15QXBwLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJFdmVudFR5cGVcIixldmVudC50eXBlKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkV2ZW50QmxvY2tcIixldmVudC5ibG9ja0lkKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIndvcmtzcGFjZVwiLCB4bWxfdGV4dCkgO1xuICAgICAgICBcbiAgICAgICAgICAgIHRyYWNlTG9nLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRyYWNlTG9nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgYWZ0ZXIgdGhlIG9iamVjdCBpcyBzYXZlZC5cbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnV29ya3NwYWNlIFNhdmVkIScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHRyYWNlTG9nLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgZXZlbnQ6ICBVc2VyIG5vdCBsb2dnZWQgaW5cIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIExvZ0V2ZW50KGV2ZW50VHlwZSlcbiAgICB7XG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAgeyAgIFxuXG4gICAgICAgICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgVHJhY2VMb2cgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiVHJhY2VMb2dcIik7XG4gICAgICAgICAgICB2YXIgdHJhY2VMb2cgPSBuZXcgVHJhY2VMb2coKTtcblxuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkFjdGl2aXR5TmFtZVwiLG15QXBwLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJFdmVudFR5cGVcIixldmVudFR5cGUpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgIFxuICAgICAgICAgICAgdHJhY2VMb2cuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24odHJhY2VMb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBhZnRlciB0aGUgb2JqZWN0IGlzIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24odHJhY2VMb2csIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgaWYgdGhlIHNhdmUgZmFpbHMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGlzIGEgUGFyc2UuRXJyb3Igd2l0aCBhbiBlcnJvciBjb2RlIGFuZCBtZXNzYWdlLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlIGV2ZW50OiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogIFVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
    var MAX_PERSONS = 1;
    var MAX_VIRUSES = 1;
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
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            if (num > MAX_PERSONS)
                num = MAX_PERSONS;
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Viruses") {
            if (num > MAX_VIRUSES)
                num = MAX_VIRUSES;
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
    }
    function CreateVirus() {
        var c = {};
        GetCharacteristics("virusentity");
        var spriteName = VirusProperties.type;
        if (myApp.Viruses.length == 0) {
            c = myApp.Viruses.create(400, 300, spriteName);
        }
        else {
            c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
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
        PersonProperties.type = "";
        PersonProperties.age = "";
        PersonProperties.status = "";
        if (type.length > 0)
            PersonProperties.type = type;
        if (age.length > 0)
            PersonProperties.age = age;
        if (status.length > 0)
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
                try {
                    var in1 = xml.firstElementChild.firstElementChild;
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(in1, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
                catch (error) {
                    console.log("Error in GetCharacteristics for: " + entityType);
                    console.log(code);
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(moveBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error running CheckBehaviors for: " + entityType);
                    }
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(collisionBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error in GetCollisionBlockFromEntity");
                    }
                }
            }
        }
    }
    function ResetPhaser() {
        myApp.game.world.removeAll(true, false, false);
        create();
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
            myApp.PushObject();
            myApp.game.destroy();
            this.workspace.dispose();
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
            myApp.workspace.addChangeListener(myApp.onBlocklyChange);
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
            myApp.LogEvent("RunSimulation");
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
            myApp.LogEvent("SaveWorkspace");
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
                myApp.LogEvent("LogOut");
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity2.prototype.LoadLastSave = function () {
            var _this = this;
            myApp.LogEvent("LoadLastSave");
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
        Activity2.prototype.onBlocklyChange = function (event) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", event.type);
                traceLog.set("EventBlock", event.blockId);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        Activity2.prototype.ResetCode = function () {
            if (confirm("Are you sure you want to reset the code to its initial state?") == true) {
                myApp.LogEvent("ResetWorkspace");
                myApp.workspace.clear();
                var url = "resources/InitialWorkspaces/Activity2.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
            else {
            }
        };
        Activity2.prototype.LogEvent = function (eventType) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", eventType);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        return Activity2;
    }());
    Activity2 = __decorate([
        aurelia_framework_1.inject(aurelia_router_1.Router),
        __metadata("design:paramtypes", [Object])
    ], Activity2);
    exports.Activity2 = Activity2;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO2dCQUMzRCxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBRTtnQkFFckMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxVQUFTLFFBQVE7b0JBRzFCLENBQUM7b0JBQ0QsS0FBSyxFQUFFLFVBQVMsUUFBUSxFQUFFLEtBQUs7d0JBRzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxJQUFJLENBQ0osQ0FBQztnQkFDRyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFJTCxnQkFBQztJQUFELENBaGJBLEFBZ2JDLElBQUE7SUFoYlksU0FBUztRQURyQiwwQkFBTSxDQUFDLHVCQUFNLENBQUM7O09BQ0YsU0FBUyxDQWdickI7SUFoYlksOEJBQVMiLCJmaWxlIjoiYWN0aXZpdHkyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Um91dGVyQ29uZmlndXJhdGlvbiwgUm91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbnZhciBteUFwcFxudmFyIHJlc3BvbnNlVGV4dFxudmFyIHRhcmdldEhlYWRpbmdcbnZhciBteUFwcFxuXG52YXIgUGVyc29uUHJvcGVydGllcyA9IHt9O1xudmFyIFZpcnVzUHJvcGVydGllcyA9IHt9O1xuXG52YXIgY29sbGlkZWU7XG5cbnZhciBNQVhfUEVSU09OUyA9IDE7XG52YXIgTUFYX1ZJUlVTRVMgPSAxO1xuXG5mdW5jdGlvbiBwcmVsb2FkKCkge1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMScsICdhc3NldHMvTWFuMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjInLCAnYXNzZXRzL01hbjIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjEnLCAnYXNzZXRzL1dvbWFuMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMicsICdhc3NldHMvV29tYW4yLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4xU2ljaycsICdhc3NldHMvTWFuMV9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMlNpY2snLCAnYXNzZXRzL01hbjJfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMVNpY2snLCAnYXNzZXRzL1dvbWFuMV9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4yU2ljaycsICdhc3NldHMvV29tYW4yX3NpY2sucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMScsICdhc3NldHMvVmlydXMxLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMyJywgJ2Fzc2V0cy9WaXJ1czIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czMnLCAnYXNzZXRzL1ZpcnVzMy5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnSG9zcGl0YWwxJywgJ2Fzc2V0cy9Ib3NwaXRhbDEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdIb3NwaXRhbDInLCAnYXNzZXRzL0hvc3BpdGFsMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ0hvc3BpdGFsMycsICdhc3NldHMvSG9zcGl0YWwzLnBuZycpO1xuXG5cblxufVxuXG5mdW5jdGlvbiBDcmVhdGVNdWx0aXBsZUVudGl0aWVzKG51bSx0eXBlKVxue1xuICAgIGlmKG51bSA8PSAwKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgeD0wO1xuXG4gICAgaWYodHlwZSA9PSBcIlBlb3BsZVwiKVxuICAgIHtcbiAgICAgICAgaWYobnVtID4gTUFYX1BFUlNPTlMpXG4gICAgICAgICAgICBudW0gPSBNQVhfUEVSU09OUztcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVBlcnNvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJWaXJ1c2VzXCIpXG4gICAge1xuICAgICAgICBpZihudW0gPiBNQVhfVklSVVNFUylcbiAgICAgICAgICAgIG51bSA9IE1BWF9WSVJVU0VTO1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlVmlydXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGUgPT0gXCJIb3NwaXRhbFwiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSE9TUElUQUxcIilcbiAgICAgICAgfVxuXG4gICAgfVxufVxuZnVuY3Rpb24gQ3JlYXRlVmlydXMoKVxue1xuICAgIHZhciBjID0ge31cbiAgICBHZXRDaGFyYWN0ZXJpc3RpY3MoXCJ2aXJ1c2VudGl0eVwiKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFZpcnVzUHJvcGVydGllcy50eXBlO1xuICAgIFxuICAgIGlmKG15QXBwLlZpcnVzZXMubGVuZ3RoID09IDApXG4gICAge1xuICAgICAgICBjID0gbXlBcHAuVmlydXNlcy5jcmVhdGUoNDAwLCAzMDAsIHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjID0gbXlBcHAuVmlydXNlcy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIH1cblxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLmJvZHkuc2V0U2l6ZSg1LDYwLDIzLDE1KVxuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoXCJ2aXJ1c2VudGl0eVwiKVxufVxuXG5mdW5jdGlvbiBDcmVhdGVIb3NwaXRhbCgpXG57XG4gICAgIC8vR2V0Q2hhcmFjdGVyaXN0aWNzKCk7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBcIkhvc3BpdGFsMVwiXG5cbiAgICB2YXIgYyA9IG15QXBwLkhvc3BpdGFscy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIC8vYy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVBlcnNvbigpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKFwicGVyc29uZW50aXR5XCIpO1xuXG4gICAgdmFyIHNwcml0ZU5hbWUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG5cbiAgICBpZihQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9PSBcIlNpY2tcIilcbiAgICB7XG4gICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgfVxuXG4gICAgdmFyIGMgPSB7fVxuICAgIGlmKG15QXBwLlBlcnNvbnMubGVuZ3RoID09IDApXG4gICAge1xuICAgICAgICBjID0gbXlBcHAuUGVyc29ucy5jcmVhdGUoMTAwLCAzMDAsIHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjID0gbXlBcHAuUGVyc29ucy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICBcbiAgICBjLnNjYWxlID0gbmV3IFBoYXNlci5Qb2ludCgxLDEpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG4gICAgYy50eXBlID0gUGVyc29uUHJvcGVydGllcy50eXBlO1xuICAgIGMuYWdlID0gUGVyc29uUHJvcGVydGllcy5hZ2U7XG4gICAgYy5zdGF0dXMgPSBQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IGM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuYm91bmNlLnNldCgxKTtcbiAgICBDaGVja0JlaGF2aW9ycyhcInBlcnNvbmVudGl0eVwiKTtcbn1cblxuZnVuY3Rpb24gU2V0Q2hhcmFjdGVyaXN0aWNzKHR5cGUsYWdlLHN0YXR1cylcbntcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLnR5cGUgPSBcIlwiO1xuICAgIFBlcnNvblByb3BlcnRpZXMuYWdlID0gXCJcIjtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9IFwiXCI7XG5cbiAgICBpZih0eXBlLmxlbmd0aCA+IDApXG4gICAgICAgIFBlcnNvblByb3BlcnRpZXMudHlwZSA9IHR5cGU7XG4gICAgaWYoYWdlLmxlbmd0aCA+IDApXG4gICAgICAgIFBlcnNvblByb3BlcnRpZXMuYWdlID0gYWdlO1xuICAgIGlmKHN0YXR1cy5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9IHN0YXR1cztcbn1cblxuZnVuY3Rpb24gU2V0VmlydXNDaGFyYWN0ZXJpc3RpY3ModmlydXNUeXBlKVxue1xuICAgIFZpcnVzUHJvcGVydGllcy50eXBlID0gdmlydXNUeXBlO1xufVxuXG5mdW5jdGlvbiBHZXRDaGFyYWN0ZXJpc3RpYyhjaGFydHlwZSwgdGFyZ2V0KVxue1xuICAgIHZhciBwZXJzb24gPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdFxuICAgIGlmKHRhcmdldCA9PSBcIkNvbGxpZGVlXCIpXG4gICAge1xuICAgICAgICBwZXJzb24gPSBjb2xsaWRlZVxuICAgIH1cbiAgICBcbiAgICBpZihjaGFydHlwZSA9PSBcIkFnZVwiKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBlcnNvbi5hZ2U7XG4gICAgfVxuICAgIGVsc2UgaWYoY2hhcnR5cGUgPT0gXCJTdGF0dXNcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uc3RhdHVzO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiVHlwZVwiKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHBlcnNvbi50eXBlO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuXG59XG5cblxuZnVuY3Rpb24gU2V0Q2hhcmFjdGVyaXN0aWMoZmllbGQsbmV3VmFsdWUpXG57XG4gICAgaWYoZmllbGQgPT0gXCJTdGF0dXNcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnN0YXR1cyA9IG5ld1ZhbHVlO1xuICAgICAgICB2YXIgc3ByaXRlTmFtZSA9IG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnR5cGU7XG4gICAgICAgIGlmKG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnN0YXR1cyA9PSBcIlNpY2tcIilcbiAgICAgICAge1xuICAgICAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICAgICAgfVxuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5sb2FkVGV4dHVyZShzcHJpdGVOYW1lKTtcbiAgICB9XG5cbiAgICBpZihmaWVsZCA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LnR5cGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgICAgICBcbn1cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIG15QXBwLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjZGJkNmQ3XCI7XG4gICAgbXlBcHAuUGVyc29ucyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuUGVyc29ucy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5QZXJzb25zLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIG15QXBwLlZpcnVzZXMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLlZpcnVzZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuVmlydXNlcy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG5cbiAgICBteUFwcC5Ib3NwaXRhbHMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLkhvc3BpdGFscy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5Ib3NwaXRhbHMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZSgpXG57XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvblBlcnNvbkNvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLlZpcnVzZXMsIG15QXBwLlBlcnNvblZpcnVzQ29sbGlzaW9uLmJpbmQobXlBcHApLCBudWxsLCB0aGlzKTtcbiAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUobXlBcHAuUGVyc29ucywgbXlBcHAuSG9zcGl0YWxzLCBteUFwcC5QZXJzb25Ib3NwaXRhbENvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlZpcnVzZXMsIG15QXBwLlZpcnVzZXMsIG51bGwsIG51bGwsIHRoaXMpO1xufVxuXG5mdW5jdGlvbiBHZXRDaGFyYWN0ZXJpc3RpY3MoZW50aXR5VHlwZSlcbntcbiAgICAvL0dldCBFbnRpdHkgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSBlbnRpdHlUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgdHJ5XG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGluMSA9IHhtbC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDsgICAgICBcbiAgICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhpbjEsIGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoKGVycm9yKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBHZXRDaGFyYWN0ZXJpc3RpY3MgZm9yOiBcIitlbnRpdHlUeXBlKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIENoZWNrQmVoYXZpb3JzKGVudGl0eVR5cGUpXG57XG4gICAgLy9HZXQgTW92ZSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09IGVudGl0eVR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICAvL0dldCBCZWhhdmlvciBCbG9ja3NcbiAgICAgICAgICB2YXIgY2hpbGRCbG9ja3MgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJibG9ja1wiKTtcbiAgICAgICAgICB2YXIgbW92ZUJsb2NrID0gbnVsbDtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxjaGlsZEJsb2Nrcy5sZW5ndGg7IGorKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PSBcIm1vdmVcIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb3ZlQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYobW92ZUJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhtb3ZlQmxvY2ssIGhlYWRsZXNzKTtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBydW5uaW5nIENoZWNrQmVoYXZpb3JzIGZvcjogXCIgKyBlbnRpdHlUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9FeGVjdXRlIE1vdmUgQmxvY2tcbn1cblxuZnVuY3Rpb24gR2V0Q29sbGlzaW9uQmxvY2tGcm9tRW50aXR5KHBlcnNvbix0YXJnZXQpXG57XG4gICAgLy9HZXQgTW92ZSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09J3BlcnNvbmVudGl0eScpXG4gICAgICAgIHtcbiAgICAgICAgICAvL0dldCBCZWhhdmlvciBCbG9ja3NcbiAgICAgICAgICB2YXIgY2hpbGRCbG9ja3MgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJibG9ja1wiKTtcbiAgICAgICAgICB2YXIgY29sbGlzaW9uQmxvY2sgPSBudWxsO1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGNoaWxkQmxvY2tzLmxlbmd0aDsgaisrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmdldEF0dHJpYnV0ZSgndHlwZScpID09IFwiY29sbGlzaW9uXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZmlyc3RDaGlsZC5pbm5lclRleHQ9PXRhcmdldClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbkJsb2NrID0gY2hpbGRCbG9ja3Nbal07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZihjb2xsaXNpb25CbG9jayAhPSBudWxsKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soY29sbGlzaW9uQmxvY2ssIGhlYWRsZXNzKTtcbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2goZXJyb3IpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHlcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIFJlc2V0UGhhc2VyKClcbntcbiAgbXlBcHAuZ2FtZS53b3JsZC5yZW1vdmVBbGwodHJ1ZSxmYWxzZSxmYWxzZSlcbiAgY3JlYXRlKCk7XG59XG5cblxuZnVuY3Rpb24gTW92ZUVudGl0eShkaXJlY3Rpb24pXG57ICBcbiAgICBpZihkaXJlY3Rpb24gPT0gXCJMZWZ0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJpZ2h0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAxMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmFuZG9tXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwO1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLnJhbmRvbSgpICogMjAwIC0gMTAwO1xuICAgIH1cbn1cblxuQGluamVjdChSb3V0ZXIpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHkyIHtcbiAgd29ya3NwYWNlID0ge307XG4gIGludGVycHJldGVyID0ge307XG4gIHRvb2xib3g7XG4gIGdhbWUgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihyb3V0ZXIpIHtcbiAgICBteUFwcCA9IHRoaXM7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgUGFyc2UuaW5pdGlhbGl6ZShcIm15QXBwSWRcIik7ICAgIFxuICAgIFBhcnNlLnNlcnZlclVSTCA9IHVybCArIFwiOlwiICsgbG9jYXRpb24ucG9ydCArICcvcGFyc2UnO1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgIHRoaXMuYWN0aXZpdHlOYW1lID0gXCJQYXJ0MlwiO1xuICB9XG5cbiAgLy9iZWZvcmUgdmlldy1tb2RlbCByZW5kZXJzXG4gIGF0dGFjaGVkKCl7XG4gICAgdGhpcy50b29sYm94ID0gdGhpcy5Mb2FkVG9vbGJveCgpO1xuICAgIHRoaXMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdwaGFzZXJEaXYnLCB7IHByZWxvYWQ6IHByZWxvYWQsIGNyZWF0ZTogY3JlYXRlLCB1cGRhdGU6IHVwZGF0ZSB9KTtcbiAgfVxuXG5IdHRwQ2xpZW50KClcbiAgICB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oYVVybCwgYUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYW5IdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICBpZiAoYW5IdHRwUmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgYW5IdHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIGFVcmwsIHRydWUgKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgICAgICB9XG4gICAgfVxuXG4gIGRldGFjaGVkKClcbiAge1xuICAgICAgbXlBcHAuUHVzaE9iamVjdCgpO1xuICAgICAgbXlBcHAuZ2FtZS5kZXN0cm95KClcbiAgICAgIHRoaXMud29ya3NwYWNlLmRpc3Bvc2UoKTtcbiAgfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy9TYXZlL0xvYWQgRnVuY3Rpb25zXG4gIFNhdmVXb3Jrc3BhY2UoKVxuICB7XG4gICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcbiAgICB0aGlzLmV4cG9ydCh4bWxfdGV4dCk7XG4gIH1cblxuICBleHBvcnQodGV4dCkge1xuICAgIHZhciBwb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgcG9tLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICd3b3Jrc3BhY2UueG1sJyk7XG4gICAgcG9tLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb20pO1xuICAgIHBvbS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9tKTtcbiAgfVxuXG4gIExvYWRXb3Jrc3BhY2VDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgQmxvY2tseS5YbWwuZG9tVG9Xb3Jrc3BhY2UoeG1sLCBteUFwcC53b3Jrc3BhY2UpO1xuICB9XG5cbiAgTG9hZEluaXRpYWxXb3Jrc3BhY2UoKVxuICB7XG4gICAgICBteUFwcC53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICAgIHRoaXMuTG9hZExhc3RTYXZlKCk7XG4gICAgICBpZihteUFwcC53b3Jrc3BhY2UuZ2V0QWxsQmxvY2tzKCkubGVuZ3RoID09IDApXG4gICAgICB7XG4gICAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9Jbml0aWFsV29ya3NwYWNlcy9BY3Rpdml0eTIueG1sXCI7XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gICAgICB9XG4gICAgICBteUFwcC53b3Jrc3BhY2UuYWRkQ2hhbmdlTGlzdGVuZXIobXlBcHAub25CbG9ja2x5Q2hhbmdlKTtcbiAgfVxuXG4gIExvYWRUb29sQm94Q2FsbGJhY2soUmVzcG9uc2VUZXh0KVxuICB7XG4gICAgICB2YXIgeG1sX3RleHQgID0gUmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLnRleHRUb0RvbSh4bWxfdGV4dCk7XG4gICAgICBteUFwcC50b29sYm94ID0geG1sO1xuICAgICAgbXlBcHAud29ya3NwYWNlID0gQmxvY2tseS5pbmplY3QoJ2Jsb2NrbHlEaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVkaWE6ICcuLi9CbG9ja2x5L21lZGlhLycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xib3g6IG15QXBwLnRvb2xib3h9KTtcbiAgICAgIG15QXBwLkxvYWRJbml0aWFsV29ya3NwYWNlKCk7XG4gIH1cblxuICBMb2FkVG9vbGJveCgpXG4gIHtcbiAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9FcGlkZW1pY1Rvb2xib3gueG1sXCI7XG4gICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFRvb2xCb3hDYWxsYmFjayk7XG4gIH1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy9QaGFzZXIgSGVscGVyIGZ1bmN0aW9uc1xuICBSZXNldFBoYXNlcigpXG4gIHtcbiAgICBteUFwcC5nYW1lLndvcmxkLnJlbW92ZUFsbCh0cnVlLGZhbHNlLGZhbHNlKVxuICAgIGNyZWF0ZSgpO1xuICB9XG5cbiAgaGFuZGxlQ29sbGlzaW9uKClcbiAge1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nY29sbGlzaW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBIZWFsdGh5SW5mZWN0ZWRDb2xsaXNpb24oaGVhbHRoeSwgaW5mZWN0ZWQpXG4gIHtcbiAgICAgIGhlYWx0aHkubG9hZFRleHR1cmUoJ3JlZGJhbGwnKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMucmVtb3ZlKGhlYWx0aHkpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMuYWRkKGhlYWx0aHkpXG4gIH1cblxuICBIZWFsZXJJbmZlY3RlZENvbGxpc2lvbihoZWFsZXIsIGluZmVjdGVkKVxuICB7XG4gICAgICBpbmZlY3RlZC5sb2FkVGV4dHVyZSgnd2l6YmFsbCcpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMucmVtb3ZlKGluZmVjdGVkKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMuYWRkKGluZmVjdGVkKVxuICB9XG5cbiAgUGVyc29uVmlydXNDb2xsaXNpb24ocGVyc29uLHZpcnVzKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sXCJWaXJ1c1wiKVxuICAgICAgXG4gIH1cblxuICBQZXJzb25QZXJzb25Db2xsaXNpb24ocGVyc29uMSxwZXJzb24yKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjE7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjI7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMSxcIlBlcnNvblwiKVxuXG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjI7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjE7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMixcIlBlcnNvblwiKVxuICB9XG5cbiAgUGVyc29uSG9zcGl0YWxDb2xsaXNpb24ocGVyc29uMSwgaG9zcGl0YWwpXG4gIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQm9vcFwiKVxuICB9XG5cblxuICBydW5TaW11bGF0aW9uKClcbiAge1xuICAgIG15QXBwLkxvZ0V2ZW50KFwiUnVuU2ltdWxhdGlvblwiKVxuICAgIG15QXBwLlJlc2V0UGhhc2VyKCk7XG4gICAgLy9HZXQgV2hlblJ1biBIZWFkXG4gICAgLy9SdW4gY29kZVxuICAgIHZhciB0ZXN0ID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZSh0aGlzLndvcmtzcGFjZSlcbiAgICBjb25zb2xlLmxvZyh0ZXN0KTtcblxuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nc2ltdWxhdGlvbicpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKHhtbCwgaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsdGhpcy5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaW5pdEFwaShpbnRlcnByZXRlciwgc2NvcGUpIHtcbiAgLy8gQWRkIGFuIEFQSSBmdW5jdGlvbiBmb3IgdGhlIGFsZXJ0KCkgYmxvY2suXG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZSh3aW5kb3cuYWxlcnQodGV4dCkpO1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnYWxlcnQnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShteUFwcC5zZXRDb2xvcih0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDb2xvcicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuICAgICAgXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlRW50aXR5KFwiUGVyc29uXCIpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVQZXJzb24nLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZUxhcmdlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShNb3ZlRW50aXR5KHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdNb3ZlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0LGFnZSxzdGF0dXMpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIGFnZSA9IGFnZSA/IGFnZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpY3ModGV4dCxhZ2Usc3RhdHVzKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWNzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRWaXJ1c0NoYXJhY3RlcmlzdGljcyh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0VmlydXNDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSB7XG4gICAgICAgIGNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWMgPyBjaGFyYWN0ZXJpc3RpYy50b1N0cmluZygpIDogJyc7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBuZXdWYWx1ZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpYyxuZXdWYWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihjaGFyYWN0ZXJpc3RpYyx0YXJnZXQpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID8gdGFyZ2V0LnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKEdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLHRhcmdldCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0dldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7IFxuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24obnVtYmVyLHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyID8gbnVtYmVyLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtYmVyLHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVNdWx0aXBsZUVudGl0aWVzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7ICAgIFxuXG4gICAgfVxuICAgIFxuICAgIFB1c2hPYmplY3QoKVxuICAgIHtcbiAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJTYXZlV29ya3NwYWNlXCIpXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgR2FtZVNjb3JlID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIkdhbWVTY29yZVwiKTtcbiAgICAgICAgICAgIHZhciBnYW1lU2NvcmUgPSBuZXcgR2FtZVNjb3JlKCk7XG5cbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ3b3Jrc3BhY2VcIiwgeG1sX3RleHQpIDtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ1c2VybmFtZVwiLGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJBY3Rpdml0eU5hbWVcIix0aGlzLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZ2FtZVNjb3JlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZSwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgTG9nT3V0KCkgXG4gICAge1xuICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0P1wiKSA9PSB0cnVlKSBcbiAgICAgICAge1xuICAgICAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJMb2dPdXRcIilcbiAgICAgICAgICAgIFBhcnNlLlVzZXIubG9nT3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSgnaG9tZScpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBMb2FkTGFzdFNhdmUoKVxuICAgIHtcbiAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJMb2FkTGFzdFNhdmVcIilcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gUGFyc2UuVXNlci5jdXJyZW50KCk7XG4gICAgICAgIHZhciBHYW1lU2NvcmUgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiR2FtZVNjb3JlXCIpO1xuICAgICAgICB2YXIgcXVlcnkgPSBuZXcgUGFyc2UuUXVlcnkoR2FtZVNjb3JlKTtcbiAgICAgICAgcXVlcnkuZXF1YWxUbyhcInVzZXJuYW1lXCIsIGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKCdBY3Rpdml0eU5hbWUnLHRoaXMuYWN0aXZpdHlOYW1lKVxuICAgICAgICBxdWVyeS5kZXNjZW5kaW5nKFwidXBkYXRlZEF0XCIpO1xuICAgICAgICBxdWVyeS5maXJzdCh7XG4gICAgICAgIHN1Y2Nlc3M6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IG9iamVjdC5hdHRyaWJ1dGVzWyd3b3Jrc3BhY2UnXVxuICAgICAgICAgICAgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2sodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgYWxlcnQoXCJFcnJvcjogXCIgKyBlcnJvci5jb2RlICsgXCIgXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAgb25CbG9ja2x5Q2hhbmdlKGV2ZW50KVxuICAgIHtcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gUGFyc2UuVXNlci5jdXJyZW50KCk7XG4gICAgICAgIGlmKGN1cnJlbnRVc2VyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgVHJhY2VMb2cgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiVHJhY2VMb2dcIik7XG4gICAgICAgICAgICB2YXIgdHJhY2VMb2cgPSBuZXcgVHJhY2VMb2coKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJ1c2VybmFtZVwiLGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwic2Vzc2lvblRva2VuXCIsY3VycmVudFVzZXIuZ2V0U2Vzc2lvblRva2VuKCkpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwiQWN0aXZpdHlOYW1lXCIsbXlBcHAuYWN0aXZpdHlOYW1lKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkV2ZW50VHlwZVwiLGV2ZW50LnR5cGUpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwiRXZlbnRCbG9ja1wiLGV2ZW50LmJsb2NrSWQpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgIFxuICAgICAgICAgICAgdHJhY2VMb2cuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24odHJhY2VMb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBhZnRlciB0aGUgb2JqZWN0IGlzIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24odHJhY2VMb2csIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgaWYgdGhlIHNhdmUgZmFpbHMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGlzIGEgUGFyc2UuRXJyb3Igd2l0aCBhbiBlcnJvciBjb2RlIGFuZCBtZXNzYWdlLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlIGV2ZW50OiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogIFVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgIFJlc2V0Q29kZSgpIFxuICAgIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVzZXQgdGhlIGNvZGUgdG8gaXRzIGluaXRpYWwgc3RhdGU/XCIpID09IHRydWUpIFxuICAgICAgICB7XG4gICAgICAgICAgICBteUFwcC5Mb2dFdmVudChcIlJlc2V0V29ya3NwYWNlXCIpXG4gICAgICAgICAgICBteUFwcC53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICAgICAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9Jbml0aWFsV29ya3NwYWNlcy9BY3Rpdml0eTIueG1sXCI7XG4gICAgICAgICAgICB2YXIgY2xpZW50ID0gbmV3IHRoaXMuSHR0cENsaWVudCgpO1xuICAgICAgICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBcbiAgICAgICAge1xuICAgICAgICB9XG4gICAgfVxuICAgIExvZ0V2ZW50KGV2ZW50VHlwZSlcbiAgICB7XG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAgeyAgIFxuXG4gICAgICAgICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgVHJhY2VMb2cgPSBQYXJzZS5PYmplY3QuZXh0ZW5kKFwiVHJhY2VMb2dcIik7XG4gICAgICAgICAgICB2YXIgdHJhY2VMb2cgPSBuZXcgVHJhY2VMb2coKTtcblxuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkFjdGl2aXR5TmFtZVwiLG15QXBwLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJFdmVudFR5cGVcIixldmVudFR5cGUpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgIFxuICAgICAgICAgICAgdHJhY2VMb2cuc2F2ZShudWxsLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24odHJhY2VMb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBhZnRlciB0aGUgb2JqZWN0IGlzIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24odHJhY2VMb2csIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgaWYgdGhlIHNhdmUgZmFpbHMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGlzIGEgUGFyc2UuRXJyb3Igd2l0aCBhbiBlcnJvciBjb2RlIGFuZCBtZXNzYWdlLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlIGV2ZW50OiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogIFVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG5cbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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
    var MAX_PERSONS = 3;
    var MAX_VIRUSES = 3;
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
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            if (num > MAX_PERSONS)
                num = MAX_PERSONS;
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Viruses") {
            if (num > MAX_VIRUSES)
                num = MAX_VIRUSES;
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
            }
        }
    }
    function CreateVirus() {
        var c = {};
        GetCharacteristics("virusentity");
        var spriteName = VirusProperties.type;
        if (myApp.Viruses.length == 0) {
            c = myApp.Viruses.create(400, 300, spriteName);
        }
        else {
            c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        }
        c.scale = new Phaser.Point(1, 1);
        c.anchor.set(.5);
        c.body.setSize(5, 60, 23, 15);
        myApp.currentGameObject = c;
        myApp.currentGameObject.body.collideWorldBounds = true;
        myApp.currentGameObject.body.bounce.set(1);
        CheckBehaviors("virusentity");
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
        PersonProperties.type = "";
        PersonProperties.age = "";
        PersonProperties.status = "";
        if (type.length > 0)
            PersonProperties.type = type;
        if (age.length > 0)
            PersonProperties.age = age;
        if (status.length > 0)
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
            c = myApp.Persons.create(50, 300, spriteName);
        }
        else if (myApp.Persons.length == 1) {
            c = myApp.Persons.create(200, 300, spriteName);
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
    function GetCharacteristics(entityType) {
        var allXml = Blockly.Xml.workspaceToDom(myApp.workspace).childNodes;
        for (var i = 0; xml = allXml[i]; i++) {
            var xml = allXml[i];
            if (xml.getAttribute('type') == entityType) {
                try {
                    var in1 = xml.firstElementChild.firstElementChild;
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(in1, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
                catch (error) {
                    console.log("Error in GetCharacteristics for: " + entityType);
                    console.log(code);
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(moveBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error running CheckBehaviors for: " + entityType);
                    }
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(collisionBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error in GetCollisionBlockFromEntity");
                    }
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
            myApp.PushObject();
            myApp.game.destroy();
            this.workspace.dispose();
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
            myApp.workspace.addChangeListener(myApp.onBlocklyChange);
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
            myApp.LogEvent("RunSimulation");
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
            myApp.LogEvent("SaveWorkspace");
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
            myApp.LogEvent("LoadLastSave");
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
                myApp.LogEvent("LogOut");
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity3.prototype.onBlocklyChange = function (event) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", event.type);
                traceLog.set("EventBlock", event.blockId);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        Activity3.prototype.ResetCode = function () {
            if (confirm("Are you sure you want to reset the code to its initial state?") == true) {
                myApp.LogEvent("ResetWorkspace");
                myApp.workspace.clear();
                var url = "resources/InitialWorkspaces/Activity3.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
            else {
            }
        };
        Activity3.prototype.LogEvent = function (eventType) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", eventType);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QVMsQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBRTtnQkFFckMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxVQUFTLFFBQVE7b0JBRzFCLENBQUM7b0JBQ0QsS0FBSyxFQUFFLFVBQVMsUUFBUSxFQUFFLEtBQUs7d0JBRzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxJQUFJLENBQ0osQ0FBQztnQkFDRyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7WUFDNUQsQ0FBQztRQUNMLENBQUM7UUFHTCxnQkFBQztJQUFELENBemJBLEFBeWJDLElBQUE7SUF6YlksU0FBUztRQURyQiwwQkFBTSxDQUFDLHVCQUFNLENBQUM7O09BQ0YsU0FBUyxDQXlickI7SUF6YlksOEJBQVMiLCJmaWxlIjoiYWN0aXZpdHkzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7Um91dGVyQ29uZmlndXJhdGlvbiwgUm91dGVyfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cbnZhciBteUFwcFxudmFyIHJlc3BvbnNlVGV4dFxudmFyIG15QXBwXG5cbnZhciBQZXJzb25Qcm9wZXJ0aWVzID0ge307XG52YXIgVmlydXNQcm9wZXJ0aWVzID0ge307XG5cbnZhciBjb2xsaWRlZTtcbnZhciBNQVhfUEVSU09OUyA9IDM7XG52YXIgTUFYX1ZJUlVTRVMgPSAzXG5cbmZ1bmN0aW9uIHByZWxvYWQoKSB7ICAgIFxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMScsICdhc3NldHMvTWFuMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjInLCAnYXNzZXRzL01hbjIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjEnLCAnYXNzZXRzL1dvbWFuMS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMicsICdhc3NldHMvV29tYW4yLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4xU2ljaycsICdhc3NldHMvTWFuMV9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMlNpY2snLCAnYXNzZXRzL01hbjJfc2ljay5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMVNpY2snLCAnYXNzZXRzL1dvbWFuMV9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4yU2ljaycsICdhc3NldHMvV29tYW4yX3NpY2sucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMScsICdhc3NldHMvVmlydXMxLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMyJywgJ2Fzc2V0cy9WaXJ1czIucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czMnLCAnYXNzZXRzL1ZpcnVzMy5wbmcnKTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlTXVsdGlwbGVFbnRpdGllcyhudW0sdHlwZSlcbntcbiAgICBpZihudW0gPD0gMClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHg9MDtcblxuICAgIGlmKHR5cGUgPT0gXCJQZW9wbGVcIilcbiAgICB7XG4gICAgICAgIGlmKG51bSA+IE1BWF9QRVJTT05TKVxuICAgICAgICAgICAgbnVtID0gTUFYX1BFUlNPTlM7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBDcmVhdGVQZXJzb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09IFwiVmlydXNlc1wiKVxuICAgIHtcbiAgICAgICAgaWYobnVtID4gTUFYX1ZJUlVTRVMpXG4gICAgICAgICAgICBudW0gPSBNQVhfVklSVVNFUztcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVZpcnVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlID09IFwiSG9zcGl0YWxcIilcbiAgICB7XG4gICAgICAgIGZvcih4PTA7eDxudW07eCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhPU1BJVEFMXCIpXG4gICAgICAgIH1cblxuICAgIH1cbn1cbmZ1bmN0aW9uIENyZWF0ZVZpcnVzKClcbntcbiAgICB2YXIgYyA9IHt9XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKFwidmlydXNlbnRpdHlcIik7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBWaXJ1c1Byb3BlcnRpZXMudHlwZTtcbiAgICBcbiAgICBpZihteUFwcC5WaXJ1c2VzLmxlbmd0aCA9PSAwKVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlZpcnVzZXMuY3JlYXRlKDQwMCwgMzAwLCBzcHJpdGVOYW1lKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgYyA9IG15QXBwLlZpcnVzZXMuY3JlYXRlKG15QXBwLmdhbWUud29ybGQucmFuZG9tWCwgbXlBcHAuZ2FtZS53b3JsZC5yYW5kb21ZLCBzcHJpdGVOYW1lKTtcbiAgICB9XG5cbiAgICBjLnNjYWxlID0gbmV3IFBoYXNlci5Qb2ludCgxLDEpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG4gICAgYy5ib2R5LnNldFNpemUoNSw2MCwyMywxNSlcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIENoZWNrQmVoYXZpb3JzKFwidmlydXNlbnRpdHlcIilcbn1cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIC8vICBXZSdyZSBnb2luZyB0byBiZSB1c2luZyBwaHlzaWNzLCBzbyBlbmFibGUgdGhlIEFyY2FkZSBQaHlzaWNzIHN5c3RlbVxuICAgIG15QXBwLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gXCIjZGJkNmQ3XCI7XG4gICAgbXlBcHAuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XG4gICAgXG4gICAgbXlBcHAuUGVyc29ucyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuUGVyc29ucy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5QZXJzb25zLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIG15QXBwLlZpcnVzZXMgPSBteUFwcC5nYW1lLmFkZC5ncm91cCgpO1xuICAgIG15QXBwLlZpcnVzZXMuZW5hYmxlQm9keSA9IHRydWU7XG4gICAgbXlBcHAuVmlydXNlcy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuICAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUobXlBcHAuUGVyc29ucywgbXlBcHAuVmlydXNlcywgbXlBcHAuUGVyc29uVmlydXNDb2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpOyBcbiAgICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvblBlcnNvbkNvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7ICBcbiAgICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlZpcnVzZXMsIG15QXBwLlZpcnVzZXMsIG51bGwsIG51bGwsIHRoaXMpOyAgXG59XG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljcyh0eXBlLGFnZSxzdGF0dXMpXG57XG4gICAgUGVyc29uUHJvcGVydGllcy50eXBlID0gXCJcIjtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IFwiXCI7XG4gICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBcIlwiO1xuXG4gICAgaWYodHlwZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLnR5cGUgPSB0eXBlO1xuICAgIGlmKGFnZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IGFnZTtcbiAgICBpZihzdGF0dXMubGVuZ3RoID4gMClcbiAgICAgICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHZpcnVzVHlwZSlcbntcbiAgICBWaXJ1c1Byb3BlcnRpZXMudHlwZSA9IHZpcnVzVHlwZTtcbn1cblxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcnR5cGUsIHRhcmdldClcbntcbiAgICB2YXIgcGVyc29uID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3RcbiAgICBpZih0YXJnZXQgPT0gXCJDb2xsaWRlZVwiKVxuICAgIHtcbiAgICAgICAgcGVyc29uID0gY29sbGlkZWVcbiAgICB9XG4gICAgXG4gICAgaWYoY2hhcnR5cGUgPT0gXCJBZ2VcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICByZXR1cm4gcGVyc29uLnN0YXR1cztcbiAgICB9XG4gICAgZWxzZSBpZihjaGFydHlwZSA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24udHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcblxufVxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljKGZpZWxkLG5ld1ZhbHVlKVxue1xuICAgIGlmKGZpZWxkID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuXG4gICAgaWYoZmllbGQgPT0gXCJUeXBlXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlID0gbmV3VmFsdWU7XG4gICAgICAgIHZhciBzcHJpdGVOYW1lID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3QudHlwZTtcbiAgICAgICAgaWYobXlBcHAuY3VycmVudEdhbWVPYmplY3Quc3RhdHVzID09IFwiU2lja1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgICAgICB9XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmxvYWRUZXh0dXJlKHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICAgICAgXG59XG5cbmZ1bmN0aW9uIENyZWF0ZUhvc3BpdGFsKClcbntcbiAgICAgLy9HZXRDaGFyYWN0ZXJpc3RpY3MoKTtcbiAgICB2YXIgc3ByaXRlTmFtZSA9IFwiSG9zcGl0YWwxXCJcblxuICAgIHZhciBjID0gbXlBcHAuSG9zcGl0YWxzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoMSwxKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgYy5ib2R5LmltbW92YWJsZSA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVBlcnNvbigpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKFwicGVyc29uZW50aXR5XCIpO1xuXG4gICAgdmFyIHNwcml0ZU5hbWUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG5cbiAgICBpZihQZXJzb25Qcm9wZXJ0aWVzLnN0YXR1cyA9PSBcIlNpY2tcIilcbiAgICB7XG4gICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgfVxuXG4gICAgdmFyIGMgPSB7fVxuICAgIGlmKG15QXBwLlBlcnNvbnMubGVuZ3RoID09IDApXG4gICAge1xuICAgICAgICBjID0gbXlBcHAuUGVyc29ucy5jcmVhdGUoNTAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2UgaWYobXlBcHAuUGVyc29ucy5sZW5ndGggPT0gMSlcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZSgyMDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcbiAgICBjLnR5cGUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG4gICAgYy5hZ2UgPSBQZXJzb25Qcm9wZXJ0aWVzLmFnZTtcbiAgICBjLnN0YXR1cyA9IFBlcnNvblByb3BlcnRpZXMuc3RhdHVzO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIENoZWNrQmVoYXZpb3JzKFwicGVyc29uZW50aXR5XCIpO1xufVxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWNzKGVudGl0eVR5cGUpXG57XG4gICAgLy9HZXQgRW50aXR5IEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0gZW50aXR5VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgIHRyeVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpbjEgPSB4bWwuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7ICAgICAgXG4gICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soaW4xLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaChlcnJvcilcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gR2V0Q2hhcmFjdGVyaXN0aWNzIGZvcjogXCIrZW50aXR5VHlwZSlcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coY29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBDaGVja0JlaGF2aW9ycyhlbnRpdHlUeXBlKVxue1xuICAgIC8vR2V0IE1vdmUgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSBlbnRpdHlUeXBlKVxuICAgICAgICB7XG4gICAgICAgICAgLy9HZXQgQmVoYXZpb3IgQmxvY2tzXG4gICAgICAgICAgdmFyIGNoaWxkQmxvY2tzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmxvY2tcIik7XG4gICAgICAgICAgdmFyIG1vdmVCbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJtb3ZlXCIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW92ZUJsb2NrID0gY2hpbGRCbG9ja3Nbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKG1vdmVCbG9jayAhPSBudWxsKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2sobW92ZUJsb2NrLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgcnVubmluZyBDaGVja0JlaGF2aW9ycyBmb3I6IFwiICsgZW50aXR5VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vRXhlY3V0ZSBNb3ZlIEJsb2NrXG59XG5cbmZ1bmN0aW9uIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sdGFyZ2V0KVxue1xuICAgIC8vR2V0IE1vdmUgQmxvY2tcbiAgICB2YXIgYWxsWG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20obXlBcHAud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdwZXJzb25lbnRpdHknKVxuICAgICAgICB7XG4gICAgICAgICAgLy9HZXQgQmVoYXZpb3IgQmxvY2tzXG4gICAgICAgICAgdmFyIGNoaWxkQmxvY2tzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYmxvY2tcIik7XG4gICAgICAgICAgdmFyIGNvbGxpc2lvbkJsb2NrID0gbnVsbDtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxjaGlsZEJsb2Nrcy5sZW5ndGg7IGorKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PSBcImNvbGxpc2lvblwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmZpcnN0Q2hpbGQuaW5uZXJUZXh0PT10YXJnZXQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25CbG9jayA9IGNoaWxkQmxvY2tzW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgaWYoY29sbGlzaW9uQmxvY2sgIT0gbnVsbClcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKGNvbGxpc2lvbkJsb2NrLCBoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSxteUFwcC5pbml0QXBpKTtcbiAgICAgICAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoKGVycm9yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gR2V0Q29sbGlzaW9uQmxvY2tGcm9tRW50aXR5XCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIE1vdmVFbnRpdHkoZGlyZWN0aW9uKVxue1xuXG4gICBcbiAgICBpZihkaXJlY3Rpb24gPT0gXCJMZWZ0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJpZ2h0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAxMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmFuZG9tXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueSA9IE1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gUmVzZXRQaGFzZXIoKVxue1xuICBteUFwcC5nYW1lLndvcmxkLnJlbW92ZUFsbCh0cnVlLGZhbHNlLGZhbHNlKVxuICBjcmVhdGUoKTtcbn1cblxuQGluamVjdChSb3V0ZXIpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHkzIHtcbiAgd29ya3NwYWNlID0ge307XG4gIGludGVycHJldGVyID0ge307XG4gIHRvb2xib3g7XG4gIGdhbWUgPSB7fTtcbiAgaGVhbHRoeVBlcnNvbnMgPSB7fTtcbiAgaW5mZWN0ZWRQZXJzb25zID0ge307XG4gIGhlYWxlcnMgPSB7fTtcbiAgQ2hhcnREYXRhO1xuICBUaW1lU3RhbXAgPSAwO1xuICBTYW1wbGVSYXRlO1xuICBjdXJyZW50R2FtZU9iamVjdDtcbiAgUGVyc29ucztcbiAgVmlydXNlcztcbiAgXG5cbiAgY29uc3RydWN0b3Iocm91dGVyKSB7XG4gICAgbXlBcHAgPSB0aGlzO1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIFBhcnNlLmluaXRpYWxpemUoXCJteUFwcElkXCIpOyAgICBcbiAgICBQYXJzZS5zZXJ2ZXJVUkwgPSB1cmwgKyBcIjpcIiArIGxvY2F0aW9uLnBvcnQgKyAnL3BhcnNlJztcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLmFjdGl2aXR5TmFtZSA9IFwiUGFydDNcIjtcbiAgfVxuXG4gIC8vYmVmb3JlIHZpZXctbW9kZWwgcmVuZGVyc1xuICBhdHRhY2hlZCgpe1xuICAgIHRoaXMudG9vbGJveCA9IHRoaXMuTG9hZFRvb2xib3goKTtcbiAgICB0aGlzLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoNjAwLCA2MDAsIFBoYXNlci5BVVRPLCAncGhhc2VyRGl2JywgeyBwcmVsb2FkOiBwcmVsb2FkLCBjcmVhdGU6IGNyZWF0ZSwgdXBkYXRlOiB1cGRhdGUgfSk7XG4gIH1cbiAgXG4gIFxuICBkZXRhY2hlZCgpXG4gIHtcbiAgICAgIG15QXBwLlB1c2hPYmplY3QoKTtcbiAgICAgIG15QXBwLmdhbWUuZGVzdHJveSgpXG4gICAgICAvL0FkZCBTYXZpbmcgQ29kZVxuICAgICAgdGhpcy53b3Jrc3BhY2UuZGlzcG9zZSgpO1xuICB9XG5cbiBcbiAgICBcbi8vLy8vLy8vLy8vLy8vLy8vU2F2ZS9Mb2FkIEZ1bmN0aW9uc1xuICBTYXZlV29ya3NwYWNlKClcbiAge1xuICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSk7XG4gICAgdmFyIHhtbF90ZXh0ID0gQmxvY2tseS5YbWwuZG9tVG9QcmV0dHlUZXh0KHhtbCk7XG4gICAgdGhpcy5leHBvcnQoeG1sX3RleHQpO1xuICB9XG5cbiAgZXhwb3J0KHRleHQpIHtcbiAgICB2YXIgcG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHBvbS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSk7XG4gICAgcG9tLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAnd29ya3NwYWNlLnhtbCcpO1xuICAgIHBvbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9tKTtcbiAgICBwb20uY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvbSk7XG4gIH1cblxuICBMb2FkV29ya3NwYWNlKClcbiAge1xuICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL3dvcmtzcGFjZS54bWxcIjtcbiAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICBjbGllbnQuZ2V0KHVybCwgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2spO1xuICB9XG5cbiAgTG9hZFdvcmtzcGFjZUNhbGxiYWNrKFJlc3BvbnNlVGV4dClcbiAge1xuICAgICAgdmFyIHhtbF90ZXh0ICA9IFJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC50ZXh0VG9Eb20oeG1sX3RleHQpO1xuICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICBCbG9ja2x5LlhtbC5kb21Ub1dvcmtzcGFjZSh4bWwsIG15QXBwLndvcmtzcGFjZSk7XG4gIH1cbiAgXG5cbiAgTG9hZEluaXRpYWxXb3Jrc3BhY2UoKVxuICB7XG4gICAgICBteUFwcC53b3Jrc3BhY2UuY2xlYXIoKTtcbiAgICAgIHRoaXMuTG9hZExhc3RTYXZlKCk7XG4gICAgICBpZihteUFwcC53b3Jrc3BhY2UuZ2V0QWxsQmxvY2tzKCkubGVuZ3RoID09IDApXG4gICAgICB7XG4gICAgICAgIHZhciB1cmwgPSBcInJlc291cmNlcy9Jbml0aWFsV29ya3NwYWNlcy9BY3Rpdml0eTMueG1sXCI7XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gICAgICB9XG4gICAgICBteUFwcC53b3Jrc3BhY2UuYWRkQ2hhbmdlTGlzdGVuZXIobXlBcHAub25CbG9ja2x5Q2hhbmdlKTtcbiAgfVxuXG4gIExvYWRUb29sQm94Q2FsbGJhY2soUmVzcG9uc2VUZXh0KVxuICB7XG4gICAgICB2YXIgeG1sX3RleHQgID0gUmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLnRleHRUb0RvbSh4bWxfdGV4dCk7XG4gICAgICBteUFwcC50b29sYm94ID0geG1sO1xuICAgICAgbXlBcHAud29ya3NwYWNlID0gQmxvY2tseS5pbmplY3QoJ2Jsb2NrbHlEaXYnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVkaWE6ICcuLi9CbG9ja2x5L21lZGlhLycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2xib3g6IG15QXBwLnRvb2xib3h9KTtcbiAgICAgIG15QXBwLkxvYWRJbml0aWFsV29ya3NwYWNlKCk7XG4gIH1cbiAgTG9hZFRvb2xib3goKVxuICB7XG4gICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvRXBpZGVtaWNUb29sYm94LnhtbFwiO1xuICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRUb29sQm94Q2FsbGJhY2spO1xuICB9XG4gICBIdHRwQ2xpZW50KClcbiAge1xuICAgICAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKGFVcmwsIGFDYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGFuSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgaWYgKGFuSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIGFuSHR0cFJlcXVlc3Quc3RhdHVzID09IDIwMClcbiAgICAgICAgICAgICAgICAgICAgYUNhbGxiYWNrKGFuSHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vcGVuKCBcIkdFVFwiLCBhVXJsLCB0cnVlICk7ICAgICAgICAgICAgXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0LnNlbmQoIG51bGwgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vL1BoYXNlciBIZWxwZXIgZnVuY3Rpb25zXG4gIFJlc2V0UGhhc2VyKClcbiAge1xuICAgIG15QXBwLmdhbWUud29ybGQucmVtb3ZlQWxsKHRydWUsZmFsc2UsZmFsc2UpXG4gICAgY3JlYXRlKCk7XG4gIH1cblxuICBoYW5kbGVDb2xsaXNpb24oKVxuICB7XG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdjb2xsaXNpb24nKVxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayh4bWwsIGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgY29kZSA9IEJsb2NrbHkuSmF2YVNjcmlwdC53b3Jrc3BhY2VUb0NvZGUoaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLHRoaXMuaW5pdEFwaSk7XG4gICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIFBlcnNvblZpcnVzQ29sbGlzaW9uKHBlcnNvbix2aXJ1cylcbiAge1xuICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBwZXJzb247XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uLFwiVmlydXNcIilcbiAgICAgIFxuICB9XG5cbiAgUGVyc29uUGVyc29uQ29sbGlzaW9uKHBlcnNvbjEscGVyc29uMilcbiAge1xuICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBwZXJzb24xO1xuICAgICAgY29sbGlkZWUgPSBwZXJzb24yO1xuICAgICAgR2V0Q29sbGlzaW9uQmxvY2tGcm9tRW50aXR5KHBlcnNvbjEsXCJQZXJzb25cIilcblxuICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBwZXJzb24yO1xuICAgICAgY29sbGlkZWUgPSBwZXJzb24xO1xuICAgICAgR2V0Q29sbGlzaW9uQmxvY2tGcm9tRW50aXR5KHBlcnNvbjIsXCJQZXJzb25cIilcbiAgfVxuXG4gIEhlYWx0aHlJbmZlY3RlZENvbGxpc2lvbihoZWFsdGh5LCBpbmZlY3RlZClcbiAge1xuICAgICAgaGVhbHRoeS5sb2FkVGV4dHVyZSgncmVkYmFsbCcpXG4gICAgICBteUFwcC5oZWFsdGh5UGVyc29ucy5yZW1vdmUoaGVhbHRoeSlcbiAgICAgIG15QXBwLmluZmVjdGVkUGVyc29ucy5hZGQoaGVhbHRoeSlcbiAgfVxuXG4gIEhlYWxlckluZmVjdGVkQ29sbGlzaW9uKGhlYWxlciwgaW5mZWN0ZWQpXG4gIHtcbiAgICAgIGluZmVjdGVkLmxvYWRUZXh0dXJlKCd3aXpiYWxsJylcbiAgICAgIG15QXBwLmluZmVjdGVkUGVyc29ucy5yZW1vdmUoaW5mZWN0ZWQpXG4gICAgICBteUFwcC5oZWFsdGh5UGVyc29ucy5hZGQoaW5mZWN0ZWQpXG4gIH1cblxuICBydW5TaW11bGF0aW9uKClcbiAge1xuICAgIG15QXBwLkxvZ0V2ZW50KFwiUnVuU2ltdWxhdGlvblwiKVxuICAgIG15QXBwLlJlc2V0UGhhc2VyKCk7XG4gICAgLy9HZXQgV2hlblJ1biBIZWFkXG4gICAgLy9SdW4gY29kZVxuICAgIHZhciB0ZXN0ID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZSh0aGlzLndvcmtzcGFjZSlcbiAgICBjb25zb2xlLmxvZyh0ZXN0KTtcblxuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nc2ltdWxhdGlvbicpXG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKHhtbCwgaGVhZGxlc3MpO1xuICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsdGhpcy5pbml0QXBpKTtcbiAgICAgICAgICBpbnRlcnByZXRlci5ydW4oKVxuICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaW5pdEFwaShpbnRlcnByZXRlciwgc2NvcGUpIHtcbiAgLy8gQWRkIGFuIEFQSSBmdW5jdGlvbiBmb3IgdGhlIGFsZXJ0KCkgYmxvY2suXG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZSh3aW5kb3cuYWxlcnQodGV4dCkpO1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnYWxlcnQnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShteUFwcC5zZXRDb2xvcih0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDb2xvcicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuICAgICAgXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlRW50aXR5KFwiUGVyc29uXCIpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVQZXJzb24nLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZUxhcmdlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShNb3ZlRW50aXR5KHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdNb3ZlRW50aXR5JyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0LGFnZSxzdGF0dXMpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzID8gc3RhdHVzLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIGFnZSA9IGFnZSA/IGFnZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpY3ModGV4dCxhZ2Usc3RhdHVzKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWNzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRWaXJ1c0NoYXJhY3RlcmlzdGljcyh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0VmlydXNDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSB7XG4gICAgICAgIGNoYXJhY3RlcmlzdGljID0gY2hhcmFjdGVyaXN0aWMgPyBjaGFyYWN0ZXJpc3RpYy50b1N0cmluZygpIDogJyc7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUgPyBuZXdWYWx1ZS50b1N0cmluZygpIDogXCJcIlxuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShTZXRDaGFyYWN0ZXJpc3RpYyhjaGFyYWN0ZXJpc3RpYyxuZXdWYWx1ZSkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihjaGFyYWN0ZXJpc3RpYyx0YXJnZXQpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0ID8gdGFyZ2V0LnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKEdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLHRhcmdldCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0dldENoYXJhY3RlcmlzdGljJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7IFxuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24obnVtYmVyLHRleHQpIHtcbiAgICAgICAgdGV4dCA9IHRleHQgPyB0ZXh0LnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyID8gbnVtYmVyLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZU11bHRpcGxlRW50aXRpZXMobnVtYmVyLHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdDcmVhdGVNdWx0aXBsZUVudGl0aWVzJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7ICAgIFxuXG4gICAgfVxuICAgIFxuICAgIFB1c2hPYmplY3QoKVxuICAgIHtcbiAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJTYXZlV29ya3NwYWNlXCIpXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKTtcbiAgICAgICAgICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuXG4gICAgICAgICAgICB2YXIgR2FtZVNjb3JlID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIkdhbWVTY29yZVwiKTtcbiAgICAgICAgICAgIHZhciBnYW1lU2NvcmUgPSBuZXcgR2FtZVNjb3JlKCk7XG5cbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ3b3Jrc3BhY2VcIiwgeG1sX3RleHQpIDtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJ1c2VybmFtZVwiLGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgZ2FtZVNjb3JlLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJBY3Rpdml0eU5hbWVcIix0aGlzLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZ2FtZVNjb3JlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZSwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgIExvYWRMYXN0U2F2ZSgpXG4gICAge1xuICAgICAgICBteUFwcC5Mb2dFdmVudChcIkxvYWRMYXN0U2F2ZVwiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBQYXJzZS5RdWVyeShHYW1lU2NvcmUpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKFwidXNlcm5hbWVcIiwgY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oJ0FjdGl2aXR5TmFtZScsdGhpcy5hY3Rpdml0eU5hbWUpXG4gICAgICAgIHF1ZXJ5LmRlc2NlbmRpbmcoXCJ1cGRhdGVkQXRcIik7XG4gICAgICAgIHF1ZXJ5LmZpcnN0KHtcbiAgICAgICAgc3VjY2Vzczogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gb2JqZWN0LmF0dHJpYnV0ZXNbJ3dvcmtzcGFjZSddXG4gICAgICAgICAgICB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICBMb2dPdXQoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/XCIpID09IHRydWUpIFxuICAgICAgICB7XG4gICAgICAgICAgICBteUFwcC5Mb2dFdmVudChcIkxvZ091dFwiKVxuICAgICAgICAgICAgUGFyc2UuVXNlci5sb2dPdXQoKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCdob21lJyk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmxvY2tseUNoYW5nZShldmVudClcbiAgICB7XG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IFBhcnNlLlVzZXIuY3VycmVudCgpO1xuICAgICAgICBpZihjdXJyZW50VXNlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIFRyYWNlTG9nID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIlRyYWNlTG9nXCIpO1xuICAgICAgICAgICAgdmFyIHRyYWNlTG9nID0gbmV3IFRyYWNlTG9nKCk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInNlc3Npb25Ub2tlblwiLGN1cnJlbnRVc2VyLmdldFNlc3Npb25Ub2tlbigpKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkFjdGl2aXR5TmFtZVwiLG15QXBwLmFjdGl2aXR5TmFtZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJFdmVudFR5cGVcIixldmVudC50eXBlKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkV2ZW50QmxvY2tcIixldmVudC5ibG9ja0lkKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIndvcmtzcGFjZVwiLCB4bWxfdGV4dCkgO1xuICAgICAgICBcbiAgICAgICAgICAgIHRyYWNlTG9nLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRyYWNlTG9nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgYWZ0ZXIgdGhlIG9iamVjdCBpcyBzYXZlZC5cbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnV29ya3NwYWNlIFNhdmVkIScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHRyYWNlTG9nLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgZXZlbnQ6ICBVc2VyIG5vdCBsb2dnZWQgaW5cIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBSZXNldENvZGUoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc2V0IHRoZSBjb2RlIHRvIGl0cyBpbml0aWFsIHN0YXRlP1wiKSA9PSB0cnVlKSBcbiAgICAgICAge1xuICAgICAgICAgICAgbXlBcHAuTG9nRXZlbnQoXCJSZXNldFdvcmtzcGFjZVwiKVxuICAgICAgICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCJyZXNvdXJjZXMvSW5pdGlhbFdvcmtzcGFjZXMvQWN0aXZpdHkzLnhtbFwiO1xuICAgICAgICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgICAgICAgIGNsaWVudC5nZXQodXJsLCB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICBMb2dFdmVudChldmVudFR5cGUpXG4gICAge1xuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHsgICBcblxuICAgICAgICAgICAgdmFyIHhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIFRyYWNlTG9nID0gUGFyc2UuT2JqZWN0LmV4dGVuZChcIlRyYWNlTG9nXCIpO1xuICAgICAgICAgICAgdmFyIHRyYWNlTG9nID0gbmV3IFRyYWNlTG9nKCk7XG5cbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInVzZXJuYW1lXCIsY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJBY3Rpdml0eU5hbWVcIixteUFwcC5hY3Rpdml0eU5hbWUpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwiRXZlbnRUeXBlXCIsZXZlbnRUeXBlKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIndvcmtzcGFjZVwiLCB4bWxfdGV4dCkgO1xuICAgICAgICBcbiAgICAgICAgICAgIHRyYWNlTG9nLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHRyYWNlTG9nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgYW55IGxvZ2ljIHRoYXQgc2hvdWxkIHRha2UgcGxhY2UgYWZ0ZXIgdGhlIG9iamVjdCBpcyBzYXZlZC5cbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnV29ya3NwYWNlIFNhdmVkIScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHRyYWNlTG9nLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZSBldmVudDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgZXZlbnQ6ICBVc2VyIG5vdCBsb2dnZWQgaW5cIilcbiAgICAgICAgfVxuICAgIH1cblxuXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
    var myApp;
    var PersonProperties = {};
    var VirusProperties = {};
    var collidee;
    var MAX_PERSONS = 300;
    var MAX_VIRUSES = 10;
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
        myApp.game.load.image('blueDot', 'assets/blueCircle.png');
        myApp.game.load.image('blueDotSick', 'assets/redCircle.png');
        myApp.game.load.image('greenDot', 'assets/greenCircle.png');
    }
    function CreateMultipleEntities(num, type) {
        if (num <= 0)
            return;
        var x = 0;
        if (type == "People") {
            if (num > MAX_PERSONS)
                num = MAX_PERSONS;
            for (x = 0; x < num; x++) {
                CreatePerson();
            }
        }
        else if (type == "Viruses") {
            if (num > MAX_VIRUSES)
                num = MAX_VIRUSES;
            for (x = 0; x < num; x++) {
                CreateVirus();
            }
        }
        else if (type == "Hospital") {
            for (x = 0; x < num; x++) {
                console.log("HOSPITAL");
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
        PersonProperties.type = "";
        PersonProperties.age = "";
        PersonProperties.status = "";
        VirusProperties.type = "";
    }
    function update() {
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Viruses, myApp.PersonVirusCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Persons, myApp.Persons, myApp.PersonPersonCollision.bind(myApp), null, this);
        myApp.game.physics.arcade.collide(myApp.Viruses, myApp.Viruses, null, null, this);
    }
    function SetCharacteristics(type, age, status) {
        PersonProperties.type = "";
        PersonProperties.age = "";
        PersonProperties.status = "";
        if (type.length > 0)
            PersonProperties.type = type;
        if (age.length > 0)
            PersonProperties.age = age;
        if (status.length > 0)
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
                try {
                    var in1 = xml.firstElementChild.firstElementChild;
                    var headless = new Blockly.Workspace();
                    Blockly.Xml.domToBlock(in1, headless);
                    var code = Blockly.JavaScript.workspaceToCode(headless);
                    var interpreter = new Interpreter(code, myApp.initApi);
                    interpreter.run();
                    headless.dispose();
                }
                catch (error) {
                    console.log("Error in GetCharacteristics for: " + entityType);
                    console.log(code);
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(moveBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error running CheckBehaviors for: " + entityType);
                    }
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
                    try {
                        var headless = new Blockly.Workspace();
                        Blockly.Xml.domToBlock(collisionBlock, headless);
                        var code = Blockly.JavaScript.workspaceToCode(headless);
                        var interpreter = new Interpreter(code, myApp.initApi);
                        interpreter.run();
                        headless.dispose();
                    }
                    catch (error) {
                        console.log("Error in GetCollisionBlockFromEntity");
                    }
                }
            }
        }
    }
    function CreateVirus() {
        GetCharacteristics("virusentity");
        var spriteName = "Virus1";
        if (VirusProperties.type.startsWith("Virus")) {
            spriteName = VirusProperties.type;
        }
        else {
            console.log("Virus type not set to Virus model");
        }
        var c = myApp.Viruses.create(myApp.game.world.randomX, myApp.game.world.randomY, spriteName);
        c.scale = new Phaser.Point(.3, .3);
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
        var instanceType = "blueDot";
        var spriteName = "blueDot";
        if (PersonProperties.type.startsWith("Man") || PersonProperties.type.startsWith("Woman")) {
            spriteName = PersonProperties.type;
            instanceType = PersonProperties.type;
        }
        PersonProperties.type = spriteName;
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
        CheckBehaviors("personentity");
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
    var Activity5 = (function () {
        function Activity5(router) {
            this.workspace = {};
            this.interpreter = {};
            this.game = {};
            this.TimeStamp = 0;
            this.TimerId = null;
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
            var totalCount = myApp.Persons.length;
            var sickCount = myApp.Persons.getAll('status', 'Sick').length;
            var healthyCount = totalCount - sickCount;
            myApp.ChartData.addRow([myApp.TimeStamp, healthyCount, sickCount]);
            myApp.drawChart();
        };
        Activity5.prototype.initChartData = function () {
            myApp.ChartData = new google.visualization.DataTable();
            myApp.ChartData.addColumn('number', 'Time');
            myApp.ChartData.addColumn('number', 'Healthy');
            myApp.ChartData.addColumn('number', 'Sick');
            myApp.drawChart();
        };
        Activity5.prototype.detached = function () {
            myApp.PushObject();
            myApp.ChartData = new google.visualization.DataTable();
            myApp.ChartData.addColumn('number', 'Time');
            myApp.ChartData.addColumn('number', 'Healthy');
            myApp.ChartData.addColumn('number', 'Sick');
            window.clearInterval(myApp.TimerId);
            myApp.game.destroy();
            this.workspace.dispose();
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
            myApp.workspace.addChangeListener(myApp.onBlocklyChange);
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
            myApp.LogEvent("RunSimulation");
            myApp.ResetPhaser();
            if (myApp.TimerId)
                window.clearInterval(myApp.TimerId);
            myApp.TimerId = window.setInterval(myApp.updateChartData, myApp.SampleRate * 1000);
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
        Activity5.prototype.PushObject = function () {
            myApp.LogEvent("SaveWorkspace");
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
            myApp.LogEvent("LoadLastSave");
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
                myApp.LogEvent("LogOut");
                Parse.User.logOut();
                this.router.navigate('home');
            }
            else {
            }
        };
        Activity5.prototype.onBlocklyChange = function (event) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", event.type);
                traceLog.set("EventBlock", event.blockId);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
            }
        };
        Activity5.prototype.ResetCode = function () {
            if (confirm("Are you sure you want to reset the code to its initial state?") == true) {
                myApp.workspace.clear();
                var url = "resources/InitialWorkspaces/Activity5.xml";
                var client = new this.HttpClient();
                client.get(url, this.LoadWorkspaceCallback);
            }
            else {
            }
        };
        Activity5.prototype.LogEvent = function (eventType) {
            var currentUser = Parse.User.current();
            if (currentUser) {
                var xml = Blockly.Xml.workspaceToDom(myApp.workspace);
                var xml_text = Blockly.Xml.domToPrettyText(xml);
                var TraceLog = Parse.Object.extend("TraceLog");
                var traceLog = new TraceLog();
                traceLog.set("username", currentUser.getUsername());
                traceLog.set("sessionToken", currentUser.getSessionToken());
                traceLog.set("ActivityName", myApp.activityName);
                traceLog.set("EventType", eventType);
                traceLog.set("workspace", xml_text);
                traceLog.save(null, {
                    success: function (traceLog) {
                    },
                    error: function (traceLog, error) {
                        console.log("Failed to save event: " + error.message);
                    }
                });
            }
            else {
                console.log("Failed to save event:  User not logged in");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RTtvQkFDaEIsT0FBTyxFQUFFLFVBQVMsUUFBUTtvQkFHMUIsQ0FBQztvQkFDRCxLQUFLLEVBQUUsVUFBUyxRQUFRLEVBQUUsS0FBSzt3QkFHM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFELENBQUM7aUJBQ0osQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELElBQUksQ0FDSixDQUFDO2dCQUNHLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtZQUM1RCxDQUFDO1FBQ0wsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0F0ZkEsQUFzZkMsSUFBQTtJQXRmWSxTQUFTO1FBRHJCLDBCQUFNLENBQUMsdUJBQU0sQ0FBQzs7T0FDRixTQUFTLENBc2ZyQjtJQXRmWSw4QkFBUyIsImZpbGUiOiJhY3Rpdml0eTUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSb3V0ZXJDb25maWd1cmF0aW9uLCBSb3V0ZXJ9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxudmFyIG15QXBwXG52YXIgcmVzcG9uc2VUZXh0XG52YXIgbXlBcHBcblxudmFyIFBlcnNvblByb3BlcnRpZXMgPSB7fTtcbnZhciBWaXJ1c1Byb3BlcnRpZXMgPSB7fTtcblxudmFyIGNvbGxpZGVlO1xuXG52YXIgTUFYX1BFUlNPTlMgPSAzMDA7XG52YXIgTUFYX1ZJUlVTRVMgPSAxMDtcblxuZnVuY3Rpb24gcHJlbG9hZCgpIHsgICAgXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4xJywgJ2Fzc2V0cy9NYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnTWFuMicsICdhc3NldHMvTWFuMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1dvbWFuMScsICdhc3NldHMvV29tYW4xLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4yJywgJ2Fzc2V0cy9Xb21hbjIucG5nJyk7XG5cbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ01hbjFTaWNrJywgJ2Fzc2V0cy9NYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdNYW4yU2ljaycsICdhc3NldHMvTWFuMl9zaWNrLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnV29tYW4xU2ljaycsICdhc3NldHMvV29tYW4xX3NpY2sucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdXb21hbjJTaWNrJywgJ2Fzc2V0cy9Xb21hbjJfc2ljay5wbmcnKTtcblxuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnVmlydXMxJywgJ2Fzc2V0cy9WaXJ1czEucG5nJyk7XG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdWaXJ1czInLCAnYXNzZXRzL1ZpcnVzMi5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ1ZpcnVzMycsICdhc3NldHMvVmlydXMzLnBuZycpO1xuXG4gICAgbXlBcHAuZ2FtZS5sb2FkLmltYWdlKCdibHVlRG90JywgJ2Fzc2V0cy9ibHVlQ2lyY2xlLnBuZycpO1xuICAgIG15QXBwLmdhbWUubG9hZC5pbWFnZSgnYmx1ZURvdFNpY2snLCAnYXNzZXRzL3JlZENpcmNsZS5wbmcnKTtcbiAgICBteUFwcC5nYW1lLmxvYWQuaW1hZ2UoJ2dyZWVuRG90JywgJ2Fzc2V0cy9ncmVlbkNpcmNsZS5wbmcnKTtcblxufVxuXG5mdW5jdGlvbiBDcmVhdGVNdWx0aXBsZUVudGl0aWVzKG51bSx0eXBlKVxue1xuICAgIGlmKG51bSA8PSAwKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgeD0wO1xuXG4gICAgaWYodHlwZSA9PSBcIlBlb3BsZVwiKVxuICAgIHtcbiAgICAgICAgaWYobnVtID4gTUFYX1BFUlNPTlMpXG4gICAgICAgICAgICBudW0gPSBNQVhfUEVSU09OUztcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIENyZWF0ZVBlcnNvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJWaXJ1c2VzXCIpXG4gICAge1xuICAgICAgICBpZihudW0gPiBNQVhfVklSVVNFUylcbiAgICAgICAgICAgIG51bSA9IE1BWF9WSVJVU0VTO1xuICAgICAgICBmb3IoeD0wO3g8bnVtO3grKylcbiAgICAgICAge1xuICAgICAgICAgICAgQ3JlYXRlVmlydXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGUgPT0gXCJIb3NwaXRhbFwiKVxuICAgIHtcbiAgICAgICAgZm9yKHg9MDt4PG51bTt4KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSE9TUElUQUxcIilcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgLy8gIFdlJ3JlIGdvaW5nIHRvIGJlIHVzaW5nIHBoeXNpY3MsIHNvIGVuYWJsZSB0aGUgQXJjYWRlIFBoeXNpY3Mgc3lzdGVtXG4gICAgbXlBcHAuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNkYmQ2ZDdcIjtcbiAgICBteUFwcC5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcbiAgICBcbiAgICBteUFwcC5QZXJzb25zID0gbXlBcHAuZ2FtZS5hZGQuZ3JvdXAoKTtcbiAgICBteUFwcC5QZXJzb25zLmVuYWJsZUJvZHkgPSB0cnVlO1xuICAgIG15QXBwLlBlcnNvbnMucGh5c2ljc0JvZHlUeXBlID0gUGhhc2VyLlBoeXNpY3MuQVJDQURFO1xuXG4gICAgbXlBcHAuVmlydXNlcyA9IG15QXBwLmdhbWUuYWRkLmdyb3VwKCk7XG4gICAgbXlBcHAuVmlydXNlcy5lbmFibGVCb2R5ID0gdHJ1ZTtcbiAgICBteUFwcC5WaXJ1c2VzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcblxuICAgIFBlcnNvblByb3BlcnRpZXMudHlwZSA9IFwiXCI7XG4gICAgUGVyc29uUHJvcGVydGllcy5hZ2UgPSBcIlwiO1xuICAgIFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID0gXCJcIjtcbiAgICBWaXJ1c1Byb3BlcnRpZXMudHlwZSA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuICAgICBteUFwcC5nYW1lLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUobXlBcHAuUGVyc29ucywgbXlBcHAuVmlydXNlcywgbXlBcHAuUGVyc29uVmlydXNDb2xsaXNpb24uYmluZChteUFwcCksIG51bGwsIHRoaXMpOyBcbiAgICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvbnMsIG15QXBwLlBlcnNvblBlcnNvbkNvbGxpc2lvbi5iaW5kKG15QXBwKSwgbnVsbCwgdGhpcyk7ICBcbiAgICAgbXlBcHAuZ2FtZS5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKG15QXBwLlZpcnVzZXMsIG15QXBwLlZpcnVzZXMsIG51bGwsIG51bGwsIHRoaXMpOyAgXG59XG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljcyh0eXBlLGFnZSxzdGF0dXMpXG57XG4gICAgUGVyc29uUHJvcGVydGllcy50eXBlID0gXCJcIjtcbiAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IFwiXCI7XG4gICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBcIlwiO1xuXG4gICAgaWYodHlwZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLnR5cGUgPSB0eXBlO1xuICAgIGlmKGFnZS5sZW5ndGggPiAwKVxuICAgICAgICBQZXJzb25Qcm9wZXJ0aWVzLmFnZSA9IGFnZTtcbiAgICBpZihzdGF0dXMubGVuZ3RoID4gMClcbiAgICAgICAgUGVyc29uUHJvcGVydGllcy5zdGF0dXMgPSBzdGF0dXM7XG59XG5cbmZ1bmN0aW9uIFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHZpcnVzVHlwZSlcbntcbiAgICBWaXJ1c1Byb3BlcnRpZXMudHlwZSA9IHZpcnVzVHlwZTtcbn1cblxuZnVuY3Rpb24gR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcnR5cGUsIHRhcmdldClcbntcbiAgICB2YXIgcGVyc29uID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3RcbiAgICBpZih0YXJnZXQgPT0gXCJDb2xsaWRlZVwiKVxuICAgIHtcbiAgICAgICAgcGVyc29uID0gY29sbGlkZWVcbiAgICB9XG4gICAgXG4gICAgaWYoY2hhcnR5cGUgPT0gXCJBZ2VcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24uYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmKGNoYXJ0eXBlID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICByZXR1cm4gcGVyc29uLnN0YXR1cztcbiAgICB9XG4gICAgZWxzZSBpZihjaGFydHlwZSA9PSBcIlR5cGVcIilcbiAgICB7XG4gICAgICAgIHJldHVybiBwZXJzb24udHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcblxufVxuXG5cbmZ1bmN0aW9uIFNldENoYXJhY3RlcmlzdGljKGZpZWxkLG5ld1ZhbHVlKVxue1xuICAgIGlmKGZpZWxkID09IFwiU3RhdHVzXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPSBuZXdWYWx1ZTtcbiAgICAgICAgdmFyIHNwcml0ZU5hbWUgPSBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlO1xuICAgICAgICBpZihteUFwcC5jdXJyZW50R2FtZU9iamVjdC5zdGF0dXMgPT0gXCJTaWNrXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZU5hbWUgKz0gXCJTaWNrXCI7XG4gICAgICAgIH1cbiAgICAgICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QubG9hZFRleHR1cmUoc3ByaXRlTmFtZSk7XG4gICAgfVxuXG4gICAgaWYoZmllbGQgPT0gXCJUeXBlXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC50eXBlID0gbmV3VmFsdWU7XG4gICAgICAgIHZhciBzcHJpdGVOYW1lID0gbXlBcHAuY3VycmVudEdhbWVPYmplY3QudHlwZTtcbiAgICAgICAgaWYobXlBcHAuY3VycmVudEdhbWVPYmplY3Quc3RhdHVzID09IFwiU2lja1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICBzcHJpdGVOYW1lICs9IFwiU2lja1wiO1xuICAgICAgICB9XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmxvYWRUZXh0dXJlKHNwcml0ZU5hbWUpO1xuICAgIH1cbiAgICAgICAgXG59XG5cbmZ1bmN0aW9uIEdldENoYXJhY3RlcmlzdGljcyhlbnRpdHlUeXBlKVxue1xuICAgIC8vR2V0IEVudGl0eSBCbG9ja1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpLmNoaWxkTm9kZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IHhtbCA9IGFsbFhtbFtpXTsgaSsrKSB7XG4gICAgICAgIHZhciB4bWwgPSBhbGxYbWxbaV07XG4gICAgICAgIGlmKHhtbC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKT09IGVudGl0eVR5cGUpXG4gICAgICAgIHtcbiAgICAgICAgICB0cnlcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaW4xID0geG1sLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkOyAgICAgIFxuICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKGluMSwgaGVhZGxlc3MpO1xuICAgICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICAgIHZhciBpbnRlcnByZXRlciA9IG5ldyBJbnRlcnByZXRlcihjb2RlLG15QXBwLmluaXRBcGkpO1xuICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgIGhlYWRsZXNzLmRpc3Bvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2F0Y2goZXJyb3IpXG4gICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIEdldENoYXJhY3RlcmlzdGljcyBmb3I6IFwiK2VudGl0eVR5cGUpXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gQ2hlY2tCZWhhdmlvcnMoZW50aXR5VHlwZSlcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0gZW50aXR5VHlwZSlcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBtb3ZlQmxvY2sgPSBudWxsO1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGNoaWxkQmxvY2tzLmxlbmd0aDsgaisrKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlmKGNoaWxkQmxvY2tzW2pdLmdldEF0dHJpYnV0ZSgndHlwZScpID09IFwibW92ZVwiKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vdmVCbG9jayA9IGNoaWxkQmxvY2tzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBpZihtb3ZlQmxvY2sgIT0gbnVsbClcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGxlc3MgPSBuZXcgQmxvY2tseS5Xb3Jrc3BhY2UoKTtcbiAgICAgICAgICAgICAgICBCbG9ja2x5LlhtbC5kb21Ub0Jsb2NrKG1vdmVCbG9jaywgaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHJ1bm5pbmcgQ2hlY2tCZWhhdmlvcnMgZm9yOiBcIiArIGVudGl0eVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL0V4ZWN1dGUgTW92ZSBCbG9ja1xufVxuXG5mdW5jdGlvbiBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uLHRhcmdldClcbntcbiAgICAvL0dldCBNb3ZlIEJsb2NrXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKG15QXBwLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0ncGVyc29uZW50aXR5JylcbiAgICAgICAge1xuICAgICAgICAgIC8vR2V0IEJlaGF2aW9yIEJsb2Nrc1xuICAgICAgICAgIHZhciBjaGlsZEJsb2NrcyA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJsb2NrXCIpO1xuICAgICAgICAgIHZhciBjb2xsaXNpb25CbG9jayA9IG51bGw7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRCbG9ja3MubGVuZ3RoOyBqKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWYoY2hpbGRCbG9ja3Nbal0uZ2V0QXR0cmlidXRlKCd0eXBlJykgPT0gXCJjb2xsaXNpb25cIilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZEJsb2Nrc1tqXS5maXJzdENoaWxkLmlubmVyVGV4dD09dGFyZ2V0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uQmxvY2sgPSBjaGlsZEJsb2Nrc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmKGNvbGxpc2lvbkJsb2NrICE9IG51bGwpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWRsZXNzID0gbmV3IEJsb2NrbHkuV29ya3NwYWNlKCk7XG4gICAgICAgICAgICAgICAgQmxvY2tseS5YbWwuZG9tVG9CbG9jayhjb2xsaXNpb25CbG9jaywgaGVhZGxlc3MpO1xuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gQmxvY2tseS5KYXZhU2NyaXB0LndvcmtzcGFjZVRvQ29kZShoZWFkbGVzcyk7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycHJldGVyID0gbmV3IEludGVycHJldGVyKGNvZGUsbXlBcHAuaW5pdEFwaSk7XG4gICAgICAgICAgICAgICAgaW50ZXJwcmV0ZXIucnVuKClcbiAgICAgICAgICAgICAgICBoZWFkbGVzcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnJvcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBDcmVhdGVWaXJ1cygpXG57XG4gICAgR2V0Q2hhcmFjdGVyaXN0aWNzKFwidmlydXNlbnRpdHlcIik7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBcIlZpcnVzMVwiO1xuICAgIGlmKFZpcnVzUHJvcGVydGllcy50eXBlLnN0YXJ0c1dpdGgoXCJWaXJ1c1wiKSlcbiAgICB7XG4gICAgICAgIHNwcml0ZU5hbWUgPSBWaXJ1c1Byb3BlcnRpZXMudHlwZTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWaXJ1cyB0eXBlIG5vdCBzZXQgdG8gVmlydXMgbW9kZWxcIik7XG4gICAgfVxuICAgIFxuXG4gICAgdmFyIGMgPSBteUFwcC5WaXJ1c2VzLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgYy5zY2FsZSA9IG5ldyBQaGFzZXIuUG9pbnQoLjMsLjMpO1xuICAgIGMuYW5jaG9yLnNldCguNSk7XG4gICAgYy5ib2R5LnNldFNpemUoNSw2MCwyMywxNSlcbiAgICAvL2MuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xuXG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoXCJ2aXJ1c2VudGl0eVwiKVxufVxuXG5mdW5jdGlvbiBDcmVhdGVIb3NwaXRhbCgpXG57XG4gICAgIC8vR2V0Q2hhcmFjdGVyaXN0aWNzKCk7XG4gICAgdmFyIHNwcml0ZU5hbWUgPSBcIkhvc3BpdGFsMVwiXG5cbiAgICB2YXIgYyA9IG15QXBwLkhvc3BpdGFscy5jcmVhdGUobXlBcHAuZ2FtZS53b3JsZC5yYW5kb21YLCBteUFwcC5nYW1lLndvcmxkLnJhbmRvbVksIHNwcml0ZU5hbWUpO1xuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KDEsMSk7XG4gICAgYy5hbmNob3Iuc2V0KC41KTtcblxuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0ID0gYztcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmNvbGxpZGVXb3JsZEJvdW5kcyA9IHRydWU7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QuYm9keS5ib3VuY2Uuc2V0KDEpO1xuICAgIGMuYm9keS5pbW1vdmFibGUgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVQZXJzb24oKVxue1xuICAgIEdldENoYXJhY3RlcmlzdGljcyhcInBlcnNvbmVudGl0eVwiKTtcblxuICAgIHZhciBpbnN0YW5jZVR5cGUgPSBcImJsdWVEb3RcIlxuICAgIHZhciBzcHJpdGVOYW1lID0gXCJibHVlRG90XCI7XG4gICAgaWYoUGVyc29uUHJvcGVydGllcy50eXBlLnN0YXJ0c1dpdGgoXCJNYW5cIikgfHwgUGVyc29uUHJvcGVydGllcy50eXBlLnN0YXJ0c1dpdGgoXCJXb21hblwiKSlcbiAgICB7XG4gICAgICAgIHNwcml0ZU5hbWUgPSBQZXJzb25Qcm9wZXJ0aWVzLnR5cGU7XG4gICAgICAgIGluc3RhbmNlVHlwZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcbiAgICB9XG4gICAgUGVyc29uUHJvcGVydGllcy50eXBlID0gc3ByaXRlTmFtZTtcblxuICAgIGlmKFBlcnNvblByb3BlcnRpZXMuc3RhdHVzID09IFwiU2lja1wiKVxuICAgIHtcbiAgICAgICAgc3ByaXRlTmFtZSArPSBcIlNpY2tcIjtcbiAgICB9XG5cbiAgICB2YXIgYyA9IHt9XG4gICAgaWYobXlBcHAuUGVyc29ucy5sZW5ndGggPT0gMClcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZSgxMDAsIDMwMCwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGMgPSBteUFwcC5QZXJzb25zLmNyZWF0ZShteUFwcC5nYW1lLndvcmxkLnJhbmRvbVgsIG15QXBwLmdhbWUud29ybGQucmFuZG9tWSwgc3ByaXRlTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGMuc2NhbGUgPSBuZXcgUGhhc2VyLlBvaW50KC4zLC4zKTtcbiAgICBjLmFuY2hvci5zZXQoLjUpO1xuICAgIGMudHlwZSA9IFBlcnNvblByb3BlcnRpZXMudHlwZTtcbiAgICBjLmFnZSA9IFBlcnNvblByb3BlcnRpZXMuYWdlO1xuICAgIGMuc3RhdHVzID0gUGVyc29uUHJvcGVydGllcy5zdGF0dXM7XG4gICAgbXlBcHAuY3VycmVudEdhbWVPYmplY3QgPSBjO1xuICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcbiAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LmJvdW5jZS5zZXQoMSk7XG4gICAgQ2hlY2tCZWhhdmlvcnMoXCJwZXJzb25lbnRpdHlcIik7XG59XG5cblxuXG5mdW5jdGlvbiBNb3ZlRW50aXR5KGRpcmVjdGlvbilcbntcbiAgICBpZihkaXJlY3Rpb24gPT0gXCJMZWZ0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAtMTAwO1xuICAgIH1cbiAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBcIlJpZ2h0XCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSAxMDA7XG4gICAgfVxuICAgIGVsc2UgaWYoZGlyZWN0aW9uID09IFwiUmFuZG9tXCIpXG4gICAge1xuICAgICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdC5ib2R5LnZlbG9jaXR5LnggPSBNYXRoLnJhbmRvbSgpICogMTAwIC0gNTA7XG4gICAgICAgIG15QXBwLmN1cnJlbnRHYW1lT2JqZWN0LmJvZHkudmVsb2NpdHkueSA9IE1hdGgucmFuZG9tKCkgKiAxMDAgLSA1MDtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gUmVzZXRQaGFzZXIoKVxue1xuICBteUFwcC5nYW1lLndvcmxkLnJlbW92ZUFsbCh0cnVlLGZhbHNlLGZhbHNlKVxuICBjcmVhdGUoKTtcbn1cbkBpbmplY3QoUm91dGVyKVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5NSB7XG4gIHdvcmtzcGFjZSA9IHt9O1xuICBpbnRlcnByZXRlciA9IHt9O1xuICB0b29sYm94O1xuICBnYW1lID0ge307XG4gIENoYXJ0RGF0YTtcbiAgVGltZVN0YW1wID0gMDtcbiAgU2FtcGxlUmF0ZTtcbiAgVGltZXJJZCA9IG51bGw7XG4gIGFjdGl2aXR5TmFtZTtcblxuICBjb25zdHJ1Y3Rvcihyb3V0ZXIpIHtcbiAgICBteUFwcCA9IHRoaXM7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgUGFyc2UuaW5pdGlhbGl6ZShcIm15QXBwSWRcIik7ICAgIFxuICAgIFBhcnNlLnNlcnZlclVSTCA9IHVybCArIFwiOlwiICsgbG9jYXRpb24ucG9ydCArICcvcGFyc2UnO1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICAgIHRoaXMuYWN0aXZpdHlOYW1lID0gXCJQYXJ0NFwiO1xuICB9XG5cbiAgLy9iZWZvcmUgdmlldy1tb2RlbCByZW5kZXJzXG4gIGF0dGFjaGVkKCl7XG4gICAgdGhpcy50b29sYm94ID0gdGhpcy5Mb2FkVG9vbGJveCgpO1xuICAgIHRoaXMuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdwaGFzZXJEaXYnLCB7IHByZWxvYWQ6IHByZWxvYWQsIGNyZWF0ZTogY3JlYXRlLCB1cGRhdGU6IHVwZGF0ZSB9KTtcblxuXG4gICAgdGhpcy5UaW1lU3RhbXAgPSAwO1xuICAgIHRoaXMuU2FtcGxlUmF0ZSA9IDEgO1xuXG4gICAgZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeydwYWNrYWdlcyc6Wydjb3JlY2hhcnQnXX0pO1xuICAgIGdvb2dsZS5jaGFydHMuc2V0T25Mb2FkQ2FsbGJhY2sodGhpcy5pbml0Q2hhcnREYXRhKTtcbiAgfVxuXG5IdHRwQ2xpZW50KClcbiAgICB7XG4gICAgICAgIHRoaXMuZ2V0ID0gZnVuY3Rpb24oYVVybCwgYUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYW5IdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgYW5IdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICBpZiAoYW5IdHRwUmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgYW5IdHRwUmVxdWVzdC5zdGF0dXMgPT0gMjAwKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soYW5IdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbkh0dHBSZXF1ZXN0Lm9wZW4oIFwiR0VUXCIsIGFVcmwsIHRydWUgKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIGFuSHR0cFJlcXVlc3Quc2VuZCggbnVsbCApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAvLy8vLy8vLy8vLy8vLy8vL0NoYXJ0IEhlbHBlciBmdW5jdGlvbnNcbiAgdXBkYXRlQ2hhcnREYXRhKClcbiAge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIlVwZGF0aW5nIENoYXJ0OiBcIitteUFwcC5UaW1lU3RhbXAudG9TdHJpbmcoKSk7XG4gICAgICBteUFwcC5UaW1lU3RhbXAgKz0gbXlBcHAuU2FtcGxlUmF0ZTtcbiAgICAgIHZhciB0b3RhbENvdW50ID0gbXlBcHAuUGVyc29ucy5sZW5ndGg7XG4gICAgICB2YXIgc2lja0NvdW50ID0gbXlBcHAuUGVyc29ucy5nZXRBbGwoJ3N0YXR1cycsJ1NpY2snKS5sZW5ndGg7XG4gICAgICB2YXIgaGVhbHRoeUNvdW50ID0gdG90YWxDb3VudCAtIHNpY2tDb3VudDtcbiAgICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRSb3coW215QXBwLlRpbWVTdGFtcCxoZWFsdGh5Q291bnQsc2lja0NvdW50XSlcbiAgICAgIG15QXBwLmRyYXdDaGFydCgpO1xuICB9XG5cbiAgaW5pdENoYXJ0RGF0YSgpXG4gIHtcbiAgICAgIG15QXBwLkNoYXJ0RGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ1RpbWUnKVxuICAgICAgbXlBcHAuQ2hhcnREYXRhLmFkZENvbHVtbignbnVtYmVyJywnSGVhbHRoeScpXG4gICAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdTaWNrJylcbiAgICAgIFxuICAgICAgbXlBcHAuZHJhd0NoYXJ0KCk7XG4gIH1cblxuICBkZXRhY2hlZCgpXG4gIHtcbiAgICAgIG15QXBwLlB1c2hPYmplY3QoKTtcbiAgICAgIG15QXBwLkNoYXJ0RGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgICAgIG15QXBwLkNoYXJ0RGF0YS5hZGRDb2x1bW4oJ251bWJlcicsJ1RpbWUnKVxuICAgICAgbXlBcHAuQ2hhcnREYXRhLmFkZENvbHVtbignbnVtYmVyJywnSGVhbHRoeScpXG4gICAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdTaWNrJylcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKG15QXBwLlRpbWVySWQpO1xuXG4gICAgICBteUFwcC5nYW1lLmRlc3Ryb3koKVxuICAgICAgdGhpcy53b3Jrc3BhY2UuZGlzcG9zZSgpO1xuICB9XG5cbiAgZHJhd0NoYXJ0KCkge1xuICAgICAgICB2YXIgZGF0YSA9IG15QXBwLkNoYXJ0RGF0YTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICB0aXRsZTogJ1NpY2sgdnMgSGVhbHRoeScsXG4gICAgICAgICAgY3VydmVUeXBlOiAnZnVuY3Rpb24nLFxuICAgICAgICAgIGxlZ2VuZDogeyBwb3NpdGlvbjogJ2JvdHRvbScgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5MaW5lQ2hhcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnZlX2NoYXJ0JykpO1xuXG4gICAgICAgIGNoYXJ0LmRyYXcoZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vL1NhdmUvTG9hZCBGdW5jdGlvbnNcbiAgU2F2ZVdvcmtzcGFjZSgpXG4gIHtcbiAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwud29ya3NwYWNlVG9Eb20odGhpcy53b3Jrc3BhY2UpO1xuICAgIHZhciB4bWxfdGV4dCA9IEJsb2NrbHkuWG1sLmRvbVRvUHJldHR5VGV4dCh4bWwpO1xuICAgIHRoaXMuZXhwb3J0KHhtbF90ZXh0KTtcbiAgfVxuXG4gIGV4cG9ydCh0ZXh0KSB7XG4gICAgdmFyIHBvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBwb20uc2V0QXR0cmlidXRlKCdocmVmJywgJ2RhdGE6dGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUklDb21wb25lbnQodGV4dCkpO1xuICAgIHBvbS5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3dvcmtzcGFjZS54bWwnKTtcbiAgICBwb20uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvbSk7XG4gICAgcG9tLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb20pO1xuICB9XG5cbiAgTG9hZFdvcmtzcGFjZUNhbGxiYWNrKFJlc3BvbnNlVGV4dClcbiAge1xuICAgICAgdmFyIHhtbF90ZXh0ICA9IFJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC50ZXh0VG9Eb20oeG1sX3RleHQpO1xuICAgICAgbXlBcHAud29ya3NwYWNlLmNsZWFyKCk7XG4gICAgICBCbG9ja2x5LlhtbC5kb21Ub1dvcmtzcGFjZSh4bWwsIG15QXBwLndvcmtzcGFjZSk7XG4gIH1cblxuICBMb2FkSW5pdGlhbFdvcmtzcGFjZSgpXG4gIHtcbiAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgdGhpcy5Mb2FkTGFzdFNhdmUoKTtcbiAgICAgIGlmKG15QXBwLndvcmtzcGFjZS5nZXRBbGxCbG9ja3MoKS5sZW5ndGggPT0gMClcbiAgICAgIHtcbiAgICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL0luaXRpYWxXb3Jrc3BhY2VzL0FjdGl2aXR5NS54bWxcIjtcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyB0aGlzLkh0dHBDbGllbnQoKTtcbiAgICAgICAgY2xpZW50LmdldCh1cmwsIHRoaXMuTG9hZFdvcmtzcGFjZUNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIG15QXBwLndvcmtzcGFjZS5hZGRDaGFuZ2VMaXN0ZW5lcihteUFwcC5vbkJsb2NrbHlDaGFuZ2UpO1xuICB9XG5cbiAgTG9hZFRvb2xCb3hDYWxsYmFjayhSZXNwb25zZVRleHQpXG4gIHtcbiAgICAgIHZhciB4bWxfdGV4dCAgPSBSZXNwb25zZVRleHQ7XG4gICAgICB2YXIgeG1sID0gQmxvY2tseS5YbWwudGV4dFRvRG9tKHhtbF90ZXh0KTtcbiAgICAgIG15QXBwLnRvb2xib3ggPSB4bWw7XG4gICAgICBteUFwcC53b3Jrc3BhY2UgPSBCbG9ja2x5LmluamVjdCgnYmxvY2tseURpdicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZWRpYTogJy4uL0Jsb2NrbHkvbWVkaWEvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbGJveDogbXlBcHAudG9vbGJveH0pO1xuICAgICAgbXlBcHAuTG9hZEluaXRpYWxXb3Jrc3BhY2UoKTtcbiAgfVxuXG4gIExvYWRUb29sYm94KClcbiAge1xuICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL0VwaWRlbWljVG9vbGJveC54bWxcIjtcbiAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICBjbGllbnQuZ2V0KHVybCwgdGhpcy5Mb2FkVG9vbEJveENhbGxiYWNrKTtcbiAgfVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vL1BoYXNlciBIZWxwZXIgZnVuY3Rpb25zXG4gIFJlc2V0UGhhc2VyKClcbiAge1xuICAgIG15QXBwLkNoYXJ0RGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoKTtcbiAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdUaW1lJylcbiAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdIZWFsdGh5JylcbiAgICBteUFwcC5DaGFydERhdGEuYWRkQ29sdW1uKCdudW1iZXInLCdTaWNrJylcbiAgICBteUFwcC5UaW1lU3RhbXAgPSAwO1xuICAgIG15QXBwLmdhbWUud29ybGQucmVtb3ZlQWxsKHRydWUsZmFsc2UsZmFsc2UpXG4gICAgY3JlYXRlKCk7XG4gIH1cblxuICBzZXRDb2xvcih0YXJnZXRDb2xvcilcbiAge1xuICAgIGlmKHRhcmdldENvbG9yID09IFwiUkVEXCIpXG4gICAge1xuICAgICAgICBiYWxsMi5sb2FkVGV4dHVyZSgncmVkYmFsbCcpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRhcmdldENvbG9yID09IFwiQkxVRVwiKVxuICAgIHtcbiAgICAgICAgYmFsbDIubG9hZFRleHR1cmUoJ2JsdWViYWxsJyk7XG4gICAgfVxuICAgIG15QXBwLmdhbWUucGh5c2ljcy5hcmNhZGUuY29sbGlkZShiYWxsMSwgYmFsbDIpO1xuICB9XG5cbiAgaGFuZGxlQ29sbGlzaW9uKClcbiAge1xuICAgIHZhciBhbGxYbWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSkuY2hpbGROb2RlcztcbiAgICBmb3IgKHZhciBpID0gMDsgeG1sID0gYWxsWG1sW2ldOyBpKyspIHtcbiAgICAgICAgdmFyIHhtbCA9IGFsbFhtbFtpXTtcbiAgICAgICAgaWYoeG1sLmdldEF0dHJpYnV0ZSgndHlwZScpPT0nY29sbGlzaW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBIZWFsdGh5SW5mZWN0ZWRDb2xsaXNpb24oaGVhbHRoeSwgaW5mZWN0ZWQpXG4gIHtcbiAgICAgIGhlYWx0aHkubG9hZFRleHR1cmUoJ3JlZGJhbGwnKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMucmVtb3ZlKGhlYWx0aHkpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMuYWRkKGhlYWx0aHkpXG4gIH1cblxuICBIZWFsZXJJbmZlY3RlZENvbGxpc2lvbihoZWFsZXIsIGluZmVjdGVkKVxuICB7XG4gICAgICBpbmZlY3RlZC5sb2FkVGV4dHVyZSgnd2l6YmFsbCcpXG4gICAgICBteUFwcC5pbmZlY3RlZFBlcnNvbnMucmVtb3ZlKGluZmVjdGVkKVxuICAgICAgbXlBcHAuaGVhbHRoeVBlcnNvbnMuYWRkKGluZmVjdGVkKVxuICB9XG5cbiAgUGVyc29uVmlydXNDb2xsaXNpb24ocGVyc29uLHZpcnVzKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjtcbiAgICAgIEdldENvbGxpc2lvbkJsb2NrRnJvbUVudGl0eShwZXJzb24sXCJWaXJ1c1wiKVxuICAgICAgXG4gIH1cblxuICBQZXJzb25QZXJzb25Db2xsaXNpb24ocGVyc29uMSxwZXJzb24yKVxuICB7XG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjE7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjI7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMSxcIlBlcnNvblwiKVxuXG4gICAgICBteUFwcC5jdXJyZW50R2FtZU9iamVjdCA9IHBlcnNvbjI7XG4gICAgICBjb2xsaWRlZSA9IHBlcnNvbjE7XG4gICAgICBHZXRDb2xsaXNpb25CbG9ja0Zyb21FbnRpdHkocGVyc29uMixcIlBlcnNvblwiKVxuICB9XG5cbiAgUGVyc29uSG9zcGl0YWxDb2xsaXNpb24ocGVyc29uMSwgaG9zcGl0YWwpXG4gIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQm9vcFwiKVxuICB9XG5cblxuICBydW5TaW11bGF0aW9uKClcbiAge1xuICAgIG15QXBwLkxvZ0V2ZW50KFwiUnVuU2ltdWxhdGlvblwiKVxuICAgIG15QXBwLlJlc2V0UGhhc2VyKCk7XG4gICAgaWYobXlBcHAuVGltZXJJZClcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwobXlBcHAuVGltZXJJZCk7XG4gICAgbXlBcHAuVGltZXJJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChteUFwcC51cGRhdGVDaGFydERhdGEsbXlBcHAuU2FtcGxlUmF0ZSoxMDAwKTtcbiAgICAvL0dldCBXaGVuUnVuIEhlYWRcbiAgICAvL1J1biBjb2RlXG4gICAgdmFyIHRlc3QgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKHRoaXMud29ya3NwYWNlKVxuICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuXG4gICAgdmFyIGFsbFhtbCA9IEJsb2NrbHkuWG1sLndvcmtzcGFjZVRvRG9tKHRoaXMud29ya3NwYWNlKS5jaGlsZE5vZGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyB4bWwgPSBhbGxYbWxbaV07IGkrKykge1xuICAgICAgICB2YXIgeG1sID0gYWxsWG1sW2ldO1xuICAgICAgICBpZih4bWwuZ2V0QXR0cmlidXRlKCd0eXBlJyk9PSdzaW11bGF0aW9uJylcbiAgICAgICAge1xuICAgICAgICAgIHZhciBoZWFkbGVzcyA9IG5ldyBCbG9ja2x5LldvcmtzcGFjZSgpO1xuICAgICAgICAgIEJsb2NrbHkuWG1sLmRvbVRvQmxvY2soeG1sLCBoZWFkbGVzcyk7XG4gICAgICAgICAgdmFyIGNvZGUgPSBCbG9ja2x5LkphdmFTY3JpcHQud29ya3NwYWNlVG9Db2RlKGhlYWRsZXNzKTtcbiAgICAgICAgICB2YXIgaW50ZXJwcmV0ZXIgPSBuZXcgSW50ZXJwcmV0ZXIoY29kZSx0aGlzLmluaXRBcGkpO1xuICAgICAgICAgIGludGVycHJldGVyLnJ1bigpXG4gICAgICAgICAgaGVhZGxlc3MuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBpbml0QXBpKGludGVycHJldGVyLCBzY29wZSkge1xuICAvLyBBZGQgYW4gQVBJIGZ1bmN0aW9uIGZvciB0aGUgYWxlcnQoKSBibG9jay5cbiAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKHdpbmRvdy5hbGVydCh0ZXh0KSk7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdhbGVydCcsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICByZXR1cm4gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKG15QXBwLnNldENvbG9yKHRleHQpKTtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ1NldENvbG9yJyxcbiAgICAgICAgICBpbnRlcnByZXRlci5jcmVhdGVOYXRpdmVGdW5jdGlvbih3cmFwcGVyKSk7XG4gICAgICBcbiAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdCA9IGludGVycHJldGVyLmNyZWF0ZVByaW1pdGl2ZShDcmVhdGVFbnRpdHkoXCJQZXJzb25cIikpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZVBlcnNvbicsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKENyZWF0ZUVudGl0eSh0ZXh0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnQ3JlYXRlTGFyZ2VFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKE1vdmVFbnRpdHkodGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ01vdmVFbnRpdHknLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKHRleHQsYWdlLHN0YXR1cykge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBzdGF0dXMgPSBzdGF0dXMgPyBzdGF0dXMudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgYWdlID0gYWdlID8gYWdlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljcyh0ZXh0LGFnZSxzdGF0dXMpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRDaGFyYWN0ZXJpc3RpY3MnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgIHdyYXBwZXIgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dC50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldFZpcnVzQ2hhcmFjdGVyaXN0aWNzKHRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRlc3Q7XG4gICAgICB9O1xuICAgICAgaW50ZXJwcmV0ZXIuc2V0UHJvcGVydHkoc2NvcGUsICdTZXRWaXJ1c0NoYXJhY3RlcmlzdGljcycsXG4gICAgICAgICAgaW50ZXJwcmV0ZXIuY3JlYXRlTmF0aXZlRnVuY3Rpb24od3JhcHBlcikpO1xuXG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24oY2hhcmFjdGVyaXN0aWMsbmV3VmFsdWUpIHtcbiAgICAgICAgY2hhcmFjdGVyaXN0aWMgPSBjaGFyYWN0ZXJpc3RpYyA/IGNoYXJhY3RlcmlzdGljLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSA/IG5ld1ZhbHVlLnRvU3RyaW5nKCkgOiBcIlwiXG4gICAgICAgIHZhciB0ZXN0ID0gaW50ZXJwcmV0ZXIuY3JlYXRlUHJpbWl0aXZlKFNldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljLG5ld1ZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnU2V0Q2hhcmFjdGVyaXN0aWMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTtcblxuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uKGNoYXJhY3RlcmlzdGljLHRhcmdldCkge1xuICAgICAgICBjaGFyYWN0ZXJpc3RpYyA9IGNoYXJhY3RlcmlzdGljID8gY2hhcmFjdGVyaXN0aWMudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgPyB0YXJnZXQudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoR2V0Q2hhcmFjdGVyaXN0aWMoY2hhcmFjdGVyaXN0aWMsdGFyZ2V0KSk7XG4gICAgICAgIHJldHVybiB0ZXN0O1xuICAgICAgfTtcbiAgICAgIGludGVycHJldGVyLnNldFByb3BlcnR5KHNjb3BlLCAnR2V0Q2hhcmFjdGVyaXN0aWMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTsgXG5cbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbihudW1iZXIsdGV4dCkge1xuICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHQudG9TdHJpbmcoKSA6ICcnO1xuICAgICAgICBudW1iZXIgPSBudW1iZXIgPyBudW1iZXIudG9TdHJpbmcoKSA6IFwiXCJcbiAgICAgICAgdmFyIHRlc3QgPSBpbnRlcnByZXRlci5jcmVhdGVQcmltaXRpdmUoQ3JlYXRlTXVsdGlwbGVFbnRpdGllcyhudW1iZXIsdGV4dCkpO1xuICAgICAgICByZXR1cm4gdGVzdDtcbiAgICAgIH07XG4gICAgICBpbnRlcnByZXRlci5zZXRQcm9wZXJ0eShzY29wZSwgJ0NyZWF0ZU11bHRpcGxlRW50aXRpZXMnLFxuICAgICAgICAgIGludGVycHJldGVyLmNyZWF0ZU5hdGl2ZUZ1bmN0aW9uKHdyYXBwZXIpKTsgICAgXG5cbiAgICB9XG5cbiAgICBQdXNoT2JqZWN0KClcbiAgICB7XG4gICAgICAgIG15QXBwLkxvZ0V2ZW50KFwiU2F2ZVdvcmtzcGFjZVwiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbSh0aGlzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB2YXIgeG1sX3RleHQgPSBCbG9ja2x5LlhtbC5kb21Ub1ByZXR0eVRleHQoeG1sKTtcblxuICAgICAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgICAgICB2YXIgZ2FtZVNjb3JlID0gbmV3IEdhbWVTY29yZSgpO1xuXG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwid29ya3NwYWNlXCIsIHhtbF90ZXh0KSA7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwidXNlcm5hbWVcIixjdXJyZW50VXNlci5nZXRVc2VybmFtZSgpKTtcbiAgICAgICAgICAgIGdhbWVTY29yZS5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICBnYW1lU2NvcmUuc2V0KFwiQWN0aXZpdHlOYW1lXCIsdGhpcy5hY3Rpdml0eU5hbWUpO1xuICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgZ2FtZVNjb3JlLnNhdmUobnVsbCwge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGdhbWVTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdXb3Jrc3BhY2UgU2F2ZWQhJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZ2FtZVNjb3JlLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGlmIHRoZSBzYXZlIGZhaWxzLlxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBpcyBhIFBhcnNlLkVycm9yIHdpdGggYW4gZXJyb3IgY29kZSBhbmQgbWVzc2FnZS5cbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZSwgd2l0aCBlcnJvciBjb2RlOiAnICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhbGVydChcIlVzZXIgbm90IGxvZ2dlZCBpblwiKVxuICAgICAgICB9XG4gICAgfVxuICAgIExvYWRMYXN0U2F2ZSgpXG4gICAge1xuICAgICAgICBteUFwcC5Mb2dFdmVudChcIkxvYWRMYXN0U2F2ZVwiKVxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgdmFyIEdhbWVTY29yZSA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJHYW1lU2NvcmVcIik7XG4gICAgICAgIHZhciBxdWVyeSA9IG5ldyBQYXJzZS5RdWVyeShHYW1lU2NvcmUpO1xuICAgICAgICBxdWVyeS5lcXVhbFRvKFwidXNlcm5hbWVcIiwgY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgIHF1ZXJ5LmVxdWFsVG8oJ0FjdGl2aXR5TmFtZScsdGhpcy5hY3Rpdml0eU5hbWUpXG4gICAgICAgIHF1ZXJ5LmRlc2NlbmRpbmcoXCJ1cGRhdGVkQXRcIik7XG4gICAgICAgIHF1ZXJ5LmZpcnN0KHtcbiAgICAgICAgc3VjY2Vzczogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gb2JqZWN0LmF0dHJpYnV0ZXNbJ3dvcmtzcGFjZSddXG4gICAgICAgICAgICB0aGlzLkxvYWRXb3Jrc3BhY2VDYWxsYmFjayh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBhbGVydChcIkVycm9yOiBcIiArIGVycm9yLmNvZGUgKyBcIiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICBMb2dPdXQoKSBcbiAgICB7XG4gICAgICAgIGlmIChjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZyBvdXQ/XCIpID09IHRydWUpIFxuICAgICAgICB7XG4gICAgICAgICAgICBteUFwcC5Mb2dFdmVudChcIkxvZ091dFwiKVxuICAgICAgICAgICAgUGFyc2UuVXNlci5sb2dPdXQoKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKCdob21lJyk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICBvbkJsb2NrbHlDaGFuZ2UoZXZlbnQpXG4gICAge1xuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBQYXJzZS5Vc2VyLmN1cnJlbnQoKTtcbiAgICAgICAgaWYoY3VycmVudFVzZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpO1xuICAgICAgICAgICAgdmFyIHhtbF90ZXh0ID0gQmxvY2tseS5YbWwuZG9tVG9QcmV0dHlUZXh0KHhtbCk7XG5cbiAgICAgICAgICAgIHZhciBUcmFjZUxvZyA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJUcmFjZUxvZ1wiKTtcbiAgICAgICAgICAgIHZhciB0cmFjZUxvZyA9IG5ldyBUcmFjZUxvZygpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcInVzZXJuYW1lXCIsY3VycmVudFVzZXIuZ2V0VXNlcm5hbWUoKSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJzZXNzaW9uVG9rZW5cIixjdXJyZW50VXNlci5nZXRTZXNzaW9uVG9rZW4oKSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJBY3Rpdml0eU5hbWVcIixteUFwcC5hY3Rpdml0eU5hbWUpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwiRXZlbnRUeXBlXCIsZXZlbnQudHlwZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJFdmVudEJsb2NrXCIsZXZlbnQuYmxvY2tJZCk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJ3b3Jrc3BhY2VcIiwgeG1sX3RleHQpIDtcbiAgICAgICAgXG4gICAgICAgICAgICB0cmFjZUxvZy5zYXZlKG51bGwsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbih0cmFjZUxvZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoJ1dvcmtzcGFjZSBTYXZlZCEnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih0cmFjZUxvZywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBpZiB0aGUgc2F2ZSBmYWlscy5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaXMgYSBQYXJzZS5FcnJvciB3aXRoIGFuIGVycm9yIGNvZGUgYW5kIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgZXZlbnQ6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlIGV2ZW50OiAgVXNlciBub3QgbG9nZ2VkIGluXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgUmVzZXRDb2RlKCkgXG4gICAge1xuICAgICAgICBpZiAoY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXNldCB0aGUgY29kZSB0byBpdHMgaW5pdGlhbCBzdGF0ZT9cIikgPT0gdHJ1ZSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIG15QXBwLndvcmtzcGFjZS5jbGVhcigpO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwicmVzb3VyY2VzL0luaXRpYWxXb3Jrc3BhY2VzL0FjdGl2aXR5NS54bWxcIjtcbiAgICAgICAgICAgIHZhciBjbGllbnQgPSBuZXcgdGhpcy5IdHRwQ2xpZW50KCk7XG4gICAgICAgICAgICBjbGllbnQuZ2V0KHVybCwgdGhpcy5Mb2FkV29ya3NwYWNlQ2FsbGJhY2spO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIFxuICAgICAgICB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTG9nRXZlbnQoZXZlbnRUeXBlKVxuICAgIHtcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gUGFyc2UuVXNlci5jdXJyZW50KCk7XG4gICAgICAgIGlmKGN1cnJlbnRVc2VyKVxuICAgICAgICB7ICAgXG5cbiAgICAgICAgICAgIHZhciB4bWwgPSBCbG9ja2x5LlhtbC53b3Jrc3BhY2VUb0RvbShteUFwcC53b3Jrc3BhY2UpO1xuICAgICAgICAgICAgdmFyIHhtbF90ZXh0ID0gQmxvY2tseS5YbWwuZG9tVG9QcmV0dHlUZXh0KHhtbCk7XG5cbiAgICAgICAgICAgIHZhciBUcmFjZUxvZyA9IFBhcnNlLk9iamVjdC5leHRlbmQoXCJUcmFjZUxvZ1wiKTtcbiAgICAgICAgICAgIHZhciB0cmFjZUxvZyA9IG5ldyBUcmFjZUxvZygpO1xuXG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJ1c2VybmFtZVwiLGN1cnJlbnRVc2VyLmdldFVzZXJuYW1lKCkpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwic2Vzc2lvblRva2VuXCIsY3VycmVudFVzZXIuZ2V0U2Vzc2lvblRva2VuKCkpO1xuICAgICAgICAgICAgdHJhY2VMb2cuc2V0KFwiQWN0aXZpdHlOYW1lXCIsbXlBcHAuYWN0aXZpdHlOYW1lKTtcbiAgICAgICAgICAgIHRyYWNlTG9nLnNldChcIkV2ZW50VHlwZVwiLGV2ZW50VHlwZSk7XG4gICAgICAgICAgICB0cmFjZUxvZy5zZXQoXCJ3b3Jrc3BhY2VcIiwgeG1sX3RleHQpIDtcbiAgICAgICAgXG4gICAgICAgICAgICB0cmFjZUxvZy5zYXZlKG51bGwsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbih0cmFjZUxvZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIGFueSBsb2dpYyB0aGF0IHNob3VsZCB0YWtlIHBsYWNlIGFmdGVyIHRoZSBvYmplY3QgaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoJ1dvcmtzcGFjZSBTYXZlZCEnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih0cmFjZUxvZywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBhbnkgbG9naWMgdGhhdCBzaG91bGQgdGFrZSBwbGFjZSBpZiB0aGUgc2F2ZSBmYWlscy5cbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgaXMgYSBQYXJzZS5FcnJvciB3aXRoIGFuIGVycm9yIGNvZGUgYW5kIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHNhdmUgZXZlbnQ6IFwiICsgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlIGV2ZW50OiAgVXNlciBub3QgbG9nZ2VkIGluXCIpXG4gICAgICAgIH1cbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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

define('text!activity1.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><span class=\"logo\">ENGAGE</span></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity1\">Part 1</a><ul><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity3\">Part 3</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"instructions-button\" click.trigger=\"LoadLastSave()\">Load</div><div class=\"instructions-button\" click.trigger=\"ResetCode()\">Reset Code</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity2.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity2\">Part 2</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity3\">Part 3</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"instructions-button\" click.trigger=\"LoadLastSave()\">Load</div><div class=\"instructions-button\" click.trigger=\"ResetCode()\">Reset Code</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity3.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity3\">Part 3</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity5\">Part 4</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"instructions-button\" click.trigger=\"LoadLastSave()\">Load</div><div class=\"instructions-button\" click.trigger=\"ResetCode()\">Reset Code</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div></body></template>"; });
define('text!activity5.html', ['module'], function(module) { module.exports = "<template><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Engage IntelliBlocks Web Application Template</title><link rel=\"stylesheet\" href=\"css/foundation.css\"><link rel=\"stylesheet\" href=\"css/app.css\"></head><body><div data-sticky-container><div class=\"main-nav\" data-sticky data-options=\"marginTop:0;\" style=\"width:100%\" data-top-anchor=\"1\" data-btm-anchor=\"content:bottom\"><div class=\"main-nav-left\"><a class=\"logo\" href=\"#\">ENGAGE</a></div><div class=\"main-nav-right\"><a class=\"logo\" click.trigger=\"LogOut()\">LogOut</a></div></div></div><div class=\"app-container\"><div class=\"activity-container\"><div class=\"activity-menu\"><div class=\"title\">Epidemic!</div><div class=\"activity-navigation\"><ul><li><a class=\"dropdown\" href=\"#/activity4\">Part 4</a><ul><li><a href=\"#/activity1\">Part 1</a></li><li><a href=\"#/activity2\">Part 2</a></li><li><a href=\"#/activity3\">Part 3</a></li></ul></li></ul></div><div class=\"instructions-button\" click.trigger=\"runSimulation()\">Run</div><div class=\"instructions-button\" click.trigger=\"PushObject()\">Save</div><div class=\"instructions-button\" click.trigger=\"LoadLastSave()\">Load</div><div class=\"instructions-button\" click.trigger=\"ResetCode()\">Reset Code</div></div><div id=\"blocklyDiv\" class=\"blocks\"></div><div id=\"phaserDiv\" class=\"visualization\"></div></div></div><div id=\"curve_chart\" style=\"width:900px;height:500px\"></div></body></template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><h1>Welcome to Engage</h1><nav><form submit.trigger=\"login()\"><input type=\"text\" value.bind=\"username\"><br><input type=\"password\" value.bind=\"password\"><br><button type=\"submit\">Login</button></form><button type=\"button\" click.trigger=\"signup()\">Sign Up</button></nav></template>"; });
//# sourceMappingURL=app-bundle.js.map