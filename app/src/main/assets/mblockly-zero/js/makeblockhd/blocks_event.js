MBlockly.BlockKeeper.makeBlock('tablet_shaked', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.event);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.EVENT_TABLET_SHAKE,
            MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.EVENT_SHAKE);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var time = (new Date()).getTime() / 1000;
    var result;
    // 如果当前时间距离上次iPad摇晃的时间小于1秒
    if(time-MBlockly.Control.tabletLastShakeTime < 1){
        result = true;
    }
    else{
        result = false;
    }
    this.result = result;
    return result;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


MBlockly.BlockKeeper.makeBlock('tablet_tilt_lr', ['DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.event);
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.EVENT_TILT_LEFT,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.EVENT_TABLET_TILT_LEFT, 'LEFT'],
        [Blockly.Msg.EVENT_TABLET_TILT_RIGHT, 'RIGHT']
    ], function() {
        var that = this;
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["EVENT_TILT_" + that.value_]);
        }, 50);
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.EVENT_TABLET_TILT)
        .appendField(dropdown, 'DIRECTION')
        .appendField(Blockly.Msg.EVENT_TABLET_TILT_TIP);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(direction){
    var dir = (direction == 'LEFT') ? 1 : -1;
    console.log('tablet: ' + MBlockly.Control.tabletTiltLeftRightStatus);
    var deviceDirection = MBlockly.Control.tabletTiltLeftRightStatus;
    return (deviceDirection == dir);
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('tablet_tilt_fb', ['DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.event);
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.EVENT_TILT_FORWARD,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.EVENT_TABLET_TILT_FORWARD, 'FORWARD'],
        [Blockly.Msg.EVENT_TABLET_TILT_BACKWARD, 'BACKWARD']
    ], function() {
        var that = this;
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["EVENT_TILT_" + that.value_]);
        }, 50);
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.EVENT_TABLET_TILT)
        .appendField(dropdown, 'DIRECTION')
        .appendField(Blockly.Msg.EVENT_TABLET_TILT_TIP);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(direction){
    var dir = (direction == 'FORWARD') ? -1 : 1;
    var deviceDirection = MBlockly.Control.tabletTiltForwardBackwardStatus;
    return (deviceDirection == dir);
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

/* SENSOR */
MBlockly.BlockKeeper.makeBlock('event_linefollower_reads', ['VALUE', 'PORT'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.event);
     var dropdown = new Blockly.FieldDropdown([
         ['■■', 'BLACK_BLACK'],
         ['■□', 'BLACK_WHITE'],
         ['□■', 'WHITE_BLACK'],
         ['□□', 'WHITE_WHITE']
    ]);
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());

    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.EVENT_LINE_FOLLOW,
            MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.EVENT_LINEFOLLOWER)
        .appendField(dropdown, 'VALUE')
        .appendField(Blockly.Msg.EVENT_LINEFOLLOWER_AT)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(checkType, portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause();
    var val = MBlockly.Control.getSensorValue('LINEFOLLOW', port, function(){
        runtime.resume();
    });

    var wrapper = {
        toString: function(){
            if(this.val == MBlockly.Control.LINEFOLLOWER_VALUE[this.checkType]){
                return '1';
            }
            else{
                return '0';  // in javascript 'false' == true!
            }
        }
    };
    wrapper.val = val;
    wrapper.checkType = checkType;
    return wrapper;  // 返回的是 toString() 的值，是字符串类型
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('event_receieve_light', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('LIGHT'));
    this.setColour(MBlockly.BlockKeeper.HUE.event);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.START_RECEIVE_LIGHT,
            MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.EVENT_WHEN_RECEIVE_LIGHT)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause();
    var val = MBlockly.Control.getSensorValue('LIGHTSENSOR', port, function(){
        runtime.resume();
    });
    var wrapper = {
        toString: function(){
            if(this.val >= MBlockly.Settings.LIGHT_THRESHOLD){
                return '1';
            }
            else{
                return '0';  // in javascript 'false' == true!
            }
        }
    };
    wrapper.val = val;
    return wrapper;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('event_obstacle_ahead', ['PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());

    this.setColour(MBlockly.BlockKeeper.HUE.event);
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.START_OBSTACLE_DETECTED,
            MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*'))
        .appendField(Blockly.Msg.EVENT_WHEN_OBSTACLE_AHEAD)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause();
    var val = MBlockly.Control.getSensorValue('ULTRASONIC', port, function(){
        runtime.resume();
    });
    var wrapper = {
        toString: function(){
            if(this.val >= MBlockly.Settings.OBSTACLE_THRESHOLD){
                return '0';  // in javascript 'false' == true!
            }
            else{
                return '1';
            }
        }
    };
    wrapper.val = val;
    return wrapper;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('event_noise_around', ['PORT'], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.EVENT_SOUND,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get('VOLUME'));
    this.setColour(MBlockly.BlockKeeper.HUE.event);
    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.EVENT_WHEN_SOUND_DETECTED)
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var runtime = this;
    runtime.pause();
    // 从默认板载音量传感器中接收值
    var val = MBlockly.Control.getSensorValue('VOLUME', port, function(){
        runtime.resume();
    });
    var wrapper = {
        toString: function(){
            if(this.val >= MBlockly.Settings.NOISE_THRESHOLD){
                return '1';
            }
            else{
                return '0';  // in javascript 'false' == true!
            }
        }
    };
    wrapper.val = val;
    return wrapper;
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);

