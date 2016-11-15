package com.gin.blockly_demo;

import java.io.Serializable;

/**
 * Created by zhuoying on 2016/11/10.
 */

public class WidgetData implements Serializable {
    private static final long serialVersionUID = 1;
    public String boardName;
    public String code;
    public String config;
    public String directControlType;
    public String icon;
    public String icon_pre;
    public String name;
    public String port;
    public String portFilter;
    public String slot;
    public String type;
    public int widgetID;
    public int xPosition;
    public String xibName;
    public String xmlData;
    public int yPosition;

    public WidgetData() {

    }

    public WidgetData(String boardName, WidgetBean widgetBean) {
        this.boardName = boardName;
        if (widgetBean.data != null) {
            WidgetBean.Data data = widgetBean.data.get(boardName);
            if (data == null) {
                data = widgetBean.data.get("default");
            }
            if (data != null) {
                this.code = data.code;
                this.directControlType = data.directControlType;
                this.port = data.port;
                this.slot = data.slot;
                this.portFilter = data.portFilter;
                this.xmlData = data.xmlData;
            }
        }
        this.xibName = widgetBean.className;
        this.type = widgetBean.type;
        this.config = widgetBean.config;
        this.icon = widgetBean.icon;
        this.icon_pre = widgetBean.icon_pre;
        this.name = widgetBean.name;
    }

    public WidgetData deepCopy() {
        WidgetData copy = new WidgetData();
        copy.portFilter = this.portFilter;
        copy.xibName = this.xibName;
        copy.xPosition = this.xPosition;
        copy.yPosition = this.yPosition;
        copy.widgetID = this.widgetID;
        copy.type = this.type;
        copy.xmlData = this.xmlData;
        copy.code = this.code;
        copy.slot = this.slot;
        copy.config = this.config;
        copy.port = this.port;
        copy.directControlType = this.directControlType;
        copy.icon = this.icon;
        copy.icon_pre = this.icon_pre;
        copy.name = this.name;
        copy.boardName = this.boardName;
        return copy;
    }

    public String toString() {
        return "WidgetData{portFilter='" + this.portFilter + '\'' + ", xibName='" + this.xibName + '\'' + ", xPosition=" + this.xPosition + ", yPosition=" + this.yPosition + ", widgetID=" + this.widgetID + ", type='" + this.type + '\'' + ", xmlData='" + this.xmlData + '\'' + ", code='" + this.code + '\'' + ", slot='" + this.slot + '\'' + ", config='" + this.config + '\'' + ", port='" + this.port + '\'' + ", directControlType='" + this.directControlType + '\'' + ", icon='" + this.icon + '\'' + ", icon_pre='" + this.icon_pre + '\'' + ", name='" + this.name + '\'' + '}';
    }
}
