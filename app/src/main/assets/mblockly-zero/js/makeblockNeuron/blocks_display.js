MBlockly.BlockKeeper.makeBlock('display_read_x_on_y', ['=VALUE', 'DISPLAYER'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    var options = MBlockly.Data.widgetDropdownList.get('Displays');
    var dropdown = new Blockly.FieldDropdown(options, function() {});

    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_TIP);
    this.appendValueInput('VALUE');
        // .setCheck('Number');
    this.appendDummyInput()
        .appendField(Blockly.Msg.DISPLAY_ON)
        .appendField(dropdown, 'DISPLAYER');
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(value, displayId){
    if(value > 999) {
        value = parseInt(value / 10);
    }
    if(displayId == '0'){
        // 如果显示的对象是 "this"(0) 则从Runtime中读取WidgetId作为传输给显示控件的ID
        displayId = this.widgetId;
    }
    MBlockly.HostInterface.sendValue2Cp(displayId, value);
});

MBlockly.BlockKeeper.makeBlock('display_led_matrix_panel', ['TYPE', '=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    options = [
        ["eye", "1"],
        ["?", "2"],
        ["+", "3"],
        ["full", "4"],
        ["empity", "5"],
        ["squint", "6"]
    ];

    var dropdown = new Blockly.FieldDropdown(options, function() {});
    var ledMatrix = new MBlockly.LedMatrix('all');

    this.appendDummyInput()
        .appendField('set led matrix')
        .appendField(dropdown, 'TYPE');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('at index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(type, index){
    var matrixArray;
    index = parseInt(index);
    switch(type.data) {
        case '1':
            matrixArray = [
                0,0,0,0,1,0,0,0,
                0,0,0,1,0,0,0,0,
                0,0,1,0,1,1,1,0,
                0,1,0,1,1,1,1,0,
                0,1,0,1,1,1,1,0,
                0,0,1,0,1,1,1,0,
                0,0,0,1,0,0,0,0,
                0,0,0,0,1,0,0,0
            ];
            break;
        case '2':
            matrixArray = [
                0,0,0,0,0,0,0,0,
                0,0,1,1,1,1,0,0,
                0,1,1,1,1,1,0,0,
                0,1,0,0,1,1,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0
            ];
            break;
        case '3':
            matrixArray = [
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0
            ];
            break;
        case '4':
            matrixArray = [
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1
            ];
            break;
        case '5':
            matrixArray = [
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0
            ];
            break;
        case '6':
            matrixArray = [
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0,
                0,0,0,1,1,0,0,0
            ];
            break;
        default:
            break;
    }

    var longArray = _matrix2long(matrixArray);
    MBlockly.Neurons.engine.setBlockStatus('LED_MATRIX', longArray, index);
});

MBlockly.BlockKeeper.makeBlock('turn_indicator_light', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField("turn indicator light");

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField("of index");

    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}, function(index){
    index = parseInt(index);
    // TODO
});

// led color
MBlockly.BlockKeeper.makeBlock('set_led_color', ['=INDEX', '=COLOUR'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set led at index');

    this.appendValueInput('INDEX')
        .setCheck('Number');

    this.appendDummyInput()
        .appendField('with color');

    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT);

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(index, color){
    index = parseInt(index);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    MBlockly.Neurons.engine.setBlockStatus("COLOUR_LED", [colors[0], colors[1], colors[2]], index);
});

