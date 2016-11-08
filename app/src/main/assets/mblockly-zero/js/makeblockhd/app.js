/**
 * @description define base interactive actions for the stage.
 * @author Hujinhong
 * @copyright 2015 Makeblock.cc
 */
MBlockly = MBlockly || {};

// Create a namespace.
MBlockly.App = {
    currentProject: null,
    currentWidget: {},
    // To Improve: 用于 mblockly.flyout.js中判断左边菜单中block块是否启动类型过滤
    currentTabIndex: null,
    // 记录当前组件ID列表
    widgetIds: [],
    // 顶部组件显示的数量
    TOP_WIDGET_SHOW_NUMS: 5,
    // 移动端顶部组件显示的数量
    TOP_WIDGET_SHOW_NUMS_FOR_PHONE: 5,
    //全局自定义变量
    globalVariableList: []
};

MBlockly.App.getTopWidgetShowNums = function() {
    if(checkDeviceType().phone) {
        return this.TOP_WIDGET_SHOW_NUMS_FOR_PHONE;
    } else {
        return this.TOP_WIDGET_SHOW_NUMS;
    }
};

MBlockly.App.addTopWidgetItem = function(itemData) {
    console.log('新增顶部组件 ' + itemData.id);
    var itemHtml = '<li class="item" data-id="' + itemData.id + '" data-name="' + itemData.name + '" data-type="' + itemData.type + '"><div class="img-wrap"><img src="' + itemData.icon +
                         '" alt="' + itemData.name + '"/></div></li>';
    $("#scroller").data('owlCarousel').addItem(itemHtml);
    this.widgetIds.push(itemData.id);
    if(!itemData.code || itemData.code == "undefined") {
        this.widgetOnLoad(itemData.id);
    }
    this.checkTopWidgetNav();
};

/**
 * 移除顶部UI组件条目
 * @param  {string} id 待删除的组件id
 * @return {num} 返回剩余组件数量
 */
MBlockly.App.removeTopWidgetItem = function(id) {
    for(var i = 0; i < this.widgetIds.length; i++) {
        if(this.widgetIds[i] == id) {
            $("#scroller").data('owlCarousel').removeItem(i);
            this.widgetIds.splice(i, 1);
        }
    }
    this.checkTopWidgetNav();
};

/**
 * 清空顶部组件内容.
 */
MBlockly.App.resetUi = function() {
    $("#scroller").html("");
    $('#viewport .arrow').hide();
    $('.name-value').text("");
    this.widgetIds = [];
    this.clearMainWorkspace();
};

MBlockly.App.widgetOnLoad = function(id) {
    var targetData = MBlockly.Data.getOne(id);
    var name = targetData.name + '-' + id;

    // 报告当前的widgetId
    MBlockly.HostInterface.reportCurrentWidget(id);
    // 隐藏左边展出栏
    workspace.toolbox_.clearSelection();

    this.updateWidgetName(name);

    this.currentWidget.id = id;
    this.currentWidget.type = targetData.type;
    this.loadProject(id);

    $('#widgets .onactive').removeClass('onactive');
    $('[data-id="' + id + '"]').addClass('onactive');
    $('#scroller').trigger("owl.goTo", this.widgetIds.indexOf(id));
};

MBlockly.App.updateWidgetName = function(text) {
    text ? text : "";
    $('.name-value').text(text);
    var nameWrapper = $('.name-wrapper');
    var nameValue = $('.name-value');

    nameWrapper.attr({
        'width': MBlockly.Settings.NAME_WRAPPER_MIN_WIDTH,
        'transform': 'translate(-' + MBlockly.Settings.NAME_WRAPPER_MIN_WIDTH/2 + ' 20)'
    });

    if(nameValue.width() >= nameWrapper.width()) {
        var newW = nameValue.width() + 40;

        if(newW >= MBlockly.Settings.NAME_WRAPPER_MAX_WIDTH) {
            newW = MBlockly.Settings.NAME_WRAPPER_MAX_WIDTH;
        }
        nameWrapper.attr({
            'width': newW,
            'transform': 'translate(-' + (newW)/2 + ' 20)'
        });
    }

    $('.name-value').attr({
        'transform': 'translate(-' + (nameValue.width()/2) + ' 20)'
    });
};

MBlockly.App.updateWidgetXmlData = function(id) {
    try {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var xmlData = xencode(Blockly.Xml.domToText(xml));
        MBlockly.Data.updateData(id, "xmlData", xmlData);
    } catch(e) {
        console.log("【error】" + e);
    }
};

MBlockly.App.activeTopWidget = function(nums) {
    var that = this;
    var owl = $("#scroller");
    owl.owlCarousel({
        items : nums, //items above 1000px browser width
        itemsDesktop : [1000,nums], // items between 1000px and 901px
        itemsDesktopSmall : [900,nums], // betweem 900px and 601px
        itemsTablet: [600,nums], //items between 600 and 0
        itemsMobile : true // itemsMobile disabled - inherit from itemsTablet option
    });

    this.isTopWidgetInit = true;

    // Custom Navigation Events
    $(".arrow-right").click(function(){
      owl.trigger('owl.next');
    })
    $(".arrow-left").click(function(){
      owl.trigger('owl.prev');
    })
};

MBlockly.App.checkTopWidgetNav = function() {
    if(this.widgetIds.length <= this.TOP_WIDGET_SHOW_NUMS) {
        $('#viewport .arrow').hide();
    } else {
        $('#viewport .arrow').show();
    }
};

