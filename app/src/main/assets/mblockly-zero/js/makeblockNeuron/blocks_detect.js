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

MBlockly.BlockKeeper.makeBlock('detect_infrared_receiver', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect infrared receiver");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("INFRARED_RECEIVER ", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_temperature', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect temperature");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("TEMPERATURE", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_temperature_humidity', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect temperature and humidity");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("TEMPERATURE_HUMIDITY", index)[1];
    console.log(val);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_volume', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect volume sensor");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("VOLUME_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_1_key_button_state', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect 1 key button state");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("1_KEY_BUTTON", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


/* ACCELEROMETER_GYRO */
MBlockly.BlockKeeper.makeBlock('detect_accelerometer_gyro', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect accelerometer gyro");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("ACCELEROMETER_GYRO", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_lightness', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect lightness");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("LIGHT_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_limit_switch', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect limit switch");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("LIMIT_SWITCH", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

/* PIR_MOTION_SENSOR */
MBlockly.BlockKeeper.makeBlock('detect_pir_motion_sensor', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect pir motion sensor");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("PIR_MOTION_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_ultrasonic', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField("detect_ultrasonic");

    this.appendValueInput("INDEX")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("ULTRASONIC_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_potentiometer', ["=INDEX"], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect potentiometer index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("POTENTIOMETER", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_pressure', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect pressure index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("FORCE_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_grayscale', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect grayscale index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("GRAYSCALE_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_stepper_motor_pos', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect stepper motor pos index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("STEPPER_MOTOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_switch', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect switch state index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("SWITCH", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_touch_sensor', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("detect touch sensor index of");

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(index){
    index = parseInt(index);
    var val = MBlockly.Neurons.engine.getBlockStatus("TOUCH_SENSOR", index)[0];
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);



/* -----------------------------
    smart servo related.
 -----------------------------*/
// 速度
MBlockly.BlockKeeper.makeBlock('detect_smartServo_speed', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo speed');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoStatus(id, 'SPEED');
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 位置
MBlockly.BlockKeeper.makeBlock('detect_smartServo_pos', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo position');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoStatus(id, 'POS');
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 电压
MBlockly.BlockKeeper.makeBlock('detect_smartServo_voltage', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo voltage');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoStatus(id, 'VOLTAGE');
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 电流
MBlockly.BlockKeeper.makeBlock('detect_smartServo_current', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo current');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoStatus(id, 'CURRENT');
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 温度
MBlockly.BlockKeeper.makeBlock('detect_smartServo_temperature', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo temperature');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoStatus(id, 'TEMPERATURE');
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


// 磁编码舵机-读取角度
MBlockly.BlockKeeper.makeBlock('detect_smartServo_angle', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField('detect smart servo2 angle');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var val = MBlockly.Servo.readServoAngle(id);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);