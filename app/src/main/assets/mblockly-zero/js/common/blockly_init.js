MBlockly = MBlockly || {};

MBlockly.Init = function() {
    this.inject();
};

MBlockly.Init.prototype.getZoomOption = function() {
    var zoomForPc = {
        controls: true,
        wheel: false,
        startScale: 1.2,
        minScale: 0.5,
        maxScale: 3,
        scaleSpeed: 1.2
    };
    var zoomForPhone = {
        controls: false,
        wheel: true,
        startScale: 0.7,
        minScale: 0.4,
        maxScale: 0.7,
        scaleSpeed: 1.2
    };
    if(checkDeviceType().phone) {
        return zoomForPhone;
    } else {
        return zoomForPc;
    }
};


MBlockly.Init.prototype.inject = function() {
    var zoomOption = this.getZoomOption();

    window.workspace = Blockly.inject('blocklyDiv', {
        media: '../../vendors/blockly/media/',
        toolbox: document.getElementById('toolbox'),
        zoom: zoomOption,
        trashcan: false
    });

    var onresize = function(e) {
        document.body.style.height = window.innerHeight + 'px';
    };
    window.addEventListener('resize', onresize, false);
    onresize();
};