/**
 * Load store project
 * @private
 */
MBlockly.App.loadProject = function(id) {
    this.globalVariableList = Blockly.mainWorkspace.variableList.concat();
    this.clearMainWorkspace();
    if(MBlockly.Data.hasOne(id)) {
        this.currentProject = MBlockly.Data.getOne(id);
        if(this.currentProject['xmlData'].length != 0) {
            var xmlData = xdecode(this.currentProject['xmlData']);
            var xml = Blockly.Xml.textToDom(xmlData);
            Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            this.globalVariableList.forEach(function(val){
                -1 == Blockly.mainWorkspace.variableIndexOf(val) && Blockly.mainWorkspace.variableList.push(val);
            })
        }
    }
};

/**
 * clear mainWorkspace.
 * @private
 */
MBlockly.App.clearMainWorkspace = function() {
    Blockly.mainWorkspace.clear();
};

MBlockly.App.isWorkspaceEmpty = function() {
    return !(workspace.svgBlockCanvas_.childElementCount > 0);
};

MBlockly.App.runCode = function(event) {
    var self = this;
    var widgetId = MBlockly.App.currentWidget.id;
    if (typeof(activeRuntime) == 'undefined' || !activeRuntime) {
        window.activeRuntime = MBlockly.WhenEvent.activateWhenBlocks(widgetId);
    } else {
        activeRuntime.stop();
        activeRuntime = null;
    }
};

MBlockly.App.switchGoButtonToStop = function() {
    activeRuntime.onFinish = function() {
        if (!MBlockly.Control.isMotorMoving) {
            activeRuntime = null;
        }
    }
};

/**
 * Workspace changes handler.
 * When workspace changes, update current widget's xml and jsCode.
 */
MBlockly.App.workspaceChangeHandler = function() {
    var that = MBlockly.App;
    that.reSetPage();
    setTimeout(function() {
        MBlockly.WhenEvent.generateJsCodes();
        that.updateWidgetXmlData(that.currentWidget.id);
    }, 100);
};

MBlockly.App.checkUndoAndRedoState = function() {
    if(Blockly.mainWorkspace.undoStack_.length) {
        $('.undo').addClass('active');
    } else {
        $('.undo').removeClass('active');
    }

    if(Blockly.mainWorkspace.redoStack_.length) {
        $('.redo').addClass('active');
    } else {
        $('.redo').removeClass('active');
    }
};

MBlockly.App.registerEvents = function() {
    var eventType = getEventType();
    var app = MBlockly.App;
    var action = MBlockly.Action;
    var control = MBlockly.Control;
    var hostInterface = MBlockly.HostInterface;
    var data = MBlockly.Data;
    var mainWorkspace = Blockly.getMainWorkspace();

    app.activeTopWidget(app.getTopWidgetShowNums());

    // register event when workspace changes.
    mainWorkspace.addChangeListener(app.workspaceChangeHandler);
    if(MBlockly.Settings.OPEN_UNDO) {
        mainWorkspace.addChangeListener(app.checkUndoAndRedoState);
    } else {
        $('.tools-wrapper').hide();
    }

    // register top widgets events.
    $('#widgets').on(eventType, 'ul li', function() {
        app.widgetOnLoad($(this).attr('data-id'));
    });

    // register redo and undo events.
    $('.tools-wrapper').on(eventType, '.redo', function() {
        Blockly.mainWorkspace.undo(true);
    });
    $('.tools-wrapper').on(eventType, '.undo', function() {
        Blockly.mainWorkspace.undo(false);
    });

    // 测试按钮
    $('.test-area').on(eventType, '.run', function() {
        var id = MBlockly.App.currentWidget.id;
        MBlockly.WhenEvent.activateWhenBlocks(id, 1);
    });

    $('.ble-connected').on(eventType, function() {
        MBlockly.Control.bluetoothConnected = true;
    });

    $('.ble-disconnect').on(eventType, function() {
        MBlockly.Control.bluetoothConnected = false;
    });

    $('.reset').on(eventType, function() {
        MBlockly.HostInterface.resetMblockly();
    });

    $('.stop').on(eventType, function() {
        MBlockly.HostInterface.exitPlayMode();
    });

    $('.loadControlPanel').on(eventType, function() {
        MBlockly.HostInterface.loadControlPanel();
    });

    //when window resize
    $(window).on('resize', function(){
        $('#toolboxDiv .blocklyToolboxDiv').height($('#menuLeft').height());
        window.workspace && Blockly.svgResize(window.workspace);
    })
};

// 处理整个web页面上移的问题
MBlockly.App.reSetPage = function() {
    window.scrollTo(0,0);
};


$(function() {
    var init = new MBlockly.Init();
    var app = MBlockly.App;
    var hostInterface = MBlockly.HostInterface;

    // 请求加载数据
    console.log("------- 请求数据 -------");
    hostInterface.requestLoadProject();

    if(MBlockly.Settings.DEBUG) {
        setTimeout(function() {
            hostInterface.loadControlPanel();
        }, 0);
    }

    // 注册页面事件
    app.registerEvents();

    if(typeof TellNative == 'undefined') {
        TellNative = {
            requestLoadProject: function(){},
            reportCurrentWidget: function(){},
            saveControlPanel: function(){},
            sendValueToWidget: function(){},
            sendViaBluetooth: function(){},
            requestBluetoothReconnect: function(){},
            sendViaBluetoothUnreliably: function(){}
        };
    }
});