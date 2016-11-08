MBlockly.BlockKeeper.makeBlock('move_set_dc_motor', ['=INDEX', '=SPEED1', '=SPEED2'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_MOTOR,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon);

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('set dc motor');

    this.appendValueInput('SPEED1')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_MOTOR_SPEED);
    this.appendValueInput('SPEED2')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(index, speed1, speed2){
    index = parseInt(index);
    speed1 = parseInt(speed1) || 0;
    speed2 = parseInt(speed2) || 0;
    MBlockly.Neurons.engine.setBlockStatus('DC_MOTOR', [speed1, speed2], index);
});

/* servo motor */
MBlockly.BlockKeeper.makeBlock('move_set_servo_9g', ["=INDEX", "=DEGREE"], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_SERVO_MOTOR,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set servo');
    this.appendValueInput('INDEX')
        .setCheck('Number');
    this.appendValueInput('DEGREE')
        .setCheck('Number')
        .appendField('degree');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(index, degree){
    degree = parseInt(degree);
    MBlockly.Neurons.engine.setBlockStatus('SERVO_9G',[degree], index);
});

/* stepper motor */
MBlockly.BlockKeeper.makeBlock('move_set_stepper_motor', ['=INDEX', '=SPEED', "=POSITION"], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_STEPPER_MOTOR,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set stepper motor');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.appendValueInput('POSITION')
        .setCheck('Number')
        .appendField('to position');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(index, speed, position){
    index = parseInt(index);
    speed = parseInt(speed);
    position = parseInt(position);
    MBlockly.Neurons.engine.sendBlockCommand('STEPPER_MOTOR', 'SET_POS',[speed, position], index);
});


/* test */
MBlockly.BlockKeeper.makeBlock('test_block', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('show test log "hello"');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(){
    console.log("hello-" + this.topBlockId);
});

/* -----------------------------
    old T3 smart servo related.
 -----------------------------*/
MBlockly.BlockKeeper.makeBlock('smartServo_set_absolute_pos', ['=ID', '=ANGLE', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('set smartServo');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('to absolute angle');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, angle, speed){
    console.log(id + ':' + angle + ':' + speed);
    MBlockly.Servo.setServoAbsolutePos(id, angle, speed);
});

MBlockly.BlockKeeper.makeBlock('smartServo_set_relative_pos', ['=ID', '=ANGLE', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('set smartServo');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('to relative angle');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, angle, speed){
    console.log(id + ':' + angle + ':' + speed);
    MBlockly.Servo.setServoRelativePos(id, angle, speed);
});

// 解锁，锁定
MBlockly.BlockKeeper.makeBlock('smartServo_set_break', ['=ID', 'MODE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    var options = new Blockly.FieldDropdown([['release','RELEASE'],['lock','LOCK']]);

    this.appendDummyInput()
        .appendField('set smart servo');

    this.appendValueInput('ID')
        .setCheck('Number')
        .appendField(options, 'MODE')
        .appendField('at');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, mode){
    var type;
    if(mode == 'LOCK') {
        type = 0x0;
    } else {
        type = 0x1;
    }
    MBlockly.Servo.setServoBreak(id, type);
});


/* 磁编码相关 */
MBlockly.BlockKeeper.makeBlock('smartServo_init_angle', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField('set smart servo current position as start');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id){
    MBlockly.Servo.initServoAngle(id);
});

MBlockly.BlockKeeper.makeBlock('smartServo_set_absolute_angle', ['=ID', '=ANGLE', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('set smart servo');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('to absolute angle');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, angle, speed){
    var abAngle = Math.abs(parseInt(angle));
    if(abAngle <= 360) {
        MBlockly.Servo.setServoAbsoluteShortAngle(id, angle, speed);
    } else {
        MBlockly.Servo.setServoAbsoluteLongAngle(id, angle, speed);
    }
});

MBlockly.BlockKeeper.makeBlock('smartServo_set_relative_angle', ['=ID', '=ANGLE', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('set smart servo');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('to relative angle');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, angle, speed){
    var abAngle = Math.abs(parseInt(angle));
    if(abAngle <= 360) {
        MBlockly.Servo.setServoRelativeShortAngle(id, angle, speed);
    } else {
        MBlockly.Servo.setServoRelativeLongAngle(id, angle, speed);
    }
});

MBlockly.BlockKeeper.makeBlock('smartServo_set_as_dc_motor', ['=ID', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('set smart servo as dc motor');
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('with speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, speed){
    MBlockly.Servo.setServoPwm(id, speed);
});

MBlockly.BlockKeeper.makeBlock('smartServo_recording', ['RECORD_DATA'], function(){
    var smartServoRecording = new MBlockly.ServoRecord('servo record');

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('smart servo recording')
        .appendField(smartServoRecording);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(recordData){

});

MBlockly.BlockKeeper.makeBlock('smartServo_reset', ['=ID', 'RESET_TYPE','=SPEED'], function(){
    var dropdown = new Blockly.FieldDropdown([
        ["relative", "0"],
        ["absolute", "1"],
        ], function() {});

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField('reset servo');

    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField('with type')
        .appendField(dropdown, 'RESET_TYPE');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField('at speed');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, resetType, speed){
    id = parseInt(id);
    resetType = parseInt(resetType);
    speed = parseInt(speed);
    if(id == 0) {
        id = 255; // 广播
    }
    MBlockly.Servo.resetServosPosition(resetType, speed, id);
});