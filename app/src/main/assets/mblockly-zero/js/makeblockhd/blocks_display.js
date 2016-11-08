MBlockly.BlockKeeper.makeBlock('set_mbot_led_color', ['LED_POSITION', '=COLOUR_MCORE'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);
    var ledPositionList = new Blockly.FieldDropdown([
        [Blockly.Msg.DISPLAY_LED_ALL, MBlockly.Control.LedPosition.BOTH],
        [Blockly.Msg.DISPLAY_LED_LEFT, MBlockly.Control.LedPosition.LEFT],
        [Blockly.Msg.DISPLAY_LED_RIGHT, MBlockly.Control.LedPosition.RIGHT]
    ], function() {
        var selected = event.target.textContent;
        if (selected == Blockly.Msg.DISPLAY_LED_LEFT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_LEFT);
        } else if (selected == Blockly.Msg.DISPLAY_LED_RIGHT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_RIGHT);
        } else {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_ALL);
        }
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_SET_LED_ON_BOARD)
        .appendField(ledPositionList, 'LED_POSITION')
        .appendField(Blockly.Msg.DISPLAY_LED_TO_COLOR);

    this.appendValueInput('COLOUR_MCORE')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, color){
    ledPosition = parseInt(ledPosition);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    MBlockly.Control.setMbotLed(colors[0], colors[1], colors[2],ledPosition);
});

MBlockly.BlockKeeper.makeBlock('set_mbot_led_color_full', ['=LEFT_COLOUR_MCORE', '=RIGHT_COLOUR_MCORE'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_SET_LED_ON_BOARD)
        .appendField(Blockly.Msg.DISPLAY_LED_LEFT);

    this.appendValueInput('LEFT_COLOUR_MCORE')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_LED_RIGHT);

    this.appendValueInput('RIGHT_COLOUR_MCORE')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(leftColor, rightColor){
    var leftColorValue = leftColor.data;
    if(leftColorValue.match(/^['"].*['"]$/)){
        leftColorValue = leftColorValue.substring(1, leftColorValue.length-1);
    }
    var leftColors = goog.color.hexToRgb(leftColorValue);

    var rightColorValue = rightColor.data;
    if(rightColorValue.match(/^['"].*['"]$/)){
        rightColorValue = rightColorValue.substring(1, rightColorValue.length-1);
    }
    var leftColors = goog.color.hexToRgb(leftColorValue);
    var rightColors = goog.color.hexToRgb(rightColorValue);

    MBlockly.Control.setMbotLedFull(leftColors[0], leftColors[1], leftColors[2], 2);
    setTimeout(function() {
        MBlockly.Control.setMbotLedFull(rightColors[0], rightColors[1], rightColors[2], 1);
    }, 40);
    this.wait(MBlockly.Settings.RGB_TIME_GAP/1000);
});


MBlockly.BlockKeeper.makeBlock('stop_mbot_led_color', ['LED_POSITION'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);
    var ledPositionList = new Blockly.FieldDropdown([
        [Blockly.Msg.DISPLAY_LED_ALL, MBlockly.Control.LedPosition.BOTH],
        [Blockly.Msg.DISPLAY_LED_LEFT, MBlockly.Control.LedPosition.LEFT],
        [Blockly.Msg.DISPLAY_LED_RIGHT, MBlockly.Control.LedPosition.RIGHT]
    ], function() {
        var selected = event.target.textContent;
        if (selected == Blockly.Msg.DISPLAY_LED_LEFT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_LEFT);
        } else if (selected == Blockly.Msg.DISPLAY_LED_RIGHT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_RIGHT);
        } else {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_ALL);
        }
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_STOP_LED_ON_BOARD)
        .appendField(ledPositionList, 'LED_POSITION')
        .appendField(Blockly.Msg.DISPLAY_LED_STRIP_TIP);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition){
    ledPosition = parseInt(ledPosition);
    MBlockly.Control.turnOffMbotLed(ledPosition);
});
MBlockly.BlockKeeper.makeBlock('set_mbot_led_color_rgb', ['LED_POSITION', '=COLOUR_R', '=COLOUR_G', '=COLOUR_B'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var ledPositionList = new Blockly.FieldDropdown([
        [Blockly.Msg.DISPLAY_LED_ALL, MBlockly.Control.LedPosition.BOTH],
        [Blockly.Msg.DISPLAY_LED_LEFT, MBlockly.Control.LedPosition.LEFT],
        [Blockly.Msg.DISPLAY_LED_RIGHT, MBlockly.Control.LedPosition.RIGHT]
    ], function() {
        var selected = event.target.textContent;
        if (selected == Blockly.Msg.DISPLAY_LED_LEFT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_LEFT);
        } else if (selected == Blockly.Msg.DISPLAY_LED_RIGHT) {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_RIGHT);
        } else {
            icon.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', iconImages.DISPLAY_LED_ALL);
        }
    });

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_SET_LED_ON_BOARD)
        .appendField(ledPositionList, 'LED_POSITION');


    this.appendValueInput('COLOUR_R')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_RED)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_G')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_GREEN)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_B')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_BLUE)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setOutput(false);
    this.setInputsInline(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, r, g, b){
    var runtime = this;
    runtime.pause();
    MBlockly.Control.setMbotLed(r.data, g.data, b.data, ledPosition);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});

