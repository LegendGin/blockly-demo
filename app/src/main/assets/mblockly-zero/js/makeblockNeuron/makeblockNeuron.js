/**
 * @fileOverview Comnunicate with neuron engine.
 * @author hujinhong@makeblock.cc(Hyman)
 * @copyright 2016 Makeblock.cc
 */


MBlockly = MBlockly || {};

/* override neurons */
extend(MBlockly.Neurons, {
    // 神经元模块更新
    blockListChanges: function(data) {
        // TOIMPROVE: NOT A GOOD WAY TO WAIT DATA LOADING.
        if(data.AIRBLOCK) {
            var airblockLength = data.AIRBLOCK.length;
            if(TellNative.airblockIsReady) {
                console.log("airblock is ready");
                TellNative.airblockIsReady(airblockLength);
            }
        }

        this.servoCache = {};
        if($(".neuron-test table")) {
            MBlockly.Neurons.renderNeuronsUi(data);
        }

        if(MBlockly.ServoRecord) {
            // load smartServo module.
            MBlockly.ServoRecord.setup();
        }
    },

    blockStatusChanges: function(ntype, index, value) {
        var that = this;
        console.log(value.ANGLE);
        ntype = ntype.replace(" ", "");
        var that = MBlockly.Neurons;
        // update widget's value
        var className = '.' + ntype + '-' + index;

        if(ntype == 'SMART_SERVO') {
            value = value.ANGLE[0];
            that.generateServoCache(index, value);
        }

        if(ntype == 'ACCELEROMETER_GYRO') {
            for(var i = 0; i < value.length; i++) {
                value[i] = value[i].toFixed(2);
            }
        }
        $(className).text(value.toString());
    },

    generateServoCache: function(index, value) {
        this.servoCache[index] = value;
    }
});