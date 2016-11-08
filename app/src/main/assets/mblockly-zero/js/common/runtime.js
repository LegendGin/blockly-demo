/**
 * @description runtime.js - store runtime information and manage interpreter for MBlockly
 * @author Wang Yu (wangyu@makeblock.cc)
 * @copyright 2015 Makeblock.cc
 */

goog.provide('MBlockly.Runtime');


MBlockly = MBlockly || {};

MBlockly.Runtime = function(id){
    this.onFinish = null;
    this.highlightPause = false;
    this.stepTimer = null;
    this.isFinished = false;
    this.nextStepDelay = MBlockly.Runtime.IntervalBetweenSteps;
    this.topBlockID = 0;
    this.widgetId = id ? id : null;
};

MBlockly.Runtime.IntervalBetweenSteps = 0; // delay 1ms between blocks

/**
 * 高亮指定 block 块.
 * @param  {string} id 每个 block 块都具有唯一的 id.
 * @return {void}
 */
MBlockly.Runtime.prototype.highlightBlock = function(id) {
    if(MBlockly.Settings.OPEN_HIGHLIGHT) {
        // when 代码块不进行高亮
        if(id != this.topBlockID){
            workspace.highlightBlock(id);
        }
        this.highlightPause = true;
    }
};

MBlockly.Runtime.prototype.print = function(msg){
    document.getElementById('log').childNodes[0].nodeValue = msg;
};

/**
 * 从顶部块开始，将关联的 block 块生成 js 代码字符串，生成整体block块，是整合的过程，单个块的代码
 * 生成位于 `block_keeper.js` 里。
 * @param  {object} startBlock 顶部 block 块
 * @return {string} 返回 js 代码字符串
 */
MBlockly.Runtime.parseCode = function(startBlock){
    // Generate JavaScript code and parse it.
    var code;

    // Highlight code
    if(MBlockly.Settings.OPEN_HIGHLIGHT) {
        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');
    }

    if(startBlock){
      Blockly.JavaScript.init(workspace);
      code = Blockly.JavaScript.blockToCode(startBlock);
      if(typeof code == "object") {
        code = code[0] + ";";
      }
      code = Blockly.JavaScript.finish(code);
    }
    else{
      // 没有顶部 block 块的代码生成，实际就是对整个 workspace 的代码进行生成.
      code = Blockly.JavaScript.workspaceToCode(workspace);
    }
    MBlockly.Runtime.topBlockID = startBlock ? startBlock.id : 0;

    code = code.split("window.alert").join("print");
    var array = code.split("\n");
    for (var i = 0; i < array.length; i++) {
        var c = array[i];
        if (c.indexOf("getSensorValue") > -1) {
            var split = "getSensorValue" + c.split("getSensorValue")[1].split(")")[0] + ")";
            var output = split + ";\n"+c.split(split).join("getResponseValue()") + "\n" ;
            code = code.split(c).join(output);
        }
    }
    return code;
};

MBlockly.Runtime.prototype.doInterpreter = function(code) {
    this.evalCodeViaJsInterpreter(code);
    // this.evalCodeDirectly(code);
};

/**
 * TODO: 待完善
 * 直接使用 eval 来解析执行代码块
 * Notice: you cannot stop the procession when eval begins in this way.
 * @param  {String} code code to be eval.
 */