MBlockly.BlockKeeper.makeBlock('event_switch_changed', ['SWITCH', 'STATE'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.EVENT_SWITCH_ON,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    var dropdown = new Blockly.FieldDropdown([
         [Blockly.Msg.EVENT_SWITCH_ON, '1'],
         [Blockly.Msg.EVENT_SWITCH_OFF, '0']
    ], function() {
        var that = this;
        var imgsrc = (that.value_ == '1') ? 'ON' : 'OFF';
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["EVENT_SWITCH_" + imgsrc]);
        }, 50);
    });
    var options = MBlockly.Data.widgetDropdownList.get('Switchs');
    var switchDropdown = new Blockly.FieldDropdown(options, function() {});

    this.setColour(MBlockly.BlockKeeper.HUE.event);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.EVENT_SWITCH)
        .appendField(switchDropdown, 'SWITCH')
        .appendField(Blockly.Msg.EVENT_SWITCH_IS)
        .appendField(dropdown, 'STATE');

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(widgetId, switchState){
    if(widgetId == '0'){
        widgetId = this.widgetId;
    }
    var value = parseInt(MBlockly.HostInterface.requestWidgetValue(widgetId));
    if(value == parseInt(switchState.data)) {
        return true;
    } else {
        return false;
    }
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);


MBlockly.BlockKeeper.makeBlock('event_button_changed', ['BUTTON', 'STATE'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.EVENT_BUTTON_PRESSED,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    var dropdown = new Blockly.FieldDropdown([
         [Blockly.Msg.EVENT_BUTTON_PRESSED, '1'],
         [Blockly.Msg.EVENT_BUTTON_RELEASED, '0']
    ], function() {
        var that = this;
        var imgsrc = (that.value_ == '1') ? 'PRESSED' : 'RELEASED';
        setTimeout(function() {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
            'xlink:href', iconImages["EVENT_BUTTON_" + imgsrc]);
        }, 50);
    });
    var options = MBlockly.Data.widgetDropdownList.get('Buttons');
    var buttonDropdown = new Blockly.FieldDropdown(options, function() {});

    this.setColour(MBlockly.BlockKeeper.HUE.event);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.EVENT_BUTTON)
        .appendField(buttonDropdown, 'BUTTON')
        .appendField(Blockly.Msg.EVENT_BUTTON_IS)
        .appendField(dropdown, 'STATE');

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(widgetId, state){
    if(widgetId == '0'){
        widgetId = this.widgetId;
    }
    var value = parseInt(MBlockly.HostInterface.requestWidgetValue(widgetId));
    if(value == parseInt(state.data)) {
        return true;
    } else {
        return false;
    }
}, Blockly.JavaScript.ORDER_FUNCTION_CALL);
