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
    this.result = value;
    return value;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


/** new */
MBlockly.BlockKeeper.makeBlock('detect_lightness', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('LIGHT'));

    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_BRIGHTNESS,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_LIGHTNESS)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause();
    var val = MBlockly.Control.getSensorValue('LIGHTSENSOR', port, function(result){
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


MBlockly.BlockKeeper.makeBlock('detect_ultrasonic', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('ULTRASONIC'));

    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_ULTRASONIC,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_DISTANCE)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('ULTRASONIC', port, function(){
        mylog(val);
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_volume', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('VOLUME'));
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.EVENT_SOUND,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_VOLUME)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('VOLUME', port, function(){
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// auriga temperature
MBlockly.BlockKeeper.makeBlock('detect_temperature', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('TEMPERATURE'));
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_TEMPERATURE,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_TEMPERATURE)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('TEMPERATURE', port, function(){
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// common temperature and humidity
MBlockly.BlockKeeper.makeBlock('detect_temperature_humidity', ['PORT', 'TYPE'], function(){
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.DETECT_TEMPERATURE_NAME, '01'],
        [Blockly.Msg.DETECT_HUMIDITY_NAME, '00']
    ]);
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_TEMPERATURE,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_TEMPERATURE_HUMIDITY)
        .appendField(dropdown, 'TYPE')
        .appendField(Blockly.Msg.AT)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr, type){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    type = parseInt(type);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('TEMPERATURE_HUMIDITY', port, function(result){
        // 恢复程序执行
        runtime.resume();
    }, type);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// common temperature
MBlockly.BlockKeeper.makeBlock('detect_common_temperature', ['PORT', 'SLOT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_TEMPERATURE,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_TEMPERATURE)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr, slotStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('COMMON_TEMPERATURE', port,function(){
        // 恢复程序执行
        runtime.resume();
    }, slot);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('detect_enCoderMotorValue', ['TYPE', 'SLOT'], function(){
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.get("ENCODER_MOTOR"));
    var motorValueType = new Blockly.FieldDropdown([
        [Blockly.Msg.DETECT_ENCODER_MOTOR_POSITION, "POSITION"],
        [Blockly.Msg.DETECT_ENCODER_MOTOR_SPEED, "SPEED"]
    ]);

    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_ENCODER_MOTOR,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_ENCODER_MOTOR)
        .appendField(motorValueType, 'TYPE')
        .appendField(slot, 'SLOT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(type, slotStr){
    var slot = parseInt(slotStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('ENCODER_MOTER', slot, function(){
        // 恢复程序执行
        runtime.resume();
    }, type);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


// 陀螺仪
MBlockly.BlockKeeper.makeBlock('detect_gyro', ['AXIS', 'PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("COMMON_LIST"));
    var axis = new Blockly.FieldDropdown([['x', "01"],['y', "02"],['z', "03"]]);
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_GYRO,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_GYRO)
        .appendField(axis, 'AXIS')
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(axis, portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    axis = parseInt(axis);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('GYROSCOPE', port, function(){
        // 恢复程序执行
        runtime.resume();
    }, axis);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// auriga 陀螺仪
MBlockly.BlockKeeper.makeBlock('detect_auriga_gyro', ['AXIS'], function(){
    var axis = new Blockly.FieldDropdown([['x', "01"],['y', "02"],['z', "03"]]);
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_GYRO,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_GYRO)
        .appendField(axis, 'AXIS');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(axis){
    var port = 6; // port可以是任意值，陀螺仪用的I²C地址，跟port口没关系
    axis = parseInt(axis);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('GYROSCOPE', port, function(){
        // 恢复程序执行
        runtime.resume();
    }, axis);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


// 电位器
MBlockly.BlockKeeper.makeBlock('detect_potentiometer', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("POTENTIOMETER"));
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_POTENTIOMETER,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_POTENTIOMETER)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('POTENTIOMETER', port, function(){
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 限位开关
MBlockly.BlockKeeper.makeBlock('detect_limitSwitch', ['PORT', 'SLOT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_LIMIT_SWITCH,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_LIMIT_SWITCH)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr, slotStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('LIMIT_SWITCH', port, function(){
        // 恢复程序执行
        runtime.resume();
    }, slot);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 人体红外传感器
MBlockly.BlockKeeper.makeBlock('detect_pir', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_PIR_MOTION,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_PIR_MOTION)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('PIR_MOTION', port, function(){
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 摇杆
MBlockly.BlockKeeper.makeBlock('detect_joystick', ['PORT', 'AXIS'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get("JOYSTICK"));
    var axis = new Blockly.FieldDropdown([["x", "01"],["y", "02"]]);
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DETECT_JOYSTICK,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_JOYSTICK)
        .appendField(axis, 'AXIS')
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr, axis){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var axis = parseInt(axis);

    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('JOYSTICK', port, function(){
        // 恢复程序执行
        runtime.resume();
    }, axis);
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

// 巡线
MBlockly.BlockKeeper.makeBlock('detect_linefollow', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var axis = new Blockly.FieldDropdown([["x", "01"],["y", "02"]]);
    this.setColour(MBlockly.BlockKeeper.HUE.detect);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.EVENT_LINE_FOLLOW,
         MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_LINE_FOLLOW)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr, axis){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var axis = parseInt(axis);

    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('LINEFOLLOW', port, function(){
        // 恢复程序执行
        runtime.resume();
    });
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
        .appendField('read smart servo speed');

    this.appendValueInput("ID")
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    // var val = MBlockly.Servo.readServoStatus(id, 'SPEED');
    // return val;
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
    // var val = MBlockly.Servo.readServoStatus(id, 'VOLTAGE');
    // return val;
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
    // var val = MBlockly.Servo.readServoStatus(id, 'CURRENT');
    // return val;
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
    // var val = MBlockly.Servo.readServoStatus(id, 'TEMPERATURE');
    // return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


// 磁编码舵机-读取角度
MBlockly.BlockKeeper.makeBlock('detect_smartServo_angle', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.detect);

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.MOVE_SERVO_MOTOR,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.DETECT_SMART_SERVO_ANGLE);

    this.appendValueInput("ID")
        .setCheck('Number');

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(id){
    id = parseInt(id);
    var runtime = this;
    runtime.pause(); // 暂停程序执行
    var val = MBlockly.Control.getSensorValue('SMART_SERVO_ANGLE', id, function(){
        // 恢复程序执行
        runtime.resume();
    });
    return val;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);