MBlockly.Runtime.prototype.evalCodeDirectly = function(code) {
    window.highlightBlock = this.highlightBlock;
    var blockFuncMap = MBlockly.BlockKeeper.getBlocks();

    var allCodes = code.split(";");
    for(var i = 0; i < allCodes.length; i++) {
        var stepCode = allCodes[i];

        if(!stepCode.hasStr("highlightBlock")) {
            // get block name
            var blockName = stepCode.split("(")[0].split("blockly_js_func_")[1];
            if(blockName) {
                var args = stepCode.split("(")[1].replace(")","").split(",");
                for(var j in args) {
                    args[j] = args[j].replace(/\"/g, "");
                }
                blockFuncMap[blockName].handler(args[0], args[1], args[2], args[3], args[4]);
            }
        }
    }
    // try {
    //   eval(code);
    // } catch (e) {
    //   console.log('【error】' + e);
    // }
};

/**
 * 用 JS Interpreter 来执行编译后的 js 代码块
 * @param  {string} code 编译后的 js 代码块
 */
MBlockly.Runtime.prototype.evalCodeViaJsInterpreter = function(code) {
    // 注册 block 块对应的方法
    this.interpreter = new Interpreter(code, this.initApi);
    this.interpreter.runtime = this;
    if(MBlockly.Settings.OPEN_HIGHLIGHT) {
        this.highlightPause = false;
        workspace.traceOn(true);
        workspace.highlightBlock(null);
    }
    // 分步解析代码块
    this.step();
};

/**
 * 决定程序是否执行的关键性语句
 * @return {void | boolean}
 */
MBlockly.Runtime.prototype.step = function(){
    var that = this;
    if(this.isFinished) {
        return;
    }
    if(this.isPaused && !this.isFinished){
        return;
    }
    try{
        if(this.interpreter.step()){
            var delay = this.nextStepDelay;
            // 当设置了 wait 以后，记得还原正常nextStep的值
            this.nextStepDelay = MBlockly.Runtime.IntervalBetweenSteps;
            this.stepTimer = setTimeout(function() {
                that.step();
            }, delay);
        }
        else{   // the program is done
            this.callback && this.callback();
            if(this.onFinish){
                this.stop();
            }
        }
    }
    catch (err){
        console.log("【error】" + err);
        if(err == 'BleDisconnected'){
            this.stop();
        }
    }
};

MBlockly.Runtime.prototype.wait = function(time){
    this.nextStepDelay = time * 1000;
};

// 只是暂停了语句解析，对于已经执行的指令，并没有停止。如果要停止指令，还需要记录该runtime已经
// 发生的指令
MBlockly.Runtime.prototype.pause = function(){
    if(this.stepTimer){
        clearTimeout(this.stepTimer);
    }
    this.isPaused = true;
};

MBlockly.Runtime.prototype.resume = function(){
    this.isPaused = false;
    this.step();
};

MBlockly.Runtime.prototype.stop = function(){
    // 停止当前语句解析
    this.pause();
    this.isFinished = true;  // 注意，如果没有这个值，传感器返回具体值后，会resume
};

// 注册API事件
MBlockly.Runtime.prototype.initApi = function(interpreter, scope){
    // Add an API function for the alert() block.
    var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(alert(text));
    };
    interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for highlighting blocks.
    var wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(interpreter.runtime.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for wait blocks.
    var wrapper = function(d) {
        return interpreter.createPrimitive(interpreter.runtime.wait(d));
    }
    interpreter.setProperty(scope, 'wait', interpreter.createNativeFunction(wrapper));

    // Add API function for other customize blocks defined in blocks_*.js
    var keepedBlocks = MBlockly.BlockKeeper.getBlocks();
    var that = this;
    for(var blockName in keepedBlocks){
        var block = keepedBlocks[blockName];
        (function(block){
          // 注册block块的代码
          var wrapper = function(){
            // 实现的是runtime调用block块中定义的方法, interpreter中会有方法来触发这些方法
            return interpreter.createPrimitive(block.handler.apply(interpreter.runtime, arguments));
          }
          interpreter.setProperty(scope, block.funcName, interpreter.createNativeFunction(wrapper));
        })(block);
    }
};


MBlockly.Runtime.stopRuntimeList = function() {
    for(var i in runtimeList) {
        if(runtimeList[i]) {
            runtimeList[i].stop();
        }
    }
    runtimeList = {};

    // for (var i = runtimeList.length -1; i > -1; i--) {
    //     setTimeout((function() {
    //         if(runtimeList[i]) {
    //             runtimeList[i].stop();
    //             runtimeList.pop();
    //         }
    //     })(i), 10);
    // }
};


// 记录每次runtime
var runtimeList = {};