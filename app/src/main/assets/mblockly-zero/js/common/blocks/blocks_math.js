/* -----------------------------------------------
 *  blocks/math.js overide
 * -----------------------------------------------
 */
goog.require('Blockly.JavaScript.math');
goog.require('Blockly.Blocks.math');



// math number list
Blockly.Blocks['math_number_list'] = {
  init: function() {
    var numList = new Blockly.FieldDropdown([
        [Blockly.Msg.DISPLAY_LED_ALL, '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12']
    ]);
    this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendDummyInput()
        .appendField(numList, 'NUMBER_LIST');
    this.setOutput(true, 'Number');
  }
};

Blockly.JavaScript['math_number_list'] = function(block) {
  var code = parseFloat(block.getFieldValue('NUMBER_LIST'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};