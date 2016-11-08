package com.gin.blockly_demo;

/**
 * Created by Gin on 2016/11/8.
 */


import android.content.Context;
import android.os.Build.VERSION;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

public class BlocklyManager {
    private static String BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index.html";
    private static final String JS_PREFIX = "javascript:receiveDeviceData";
    private static final String PREFIX = "receiveDeviceData";
    private static final String TAG = "BlocklyManager";
    private static BlocklyManager instance = null;
    private volatile RequestWidgetValueCallback requestWidgetValueCallback;
    private WebView webview;

    public interface RequestWidgetValueCallback {
        int getValue(int i);
    }

    public class TellNative {
        @JavascriptInterface
        public void requestLoadProject() {
        }

        @JavascriptInterface
        public void saveControlPanel(String jsonDataInString) {
        }

        @JavascriptInterface
        public void sendValueToWidget(String value, String widgetID) {
            Log.e(BlocklyManager.TAG, "TellNative: sendValueToWidget:value=" + value + " widgetID=" + widgetID);
        }

        @JavascriptInterface
        public void sendViaBluetooth(String spaceSeperatedBytes) {
            Log.e(BlocklyManager.TAG, "TellNative: sendViaBluetooth:spaceSeperatedBytes=" + spaceSeperatedBytes);
            writeToFirmware(spaceSeperatedBytes);
        }

        @JavascriptInterface
        public void sendViaBluetoothUnreliably(String spaceSeperatedBytes) {
            Log.e(BlocklyManager.TAG, "TellNative: sendViaBluetoothUnreliably:spaceSeperatedBytes=" + spaceSeperatedBytes);
            writeToFirmware(spaceSeperatedBytes);
        }

        private void writeToFirmware(String spaceSeperatedBytes) {
            String[] split = spaceSeperatedBytes.split(" ");
            int length = split.length;
            byte[] bytes = new byte[length];
            for (int i = 0; i < length; i++) {
                bytes[i] = (byte) ((int) Float.parseFloat(split[i]));
            }
            // TODO: 2016/11/8 将命令加入到队列中
        }

        @JavascriptInterface
        public void requestBluetoothReconnect() {
            Log.e(BlocklyManager.TAG, "TellNative: requestBluetoothReconnect");
        }

        @JavascriptInterface
        public int requestWidgetValue(String widgetID) {
            Log.e(BlocklyManager.TAG, "TellNative: requestWidgetValue:widgetID=" + widgetID);
            int id = Integer.parseInt(widgetID);
            if (BlocklyManager.this.requestWidgetValueCallback != null) {
                Log.e(BlocklyManager.TAG, "requestWidgetValueCallback.getValue(id)=" + BlocklyManager.this.requestWidgetValueCallback.getValue(id));
                return BlocklyManager.this.requestWidgetValueCallback.getValue(id);
            }
            Log.e(BlocklyManager.TAG, "requestWidgetValueCallback == null");
            return -1;
        }

        @JavascriptInterface
        public void reportCurrentWidget(String widgetID) {
            Log.e(BlocklyManager.TAG, "TellNative: reportCurrentWidget:widgetID=" + widgetID);
            Log.e(BlocklyManager.TAG, "call on BlocklyManager reportCurrentWidget() JAVASCRIPT");
        }

        @JavascriptInterface
        public void blocklyIsReady() {
            Log.e(BlocklyManager.TAG, "TellNative: blocklyIsReady");
        }
    }

    public WebView getWebview() {
        return this.webview;
    }

    public void setRequestWidgetValueCallback(RequestWidgetValueCallback requestWidgetValueCallback) {
        Log.e(TAG, "setRequestWidgetValueCallback=" + requestWidgetValueCallback);
        this.requestWidgetValueCallback = requestWidgetValueCallback;
    }

    private BlocklyManager() {
    }

