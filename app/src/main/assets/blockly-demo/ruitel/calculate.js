Blockly.Blocks['calculate'] = {
  init: function() {
    this.appendValueInput("param1")
        .setCheck("Number");
    this.appendValueInput("param2")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["+", "add"], ["-", "minus"], ["x", "multiply"], ["/", "divide"]]), "operator");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(120);
    this.setTooltip('calculate');
    this.setHelpUrl('http://www.sina.com/');
  }
};

Blockly.JavaScript['calculate'] = function(block) {
  var param1 = parseInt(Blockly.JavaScript.valueToCode(block, 'param1', Blockly.JavaScript.ORDER_ATOMIC));
  var dropdown_operator = block.getFieldValue('operator');
  var param2 = parseInt(Blockly.JavaScript.valueToCode(block, 'param2', Blockly.JavaScript.ORDER_ATOMIC));
  var code;
  switch(dropdown_operator) {
	  case 'add':
		  code = param1 + param2;
		  break;
	  case 'minus':
		  code = param1 - param2;
		  break;
	  case 'multiply':
		  code = param1 * param2;
		  break;
	  case 'divide':
		  code = param1 / param2;
		  break;
	  default:
		  code = param1 * param2;
		  break;
  }
  
  console.log(code);
  return [code, Blockly.JavaScript.ORDER_NONE];
};