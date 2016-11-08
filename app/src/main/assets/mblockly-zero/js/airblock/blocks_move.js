//Common
MBlockly.BlockKeeper.makeBlock('move_start', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_START);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    console.log("start");
    MBlockly.Airblock.airblockStart();
});

MBlockly.BlockKeeper.makeBlock('move_stop', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_STOP);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    console.log("stop");
    MBlockly.Airblock.airblockStop();
});

MBlockly.BlockKeeper.makeBlock('move_pushcontrolword', ['=ANGLE', '=DURATION', 'DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_FORWARD, 'FORWARD'],
        [Blockly.Msg.MOVE_BACKWARD, 'BACK'],
        [Blockly.Msg.MOVE_MOVE_LEFT, 'LEFT'],
        [Blockly.Msg.MOVE_MOVE_RIGHT, 'RIGHT'],
        [Blockly.Msg.MOVE_UP, 'UP'],
        [Blockly.Msg.MOVE_DOWN, 'DOWN'],
        [Blockly.Msg.MOVE_ROTATE, 'ROTATE'],
        [Blockly.Msg.MOVE_HOVER, 'HOVER'],
        [Blockly.Msg.MOVE_ROLL, 'ROLL'],
    ]);

    this.appendDummyInput()
        .appendField("队列控制设备方向")
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.DEGREE);

    this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_DURATION);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(angle, duration, direction){
    var dir = -1;
    if (direction == 'FORWARD') {
        dir = 0;
    }else if (direction == 'BACK'){
        dir = 1;
    }else if (direction == 'LEFT'){
        dir = 2;
    }else if (direction == 'RIGHT'){
        dir = 3;
    }else if (direction == 'UP'){
        dir = 4;
    }else if (direction == 'DOWN'){
        dir = 5;
    }else if (direction == 'ROTATE'){
        dir = 6;
    }else if (direction == 'HOVER'){
        dir = 9;
    }else if (direction == 'ROLL'){
        dir = 11;
    }

    if (dir < 0) {
        console.log("error: direction unknown!");
    }
    console.log(angle + ": " + duration + ": " + direction);

    MBlockly.Airblock.airblockPushControlWord({
        word:dir,
        angle:angle,
        duration: duration,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

//AirCar
MBlockly.BlockKeeper.makeBlock('move_carstop', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_STOP_MOVING);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    console.log("stopmoving");
    MBlockly.Airblock.airblockSetControlWord({
        word: 30,
        angle: 0,
        duration: 0,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_carmove', ['DIRECTION','=ANGLE','=DURATION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_FORWARD, 'FORWARD'],
        [Blockly.Msg.MOVE_BACKWARD, 'BACK'],
        [Blockly.Msg.MOVE_MOVE_LEFT, 'LEFT'],
        [Blockly.Msg.MOVE_MOVE_RIGHT, 'RIGHT'],
        [Blockly.Msg.MOVE_HOVER, 'HOVER'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_CARMOVE)
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_WITH_DEGREE);

    this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_DURATION);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(direction,angle,duration){
    var dir = -1;
    if (direction == 'FORWARD') {
        dir = 0;
    }else if (direction == 'BACK'){
        dir = 1;
    }else if (direction == 'LEFT'){
        dir = 2;
    }else if (direction == 'RIGHT'){
        dir = 3;
    }else if(direction == 'HOVER'){
        dir = 9;        
    }

    if (dir < 0) {
        console.log("error: direction unknown!");
    }
    console.log(duration + ": " + direction);

    MBlockly.Airblock.airblockSetControlWord({
        word: dir,
        angle: angle,
        duration: duration,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_carrotate', ['DIRECTION','=ANGLE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_TURN_LEFT, 'LEFT'],
        [Blockly.Msg.MOVE_TURN_RIGHT, 'RIGHT'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_CAR)
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.DEGREE);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(direction,angle){
    var ang = 0;
    if (direction == 'LEFT'){
        ang = -angle;
    }else if (direction == 'RIGHT'){
        ang = angle;
    }
    console.log(angle + ": " + direction);

    MBlockly.Airblock.airblockSetControlWord({
        word: 6,
        angle: ang,
        duration: 0,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_carsmove', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_SMOVE);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(angle,duration){
    console.log('move_smove'+ "angle: "+angle);
   
    MBlockly.Airblock.airblockPushControlWord({
        word:2,
        angle:-10,
        duration:0.4,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });

    MBlockly.Airblock.airblockPushControlWord({
        word:0,
        angle:80,
        duration:0.7,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });

    MBlockly.Airblock.airblockPushControlWord({
        word:0,
        angle:-120,
        duration:0.8,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });

    MBlockly.Airblock.airblockPushControlWord({
        word:0,
        angle:120,
        duration:1,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});


//AirDrone
MBlockly.BlockKeeper.makeBlock('move_dronemove', ['=ANGLE', '=DURATION', 'DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_FORWARD, 'FORWARD'],
        [Blockly.Msg.MOVE_BACKWARD, 'BACK'],
        [Blockly.Msg.MOVE_MOVE_LEFT, 'LEFT'],
        [Blockly.Msg.MOVE_MOVE_RIGHT, 'RIGHT'],
        [Blockly.Msg.MOVE_UP, 'UP'],
        [Blockly.Msg.MOVE_DOWN, 'DOWN'],
        [Blockly.Msg.MOVE_ROLL, 'ROLL'],
        [Blockly.Msg.MOVE_SHAKE, 'SHAKE'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_DRONEMOVE)
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_WITH_DEGREE);

    this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_DURATION);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(angle, duration, direction){
    var dir = -1;
    if (direction == 'FORWARD') {
        dir = 0;
    }else if (direction == 'BACK'){
        dir = 1;
    }else if (direction == 'LEFT'){
        dir = 2;
    }else if (direction == 'RIGHT'){
        dir = 3;
    }else if (direction == 'UP'){
        dir = 4;
    }else if (direction == 'DOWN'){
        dir = 5;
    }else if (direction == 'ROLL'){
        dir = 11;
    }
    else if (direction == 'SHAKE'){
        dir = 13;
    }
    if (dir < 0) {
        console.log("error: direction unknown!");
    }
    console.log(angle + ": " + duration + ": " + direction);

    MBlockly.Airblock.airblockSetControlWord({
        word:dir,
        angle:angle,
        duration: duration,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_droneupdown', ['=ANGLE', '=DURATION','=RATE', 'DIRECTION'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_UP, 'UP'],
        [Blockly.Msg.MOVE_DOWN, 'DOWN']
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_DRONEMOVE)
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_WITH_DEGREE);

    this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_DURATION);

    this.appendValueInput('RATE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_UPORDOWNRATE);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(angle, duration, direction,rate){
    var dir = -1;
    if (direction == 'UP'){
        dir = 4;
    }else if (direction == 'DOWN'){
        dir = 5;
    }
    if (dir < 0) {
        console.log("error: direction unknown!");
    }
    console.log(angle + ": " + duration + ": " + direction);

    MBlockly.Airblock.airblockSetControlWord({
        word:dir,
        angle:angle,
        duration: duration,
        delay: 0,
        param1: rate,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_dronerotate', ['DIRECTION','=ANGLE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.MOVE_TURN_LEFT, 'LEFT'],
        [Blockly.Msg.MOVE_TURN_RIGHT, 'RIGHT'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_DRONE_TURN)
        .appendField(dropdown, 'DIRECTION');

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.DEGREE);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(direction,angle){
    var ang = 0;
    if (direction == 'LEFT'){
        ang = -angle;
    }else if (direction == 'RIGHT'){
        ang = angle;
    }
    console.log(angle + ": " + direction);

    MBlockly.Airblock.airblockSetControlWord({
        word: 6,
        angle: ang,
        duration: 0,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_dronehover', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_DRONEHOVER);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    MBlockly.Airblock.airblockSetControlWord({
        word: 9,
        angle: 0,
        duration: 0,
        delay: 0,
        param1: 0,
        param2: 0,
        param3: 0
    });
});

MBlockly.BlockKeeper.makeBlock('move_droneland', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_LANDING);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(){
    MBlockly.Airblock.airblockSetWorkMode({
        mode: 5,
    });
});

MBlockly.BlockKeeper.makeBlock('move_dronecomposite', ['=ANGLE', '=DURATION','=ROLLANGLE','=YAWRATE','=UPORDOWNRATE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_COMPOSITE);

    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_WITH_DEGREE);

    this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_DURATION);

    this.appendValueInput('ROLLANGLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_ROLLANGLE);   

    this.appendValueInput('YAWRATE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_YAWRATE); 

    this.appendValueInput('UPORDOWNRATE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_UPORDOWNRATE); 

    this.setInputsInline(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(angle,duration,rollangle,yawrate,upordownrate){
    MBlockly.Airblock.airblockSetControlWord({
        word:12,
        angle:angle,
        duration: duration,
        delay: 0,
        param1: rollangle,
        param2: yawrate,
        param3: upordownrate
    });
});

MBlockly.BlockKeeper.makeBlock('move_dronesetheight', ['=HEIGHT'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_DRONE_SETHEIGHT);

    this.appendValueInput('HEIGHT')
        .setCheck('Number')

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(height){
    MBlockly.Airblock.airblockSetLocation({
        height:height,
        atitude:0,
        dimension:0,
    });
});

MBlockly.BlockKeeper.makeBlock('move_dronesetattitude', ['=COURSEANGLE', '=ELEVATIONANGLE','=ROLLANGLE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_COMPOSITE);

    this.appendValueInput('COURSEANGLE')
        .setCheck('Number')
        .appendField('航向角');

    this.appendValueInput('ELEVATIONANGLE')
        .setCheck('Number')
        .appendField('仰俯角');

    this.appendValueInput('ROLLANGLE')
        .setCheck('Number')
        .appendField('横滚角');

    this.setInputsInline(false);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(coursengle,elevationangle,rollangle){
    MBlockly.Airblock.airblockSetAttitude({
        courseAngle:coursengle,
        elevationAngle:elevationangle,
        rollAngle: rollangle
    });
});

//Custom
MBlockly.BlockKeeper.makeBlock('move_cussetmotorthrottle', ['PORT','=THROTTLE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.move);
    var dropdown = new Blockly.FieldDropdown([
        ["1", 'ONE'],
        ["2", 'TWO'],
        ["3", 'THREE'],
        ["4", 'FOUR'],
        ["5", 'FIVE'],
        ["6", 'SIX'],
    ]);

    this.appendDummyInput()
        .appendField(Blockly.Msg.MOVE_MOTORPORT)
        .appendField(dropdown, 'PORT');

    this.appendValueInput('THROTTLE')
        .setCheck('Number')
        .appendField(Blockly.Msg.MOVE_THROTTLE);

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);

}, function(port,throttle){
    var no = 0;
    if (port == 'TWO'){
        no = 1;
    }else if (port == 'THREE'){
        no = 2;
    }else if (port == 'FOUR'){
        no = 3;
    }else if (port == 'FIVE'){
        no = 4;
    }else if (port == 'SIX'){
        no = 5;
    }
    console.log(no + ": " + throttle);

    MBlockly.Airblock.airblockSetMotorThrottle({
        no: no,
        throttle: throttle
    });
});