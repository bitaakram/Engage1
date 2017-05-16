
Blockly.JavaScript['in_behaviour'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'in_behaviour;\n';
  return code;
};


Blockly.JavaScript['personentity'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'personentity;\n';
  return code;
};

Blockly.JavaScript['virusentity'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = 'virusentity;\n';
  return code;
};

Blockly.JavaScript['personchar'] = function(block) {
  var value_type = Blockly.JavaScript.valueToCode(block, 'Type', Blockly.JavaScript.ORDER_ATOMIC);
  var value_age = Blockly.JavaScript.valueToCode(block, 'Age', Blockly.JavaScript.ORDER_ATOMIC);
  var value_status = Blockly.JavaScript.valueToCode(block, 'Status', Blockly.JavaScript.ORDER_ATOMIC);
  value_type = value_type ? value_type.toString() : '\"\"';
  value_age = value_age ? value_age.toString() : '\"\"';
  value_status = value_status ? value_status.toString() : '\"\"';

  var code = 'SetCharacteristics(' + value_type + ',' + value_age + ',' + value_status + ')\n';
  
  return [code];
};

Blockly.JavaScript['viruschar'] = function(block) {
  var value_type = Blockly.JavaScript.valueToCode(block, 'Type', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'SetVirusCharacteristics(' + value_type + ')\n';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['persontype'] = function(block) {
  var dropdown_name = block.getFieldValue('Type');
  var code = "\"" + dropdown_name + "\"";
  return [code];
};

Blockly.JavaScript['virustype'] = function(block) {
  var dropdown_type = block.getFieldValue('Type');
  var code = "\"" + dropdown_type + "\"";
  return [code, Blockly.JavaScript.ORDER_NONE];
};