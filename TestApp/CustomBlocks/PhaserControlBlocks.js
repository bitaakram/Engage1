Blockly.Blocks['moveball'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move Right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['moveball'] = function(block) {
  var code = 'MoveBallRight()\n';
  return code;
};

Blockly.Blocks['functionheader'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("WhenRun");
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['functionheader'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  return statements_name;
};

Blockly.Blocks['collision'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Collision with Infected");
    this.appendStatementInput("Code")
        .setCheck(null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['collision'] = function(block) {
  var statements_code = Blockly.JavaScript.statementToCode(block, 'Code');  
  return statements_code;
};

Blockly.Blocks['setcolor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("SetColor")
        .appendField(new Blockly.FieldDropdown([["Red","RED"], ["Green","GREEN"],["Blue","BLUE"]]), "ColorPicker");
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.JavaScript['setcolor'] = function(block) {
  var dropdown_colorpicker = block.getFieldValue('ColorPicker');
  // TODO: Assemble JavaScript into code variable.
  var code = 'SetColor(\"'+dropdown_colorpicker+'\")\n';
  return code;
};