// led chain: 灯带
MBlockly.BlockKeeper.makeBlock('set_led_chain_color', ['=POSITION', '=INDEX', '=COLOUR'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_LED_ALL,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');

    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set led chain at position');

    this.appendValueInput('POSITION')
        .setCheck('Number');

    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField('with color');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');


    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(position, index, color){
    position = parseInt(position);
    index = parseInt(index);
    var colorValue = color.data;
    if(colorValue.match(/^['"].*['"]$/)){
        colorValue = colorValue.substring(1, colorValue.length-1);
    }
    var colors = goog.color.hexToRgb(colorValue);
    // MBlockly.Neurons.engine.setBlockStatus("LIGHT_CHAIN", [position, colors[0], colors[1], colors[2]], index);
    MBlockly.Neurons.engine.sendBlockCommand('LIGHT_CHAIN','SET_SINGLE_LED',[position, colors[0], colors[1], colors[2]],index);
});

/* buzzer */
MBlockly.BlockKeeper.makeBlock('play_tone', ['TONE', 'VOLUME', 'BEAT', '=INDEX'], function(){
    var icon = new Blockly.FieldImage(MBlockly.Settings.resources().ICONS.DISPLAY_PLAY_TONE,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    // 音调
    var pianoPanel = new MBlockly.PianoInput('C5');
    // 音量
    var volumeDropDown = new Blockly.FieldDropdown([
            ['20', '20'],
            ['30', '30'],
            ['40', '40'],
            ['50', '50'],
            ['60', '60'],
            ['70', '70'],
            ['80', '80'],
            ['80', '80'],
            ['90', '90'],
        ], function() {});
    // 节拍
    var beatDropDown = new Blockly.FieldDropdown([
            ['1/8', '125'], // millisecond
            ['1/4', '250'],
            ['1/2', '500'],
            ['one', '1000'],
            ['double', '2000']
        ], function() {});

    this.appendDummyInput()
        .appendField(icon)
        .appendField('播放音调为')
        .appendField(pianoPanel, 'TONE');

    this.appendDummyInput()
        .appendField('音量')
        .appendField(volumeDropDown, 'VOLUME');

    this.appendDummyInput()
        .appendField('节拍')
        .appendField(beatDropDown, 'BEAT');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setOutput(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(tone, volume, beat, index){
    volume = parseInt(volume);
    beat = parseInt(beat);
    index = parseInt(index);
    var toneHzTable = {
        // 原始数据：D5: 587 "E5": 658,"F5": 698,"G5": 784,"A5": 880,"B5": 988,"C6": 1047
        "C2": 65,"D2": 73,"E2": 82,"F2": 87,"G2": 98,"A2": 110,"B2": 123,
        "C3": 131,"D3": 147,"E3": 165,"F3": 175,"G3": 196,"A3": 220,
        "B3": 247,"C4": 262,"D4": 294,"E4": 330,"F4": 349,"G4": 392,
        "A4": 440,"B4": 494,"C5": 523,"D5": 555,"E5": 640,"F5": 698,
        "G5": 784,"A5": 880,"B5": 988,"C6": 1047,"D6": 1175,"E6": 1319,
        "F6": 1397,"G6": 1568,"A6": 1760,"B6": 1976,"C7": 2093,"D7": 2349,
        "E7": 2637,"F7": 2794,"G7": 3136,"A7": 3520,"B7": 3951,"C8": 4186
    };

    var frequence = toneHzTable[tone];

    MBlockly.Neurons.engine.setBlockStatus("BUZZER", [frequence, volume], index);
    setTimeout(function() {
        MBlockly.Neurons.engine.setBlockStatus("BUZZER", [frequence, 0], index);
    }, beat);
});

/* 4_NUMERIC_DISPLAY */
MBlockly.BlockKeeper.makeBlock('display_4_numeric', ['=NUMBER', '=INDEX'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_7SEGMENTS,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set 4_NUMERIC_DISPLAY value');

    this.appendValueInput('NUMBER')
        .setCheck('Number');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(number, index){
    index = parseInt(index);
    number = parseInt(number);
    MBlockly.Neurons.engine.setBlockStatus("4_NUMERIC_DISPLAY", [number], index);
});

MBlockly.BlockKeeper.makeBlock('display_screen_lcd_144', ['TEXT', '=INDEX'], function(){
    var iconImages = MBlockly.Settings.resources().ICONS;
    var icon = new Blockly.FieldImage(iconImages.DISPLAY_7SEGMENTS,
    MBlockly.Settings.BLOCK_ICON_WIDTH, MBlockly.Settings.BLOCK_ICON_HEIGHT, '*');
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField(icon)
        .appendField('set screen_lcd_144 value');

    this.appendValueInput('TEXT');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(text, index){
    index = parseInt(index);
    console.log(text);
    MBlockly.Neurons.engine.setBlockStatus("DISPLAY_SCREEN_LCD_144", [text], index);
});

MBlockly.BlockKeeper.makeBlock('display_led_matrix_8_8', ['LED_MATRIX', '=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendValueInput('LED_MATRIX')
        .appendField('set matrix_8*8 panel');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('at index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(matrixArray, index){
    var list = matrixArray.data.split('-');
    var intList = [];
    for(var i = 0; i < list.length; i++) {
        intList.push(parseInt(list[i]));
    }

    index = parseInt(index);
    var longArray = _matrix2long(intList);
    MBlockly.Neurons.engine.setBlockStatus('LED_MATRIX', longArray, index);
});

/* 8*16 screen text */
MBlockly.BlockKeeper.makeBlock('display_led_matrix_8_16_text', ['TEXT', '=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField('set matrix_8*16 text');

    this.appendValueInput('TEXT');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(text, index){
    index = parseInt(index);
    console.log(text);
    MBlockly.Neurons.engine.sendBlockCommand('LED_MATRIX_8*16','DISPLAY_STRING', [text], index);
});

/* 8*16 screen time */
MBlockly.BlockKeeper.makeBlock('display_led_matrix_8_16_time', ['=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField('set matrix_8*16 time');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(index){
    var time = date2str(new Date(),"hh:mm");
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];
    index = parseInt(index);
    MBlockly.Neurons.engine.sendBlockCommand('LED_MATRIX_8*16','DISPLAY_TIME', [hour, minute], index);
});

/* 8*16 screen matrix */
MBlockly.BlockKeeper.makeBlock('display_led_matrix_8_16_panel', ['LED_MATRIX', '=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendValueInput('LED_MATRIX')
        .appendField('set matrix_8*16 panel');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('at index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(matrixArray, index){
    var list = matrixArray.data.split('-');
    var intList = [];
    for(var i = 0; i < list.length; i++) {
        intList.push(parseInt(list[i]));
    }

    index = parseInt(index);
    var longArray = _matrix2long(intList);
    MBlockly.Neurons.engine.setBlockStatus('LED_MATRIX', longArray, index);
});

/* Mp3 */
MBlockly.BlockKeeper.makeBlock('display_play_mp3', ['=ORDER', '=INDEX'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField('play audio ');

    this.appendValueInput('ORDER')
        .setCheck('Number');

    this.appendValueInput('INDEX')
        .setCheck('Number')
        .appendField('of index');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(order, index){
    index = parseInt(index);
    order = parseInt(order);
    MBlockly.Neurons.engine.sendBlockCommand('MP3','ORDER_PLAYBACK',[order], index);
});

MBlockly.BlockKeeper.makeBlock('display_clear_all_mp3', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField('clear all audio');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    MBlockly.Neurons.engine.sendBlockCommand('MP3','FORMAT');
});

MBlockly.BlockKeeper.makeBlock('display_delete_mp3', ['=ORDER'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);

    this.appendDummyInput()
        .appendField('delete audio of order ');

    this.appendValueInput('ORDER')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(order){
    order = parseInt(order);
    MBlockly.Neurons.engine.sendBlockCommand('MP3','DELETE_SONG',[order]);
});



/* -----------------------------
    smart servo related.
 -----------------------------*/
MBlockly.BlockKeeper.makeBlock('smartServo_display_color_rgb', ['=ID', '=COLOR_R','=COLOR_G','=COLOR_B'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField('set smart servo');

    this.appendValueInput('ID')
        .setCheck('Number');
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

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id, r, g, b){
    MBlockly.Servo.setServoRgb(id, r, g, b);
});

MBlockly.BlockKeeper.makeBlock('smartServo_display_color', ['=ID', '=COLOUR'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField('set smart servo');

    this.appendValueInput('ID')
        .setCheck('Number');

    this.appendValueInput('COLOUR')
        .setCheck('Colour')
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
    MBlockly.Servo.setServoRgb(id, colors[0],colors[1],colors[2]);
});

MBlockly.BlockKeeper.makeBlock('smartServo_hand_shake', ['=ID'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.display);
    this.appendDummyInput()
        .appendField('hand shake with servo');

    this.appendValueInput('ID')
        .setCheck('Number');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(id){
    MBlockly.Servo.handShakeServo(id);
});