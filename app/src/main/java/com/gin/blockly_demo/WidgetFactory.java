package com.gin.blockly_demo;

import android.content.Context;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class WidgetFactory {
    private static final String TAG = "WidgetFactory";

    private WidgetFactory() {
    }

    public static CellView createCellView(Context context, WidgetData widgetData, int type) {
        CellView cellView = null;
        String xibName = widgetData.xibName;
        if (xibName.equals(EnumXibName.MBWMusicKey.toString())) {
            cellView = new MusicKeyView(context);
            cellView.setCellWidth(18.0f);
            cellView.setCellHeight(6.0f);
        }
        if (xibName.equals(EnumXibName.MBWColorPicker.toString())) {
            cellView = new ColorPickerView(context);
            cellView.setCellWidth(7.0f);
            cellView.setCellHeight(7.0f);
        }
        if (xibName.equals(EnumXibName.MBWJoystick.toString())) {
            cellView = new JoystickView(context);
            cellView.setCellWidth(9.0f);
            cellView.setCellHeight(9.0f);
        }
        if (xibName.equals(EnumXibName.MBWDPad.toString())) {
            cellView = new DirectionView(context);
            cellView.setCellWidth(9.0f);
            cellView.setCellHeight(9.0f);
        }
        if (xibName.equals(EnumXibName.MBWIconButton.toString())) {
            cellView = new ButtonView(context);
            cellView.setCellWidth(7.0f);
            cellView.setCellHeight(3.0f);
        }
        if (xibName.equals(EnumXibName.MBWSwitch.toString())) {
            cellView = new SwitchView(context);
            cellView.setCellWidth(5.0f);
            cellView.setCellHeight(3.0f);
        }
//        if (xibName.equals(EnumXibName.MBWNumberDisplay.toString())) {
//            cellView = new ValueView(context);
//            cellView.setCellWidth(5.0f);
//            cellView.setCellHeight(3.0f);
//        }
        if (xibName.equals(EnumXibName.MBWLineGraph.toString())) {
            cellView = new ChartLayout(context);
            cellView.setCellWidth(10.0f);
            cellView.setCellHeight(7.0f);
        }
//        if (xibName.equals(EnumXibName.MBWBarDisplay.toString())) {
//            cellView = new ValueViewWithProgress(context);
//            cellView.setCellWidth(5.0f);
//            cellView.setCellHeight(6.0f);
//            if (type == 0) {
//                ((ValueViewWithProgress) cellView).setProgress(0.0f);
//            } else {
//                ((ValueViewWithProgress) cellView).setProgress(0.0f);
//            }
//        }
//        if (xibName.equals(EnumXibName.MBWIndicator.toString())) {
//            cellView = new StateView(context);
//            cellView.setCellWidth(3.0f);
//            cellView.setCellHeight(3.0f);
//        }
        if (xibName.equals(EnumXibName.MBWSlider.toString())) {
            cellView = new SliderHorizontal(context);
            cellView.setCellWidth(10.0f);
            cellView.setCellHeight(3.0f);
        }
        if (xibName.equals(EnumXibName.MBWVerticalSlider.toString())) {
            cellView = new SliderVertical(context);
            cellView.setCellWidth(3.0f);
            cellView.setCellHeight(10.0f);
        }
//        if (xibName.equals(EnumXibName.MBWSpeaker.toString())) {
//            cellView = new SpeakerView(context);
//            cellView.setCellWidth(5.0f);
//            cellView.setCellHeight(6.0f);
//        }
        if (xibName.equals(EnumXibName.MBWTwoWaySlider.toString())) {
            cellView = new SliderDuplex(context);
            cellView.setCellWidth(10.0f);
            cellView.setCellHeight(3.0f);
        }
        if (cellView != null) {
            cellView.setMode(type);
            cellView.setWidgetData(widgetData);
            cellView.setId(widgetData.widgetID + 100);
            cellView.setCellX((float) widgetData.xPosition);
            cellView.setCellY((float) widgetData.yPosition);
        }
        return cellView;
    }

}
