MBlockly.BlockKeeper.makeBlock('move_run', ['=SPEED', 'DIRECTION'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_FORWARD,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_FORWARD, 'FORWARD'],
        [Blockly.Msg.MOVE_BACKWARD, 'BACKWARD']
    ], function() {
        var that = this;
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["MOVE_" + that.value_]);
        }, 50);
    });

    this.appendValueInput('SPEED')
        .appendField(icon)
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_RUN)
        .appendField(dropdown, 'DIRECTION')
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(speed, direction){
    var dir = (direction == 'FORWARD') ? 1 : -1;
    var speed = parseInt(speed);
    speed ? speed : (speed = 0);
    if(speed > 255) {
        speed = 255;
    }
    MBlockly.Action.runSpeed(speed, dir);
});

MBlockly.BlockKeeper.makeBlock('move_turn', ['=SPEED', 'DIRECTION'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_TURN_LEFT,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.MOVE_TURN_LEFT, 'LEFT'],
            [Blockly.Msg.MOVE_TURN_RIGHT, 'RIGHT']
        ], function() {
            var that = this;
            setTimeout(function() {
                icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
                'xlink:href', iconImages["MOVE_TURN_" + that.value_]);
            }, 50);
        });

        this.appendValueInput('SPEED')
            .setCheck('Number')
            .appendField(icon)
            .appendField(Blockly.Msg.MOVE_TURN)
            .appendField(dropdown, 'DIRECTION')
            .appendField(Blockly.Msg.MOVE_SPEED_TIP);
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setPreviousStatement(true);

}, function(speed, direction){
    var dir = (direction == 'LEFT') ? 1 : -1;
    speed ? speed : (speed = 0);
    if(speed > 255) {
        speed = 255;
    }
    MBlockly.Action.turnSpeed(speed, dir);
});

MBlockly.BlockKeeper.makeBlock('move_turn_degrees', ['=DEGREE', 'DIRECTION', '=SPEED'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_TURN_LEFT,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
            [Blockly.Msg.MOVE_TURN_LEFT, 'LEFT'],
            [Blockly.Msg.MOVE_TURN_RIGHT, 'RIGHT']
        ], function() {
            var that = this;
            setTimeout(function() {
                icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
                'xlink:href', iconImages["MOVE_TURN_" + that.value_]);
            }, 50);
        });

        this.appendValueInput('DEGREE')
            .setCheck('Number')
            .appendField(icon)
            .appendField(Blockly.Msg.MOVE_TURN_ANGLE)
            .appendField(dropdown, 'DIRECTION')
            .appendField(Blockly.Msg.MOVE_TURN_ANGLE_AT_DEGREE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MOVE_ROTATE_AT_SPEED);
        this.appendValueInput('SPEED')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setPreviousStatement(true);

}, function(degree, direction, speed){
    var dir = (direction == 'LEFT') ? 1 : -1;
    MBlockly.Action.turnDegree(degree, dir, speed);
});

MBlockly.BlockKeeper.makeBlock('move_rotate', ['ROTATE_WAY', '=SPEED', '=TIME'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_ROTATE_CLOCKWISE,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    var rotateWay = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_CLOCKWISE, 'CLOCKWISE'],
        [Blockly.Msg.MOVE_ANTICLOCKWISE, 'ANTICLOCKWISE']
    ], function() {
        var that = this;
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["MOVE_ROTATE_" + that.value_]);
        }, 50);
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(rotateWay, 'ROTATE_WAY')
        .appendField(Blockly.Msg.MOVE_ROTATE_AT_SPEED);
    this.appendValueInput('SPEED')
        .setCheck('Number');
    this.appendDummyInput()
            .appendField(Blockly.Msg.MOVE_ROTATE_FOR);
    this.appendValueInput('TIME')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_ROTATE_SECOND);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(rotateWay, speed, time){
    var runtime = this;
    runtime.pause();
    if(rotateWay == 'CLOCKWISE') {
        MBlockly.Action.clockwiseRotate(speed, time);
    } else {
        MBlockly.Action.antiClockwiseRotate(speed, time);
    }
    setTimeout((function(){return function(){
        runtime.resume();
    }})(speed, time, runtime), time*1000);

});

/**
 * rotate for x times
 */
