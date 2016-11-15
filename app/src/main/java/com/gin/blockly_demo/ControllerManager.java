package com.gin.blockly_demo;

import android.util.Log;

import java.util.HashMap;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ControllerManager {
    public static int CURRENT_FORM = -1;
    public static final int Connected_Ok = 0;
    public static final int Connected_Wrong = 1;
    public static final int DEVICE_INDEX_0 = 0;
    public static final int DEVICE_INDEX_1 = 1;
    public static final int DEVICE_INDEX_2 = 2;
    public static final int DEVICE_INDEX_3 = 3;
    public static final int Disconnected = -1;
    public static final int FORM_BALANCE = 2;
    public static final int FORM_BLUETOOTH = 0;
    public static final int FORM_INFRARED = 3;
    public static final int FORM_LINE_FOLLOW = 4;
    public static final int FORM_ULTRASOINIC = 1;
    public static final int FORM_UNKNOWN = -1;
    private static final String TAG = ControllerManager.class.getSimpleName();
    public static final String auriga = "auriga";
    private static int currentChooseDeviceIndex = -1;
    private static int currentConnectedDeviceIndex = -1;
    private static String firmwareVersion = null;
    private static final int interval = 200;
    private static long lastTiltOrShakeTime = 0;
    public static final String mcore = "mcore";
    public static final String megaPi = "megaPi";
    public static final String orion = "orion";
    private static HashMap seekbarLastValueMap = new HashMap();
    public static void onJoystickPositionChange(int quadrant, double radius, double radian, int actionType) {
//        JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, quadrant, radius, radian);
    }

    public static void onSpeakerCommandSent(int command) {
        switch (command) {
//            case 1:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 4, 0.57d, 4.8d);
//                return;
//            case 2:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 1, 0.62d, 1.49d);
//                return;
//            case 3:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 3, 0.51d, 3.15d);
//                return;
//            case 4:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 4, 0.54d, 6.24d);
//                return;
//            case 5:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 0, 0.0d, 0.0d);
//                return;
//            case 6:
//                JoystickCmdUtils.addJoystickControlCmdToQueue(firmwareVersion, CURRENT_FORM, 3, 1.0d, 0.0d);
//                return;
            default:
                return;
        }
    }


    public static void setCellViewListener(CellView cellView) {
        final WidgetData widgetData = cellView.getWidgetData();
        String xibName = widgetData.xibName;
        if (xibName.equals(EnumXibName.MBWJoystick.toString())) {
            ((JoystickView) cellView).setJoystickViewListener(new JoystickView.JoystickViewListener() {
                public void onJoystickMoved(int quadrant, double radius, double radian, int actionType) {
                    ControllerManager.onJoystickPositionChange(quadrant, radius, radian, actionType);
                    Log.e("onJoystickMoved","quadrant:" + quadrant + ",radius" + radius+ ",radian" + radian+ ",actionType" + actionType);
                }
            });
        }
        if (xibName.equals(EnumXibName.MBWNumberDisplay.toString())) {
        }
        if (xibName.equals(EnumXibName.MBWLineGraph.toString())) {
        }
        if (xibName.equals(EnumXibName.MBWBarDisplay.toString())) {
        }
        if (!xibName.equals(EnumXibName.MBWIndicator.toString())) {
        }
    }
    public static void tellBlocklyDeviceShake() {
        if (System.currentTimeMillis() - lastTiltOrShakeTime > 200) {
            lastTiltOrShakeTime = System.currentTimeMillis();
            BlocklyManager.getInstance().callWeb_deviceShake();
        }
    }

    public static void tellBlocklyDeviceTiltLeft() {
        if (System.currentTimeMillis() - lastTiltOrShakeTime > 200) {
            lastTiltOrShakeTime = System.currentTimeMillis();
            Log.e(TAG, "tellBlocklyDeviceTiltLeft");
            BlocklyManager.getInstance().callWeb_deviceTiltLeft();
        }
    }

    public static void tellBlocklyDeviceTiltRight() {
        if (System.currentTimeMillis() - lastTiltOrShakeTime > 200) {
            lastTiltOrShakeTime = System.currentTimeMillis();
            BlocklyManager.getInstance().callWeb_deviceTiltRight();
        }
    }

    public static void tellBlocklyDeviceTiltForward() {
        if (System.currentTimeMillis() - lastTiltOrShakeTime > 200) {
            lastTiltOrShakeTime = System.currentTimeMillis();
            BlocklyManager.getInstance().callWeb_deviceTiltForward();
        }
    }

    public static void tellBlocklyDeviceTiltBackword() {
        if (System.currentTimeMillis() - lastTiltOrShakeTime > 200) {
            lastTiltOrShakeTime = System.currentTimeMillis();
            BlocklyManager.getInstance().callWeb_deviceTiltBackword();
        }
    }

}
