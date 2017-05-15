
Blockly.Blocks['collision'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Collision")
        .appendField("With")
        .appendField(new Blockly.FieldDropdown([["Virus","Virus"], ["Person","Person"]]), "NAME");
    this.appendStatementInput("HandleCollision")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['age'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Age")
        .appendField(new Blockly.FieldNumber(0), "age");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
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
    this.setDeletable(false);

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

Blockly.Blocks['in1'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setMovable(false);
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
    this.setMovable(false);

  }
};

Blockly.Blocks['status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Status")
        .appendField(new Blockly.FieldDropdown([["Healthy","Healthy"], ["Sick","Sick"]]), "Status");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Direction")
        .appendField(new Blockly.FieldDropdown([["Left","Left"], ["Right","Right"], ["Random","Random"]]), "Direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['personentity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Person");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setDeletable(false);

  }
};

Blockly.Blocks['virusentity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Virus");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setDeletable(false);

  }
};

Blockly.Blocks['personchar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Characteristics");
    this.appendValueInput("Type")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Type");
    this.appendValueInput("Status")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Status");
    this.appendValueInput("Age")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Age");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setMovable(false);

  }
};

Blockly.Blocks['viruschar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Characteristics");
    this.appendValueInput("Type")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Type");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setMovable(false);

  }
};

Blockly.Blocks['persontype'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(" Person type")
        .appendField(new Blockly.FieldDropdown([["Man1","Man1"], ["Man2","Man2"], ["Woman1","Woman1"], ["Woman2","Woman2"]]), "Type");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['virustype'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(" Virus type")
        .appendField(new Blockly.FieldDropdown([["Virus1","Virus1"], ["Virus2","Virus2"], ["Virus3","Virus3"]]), "Type");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};