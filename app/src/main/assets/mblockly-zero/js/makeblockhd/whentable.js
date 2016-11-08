/**
 * @description: generate widget excute codes.
 * @author: hujinhong
 * @copyright 2015 Makeblock
 */

MBlockly = MBlockly || {};
MBlockly.WhenEvent = {};


/**
 * 生成某个 widget 下的所有 when table 生成的 JS 代码，并按照状态进行分类整理
 * @return {object} 返回一个对象
 *  以 button 组件为例
    {
      "1": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮按下
      "0": ["jsCode1", "jsCode2", ..., "jsCoden"] // 按钮抬起
    }
 */
MBlockly.WhenEvent.generateJsCodes = function(){
    var topBlocks = workspace.getTopBlocks();
    var id = MBlockly.App.currentWidget.id;
    var jsCodes = {};

    for(var i in topBlocks) {
        var item, blockType, blockName, widgetType, code;
        item = topBlocks[i];
        if(item && item.xmlData) {
            blockType = item.xmlData.getAttribute("data-blocktype");
            blockName = item.xmlData.getAttribute("type");
            widgetType = item.xmlData.getAttribute("data-widgettype");

            // 对于顶部 block 为 when 类型的，生成代码并保存，其他类型不处理
            if(blockName.hasStr('when_')) {
                code = xencode(MBlockly.Runtime.parseCode(item));
                var state = this.WhenTable.stateTable[blockName];
                jsCodes[state] = jsCodes.state || [];
                jsCodes[state].push(code);

                // 将所有含有 `when start` block 块的widgetId，存到对象里，注意去重
                if(blockName == 'when_start') {
                    this.registerWhenStartblocks(id);
                }
            }
        }
    }
    this.setWhenTable(id, jsCodes)
    return jsCodes;
};

/**
 * 注册 when start 事件
 * @return {void}
 */
MBlockly.WhenEvent.registerWhenStartblocks = function(id) {
    var idsArray = this.WhenTable.whenStartBlocks;
    if(idsArray.indexOf(id) == -1) {
        idsArray.push(id);
    }
};

/**
 * 执行某个组件下的 when block 的全部代码，通过组件的类型来判断执行代码的方式，有几种情形
 *        1. 执行
 *        2. 不执行
 * @param  {string} widgetId widget ID
 * @param {num} cpValue cp 控件上传递过来的值
 * @return {object} 返回当前正在激活的 activeRuntime.
 */
MBlockly.WhenEvent.activateWhenBlocks = function(widgetId, cpValue){
    var jsCodes = this.getWhenTable(widgetId);
    var widgetData = MBlockly.Data.getOne(widgetId);
    if(!widgetData) {
        return;
    }
    widgetType = widgetData.type;
    var targetCodes, runtime;
    cpValue = cpValue ? cpValue : 0;

    // 获取应该执行的代码，并开始执行
    if(widgetType == 'Button' || widgetType == 'DPad' || widgetType == 'Switch') {
        // 获取像 button, switch 等有两种状态值的组件传给的状态
        targetCodes = jsCodes[parseInt(cpValue)];
    } else if(widgetType == 'Slider') {
        // 获取像 slider 这种被动接受具体数值的组件
        targetCodes = jsCodes[this.WhenTable.stateTable.when_slider_changed];
    } else if(widgetType == 'Display') {
        targetCodes = jsCodes[this.WhenTable.stateTable.when_start];
    }
    if(targetCodes) {
        for(var i = 0; i < targetCodes.length; i++) {
            // 保证for里的指令是按顺序执行
            setTimeout((function(i) {
                var id = widgetId + '-' + cpValue;
                if(runtimeList[id]) {
                    runtimeList[id].stop();
                }
                runtime = new MBlockly.Runtime(widgetId);
                // runtimeList.push(runtime);
                runtimeList[id] = runtime;
                runtime.doInterpreter(xdecode(targetCodes[i]));
            })(i), 0);
        }
    }
    // 上一条指令执行完毕时，开放该id组件的指令执行
    setTimeout(function() {
        MBlockly.HostInterface.flagList[widgetId] = true;
    }, 100);
    return runtime;
};

/**
 * 定时执行所有 when start 组件中的代码块
 * @return {void}
 */
