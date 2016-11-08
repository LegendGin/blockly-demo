/**
 * Copyright 2015 Makeblock
 * Author: hujinhong
 * Description: provide an led panel to choose
 *
 */

'use strict';

goog.provide('MBlockly.LedMatrix');

goog.require('Blockly.Blocks');

MBlockly.LedMatrix = function(text, type) {
    this.type = type;
    MBlockly.LedMatrix.superClass_.constructor.call(this, text);
};
goog.inherits(MBlockly.LedMatrix, Blockly.FieldTextInput);

/**
 * Clone this FieldTextInput.
 * @return {!Blockly.FieldTextInput} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
MBlockly.LedMatrix.prototype.clone = function() {
    return new MBlockly.LedMatrix(this.getText(), this.changeHandler_);
};

/**
 * Define block `led_matrix`.
 */
Blockly.Blocks['led_matrix'] = {
    /**
     * Block for led matrix value.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(MBlockly.BlockKeeper.HUE.math);
        this.appendDummyInput()
            .appendField(new MBlockly.LedMatrix('8*8', '8_8'));
        this.setOutput(true, 'String');
    }
};

/**
 * Define block `led_matrix_8_16`.
 */
Blockly.Blocks['led_matrix_8_16'] = {
    /**
     * Block for led matrix value.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(MBlockly.BlockKeeper.HUE.math);
        this.appendDummyInput()
            .appendField(new MBlockly.LedMatrix('8*16', '8_16'));
        this.setOutput(true, 'String');
    }
};

// 在field.js中有定义
MBlockly.LedMatrix.prototype.showEditor_ = function(opt_quietInput) {
    var selectedItems = this.getText();

    var matrixbox = [8,8];
    var matrixboxClass = "matrix-8-8";

    if(this.type == "8_16") {
        matrixbox = [16, 8];
        matrixboxClass = "matrix-8-16"
    }

    var that = this;
    var content = '<div class="mdialog ' + matrixboxClass + '">' +
        '<div class="mdialog-head">' +
        '<div class="btn cancel">Cancel</div>' +
        '<div class="btn confirm">Confirm</div>' +
        '</div>' +
        '<div class="mdialog-body led-matrix">' +
        '<div class="led-panel"></div>' +
        '</div>' +
        '</div>';

    // show widget
    this.showWidgetWithContent(content);

    for(var i = 0; i < matrixbox[0]; i++) {
        for (var j = 0; j < matrixbox[1]; j++) {
            var eleHtml = '<b class="led-cell" data-state="0">' + (j + 8*i) + '</b>';
            $('.led-panel').append($(eleHtml));
        }
    }

    var eventType = getEventType();

    $('.led-panel').on(eventType, '.led-cell', function() {
        var state = $(this).attr('data-state');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).attr('data-state', 0);
        } else {
            $(this).addClass('active');
            $(this).attr('data-state', 1);
        }
    });

    $('.mdialog-head .cancel').on(eventType, function() {
        dialog.setVisible(false);
        dialog.setDisposeOnHide(false);
    });
    $('.mdialog-head .confirm').on(eventType, function() {

        // get leds
        var leds = [];
        var list = $('.led-cell');
        for(var i = 0; i < list.length; i++) {
            leds.push($(list[i]).attr('data-state'));
        }
        // that.setText(leds.join('-'));
        that.setText('hello');

        dialog.setVisible(false);
        dialog.setDisposeOnHide(false);
    });
};