MBlockly.BlockKeeper.makeBlock('move_rotate_times', ['ROTATE_WAY', '=SPEED', '=TIMES'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_ROTATE_CLOCKWISE,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    var rotateWay = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_CLOCKWISE, 'CLOCKWISE'],
        [Blockly.Msg.MOVE_ANTICLOCKWISE, 'ANTICLOCKWISE']
    ], function() {
        var that = this;
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["MOVE_ROTATE_" + that.value_]);
        }, 50);
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(rotateWay, 'ROTATE_WAY')
        .appendField(Blockly.Msg.MOVE_ROTATE_AT_SPEED);
    this.appendValueInput('SPEED')
        .setCheck('Number');
    this.appendDummyInput()
            .appendField(Blockly.Msg.MOVE_ROTATE_FOR);
    this.appendValueInput('TIMES')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_ROTATE_TIMES);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(rotateWay, speed, times){
    if(rotateWay == 'CLOCKWISE') {
        MBlockly.Action.clockwiseRotateTimes(speed, times);
    } else {
        MBlockly.Action.antiClockwiseRotateTimes(speed, times);
    }

});


MBlockly.BlockKeeper.makeBlock('move_stop', [], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_STOP,
        MBlockly.Settings.BLOCK_ICON_WIDTH + 2, MBlockly.Settings.BLOCK_ICON_HEIGHT + 2, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_STOP_MOVING);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}, function(){
    MBlockly.Control.stopSpeed();
});


MBlockly.BlockKeeper.makeBlock('move_set_motor', ['PORT', '=SPEED'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('MOTOR'));

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_MOTOR)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.MOVE_MOTOR_SPEED);
    this.appendValueInput('SPEED')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, speed){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    speed ? speed : (speed = 0);
    if(speed > 255) {
        speed = 255;
    }
    MBlockly.Control.setMotor(port, speed);
});

MBlockly.BlockKeeper.makeBlock('move_set_dc_motor', ['PORT', '=SPEED'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("MOTOR"));
    if(MBlockly.Control.deviceInfo.type == 'megaPi') {
        port = new Blockly.FieldDropdown([
                [Blockly.Msg.PORT + "1A", MBlockly.Settings.PORT_PREFIX + "1"],
                [Blockly.Msg.PORT + "1B", MBlockly.Settings.PORT_PREFIX + "9"],
                [Blockly.Msg.PORT + "2A", MBlockly.Settings.PORT_PREFIX + "2"],
                [Blockly.Msg.PORT + "2B", MBlockly.Settings.PORT_PREFIX + "10"],
                [Blockly.Msg.PORT + "3A", MBlockly.Settings.PORT_PREFIX + "3"],
                [Blockly.Msg.PORT + "3B", MBlockly.Settings.PORT_PREFIX + "11"],
                [Blockly.Msg.PORT + "4A", MBlockly.Settings.PORT_PREFIX + "4"],
                [Blockly.Msg.PORT + "4B", MBlockly.Settings.PORT_PREFIX + "12"]
            ]);
    }

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_DC_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_DC_MOTOR_BEGIN)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.MOVE_MOTOR_SPEED);
    this.appendValueInput('SPEED')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, speed){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    speed ? speed : (speed = 0);
    if(speed > 255) {
        speed = 255;
    }

    if(MBlockly.Control.deviceInfo.type == 'mcore' && port == 9) {
        speed = -1 * speed;
    }

    MBlockly.Control.setDcMotor(port, speed);
});


/**
 * encoder motor: 不带距离.
 * 板载port为0，用slot的位置来表示port口，auriga 和 megaPi 是同样的类型
 */
MBlockly.BlockKeeper.makeBlock('move_set_encoder_motor', ['SLOT', "=SPEED"], function(){
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.get("ENCODER_MOTOR"));
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_ENCODER_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_ENCODER_MOTOR_BEGIN)
        .appendField(slot, 'SLOT')
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(slotStr, speed){
    var slot = parseInt(slotStr.data.split('PORT-')[1]);
    speed = parseInt(speed);
    if(speed > 255) {
        speed = 255;
    }
    MBlockly.Control.setEncoderMotor(slot, speed);
});

/* common encoder motor: 带距离 */
MBlockly.BlockKeeper.makeBlock('move_set_common_encoder_motor', ['PORT', 'SLOT', "=SPEED", "=DISTANCE"], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("COMMON_ENCODER_MOTOR"));
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_ENCODER_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_ENCODER_MOTOR_BEGIN)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);
    this.appendValueInput('DISTANCE')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISTANCE);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, slotStr, speed, distance){
    // var port = parseInt(portStr.data.split('PORT-')[1]);
    port = 8; // TO WARN: port值为0x08，是系统默认值，该处实际为I²C的值
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    speed = parseInt(speed);
    distance = parseInt(distance);
    if(speed > 255) {
        speed = 255;
    }
    MBlockly.Control.setCommonEncoderMotor(port, slot, speed, distance);
});

