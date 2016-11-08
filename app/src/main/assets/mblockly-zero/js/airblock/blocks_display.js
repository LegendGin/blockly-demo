MBlockly.BlockKeeper.makeBlock('display_airblock_led_color', ['POSITION','=RED','=GREEN','=BLUE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var dropdown = new Blockly.FieldDropdown([
        ["1", '1'],
        ["2", '2'],
        ["3", '3'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_AIRBLOCK_LED_COLOR)
        .appendField(dropdown, 'POSITION');        

    this.appendValueInput('RED')
        .setCheck('Number')
        .appendField("R");

    this.appendValueInput('GREEN')
        .setCheck('Number')
        .appendField("G");

    this.appendValueInput('BLUE')
        .setCheck('Number')
        .appendField("B");

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(position,red,green,blue){

    var positionValue = 0;
    if (position == '1'){
        positionValue = 0;
    }else if (position == '2'){
        positionValue = 1;
    }else if (position == '3'){
        positionValue = 2;
    }

    MBlockly.Airblock.airblockSetLed({
        no: positionValue,
        red: red,  
        green: green,
        blue: blue
    });
});
