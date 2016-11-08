MBlockly.BlockKeeper.makeBlock('detect_airblock_state', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_GET_STATE);

    this.setInputsInline(true);
    this.setOutput(true, 'Text');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var electricity = MBlockly.Airblock.airblockGetElectricity()[1];
	var speed = MBlockly.Airblock.airblockGetSpeed();
	var location = MBlockly.Airblock.airblockGetLocation();

    if (null == speed[0]) {
        speed = [0];
    }
    if(null == location[0]){
        location = [0,0,0];
    }

	var result = electricity + ':' + speed + ':' + location;
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_speed', ['DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    var dropdown = new Blockly.FieldDropdown([
        ["X", 'X'],
        ["Y", 'Y'],
        ["Z", 'Z'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_GYRO)
        .appendField(dropdown, 'DIRECTION')
        .appendField(Blockly.Msg.DETECT_READ_GYRO_VALUE)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(direction){
    var speed = 0;
    var allSpeeds = MBlockly.Airblock.airblockGetSpeed();    
    if (direction == 'X'){
        speed = allSpeeds[0];
    }else if (direction == 'Y'){
        speed = allSpeeds[1];
    }else if (direction == 'Z'){
        speed = allSpeeds[2];
    }
    var result = speed+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_get_slider_value', ['SLIDER'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    var options = MBlockly.Data.widgetDropdownList.get('Sliders');
    var dropdown = new Blockly.FieldDropdown(options, function() {});

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_SLIDER,

            MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_SLIDER)
        .appendField(dropdown, 'SLIDER')
        .appendField(Blockly.Msg.DETECT_SLIDER_TIP);
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(sliderId){
    if(sliderId == '0'){
        sliderId = this.widgetId
    }
    var value = parseInt(MBlockly.HostInterface.requestWidgetValue(sliderId));
    return value;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_ultrasonic_distance', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_ULTRASONIC_DISTANCE)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var distance = MBlockly.Airblock.airblockGetUltrasonicDistance();
    var result = distance+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_electricity', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_BATTERY)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var electricity = MBlockly.Airblock.airblockGetElectricity()[0];
    var result = electricity+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_batterypercent', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_BATTERY_PERCENT)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var electricity = MBlockly.Airblock.airblockGetElectricity()[1];
    var result = electricity+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_airpressure', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_AIRPRESSURE)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var airpressure = MBlockly.Airblock.airblockGetAirPressure()[0];
    var result = airpressure+'';
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_temperature', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_TEMPERATURE)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var temperature = MBlockly.Airblock.airblockGetAirPressure()[1];
    var result = temperature+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_relative_altitude', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_RELATIVE_ALTITUDE)

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var relativeAltitude = MBlockly.Airblock.airblockGetAirPressure()[2];
    var result = relativeAltitude+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


MBlockly.BlockKeeper.makeBlock('detect_airblock_altitude', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_ALTITUDE);

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var location = MBlockly.Airblock.airblockGetLocation();
    var height = 0;
    if(null != location[0]){
        height = location[0];
    }

    var result = height+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


MBlockly.BlockKeeper.makeBlock('detect_airblock_motor_number', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DETECT_READ_MOTOR_NUMBER);

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var motorNumber = MBlockly.Airblock.airblockGetMotorNumber();
    var result = motorNumber+'';
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_airblock_get_attitude', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField('获取姿态');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var attitude = MBlockly.Airblock.airblockGetAttitude();
    var result = attitude[0]+' '+attitude[1]+' '+attitude[2];
    this.wait(0.05);
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);
