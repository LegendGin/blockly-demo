MBlockly = MBlockly || {};

MBlockly.Airblock = {
    airblockStart: function() {
        console.log('airblockStart');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'START', [], index);
    },

    airblockStop: function() {
        console.log('airblockStop');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'STOP', [], index);
    },

    airblockSetWorkMode: function(jsonData) {
        console.log('airblockSetWorkMode' + jsonData);

        var mode = jsonData.mode;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'SETWORKMODE', [mode], index);
    },

    airblockGetWorkMode: function() {
        console.log('airblockGetWorkMode');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETWORKMODE", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "WORKMODE", index)[0];
        return val;
    },

    airblockSetControlWord: function(jsonData) {
        console.log('airblockSetControlWord' + jsonData);
        var word = jsonData.word;
        var angle = jsonData.angle;
        var duration = jsonData.duration;
        var delay = jsonData.delay;
        var param1 = jsonData.param1;
        var param2 = jsonData.param2;
        var param3 = jsonData.param3;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'SETCONTROLWORD', [word,angle,duration,delay,param1,param2,param3], index);
    },

    airblockSetForm: function(jsonData) {
        console.log('airblockSetForm' + jsonData);
        var form = jsonData.form;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'SETFORM', [form], index);
    },

    airblockGetForm: function() {
        console.log('airblockGetForm');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETFORM", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "FORM", index)[0];
        return val;
    },

    airblockPushControlWord: function(jsonData) {
        console.log('airblockPushControlWord' + jsonData);
        var word = jsonData.word;
        var angle = jsonData.angle;
        var duration = jsonData.duration;
        var delay = jsonData.delay;
        var param1 = jsonData.param1;
        var param2 = jsonData.param2;
        var param3 = jsonData.param3;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'PUSHCONTROLWORD', [word,angle,duration,delay,param1,param2,param3], index);
    },

    airblockSetSpeed: function(jsonData) {
        console.log('airblockSetSpeed: ' + jsonData);
        var speedx = jsonData.speedx;
        var speedy = jsonData.speedy;
        var speedz = jsonData.speedz;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', 'SETSPEED', [speedx,speedy,speedz], index);
    },

    airblockGetSpeed: function() {
        console.log('airblockGetSpeed');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETSPEED", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "SPEED", index);
        return val;
    },

    airblockSetAttitude: function(jsonData) {
        console.log('airblockSetAttitude' + jsonData);

        var courseAngle = jsonData.courseAngle;
        var elevationAngle = jsonData.elevationAngle;
        var rollAngle = jsonData.rollAngle;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETATTITUDE",[courseAngle,elevationAngle,rollAngle], index);
    },

    airblockGetAttitude: function() {
        console.log('airblockGetAttitude');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETATTITUDE", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "ATTITUDE", index);
        return val;
    },

    airblockSetLocation: function(jsonData) {
        console.log('airblockSetLocation' + jsonData);

        var height = jsonData.height;
        var atitude = jsonData.atitude;
        var dimension = jsonData.dimension;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETLOCATION",[height,atitude,dimension], index);
    },

    airblockGetLocation: function() {
        console.log('airblockGetLocation');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETLOCATION", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "LOCATION", index);
        return val;
    },

    airblockSetThrottle: function(jsonData) {
        console.log('airblockSetThrottle' + jsonData);

        var throttle1 = jsonData.throttle1;
        var throttle2 = jsonData.throttle2;
        var throttle3 = jsonData.throttle3;
        var throttle4 = jsonData.throttle4;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETTHROTTLE",[throttle1,throttle2,throttle3,throttle4], index);
    },

    airblockGetThrottle: function() {
        console.log('airblockGetThrottle');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETTHROTTLE", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "THROTTLE", index)[0];
        return val;
    },

    airblockSetPID: function(jsonData) {
        console.log('airblockSetPID' + jsonData);

        var p1 = jsonData.p1;
        var i1 = jsonData.i1;
        var d1 = jsonData.d1;
        var p2 = jsonData.p2;
        var i2 = jsonData.i2;
        var d2 = jsonData.d2;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETPID",[p1,i1,d1,p2,i2,d2], index);
    },

    airblockGetElectricity: function() {
        console.log('airblockGetElectricity');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETELECTRICITY", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "ELECTRICITY", index);
        return val;
    },

    airblockGetVersion: function() {
        console.log('airblockGetVersion');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETVERSION", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "VERSION", index)[0];
        return val;
    },

    airblockGetUuid: function() {
        console.log('airblockGetUuid');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETUUID", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "UUID", index)[0];
        return val;
    },

    airblockGetSerialNumber: function() {
        console.log('airblockGetSerialNumber');

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETSERIALNUMBER", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "SERIALNUMBER", index)[0];
        return val;
    },

    airblockGetEcho: function() {
        console.log('airblockGetEcho');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETECHO", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "ECHO", index)[0];
        return val;
    },

    airblockGetLedNumber: function() {
        console.log('airblockGetLedNumber');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETLEDNUMBER", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "LEDNUMBER", index)[0];
        return val;
    },

    airblockSetLed: function(jsonData) {
        console.log('airblockSetLed' + jsonData);
        var no = jsonData.no;
        var red = jsonData.red;
        var green = jsonData.green;
        var blue = jsonData.blue;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETLED",[no,red,green,blue], index);
    },

    airblockGetMotorNumber: function() {
        console.log('airblockGetMotorNumber');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETMOTORNUMBER", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "MOTORNUMBER", index)[0];
        return val;
    },

    airblockSetMotorThrottle: function(jsonData) {
        console.log('airblockSetMotorThrottle' + jsonData);
        var no = jsonData.no;
        var throttle = jsonData.throttle;

        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "SETMOTORTHROTTLE",[no,throttle], index);
    },

    airblockGetUltrasonicDistance: function() {
        console.log('airblockGetUltrasonicDistance');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETULTRASONICDISTANCE", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "ULTRASONICDISTANCE", index)[0];
        return val;
    },

    airblockGetAirPressure: function() {
        console.log('airblockGetAirPressure');
        var index = 1;
        MBlockly.Neurons.engine.sendBlockCommand('AIRBLOCK', "GETAIRPRESSURE", [], index);
        var val = MBlockly.Neurons.engine.getBlockSubStatus('AIRBLOCK', "AIRPRESSURE", index);
        return val;
    },
};