MBlockly.WhenEvent.runWhenStarts = function() {
    console.log('run whenStarts');
    var whenStartIds = this.WhenTable.whenStartBlocks;
    var that = this;
    for(var i = 0; i < whenStartIds.length; i++) {
        if(MBlockly.Settings.MODE_IN_CODING) {
            // coding 模式下，只执行当前组件的 when start 代码
            if(MBlockly.App.currentWidget.id == whenStartIds[i]) {
                // setTimeout((function() {
                    that.activateWhenBlocks(whenStartIds[i], null, i);
                // })(i), 30);
            }
        } else {
            console.log("【whenStartIds】：" + whenStartIds[i]);
            that.activateWhenBlocks(whenStartIds[i], null, i);
        }
    }
};

/**
 * 停止执行 when start 模块的 runTime，用来清理 forever 事件
 * @return {void}
 */
MBlockly.WhenEvent.stopWhenStarts = function() {
    if(MBlockly.Settings.MODE_WEBVIEW_ONLOAD) {
        // 停止运行所有runtime
        MBlockly.Runtime.stopRuntimeList();
        // 停止所有传感器已经响应的动作
        MBlockly.Control.stopAll();
    }
};

/**
 * 清理指定的 when start 块
 * @return {array} 返回剩余的 when start ID 列表
 */
MBlockly.WhenEvent.clearWhenStarts = function(id) {
    var idList = this.WhenTable.whenStartBlocks;
    for(var i = idList.length - 1; i >= 0; i--) {
        if(id == idList[i]) {
            idList.splice(i, 1);
        }
    }
    this.WhenTable.whenStartBlocks = idList;
    return idList;
};

/**
 * 重置 when start 块
 */
MBlockly.WhenEvent.resetWhenStarts = function() {
    this.WhenTable.whenStartBlocks = [];
};

/**
 * 从数据集中获取某个组件的 when table js 代码
 * @param  {string} widgetId widget id
 * @return {object} 返回该组件的对应的 js 执行代码
 */
MBlockly.WhenEvent.getWhenTable = function(widgetId){
    var jsCodes = {}, widgetData;
    widgetData = MBlockly.Data.getOne(widgetId);
    if(widgetData && (widgetData.code != "")) {
        // HACK: 处理Safari浏览器处理\n的问题，把\n转成特殊符号，在执行之前再转回来
        // （safari会把\n解析成回车导致JSON解析错误）
        // note: don't remove it from the origin data, because runtime.js `parseCode` need `\n`.
        var code = widgetData.code.replace(/\n/g,'!!');
        jsCodes = JSON.parse(code);

    }

    return jsCodes;
};

/**
 * 保存的某个组件的 when table js 代码到最终的数据集中
 * @param  {string} widgetId 被保存的when table
 * @param  {object} jsCode 编译并重组后的 js 代码对象
 * @return {void}
 */
MBlockly.WhenEvent.setWhenTable = function(widgetId, jsCodes){
    var jsCodesStr = JSON.stringify(jsCodes);
    MBlockly.Data.updateData(widgetId, "code", jsCodesStr);
};

MBlockly.WhenEvent.WhenTable = {
    stateTable: {
        'when_button_pressed_up': '0',
        'when_button_pressed_down': '1',
        'when_switch_on': '1',
        'when_switch_off': '0',
        'when_start': '1',
        'when_slider_changed': '1',
        'when_dpad_top_down': '11',
        'when_dpad_top_up': '10',
        'when_dpad_right_down': '21',
        'when_dpad_right_up': '20',
        'when_dpad_bottom_down': '31',
        'when_dpad_bottom_up': '30',
        'when_dpad_left_down': '41',
        'when_dpad_left_up': '40'
    },
    // 存储所有含有 `when start` block 块的widgetId
    whenStartBlocks: []
};



/**
 * 数据示例:
 * button:
  {
    "1": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮按下
    "0": ["jsCode1", "jsCode2", ..., "jsCoden"] // 按钮抬起
  }

  switch:
  {
    "1": ["jsCode1", "jsCode2", ..., "jsCoden"], // 开
    "0": ["jsCode1", "jsCode2", ..., "jsCoden"] // 关
  }

  dpad(四方按钮):
  {
    "00": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮1按下
    "01": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮1抬起
    "10": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮2按下
    "11": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮2抬起
    "20": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮3按下
    "21": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮3抬起
    "30": ["jsCode1", "jsCode2", ..., "jsCoden"], // 按钮4按下
    "31": ["jsCode1", "jsCode2", ..., "jsCoden"]  // 按钮4抬起
  }

  slider:
  {
    "1": ["jsCode1", "jsCode2", ..., "jsCoden"], // 默认行为
  }

  display:
  {
    "1": ["jsCode1", "jsCode2", ..., "jsCoden"], // 默认行为
  }
 */