// common led
MBlockly.BlockKeeper.makeBlock('set_common_led_color', ['=LED_POSITION', 'PORT', 'SLOT', '=COLOUR2'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_STRIP_BEGIN);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number');

    this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_LED_STRIP_TIP)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT')
        .appendField(Blockly.Msg.DISPLAY_LED_TO_COLOR);

    this.appendValueInput('COLOUR2')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, portStr, slotStr, color){
    ledPosition = parseInt(ledPosition);
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    var runtime = this;
    runtime.pause();
    MBlockly.Control.setLedByPosition(colors[0], colors[1], colors[2], ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP); // 程序等待100ms(在settings.js中设置了全局控制). 这是因为LED灯板是用中断实现的；操纵太快会导致程序异常
});
// stop common led
MBlockly.BlockKeeper.makeBlock('stop_common_led_color', ['=LED_POSITION', 'PORT', 'SLOT'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_TURN_OFF);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number');

    this.appendDummyInput().appendField(Blockly.Msg.DISPLAY_LED_STRIP_TIP)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT');

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, portStr, slotStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    ledPosition = parseInt(ledPosition);
    var runtime = this;
    runtime.pause();
    MBlockly.Control.turnOffLed(ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});
// common led rgb
MBlockly.BlockKeeper.makeBlock('set_led_color_rgb', ['=LED_POSITION', 'PORT', 'SLOT', '=COLOUR_R', '=COLOUR_G', '=COLOUR_B'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var slot = new Blockly.FieldDropdown(MBlockly.Data.portList.getSlot());
    // var ledPanel = new MBlockly.LedPanel('all');

    this.appendDummyInput()
        .appendField(icon);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_STRIP_BEGIN)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_LED_STRIP_TIP)
        .appendField(port, 'PORT')
        .appendField(Blockly.Msg.SLOT)
        .appendField(slot, 'SLOT');

    this.appendValueInput('COLOUR_R')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_RED)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_G')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_GREEN)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_B')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_BLUE)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setOutput(false);
    this.setInputsInline(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, portStr, slotStr, r, g, b){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var slot = parseInt(slotStr.data.split('SLOT-')[1]);
    var runtime = this;
    runtime.pause();
    MBlockly.Control.setLedByPosition(r.data, g.data, b.data, ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});


/* auriga 灯板 */
MBlockly.BlockKeeper.makeBlock('set_auriga_led_color', ['=LED_POSITION', '=COLOUR2'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_PANEL_BEGIN);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_LED_PANEL_TIP)
        .appendField(Blockly.Msg.DISPLAY_LED_TO_COLOR);

    this.appendValueInput('COLOUR2')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, color){
    var port = 0, slot = 1;
    ledPosition = parseInt(ledPosition);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    // 程序等待100ms. 这是因为LED灯板是用中断实现的；操纵太快会导致程序异常
    var runtime = this;
    runtime.pause();
    MBlockly.Control.setLedByPosition(colors[0], colors[1], colors[2], ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});

// stop auriga led
MBlockly.BlockKeeper.makeBlock('stop_auriga_led_color', ['=LED_POSITION'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_LED_TURN_OFF);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_LED_PANEL_TIP);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, portStr, slot){
    var port = 0, slot = 1;
    ledPosition = parseInt(ledPosition);
    var runtime = this;
    runtime.pause();
    MBlockly.Control.turnOffLed(ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});

MBlockly.BlockKeeper.makeBlock('set_auriga_led_color_rgb', ['=LED_POSITION', '=COLOUR_R', '=COLOUR_G', '=COLOUR_B'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon);

    this.appendValueInput('LED_POSITION')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_PANEL_BEGIN)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_LED_PANEL_TIP)
        .appendField(Blockly.Msg.DISPLAY_LED_TO_COLOR);

    this.appendValueInput('COLOUR_R')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_RED)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_G')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_GREEN)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('COLOUR_B')
        .setCheck('Number')
        .appendField(Blockly.Msg.DISPLAY_LED_BLUE)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setOutput(false);
    this.setInputsInline(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(ledPosition, r, g, b){
    var port = 0, slot = 1;
    var runtime = this;
    runtime.pause();
    MBlockly.Control.setLedByPosition(r.data, g.data, b.data, ledPosition, port, slot);
    setTimeout(function(){
        runtime.resume();
    }, MBlockly.Settings.RGB_TIME_GAP);
});


