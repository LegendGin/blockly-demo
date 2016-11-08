/**
 * Copyright 2015 Makeblock
 * Author: Wangyu
 * Description: provide an slider interface
 * to input numbers between 0-255;
 *
 */

 'use strict';

 goog.provide('MBlockly.NumpadInput');

 goog.require('Blockly.Blocks');

 MBlockly.NumpadInput = function(text, opt_changeHandler) {
    MBlockly.NumpadInput.superClass_.constructor.call(this, text);
};
goog.inherits(MBlockly.NumpadInput, Blockly.FieldTextInput);

/**
 * Clone this FieldTextInput.
 * @return {!Blockly.FieldTextInput} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
 MBlockly.NumpadInput.prototype.clone = function() {
    return new MBlockly.NumpadInput(this.getText(), this.changeHandler_);
};

Blockly.Blocks['math_number'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
     init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput()
        .appendField(new MBlockly.NumpadInput('0',
            Blockly.FieldTextInput.numberValidator), 'NUM');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

Blockly.Blocks['math_number_range'] = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
     init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput()
        .appendField(new MBlockly.NumpadInput('0',
            Blockly.FieldTextInput.numberValidator), 'NUM');
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

/**
 * modified by jeremy at Aug. 31
 */
Blockly.FieldTextInput.prototype.showEditor_ = function(opt_quietInput) {
  this.workspace_ = this.sourceBlock_.workspace;
  var quietInput = opt_quietInput || false;
  if (!quietInput && goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD) {

        // construct buttons
        var numpad_buttons = [
              'c', '-/+', '.',
              '7', '8', '9',
              '4', '5', '6',
              '1', '2', '3',
              '0', '='
        ];
        if(checkDeviceType().phone) {
          numpad_buttons = [
              'c', '-/+', '.','0',
              '9', '8', '7', '6',
              '5','4', '3', '2',
              '1', '='
          ];
        }
        var html_buttons = '<div class="numpad-buttons">';
        for (var i = 0; i < numpad_buttons.length; i++) {
            var btn = numpad_buttons[i];
            if (btn == '=') {
                html_buttons += '<button class="numpad-button" id="numpad-button-ok">=</button>';
            } else if (btn == '-/+') {
                html_buttons += '<button class="numpad-button" id="numpad-button-minus">-/+</button>';
            } else if (btn == '.') {
                html_buttons += '<button class="numpad-button" id="numpad-button-dot">.</button>';
            } else if (btn == 'c') {
                html_buttons += '<button id="numpad-backspace">C</button>';
            } else {
                html_buttons += '<button class="numpad-button numpad-button-numeric">' + btn + '</button>';
            }
        }
        html_buttons += '</div>';
        var html_display = '<div class="numpad-display-section"><div class="numpad-display-container">' +
        '<span id="numpad-display">0</span></div>' + '</div>';

        // render content to WidgetDiv and then show
        var content = '<div id="numpad">' + html_display + html_buttons + '</div>';
        this.showWidgetWithContent(content);

        // all dom operations below this line!
        // set button events
        var self = this;
        var $pad = $('#numpad');
        var $display = $('#numpad-display');
        var eventType = getEventType();

        //TO FIX: the events may be repeatly bound!
        $pad.on(eventType, '.numpad-button-numeric', function() {
            var originalText = $display.text();
            var newText = $(this).text();
            if (originalText.length > 6) {
                return;
            }
            if (originalText == '0') {
                originalText = '';
            }
            //if originalText is '-0', then 0 is prevented to input into
            if (originalText == '-0') {
              if (newText == 0) { //press 0
                return;
              }else{  //press other number
                originalText = '-';
              }
            }
            $display.text(''.concat(originalText, newText));
            self.setText(Number($display.text()));
        });
        $('#numpad-backspace').on(eventType, function() {
            $display.text('0');
            self.setText(0);
        });
        $('#numpad-button-minus').on(eventType, function() {
            var originalText = $display.text();
            var newText;
            if (originalText == '-') {
              newText = '0';
            }else if (Number(originalText) == 0) {
                newText = '-';
            }else{
                newText = -originalText;
            }
            $display.text(newText);
            if (originalText != '0') {
                self.setText(Number($display.text()));
            }
        });
        $('#numpad-button-dot').on(eventType, function() {
            var originalText = $display.text();
            var newText = originalText;
            if (originalText == '-') {
              newText = originalText + '0';
            }
            if (originalText.indexOf('.') == -1) {
                newText += "."
            }
            $display.text(newText);
            if (originalText != '0') {
                self.setText(Number($display.text()));
            }
        });
        $('#numpad-button-ok').on(eventType, function() {
            var originalText = $display.text();
            if (originalText == '-') {
                $display.text('0');
            }
            self.setText(Number($display.text()));
            self.hideWidget();
        });
        return;
  }

  // for Pc
  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());

  // Create the input.
  var htmlInput = goog.dom.createDom('input', 'blocklyHtmlInput');
  htmlInput.setAttribute('spellcheck', this.spellcheck_);
  var fontSize = (Blockly.FieldTextInput.FONTSIZE * this.workspace_.scale) + 'pt';
  Blockly.WidgetDiv.DIV.style.fontSize = fontSize;
  htmlInput.style.fontSize = fontSize;
  /** @type {!HTMLInputElement} */
  Blockly.FieldTextInput.htmlInput_ = htmlInput;
  Blockly.WidgetDiv.DIV.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  if (!quietInput) {
    htmlInput.focus();
    htmlInput.select();
  }

  // Bind to keydown -- trap Enter without IME and Esc to hide.
  htmlInput.onKeyDownWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
  // Bind to keyup -- trap Enter; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
  htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
  this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};