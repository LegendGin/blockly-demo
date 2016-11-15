Blockly.Blocks['move_forward'] = {
  init: function() {
    this.appendValueInput("step")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["north", "north"], ["south", "south"], ["west", "west"], ["east", "east"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.baidu.com/');
  }
};

Blockly.JavaScript['move_forward'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var value_step = Blockly.JavaScript.valueToCode(block, 'step', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'alert(\'direction is ' + dropdown_direction + ', step is ' + value_step + '\');';
  console.log(code);
  return code;
};