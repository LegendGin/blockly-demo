MBlockly.BlockKeeper.makeBlock('show_msg', ['=VALUE'], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.webapi);

    this.appendDummyInput()
        .appendField("Show");
    this.appendValueInput('VALUE');

    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setPreviousStatement(true);
}, function(value){
    value = value ? value.toString() : "empty";
    this.result = value.toString();
    console.info(this.result);
});


MBlockly.BlockKeeper.makeBlock('web_get_whether', [], function(){
    this.setColour(MBlockly.BlockKeeper.HUE.webapi);

    this.appendDummyInput()
        .appendField("get whether info");

    this.setInputsInline(true);
    this.setOutput(true, 'Text');
    this.setNextStatement(false);
    this.setPreviousStatement(false);
}, function(){
    var info = "Hello, 今天是个好天气"
    this.result = info;
    return info;

}, Blockly.JavaScript.ORDER_FUNCTION_CALL);