    private static boolean isApkDebugable() {
        try {
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public static BlocklyManager getInstance() {
        if (instance == null) {
            synchronized (BlocklyManager.class) {
                if (instance == null) {
                    if (isApkDebugable() && VERSION.SDK_INT >= 19) {
                        WebView.setWebContentsDebuggingEnabled(true);
                    }
                    instance = new BlocklyManager();
                    instance.webview = new WebView(App.getContext());
                    instance.webview.getSettings().setJavaScriptEnabled(true);
                    instance.addJavascriptInterface();
                    instance.webview.loadUrl(BLOCKLY_HTML_PATH);
                }
            }
        }
        return instance;
    }

    public static void initBlocklyHtmlPathByLocalLanguage(Context context) {
        String locale = context.getResources().getConfiguration().locale.toString();
        if (locale.equals("ja")) {
            BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index-ja.html";
        } else if (locale.equals("ja_JP"))
            BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index-ja.html";
        else if (locale.equals("zh_CN"))
            BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index-hans.html";
        else if (locale.equals("zh_HK") || locale.equals("zh_TW"))
            BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index-hant.html";
        else
            BLOCKLY_HTML_PATH = "file:///android_asset/mblockly-zero/views/makeblockhd/index.html";
    }

    public void callWeb_deviceShake() {
        String dataString = "('shake')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_bleconnect() {
        String dataString = "('bleconnect')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_bledisconnect() {
        String dataString = "('bledisconnect')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_deviceTiltLeft() {
        loadUrl("('tilt', 1, 0)");
    }

    public void callWeb_deviceTiltRight() {
        loadUrl("('tilt', -1, 0)");
    }

    public void callWeb_deviceTiltForward() {
        loadUrl("('tilt', 0, -1)");
    }

    public void callWeb_deviceTiltBackword() {
        loadUrl("('tilt', 0, 1)");
    }

    public void callWeb_colorPickerValueChanged(String json) {
        loadUrl(json);
    }

    public void callWeb_setTone(String json) {
        loadUrl(json);
    }

    public void callWeb_resetMblockly() {
        String dataString = "('resetMblockly')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_loadCP(String json) {
        Log.e(TAG, "callWeb_loadCP:" + json);
        json = json.replace("'", "##");
        if (VERSION.SDK_INT >= 19) {
            String dataString = "('loadControlPanel','" + json + "')";
            Log.e(TAG, "callWeb_loadCP evaluateJavascript");
            loadUrl(dataString);
        } else {
            String dataString = "('loadControlPanel','" + json + "')";
            Log.e(TAG, "callWeb_loadCP loadUrl");
            loadUrl(dataString);
        }
    }

    public void callWeb_addWidget(String json) {
        String dataString = "('widgetAdd','" + json + "')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_updateWidget(int id, String json) {
        String dataString = "('widgetUpdate'," + id + ",'" + json + "')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_delWidget(int id) {
        String dataString = "('widgetDelete'," + id + ")";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_sendWidgetValue(int id, int value) {
        String dataString = "('sendWidgetValue','" + id + "','" + value + "')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_switchToControlPanel() {
        String dataString = "('switchToControlPanel')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_switchToCodingPanel(int id) {
        String dataString = "('switchToCodingPanel'," + id + ")";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_enterPlayMode() {
        String dataString = "('enterPlayMode')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_exitPlayMode() {
        String dataString = "('exitPlayMode')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_recevieDataFromBluetooth(byte[] data) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < data.length; i++) {
            if (i == data.length - 1) {
                sb.append(data[i]);
            } else {
                sb.append((data[i] & 255) + " ");
            }
        }
        String dataString = "javascript:receiveBluetoothData('" + sb + "')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    public void callWeb_tellMainboardInfo(String json) {
        String dataString = "('tellMainboardInfo','" + json + "')";
        Log.e(TAG, "webView loadUrl:" + dataString);
        loadUrl(dataString);
    }

    private void addJavascriptInterface() {
        this.webview.addJavascriptInterface(new TellNative(), "TellNative");
    }

    public static String getDataStringForLoadUrl(String methodName, String[] paramsNames, String[] paramsValues) {
        String paramsJson = "{";
        for (int i = 0; i < paramsNames.length; i++) {
            String paramName = paramsNames[i];
            paramsJson = paramsJson + "\"" + paramName + "\":\"" + paramsValues[i] + "\"";
            if (i != paramsNames.length - 1) {
                paramsJson = paramsJson + ",";
            } else {
                paramsJson = paramsJson + "}";
            }
        }
        return "javascript:nativeCallWeb('" + methodName + "','" + paramsJson + "')";
    }

    private void loadUrl(final String data) {
        String dataString;
        if (VERSION.SDK_INT >= 19) {
            dataString = (BlocklyManager.PREFIX + data).replaceAll("\n", "");
            BlocklyManager.this.webview.evaluateJavascript(dataString, null);
        } else {
            dataString = BlocklyManager.JS_PREFIX + data;
            BlocklyManager.this.webview.loadUrl(dataString);
        }
        Log.e(BlocklyManager.TAG, "dataString:" + dataString);
    }
}
