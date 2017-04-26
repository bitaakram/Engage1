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
        .appendField(new Blockly.FieldDropdown([["Person","Person"], ["Virus","Virus"], ["",""]]), "Type");
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

Blockly.Blocks['characs'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Characteristics");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['behaves'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Behaviors");
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendValueInput("NAME")
        .setCheck(null);
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Forward")
        .appendField(new Blockly.FieldNumber(0), "NAME");
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
        .appendField("Backward")
        .appendField(new Blockly.FieldNumber(0), "NAME");
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
        .appendField("Turn left")
        .appendField(new Blockly.FieldAngle(90), "NAME");
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
        .appendField("Turn right")
        .appendField(new Blockly.FieldAngle(90), "NAME");
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
        .appendField(new Blockly.FieldDropdown([["Virus","Virus"], ["Person","Person"], ["",""]]), "NAME");
    this.appendStatementInput("NAME")
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

Blockly.Blocks['create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create")
        .appendField(new Blockly.FieldNumber(0), "NAME")
        .appendField("# of")
        .appendField(new Blockly.FieldDropdown([["People","OPTIONNAME"], ["Viruses","OPTIONNAME"], ["",""]]), "Types");
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

Blockly.Blocks['getclcok'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get clock");
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};