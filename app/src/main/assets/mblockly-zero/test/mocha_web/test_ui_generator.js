'use strict';

var workspace = null;

MBlockly.App = {
    currentWidget: {
        id: null
    }
};
if(typeof TellNative == 'undefined') {
        window.TellNative = {
            requestLoadProject: function(){},
            reportCurrentWidget: function(){},
            saveControlPanel: function(){},
            sendValueToWidget: function(){},
            sendViaBluetooth: function(){},
            requestBluetoothReconnect: function(){},
            sendViaBluetoothUnreliably: function(){}
        };
    }

// 对不同的组件，是否开启过滤begin菜单里block块的类型
MBlockly.Settings.FILTER_BEGIN_BLOCKS = false;

// 对不同的主板，是否开启过滤block块选项
MBlockly.Settings.FILTER_BLOCKS_FOR_BOARDS = false;

function start() {
  workspace = Blockly.inject('blocklyDiv',
      {grid:
         {spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true},
       media: '../../vendors/blockly/media/',
       toolbox: document.getElementById('toolbox'),
       zoom: {controls: true, wheel: true}
       });
}

start();
registerEvents();


function registerEvents() {
    $('#deviceType').on("change", function() {
        var type = $(this).val();

        if(type == "all") {
            MBlockly.Settings.FILTER_BLOCKS_FOR_BOARDS = false;
        } else {
          MBlockly.Settings.FILTER_BLOCKS_FOR_BOARDS = true;
          MBlockly.Control.setDeviceInfo( {
            "type": type
          });
        }
    });
};


function loadXml() {
  var dropdown = document.getElementById('testUrl');
  var url = dropdown.options[dropdown.selectedIndex].value;
  if (!url) {
    url = window.prompt('Enter URL of test file.');
    if (!url) {
      return;
    }
  }
  var xmlText = fetchFile(url);
  if (xmlText !== null) {
    fromXml(xmlText);
  }
}

function fetchFile(xmlUrl) {
  try {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', xmlUrl, false);
    xmlHttp.setRequestHeader('Content-Type', 'text/xml');
    xmlHttp.send('');
  } catch (e) {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to load XML data.\n';
    if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'Use an http webserver, or a less paranoid browser.\n';
    }
    alert(msg + '\n' + e);
    return null;
  }
  return xmlHttp.responseText;
}

function renderXml() {
  var output = document.getElementById('importExport');
  var xmlText = output.value;
  output.scrollTop = 0;
  output.scrollLeft = 0;
  workspace.clear();
  try {
    var xmlDoc = Blockly.Xml.textToDom(xmlText);
  } catch (e) {
    alert('Error parsing XML:\n' + e);
    return;
  }
  Blockly.Xml.domToWorkspace(xmlDoc, workspace);
}

function oneLimeXml() {
  var output = document.getElementById('importExport');
  var xmlText = output.value;
  var text = xmlText.replace(/\n/g, '');
  output.value = text;
}

function fromXml(xmlText) {
  var output = document.getElementById('importExport');
  output.value = xmlText;
  output.scrollTop = 0;
  output.scrollLeft = 0;
  workspace.clear();
  try {
    var xmlDoc = Blockly.Xml.textToDom(xmlText);
  } catch (e) {
    alert('Error parsing XML:\n' + e);
    return;
  }
  Blockly.Xml.domToWorkspace(xmlDoc, workspace);
}

function setOutput(text) {
  var output = document.getElementById('importExport');
  output.value = text;
  output.focus();
  // output.select();
}

function toXml() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  xmlText = xmlText.replace(/ id="\d+"/g, '');
  setOutput(xmlText);
}

function clearWorkspace() {
  workspace.clear();
}

function toJavaScript() {
  var oneBasedIndexing = document.getElementById('indexing').checked;
  Blockly.JavaScript.ONE_BASED_INDEXING = oneBasedIndexing;
  var code = '\'use strict\';\n\n'
  code += Blockly.JavaScript.workspaceToCode(workspace);
  setOutput(code);
}

function runCode() {
    var code = MBlockly.Runtime.parseCode();
    var runtime = new MBlockly.Runtime();
    runtime.callback = function() {
      setOutput(runtime.result);
    }
    runtime.evalCodeViaJsInterpreter(code);
}

//生成一份简化的 code
//为交互课程定制的
function simplifyCode(){
    var oneBasedIndexing = document.getElementById('indexing').checked;
    Blockly.JavaScript.ONE_BASED_INDEXING = oneBasedIndexing;
    var targetCode = '', codePice = '', codeList;
    var code = '请复制以下代码:\n\n'
    targetCode = Blockly.JavaScript.workspaceToCode(workspace) || '';
    targetCode = targetCode.replace(/highlightBlock\(\S*\)\;/g, '~~');
    //获取与 start_whengo 连接块
    var codeList = targetCode.split('\n\n') || [];
    for (var i = 0; codePice = codeList[i]; i++) {
      if( codePice.indexOf('when_start') > -1){
        targetCode = codePice.replace(/when_start/g, 'start_whengo');
        break;
      }
    }
    //对目标代码简化
    targetCode = targetCode.replace(/blockly_js_func_/g, '').replace(/~~|\n|\s/g, '');
    //对特定符号进行替换
    targetCode = targetCode.replace(/\'/g, '##').replace(/NaN/g, "\"none\"");
    code += targetCode;
    setOutput(code);
}

// 生成 makeblockhd可以被使用的code
function toCode() {
  var result = "";

  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);
  var xmlData = xencode(xmlText);

  result += "xmlData：" + '\n\n' + xmlData + '\n\n';

  var code = MBlockly.WhenEvent.generateJsCodes();
  var jsCodesStr = JSON.stringify(code).replace(/"/g, '\\"');


  result += "code：" + '\n\n' + jsCodesStr + '\n\n';

  setOutput(result);
}

function beginTest() {
  $('.current-block-category').text("Begin render blocks...");
  var xmlList = [
    "begin.xml",
    "move.xml",
    "display.xml",
    "event.xml",
    "detect.xml",
    "math.xml",
    "controls.xml",
    "blockly_logic.xml",
    "blockly_loops.xml",
    "blockly_math.xml",
    "blockly_text.xml",
    "blockly_lists.xml",
    "blockly_colour.xml",
    "blockly_variables.xml",
    "blockly_functions.xml",
    "blockly_webapi.xml"
  ];
  var i = 0;

  var renderXml = function(index) {
    if(i < xmlList.length) {
      i++;
      var xmlText = fetchFile('blocks-xml/' + xmlList[index]);
      if (xmlText !== null) {
        addActiveClass(document.getElementById(":" + i.toString(16)));
        fromXml(xmlText);
      }
      setTimeout(function() {
        renderXml(i);
      }, 500);
    } else {
      $('.current-block-category').text("blocks rendering has done!");
      $('.active').removeClass("active");
    }
  };

  renderXml(0);
}

function addActiveClass(element) {
  $('.active').removeClass("active");
  $(element).addClass("active");
}