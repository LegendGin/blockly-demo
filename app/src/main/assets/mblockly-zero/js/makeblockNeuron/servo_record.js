/* use strict */
MBlockly.ServoRecord = {
    // 时间计数
    runTime: 0,
    // 记录的数据结构
    records: {
        // 0: { // 录制点的索引值
        //     "1": 10, // key是索引号，value是当前角度值
        //     "2": 20,
        //     "3": 30
        // }
        // 1: { // 录制点的索引值
        //     "1": 10, // key是索引号，value是当前角度值
        //     "2": 20,
        //     "3": 30
        // }
    },
    // 每次记录的索引号
    recordIndex: 0,
    // 定时器获取舵机角度值的时间间隔
    recordTimeGap: 100,
    // 开始的时间
    beginTime: null,
    // 上一次的时间
    // 定时器
    recordInterval: null,
};

/**
 * UI 相关
 */
extend(MBlockly.ServoRecord, {

    init: function() {
        $('.servoTable').html(" ");

        this.servoCache = MBlockly.Neurons.servoCache;

        var row = "<tr><th>Time</th>";
        for(var i in this.servoCache) {
            row += "<th>servo" + i + "</th>";
        }
        row +="</th>";
        $('.servoTable').append($(row));
    },

    begin: function() {
        var that = this;
        this.recordInterval = setInterval(function() {
            that.addRecordFrame();
            that.recordIndex++;
        }, this.recordTimeGap);

        // 增加时间定时器
        this.timer = setInterval(function() {
            $('.beginTime').html(that.runTime);
            that.runTime++;
        }, 1000);
    },

    addRecordFrame: function() {
        // 获取已注册舵机的角度值
        this.records[this.recordIndex] = {};
        for(var i in this.servoCache) {
           this.records[this.recordIndex][i] = this.servoCache[i];
        }
    },

    stop: function() {
        clearInterval(this.recordInterval);
        clearInterval(this.timer);
        this.release();
    },

    playNext: function(sequence, index) {
        var self = this;
        if(sequence[index]){
            var servoAngles = sequence[index];
            for(var i in servoAngles) {
                this.doplay(i, servoAngles[i]);
            }
            setTimeout(function(){
                self.playNext(sequence, index+2);
            }, this.recordTimeGap);
        }
    },

    play: function() {
        this.playNext(this.records, 0);
    },

    doplay: function(servoIndex, angle) {
        console.log(servoIndex + ':' + angle);
        var speed = 25;
        var abAngle = Math.abs(parseInt(angle));
        if(abAngle <= 360) {
            MBlockly.Servo.setServoAbsoluteShortAngle(servoIndex, angle, speed);
        } else {
            MBlockly.Servo.setServoAbsoluteLongAngle(servoIndex, angle, speed);
        }
    },

    restart: function() {
        this.playNext(this.records, 0);
    },

    reset: function() {
        // reset all servos to init position (absolute angle)
        MBlockly.Servo.resetServosPosition(1, 50, 255);
    },

    release: function() {
        MBlockly.Servo.setServoBreak(255, 1);
    },

    setStartPosition: function() {
        MBlockly.Servo.initServoAngle(255);
        this.release();
    },

    registerEvents: function() {
        var eventType = getEventType();
        var record = MBlockly.ServoRecord;

        // bind evnets to operation buttons.
        $('.begin').on(eventType, function() {
            record.resetRecord();
            record.begin();
        });

        $('.stop').on(eventType, function() {
            record.stop();
        });

        $('.play').on(eventType, function() {
            record.play();
        });

        $('.reset').on(eventType, function() {
            record.reset();
        });

        $('.init').on(eventType, function() {
            record.setStartPosition();
        });

        $('.release').on(eventType, function() {
            record.release();
        });
    },

    resetRecord: function() {
        this.runTime = 0;
        clearInterval(this.recordInterval);
        clearInterval(this.timer);
        this.records = {};
        this.recordIndex = 0;
    },

    setup: function() {
        console.log('servo record set up');
        this.release();
        this.resetRecord();
        this.init();
        this.registerEvents();
    }

});

function getCurrentTime() {
    var currentTime = new Date().getTime();
    return currentTime;
}

