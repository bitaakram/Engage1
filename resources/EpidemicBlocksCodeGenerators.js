Blockly.JavaScript['entity'] = function(block) {
  var code = '\n';
  return code;
};

Blockly.JavaScript['color'] = function(block) {
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
Blockly.JavaScript['collision'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['set'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['simulation'] = function(block) {
  var statements_code = Blockly.JavaScript.statementToCode(block, 'NAME');  
  return statements_code;
};
Blockly.JavaScript['insim'] = function(block) {
  var code = '\n';
  return code;
};
Blockly.JavaScript['create'] = function(block) {
  var code = 'CreateLargeEntity()\n';
  return code;
};



Blockly.JavaScript['spawnblock'] = function(block) {
  var dropdown = block.getFieldValue('TypeDropDown');
  
  var code = 'CreateLargeEntity(\"'+ dropdown +'\")\n';
  return code;
};

Blockly.Blocks['spawnblock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Create ")
        .appendField(new Blockly.FieldDropdown([["Person","Person"], ["Virus","Virus"]]), "TypeDropDown");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Blocks['characteristics3'] = {
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
Blockly.JavaScript['status'] = function(block) {
  var dropdown_status = block.getFieldValue('Status');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_status;
  return [code];
};

Blockly.JavaScript['in1'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name;
  return code;
};

Blockly.JavaScript['characteristics3'] = function(block) {
  var value_type = Blockly.JavaScript.valueToCode(block, 'Type', Blockly.JavaScript.ORDER_ATOMIC);
  var value_age = Blockly.JavaScript.valueToCode(block, 'Age', Blockly.JavaScript.ORDER_ATOMIC);
  var value_status = Blockly.JavaScript.valueToCode(block, 'Status', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'SetCharacteristics(\"' + value_type + '\",' + value_age + ',\"' + value_status + '\")';
  
  return [code];
};

Blockly.JavaScript['type'] = function(block) {
  var dropdown_name = block.getFieldValue('Type');
  var code = dropdown_name;
  return [code];
};


Blockly.JavaScript['age'] = function(block) {
  var number_name = block.getFieldValue('age');
  var code = number_name;
  return [code];
};

Blockly.JavaScript['age'] = function(block) {
  var number_name = block.getFieldValue('age');
  var code = number_name;
  return [code];
};

Blockly.JavaScript['behaviors2'] = function(block) {
  var code = "";
  return [code];
};




