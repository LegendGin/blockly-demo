MBlockly = MBlockly || {};

$(document).ready(function() {
    var eventType = getEventType();
    var example = MBlockly.example;

    $('.menu-tip').on(eventType, function(e) {
        // $('.tips').toggle();
        MBlockly.WhenEvent.activateWhenBlocks(3, 1);
    });

    $('#blocklyDiv').on(eventType, function(e) {
        e.stopPropagation();
        $('.tips').hide();
    });

    $('.neuron-test .flex').on(eventType, function(e) {
        if($(this).hasClass('show')) {
           $(this).removeClass('show');
           $('.neuron-test table').hide();
        } else {
            $(this).addClass('show');
            $('.neuron-test table').show();
        }
    });

    // music icon
    $('.menu-music').on(eventType, function() {

        if($(this).hasClass('off')) {
            $(this).removeClass('off');
            example.playMusic();

        } else {
            $(this).addClass('off');
            example.pauseMusic();
        }
    });

    // servo tip
    $('.servo-tip').on(eventType, function(e) {
        $('.servo-record').toggle();
    });
});