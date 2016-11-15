package com.gin.blockly_demo;

import java.util.Map;

/**
 * Created by zhuoying on 2016/11/10.
 */

public class WidgetBean {
    public String className;
    public String config;
    public Map<String, Data> data;
    public String icon;
    public String iconName;
    public String icon_pre;
    public String name;
    public String type;

    public class Data {
        public String code;
        public String directControlType;
        public String port;
        public String portFilter;
        public String slot;
        public String xmlData;
    }

}