/* servo motor */
MBlockly.BlockKeeper.makeBlock('move_set_servo_motor', ['PORT', 'SLOT', "=DEGREE"], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_SERVO_MOTOR_BEGIN)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT')
        .appendField(Blockly.Msg.DEGREE);
    this.appendValueInput('DEGREE')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, slotStr, degree){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    degree = parseInt(degree);
    MBlockly.Control.setServoMotor(port, slot, degree);
});

/* stepper motor */
MBlockly.BlockKeeper.makeBlock('move_set_stepper_motor', ['PORT', '=SPEED', "=DISTANCE"], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("MOTOR"));
    if(MBlockly.Control.deviceInfo.type == "megaPi") {
        port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("STEPPER_MOTOR"));
    }

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.MOVE_STEPPER_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.MOVE_STEPPER_MOTOR_BEGIN)
        .appendField(port, 'PORT');
    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);
    this.appendValueInput('DISTANCE')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISTANCE);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, speed, distance){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    speed ? speed : (speed = 0);
    distance ? distance : (distance = 0);
    MBlockly.Control.setStepperMotor(port, speed, distance);
});


/* 智能舵机 */

// 设置智能舵机解锁/锁定
MBlockly.BlockKeeper.makeBlock('smartServo_set_break', ['=ID', 'MODE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    var options = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_SMART_SERVO_RELEASE, 'RELEASE'],
        [Blockly.Msg.MOVE_SMART_SERVO_LOCK, 'LOCK']
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_BEGIN);

    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField(options, 'MODE')

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, mode){
    var type;
    if(mode == 'LOCK') {
        type = 0x00;
    } else {
        type = 0x01;
    }
    MBlockly.Control.setServoBreak(id, type);
});

// 设置智能舵机直流模式转动
MBlockly.BlockKeeper.makeBlock('smartServo_set_as_dc_motor', ['=ID', 'DIRECTION','=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_CLOCKWISE, '1'],
        [Blockly.Msg.MOVE_ANTICLOCKWISE, '-1']
    ]);

    this.appendValueInput('ID')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_BEGIN);

    this.appendDummyInput()
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_TIP)
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, direction, speed){
    direction = parseInt(direction);
    speed = direction * parseInt(speed);
    MBlockly.Control.setServoAsDcMotor(id, speed);
});

MBlockly.BlockKeeper.makeBlock('smartServo_set_angle', ['=ID', 'TYPE', '=ANGLE', '=SPEED'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_SMART_SERVO_ABSOLUTE, 'ABSOLUTE'],
        [Blockly.Msg.MOVE_SMART_SERVO_RELATIVE, 'RELATIVE']
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_BEGIN);
    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField(dropdown, 'TYPE');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_ANGLE);

    this.appendValueInput('SPEED')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_SPEED_TIP);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, type, angle, speed){
    // var abAngle = Math.abs(parseInt(angle));
    // if(abAngle <= 360) {
    //     MBlockly.Servo.setServoAbsoluteShortAngle(id, angle, speed);
    // } else {
    //     MBlockly.Servo.setServoAbsoluteLongAngle(id, angle, speed);
    // }
    if(type == "ABSOLUTE") {
        MBlockly.Control.setServoAbsoluteAngle(id, angle, speed);
    } else {
        MBlockly.Control.setServoRelativeAngle(id, angle, speed);
    }

});

// 设置智能舵机当前位置为零点
MBlockly.BlockKeeper.makeBlock('smartServo_init_angle', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_BEGIN)
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_CURRENT_POSITION_AS_START);
    this.appendValueInput('ID')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id){
    MBlockly.Control.initServoCurrentPosAsBeginPos(id);
});

// 设置智能舵机回到初始位置
MBlockly.BlockKeeper.makeBlock('smartServo_reset', ['=ID'], function(){

    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_RESET_ANGLE);

    this.appendValueInput('ID')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id){
    id = parseInt(id);
    if(id == 0) {
        id = 255; // 广播
    }
    MBlockly.Control.resetServoPosToBeginPos(id);
});