/**
 * @fileOverview Comnunicate with neuron engine.
 * @author hujinhong@makeblock.cc(Hyman)
 * @copyright 2016 Makeblock.cc
 */


/* use strict */
MBlockly.Neurons = {
    engine: null,
    servoCache: {},
};

extend(MBlockly.Neurons, {

    /**
     * Neuron engine init.
     */
    initNeurons: function() {
        // this.engine = createNeuronsEngine({
        //     "driver": "makeblockhd"
        // });

        this.engine = createNeuronsLogicEngine({
            "driver": "makeblockhd"
        });
    },

    setup: function() {
        console.log('-- set up neuron --');
        var data = null;

        this.initNeurons();
        data = this.engine.getActiveBlocks();
        this.blockListChanges(data);

        this.engine.on("blockListChanges", this.blockListChanges);
        this.engine.on("blockStatusChanges", this.blockStatusChanges);
    },

    /**
     * neurons_engine call me to construct blockly data structure.
     *
     * when new neuron item adds or old neuron item be removed, call this method.
     * @param  {[type]} data [description]
     */
    blockListChanges: function(data) {
        console.log(data);

        MBlockly.Neurons.renderNeuronsUi(data);
        MBlockly.Data.constructNeuronList(data);
    },

    /**
     * neurons_engine call me to excute blockly code.
     *
     * when neuron status changes, report it to me.
     * @param  {string} ntype neuron item's type.
     * @param  {number} index neuron item's index of the same type.
     * @param  {array} value      neuron's new value.
     */
    blockStatusChanges: function(ntype, index, value) {
        // console.log("【blocks status changes】：" + value);
        var that = MBlockly.Neurons;
        var state = MBlockly.Data.getNeuronItemState(ntype, value);
        var type = MBlockly.Data.getNeuronItemType(ntype);
        var projectId = MBlockly.App.currentProject.id;

        // update widget's value
        var className = '.' + ntype + '-' + index;
        $(className).text(value[0].toString());

        // high light widget item
        MBlockly.WhenEvent.excuteWhenBlockCode(projectId, type, state);
        MBlockly.App.highLightNeuronItem(ntype, index);
    },

    /**
     * when block shakes trigger some events on blockly.
     * @param  {string} ntype neuron item's type.
     * @param  {number} index neuron item's index of the same type.
     */
    handshake: function(ntype, index) {
        MBlockly.App.highLightNeuronItem(ntype, index);
    },

    /**
     * Test: render neuron block to front page.
     * @param  {json} blockList block list data.
     */
    renderNeuronsUi: function(blockList) {
        $(".neuron-test table").html("");
        var headStr = "" + "<tr><th>Name</th><th>Index</th><th>Value</th></tr>";
        $(".neuron-test table").append($(headStr));

        for(var i in blockList) {
            var values = blockList[i];
            console.log(values.length);
            for(var j = 1; j <= values.length; j++) {

                // set smartServo mode.
                if(i == "SMART_SERVO") {
                    this.servoCache[j] = "";
                    MBlockly.Servo.setServoReportMode(j, MBlockly.Servo.reportMode);
                }

                i = i.replace(" ", "");
                var className = i + '-' + j;
                var value;
                if(values[j]) {
                    value = values[j].toString();
                    if(i == "SMART_SERVO") {
                        value = values[j].ANGLE.toString();
                    }
                } else {
                    value = "";
                }
                var itemStr = '<tr><td>' + i + '</td><td>' + j + '</td><td class="' + className + '">' + value + '</td></tr>';
                $(".neuron-test table").append($(itemStr));
            }
        }
    }
});

$(function() {
    setTimeout(function() {
        MBlockly.Neurons.setup();
    }, 1000);
});