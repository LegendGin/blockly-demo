/**
 * 验证语句块是否正确：语句块名称、参数名、最后的函数名
 * 模拟运行语句块
 */
describe('Blocks', function() {
    MBlockly.Settings.OPEN_HIGHLIGHT = false;
    MBlockly.Settings.OPEN_RESNET_MODE = false;
    MBlockly.App = {
        currentWidget: {
            id: null
        }
    };

    // 协议测试工具函数封装
    function testProtocol(type, code, protocols, done, expectFunc) {
        MBlockly.Control.setDeviceInfo({
            "type": type
        });
        var runtime = new MBlockly.Runtime();
        // 移除runtime.pause
        runtime.pause = function() {};
        runtime.evalCodeViaJsInterpreter(code);
        runtime.callback = function() {
            try {
                expectFunc();
                done();
                cmdList = [];
            } catch (err) {
                done(err);
            }
        };
    }

    var cmd = null,
        cmdList = [];
    // override 控制命令发送接口
    MBlockly.HostInterface.sendBluetoothRequestUnrelibly = function(dataArray) {
        cmd = intArrayToHexArray(dataArray).join(" ");
        cmdList.push(cmd);
        console.log(cmd);
    };

    // override 读值命令发送接口
    MBlockly.HostInterface.sendBluetoothRequest = function(dataArray) {
        cmd = intArrayToHexArray(dataArray).join(" ");
        cmdList.push(cmd);
        console.log(cmd);
    };


    /* block_start */
    describe('block_start', function() {

        describe('#when_slider_changed', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="when_slider_changed" data-widgetType="Slider" data-blockType="when" data-deviceType="all"></block>' +
                '</xml>';
            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            window.workspace = workspace;
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = null;

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length)
            });

            // 验证 block 块生成的代码是否正确
            it('should get code "blockly_js_func_when_slider_changed();"', function() {
                MBlockly.Settings.OPEN_HIGHLIGHT = false;
                code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");
                expect("blockly_js_func_when_slider_changed();").to.eql(code)
            });

            // 验证 block 块背后的代码能否被正确执行
            it('should be excuted successfully', function() {
                var error = 0;
                var runtime = new MBlockly.Runtime();
                try {
                    runtime.evalCodeViaJsInterpreter(code);
                } catch (e) {
                    error++;
                }
                expect(true).to.eql(error == 0);
            });
        });
    });

    /* block_move */
    describe('block_move', function() {

        describe('#move_run', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="move_run" data-deviceType="all">' +
                '<value name="SPEED">' +
                '<block type="math_number">' +
                '<field name="NUM">100</field>' +
                '</block>' +
                '</value>' +
                '</block>' +
                '</xml>';

            var protocols = {
                "mcore": ["ff 55 06 00 02 0a 09 9c ff", "ff 55 06 00 02 0a 0a 64 00"],
                "orion": ["ff 55 06 00 02 0a 09 9c ff", "ff 55 06 00 02 0a 0a 64 00"],
                "auriga": ["ff 55 07 00 02 3d 00 01 9c ff", "ff 55 07 00 02 3d 00 02 64 00"],
                "megaPi": ["ff 55 07 00 02 3d 00 01 9c ff", "ff 55 07 00 02 3d 00 02 64 00"]
            };

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code "blockly_js_func_move_run("100","FORWARD");"', function() {
                expect('blockly_js_func_move_run("100","FORWARD");').to.eql(code);
            });

            // 协议测试
            for (var i in protocols) {
                (doIt)(i);
            }

            function doIt(type) {
                it('should get 【' + i + '】left motor cmd: 【' + protocols[i][0] + '】 and right motor cmd: 【' + protocols[i][1] + '】', function(done) {
                    testProtocol(type, code, protocols, done, function() {
                        expect(protocols[type][0]).to.eql(cmdList[0]);
                        expect(protocols[type][1]).to.eql(cmdList[1]);
                    });
                });
            }
        });
    });

    /* block_display */
    describe('block_display', function() {
        describe('#play_tone', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="play_tone" data-deviceType="auriga-mcore"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_play_tone("C5");'; // 四分之一节拍
            var protocols = {
                "mcore": ["ff 55 07 00 02 22 0b 02 fa 00"],
                "auriga": ["ff 55 08 00 02 22 2d 0b 02 fa 00"]
            };

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            // 协议测试
            for (var i in protocols) {
                (doIt)(i);
            }

            function doIt(type) {
                it('should get【' + i + '】cmd: 【' + protocols[i][0] + '】', function(done) {
                    testProtocol(type, code, protocols, done, function() {
                        expect(protocols[type][0]).to.eql(cmdList[0]);
                    });
                });
            }
        });

        describe('#play_tone_full', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="play_tone_full" data-deviceType="auriga-mcore"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_play_tone_full("A2","Quarter");'; // 四分之一节拍
            var protocols = {
                "mcore": ["ff 55 07 00 02 22 6e 00 fa 00"],
                "auriga": ["ff 55 08 00 02 22 2d 6e 00 fa 00"]
            };

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            // 协议测试
            for (var i in protocols) {
                (doIt)(i);
            }

            function doIt(type) {
                it('should get【' + i + '】cmd: 【' + protocols[i][0] + '】', function(done) {
                    testProtocol(type, code, protocols, done, function() {
                        expect(protocols[type][0]).to.eql(cmdList[0]);
                    });
                });
            }
        });

    });

    /* block_event */
    describe('block_event', function() {
        describe('#tablet_shaked', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="tablet_shaked"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_tablet_shaked();'; // 四分之一节拍

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            it('should get tablet shaked state : true', function(done) {
                MBlockly.Control.tabletLastShakeTime = (new Date()).getTime() / 1000;
                var runtime = new MBlockly.Runtime();
                runtime.evalCodeViaJsInterpreter(code);
                runtime.callback = function() {
                    try {
                        expect(runtime.result).to.be.ok();
                        done();
                    } catch (err) {
                        done(err);
                    }
                };
            });
        });

        describe('#event_linefollower_reads', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="event_linefollower_reads" data-deviceType="all"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_event_linefollower_reads("BLACK_BLACK","PORT-6");';
            var protocols = {
                "mcore": ["ff 55 04 02 01 11 06"],
                "orion": ["ff 55 04 03 01 11 06"],
                "auriga": ["ff 55 04 04 01 11 06"],
                "megaPi": ["ff 55 04 05 01 11 06"]
            };

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");
            console.log(code);

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            // 协议测试
            for (var i in protocols) {
                (doIt)(i);
            }

            function doIt(type) {
                it('should get 【' + i + '】cmd: 【' + protocols[i][0] + '】', function(done) {
                    testProtocol(type, code, protocols, done, function() {
                        expect(protocols[type][0]).to.eql(cmdList[0]);
                    });
                });
            }

            // 接口逻辑测试，模拟真实环境的返回值，测试整个逻辑是否顺畅
            // 1. 执行该块的语句
            // 2. 模拟巡线传感器的模拟值
            // 3. 获取该语句的返回结果，与预置的值进行比对
            // it('should get true when read line_follow_sensor\'s BLACK_BLACK state', function(done) {
            //     var that = MBlockly.Control;
            //     var runtime = new MBlockly.Runtime();
            //     runtime.evalCodeViaJsInterpreter(code);

            //     setTimeout(function() {
            //         that.PromiseList.receiveValue(that.CURRENT_CMD_INDEX, 0);
            //     }, 100);

            //     runtime.callback = function() {
            //         try {
            //             var result = runtime.result.toString() == '0';
            //             expect(result).to.ok();
            //             done();
            //         } catch (err) {
            //             done(err);
            //         }
            //     };
            // });
        });
    });

    /* block_detect */
    describe('block_detect', function() {
        describe('#detect_get_slider_value', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="detect_get_slider_value" data-deviceType="all"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_detect_get_slider_value("0");';

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            it('should get widget 1, result 100', function(done) {
                var runtime = new MBlockly.Runtime();
                runtime.widgetId = 1;
                runtime.evalCodeViaJsInterpreter(code);
                runtime.callback = function() {
                  try{
                    expect(100).to.eql(runtime.result);
                    done();
                  }catch(err) {
                    done(err);
                  }
                };
            });
        });

        describe('#detect_ultrasonic', function() {
            var xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
                '<block type="detect_ultrasonic" data-deviceType="all"></block>' +
                '</xml>';
            var jsCode = 'blockly_js_func_detect_ultrasonic("PORT-6");';
            var protocols = {
                "mcore": ["ff 55 04 02 01 01 06"],
                "orion": ["ff 55 04 03 01 01 06"],
                "auriga": ["ff 55 04 04 01 01 06"],
                "megaPi": ["ff 55 04 05 01 01 06"]
            };

            var dom = Blockly.Xml.textToDom(xml);
            var workspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(dom, workspace);
            var block = workspace.getTopBlocks()[0];
            var code = MBlockly.Runtime.parseCode(block).replace(/\n/g, "");
            console.log(code);

            // 验证 block 块的定义
            it('should render 1 block in workspace', function() {
                expect(1).to.eql(workspace.getTopBlocks().length);
            });

            // 验证 block 块生成的代码是否正确
            it('should get code ' + jsCode, function() {
                expect(jsCode).to.eql(code);
            });

            // 协议测试
            for (var i in protocols) {
                (doIt)(i);
            }

            function doIt(type) {
                it('should get 【' + i + '】cmd: 【' + protocols[i][0] + '】', function(done) {
                    testProtocol(type, code, protocols, done, function() {
                      var index = MBlockly.Control.CURRENT_CMD_INDEX;
                      if(index < 10) { index = '0' + index; }
                      var temp = protocols[type][0].split(" ");
                      // 改变索引号
                      temp[3] = index;
                      expect(temp.join(" ")).to.eql(cmdList[0]);
                    });
                });
            }
        });
    });

    /* block_math */
    describe('block_math', function() {

    });

    /* block_control */
    describe('block_control', function() {

    });
});