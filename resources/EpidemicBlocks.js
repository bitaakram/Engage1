Blockly.Blocks['entity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Entity");
    this.appendStatementInput("Entity")
        .setCheck(null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Blocks['type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Type")
        .appendField(new Blockly.FieldDropdown([["Man1","Man1"], ["Man2","Man2"],["Woman1","Woman1"],["Woman2","Woman2"], ["",""]]), "Type");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color")
        .appendField(new Blockly.FieldColour("#3366ff"), "Color");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['age'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Age")
        .appendField(new Blockly.FieldNumber(0), "age");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['in1'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move");
    this.appendStatementInput("Move")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Forward");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Backward");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn left");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn right");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['collision'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Collision with")
        .appendField(new Blockly.FieldDropdown([["Virus","Virus"], ["Person","Person"], ["",""]]), "CollideeType");
    this.appendStatementInput("HandleCollision")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['set'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set my")
        .appendField(new Blockly.FieldDropdown([["Color","Color"], ["Age","Age"], ["Type","Type"]]), "NAME")
        .appendField("to");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['simulation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Simulate");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['insim'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.JavaScript['entity'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['type'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['color'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['age'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['in1'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['move'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['forward'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['backward'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['turn_left'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['turn_right'] = function(block) {
  var code = '\n';
  return code;
};

Blockly.JavaScript['set'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['simulation'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['insim'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['create'] = function(block) {
  var code = '\n';
  return code;
};


Blockly.Blocks['create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create")
        .appendField(new Blockly.FieldNumber(0), "NAME")
        .appendField("# of")
        .appendField(new Blockly.FieldDropdown([["People","Peaple"], ["Viruses","People"], ["Hospital","Hospital"]]), "Types");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(45);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['triat_of'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Color","Color"], ["Type","Type"], ["Age","Age"]]), "name")
        .appendField("of")
        .appendField(new Blockly.FieldDropdown([["Collidee","Collidee"], ["Me","Me"], ["",""]]), "NAME");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(285);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['clock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Clock");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['behaviors2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Behaviors");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['in_behaviour'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['characteristics2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Characteristics");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['inchar'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['recovery'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Recovery");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['gettime'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get time");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};