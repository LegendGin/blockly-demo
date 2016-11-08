// Add method to customize widget content
Blockly.FieldTextInput.prototype.showWidgetWithContent = function(htmlStr) {
    Blockly.WidgetDiv.DIV.innerHTML = htmlStr;
    Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, null, true);
};

Blockly.FieldTextInput.prototype.hideWidget = function(htmlStr) {
    Blockly.WidgetDiv.hide();
};

