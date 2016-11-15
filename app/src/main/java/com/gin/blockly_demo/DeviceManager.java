package com.gin.blockly_demo;

import android.app.Activity;
import android.util.DisplayMetrics;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class DeviceManager {
    public static int SCREEN_HEIGHT = 0;
    public static int SCREEN_WIDTH = 0;
    private static final String TAG = "DeviceManager";

    public static void getDeviceInfo(Activity activity) {
        if (SCREEN_WIDTH == 0 || SCREEN_HEIGHT == 0) {
            DisplayMetrics dm = new DisplayMetrics();
            activity.getWindowManager().getDefaultDisplay().getMetrics(dm);
            SCREEN_WIDTH = Math.max(dm.widthPixels, dm.heightPixels);
            SCREEN_HEIGHT = Math.min(dm.widthPixels, dm.heightPixels);
        }
    }

    public static int getPercentHeightToPx(float percent) {
        return (int) (((float) SCREEN_HEIGHT) * percent);
    }

    public static int getPercentWidthToPx(float percent) {
        return (int) (((float) SCREEN_WIDTH) * percent);
    }

}
