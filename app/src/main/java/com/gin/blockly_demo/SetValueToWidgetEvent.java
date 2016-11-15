package com.gin.blockly_demo;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class SetValueToWidgetEvent {
    public String value;
    public String widgetID;

    public SetValueToWidgetEvent(String value, String widgetID) {
        this.value = value;
        this.widgetID = widgetID;
    }
}
