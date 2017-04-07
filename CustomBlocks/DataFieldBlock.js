Blockly.Blocks['datafield'] = {
  init: function() {
    this.appendValueInput("Col")
        .setCheck("String")
        .appendField("PrintColumn");
    this.setColour(65);
    this.setTooltip('Takes a Column Argument');
    this.setHelpUrl('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.JavaScript['datafield'] = function(block) {
  var value_column = Blockly.JavaScript.valueToCode(block, 'Col', Blockly.JavaScript.ORDER_ATOMIC);
 
  var code = 'PrintColumn(' + value_column +  ')\n';
  return code;
};

Blockly.Blocks['changeheading'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ChangeHeading");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('Takes a Column Argument');
    this.setHelpUrl('test');
  }
};

Blockly.JavaScript['changeheading'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'changeheading()\n';
  return code;
};