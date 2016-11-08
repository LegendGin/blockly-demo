/**
 * @fileOverview Comnunicate with neuron engine.
 * @author hujinhong@makeblock.cc(Hyman)
 * @copyright 2016 Makeblock.cc
 */


MBlockly = MBlockly || {};

/* use strict */
MBlockly.Servo = {
    engine: null,
    // 神经元模块主动上报模式
    reportMode: 1
};

/**
 * 设置舵机command的接口为：
 *      engine.sendBlockCommand('SMART_SERVO',command,params,idx)
 * 对于获取value的command，params表示上报模式
 *      0x00表示收到查询命令时返回一次；
 *      0x01表示数据状态有变化时上报；
 *      0x02表示周期上报
 */
extend(MBlockly.Servo, {

    /**
     * Neuron engine init.
     */
    initNeurons: function() {
        this.engine = MBlockly.Neurons.engine;
    },

    setup: function() {
        console.log('-- set up servo --');
        this.initNeurons();

        setTimeout(function() {
            MBlockly.ServoRecord.setup();
        }, 500);
    },

    /**
     *   对于获取value的command，params表示上报模式
     *      0x00表示收到查询命令时返回一次
     *      0x01表示数据状态有变化时上报
     *      0x02表示周期上报
     *   @param {number} id    servo id.
     *   @param {number} reportMode (optional) default is 0x01.
     *   @param {object} option  (optional) default set all.
     */
    setServoReportMode: function(id, reportMode, option) {
        var mode = reportMode || 0x00;
        var opts = option || {
            "GET_CUR_POS": [0],
            "GET_CUR_SPEED": [0],
            "GET_TEMPERATURE": [0],
            "GET_CURRENT": [0],
            "GET_VOLTAGE": [0],
            "GET_CUR_ANGLE": [mode]
        };
        for(var i in opts) {
            MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO', i , opts[i], id);
        }
        console.log('set mode complete.');
    },

    /**
     * 设置舵机绝对角度
     * @param {number} angle 绝对角度: 200 - 3900，（实际角度=位置*360/4096）；
     * @param {number} speed  速度可选1--50（单位为rpm）
     * @param {number} id  servo's id.
     */
    setServoAbsolutePos: function(id, angle, speed) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO', 'SET_ABSOLUTE_POS',[angle, speed], id);
    },

    setServoRelativePos: function(id, angle, speed) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_RELATIVE_POS',[angle,speed],id);
    },

    setServoRgb: function(id, r, g, b) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_RGB_LED',[r,g,b],id);
    },

    // 读取状态值: POS | SPEED | TEMPERATURE | CURRENT | VOLTAGE
    readServoStatus: function(id, type, element) {
        var result = MBlockly.Neurons.engine.getBlockSubStatus('SMART_SERVO', type, id);
        console.log(type + ': ' + result);
        if(element) {
            $(element).find('.result').text(result);
        }
        return result;
    },

    // 解锁舵机: 0x1表示解锁，0x0表示锁定
    setServoBreak: function(id, actionMode) {
        var mode = actionMode || 0x1;
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_BREAK',[mode], id);
    },

    // 握手命令，对应舵机收到该命令后RGB会闪烁5次
    handShakeServo: function(id) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_HAND_SHAKE',[],id);
    },


    /**
     * 磁编码相关
     */

    // 获取角度
    readServoAngle: function(id) {
        var result = MBlockly.Neurons.engine.getBlockSubStatus('SMART_SERVO','ANGLE',id);
        return result;
    },

    // 设置当前角度为零点
    initServoAngle: function(id) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_ANGLE_AS_ZERO',[],id);
    },

    // 设置绝对角度，角度值数据类型为short
    setServoAbsoluteShortAngle: function(id, angle, speed){
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_ABSOLUTE_SHORT_ANGLE',[angle, speed],id);
    },

    // 设置相对角度，角度值数据类型为short
    setServoRelativeShortAngle: function(id, angle, speed){
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_RELATIVE_SHORT_ANGLE',[angle, speed],id);
    },
    // 设置绝对角度，角度值数据类型为long
    setServoAbsoluteLongAngle: function(id, angle, speed){
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_ABSOLUTE_LONG_ANGLE',[angle, speed],id);
    },
    // 设置相对角度，角度值数据类型为short
    setServoRelativeLongAngle: function(id, angle, speed){
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_RELATIVE_LONG_ANGLE',[angle, speed],id);
    },
    // 设置PWM，像直流电机一样的转
    setServoPwm: function(id, pwm){
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_PWM',[pwm],id);  // PWM值：-255 到255
    },
    // 设置舵机恢复到其实位置: resetType: 0x1表示以绝对位置恢复，0x0表示相对位置恢复；50表示速度
    // 当id的值为255时，表示为广播
    resetServosPosition: function(resetType, speed,  id) {
        MBlockly.Neurons.engine.sendBlockCommand('SMART_SERVO','SET_BACKTO_INITIAL_POS',[resetType, speed], id);
    }
});