MBlockly.BlockKeeper.makeBlock('play_tone', ['TONE'], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DISPLAY_PLAY_TONE,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var pianoPanel = new MBlockly.PianoInput('C5');

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_PLAY_TONE_ON)
        .appendField(pianoPanel, 'TONE');

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(tone){
    var beat = 250;
    MBlockly.Control.playTone(tone.data);
    this.wait(beat/1000 + MBlockly.Settings.BUZZER_TIME_GAP/1000);
});

MBlockly.BlockKeeper.makeBlock('play_tone_full', ['TONE','BEAT'], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DISPLAY_PLAY_TONE,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var tone = [], toneList = MBlockly.Control.SETTING.TONE_HZ;
    var beat = [], beatList = MBlockly.Control.SETTING.BEATS;
    var toneDropdown, beatDropdown;

    for(var i in toneList) {
        var temp = [];
        temp.push(i);
        temp.push(i);
        tone.push(temp);
    }

    for(var i in beatList) {
        var temp = [];
        temp.push(Blockly.Msg['BEAT_' + i.toUpperCase()]); // 展示出來的名称
        temp.push(i);
        beat.push(temp);
    }

    toneDropdown = new Blockly.FieldDropdown(tone);
    beatDropdown = new Blockly.FieldDropdown(beat);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_PLAY_TONE_ON)
        .appendField(toneDropdown, 'TONE')
        .appendField(Blockly.Msg.DISPLAY_BEAT_TIP)
        .appendField(beatDropdown, 'BEAT');

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(tone, beat){
    beat = MBlockly.Control.SETTING.BEATS[beat];
    MBlockly.Control.playTone(tone.data, beat);
    // 加延迟是为了保证一个音调发完再发另一个音调
    this.wait(beat/1000 + MBlockly.Settings.BUZZER_TIME_GAP/1000);
});

MBlockly.BlockKeeper.makeBlock('stop_tone', [], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DISPLAY_STOP_TONE,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_STOP_TONE)
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}, function(){
    MBlockly.Action.stopBuzzer();
});

MBlockly.BlockKeeper.makeBlock('display_read_x_on_y', ['=VALUE', 'DISPLAYER'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var options = MBlockly.Data.widgetDropdownList.get('Displays');
    var dropdown = new Blockly.FieldDropdown(options, function() {});

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_TIP);
    this.appendValueInput('VALUE')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_ON)
        .appendField(dropdown, 'DISPLAYER');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(value, displayId){
    // 设置显示，将值传给cp
    if(displayId == '0'){
        // 如果显示的对象是 "this"(0) 则从Runtime中读取WidgetId作为传输给显示控件的ID
        displayId = this.widgetId;
    }
    MBlockly.HostInterface.sendValue2Cp(displayId, value);
});


/* 7段数码管 */
MBlockly.BlockKeeper.makeBlock('display_serial_display', ['PORT', '=NUMBER'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());

    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_7SEGMENTS,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(Blockly.Msg.DISPLAY_7SEGMENTS_NUMBER);
    this.appendValueInput('NUMBER')
        .setCheck('Number');
    this.appendDummyInput()
        .appendField(port, 'PORT');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(portStr, number){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    var number = parseFloat(number);
    MBlockly.Control.showSerialNumber(port, number);
});

/* 相机快门: 按下 */
MBlockly.BlockKeeper.makeBlock('display_shutter', ['TYPE', 'PORT'], function(){
    var port = new Blockly.FieldDropdown(MBlockly.Data.portList.get());
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DISPLAY_SHUTTER,
        MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var shutterStatus = new Blockly.FieldDropdown([
            [Blockly.Msg.DISPLAY_SHUTTER_PRESS, "00"],
            [Blockly.Msg.DISPLAY_SHUTTER_RELEASE, "01"],
            [Blockly.Msg.DISPLAY_SHUTTER_FOCUS, "02"],
            [Blockly.Msg.DISPLAY_SHUTTER_UNFOCUS, "03"]
        ]);

    this.appendDummyInput()
        .appendField(icon)
        .appendField(shutterStatus, 'TYPE')
        .appendField(Blockly.Msg.DISPLAY_SHUTTER_TIP)
        .appendField(port, 'PORT');

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(type, portStr){
    var port = parseInt(portStr.data.split('PORT-')[1]);
    MBlockly.Control.shutter(port, type);
});


// 设置智能舵机全彩led灯
MBlockly.BlockKeeper.makeBlock('smartServo_set_led', ['=ID', '=COLOUR'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMART_SERVO_BEGIN);

    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField(Blockly.Msg.DISPLAY_SMART_SERVO_LED_COLOR)
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, color){
    id = parseInt(id);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    MBlockly.Control.setServoLed(id, colors[0], colors[1], colors[2]);
});

MBlockly.BlockKeeper.makeBlock('smartServo_hand_shake', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_SMART_SERVO_HAND_SHAKE);

    this.appendValueInput('ID')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id){
    MBlockly.Control.setServoHandShake(id);
});