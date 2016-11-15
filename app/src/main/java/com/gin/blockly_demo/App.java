package com.gin.blockly_demo;

import android.app.Application;
import android.content.Context;

/**
 * Created by Gin on 2016/11/8.
 */

public class App extends Application {
    private static App mContext;

    @Override
    public void onCreate() {
        super.onCreate();
        mContext = this;
        //BlocklyManager.initBlocklyHtmlPathByLocalLanguage(this);
    }

    public static Context getContext() {
        return mContext;
    }
}
