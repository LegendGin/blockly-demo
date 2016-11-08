MBlockly.BlockKeeper.makeBlock('start_whengo', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput().appendField(Blockly.Msg.START_WHEN_GO)
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){ });


Blockly.Blocks['start_whenif'] = {
  init: function(){
    this.jsonInit({
      "message0": Blockly.Msg.START_WHEN_IF,
      "args0": [
        {
          "type": "input_value",
          "name": "WHEN",
          "check": "Boolean"
        }
      ],
      "previousStatement": null,
      "nextStatement": true,
      "colour": MBlockly.BlockKeeper.HUE.start,
      "tooltip": '',
      "helpUrl": ''
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(false);
  }
};

Blockly.JavaScript['start_whenif'] = function(block){
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    var argument = Blockly.JavaScript.valueToCode(block, 'WHEN',
      Blockly.JavaScript.ORDER_NONE) || 'false';
    var code = "if ("+argument+") {\n"+branch+"\n}\n";
    return code;
};


/* add new */
MBlockly.BlockKeeper.makeBlock('when_slider_changed', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_SLIDER_CHANGED);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){ });

/** button pressed */
MBlockly.BlockKeeper.makeBlock('when_button_pressed_up', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_BUTTON_PRESSED_UP);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_button_pressed_down', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_BUTTON_PRESSED_DOWN);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

/** switch */
MBlockly.BlockKeeper.makeBlock('when_switch_on', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_SWITCH_ON);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_switch_off', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_SWITCH_OFF);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

/* dpad */
MBlockly.BlockKeeper.makeBlock('when_dpad_left_down', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_LEFT_DOWN);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_left_up', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_LEFT_UP);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_top_down', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_TOP_DOWN);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_top_up', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_TOP_UP);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_right_down', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_RIGHT_DOWN);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_right_up', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_RIGHT_UP);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_bottom_down', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_BOTTOM_DOWN);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});

MBlockly.BlockKeeper.makeBlock('when_dpad_bottom_up', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_DPAD_BOTTOM_UP);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){});



MBlockly.BlockKeeper.makeBlock('when_start', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.start);
    this.appendDummyInput()
        .appendField(Blockly.Msg.BEGIN_WHEN_START);
    this.setInputsInline(true);
    this.setNextStatement(true);
}, function(){ });
