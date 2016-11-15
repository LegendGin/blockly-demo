package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ProjectBean implements Serializable {
    public static final int CP_TYPE_CUSTOM = 0;
    public static final int CP_TYPE_NEW = -1;
    public static final int CP_TYPE_OFFICIAL = 1;
    private static final String TAG = "ProjectBean";
    private static final long serialVersionUID = 1;
    public String boardName;
    public String buildName;
    public String codeSheet;
    public int id;
    public int isOfficial;
    public String name;
    public String productName;
    public String robotForm;
    public String screenshot;
    private ArrayList<WidgetData> widgets;

    public ProjectBean() {
        this.name = "";
        this.isOfficial = 0;
        this.widgets = new ArrayList();
        this.isOfficial = -1;
    }

    public String getScreenshotUri() {
        if (this.isOfficial == 0) {
            return "file://" + this.screenshot;
        }
        return "asset:///" + this.screenshot;
    }
//
//    public void setScreenshot(Context context, View view) {
//        if (getWidgets() == null || getWidgets().size() == 0) {
//            Log.e(TAG, "widget为空");
//            if (!TextUtils.isEmpty(this.screenshot)) {
//                new File(this.screenshot).deleteOnExit();
//                this.screenshot = null;
//                return;
//            }
//            return;
//        }
//        if (!TextUtils.isEmpty(this.screenshot)) {
//            new File(this.screenshot).deleteOnExit();
//        }
//        int max = Math.max(view.getWidth(), view.getHeight());
//        int min = Math.min(view.getWidth(), view.getHeight());
//        Log.e(TAG, "max=" + max + "  min=" + min);
//        BitmapFactory.Options options = new BitmapFactory.Options();
//        options.inPreferredConfig = Bitmap.Config.RGB_565;
//        Bitmap bg = BitmapFactory.decodeResource(context.getResources(), R.drawable.cell_layout_bg, options);
//        Bitmap bgScaled = Bitmap.createScaledBitmap(bg, max, max, true);
//        Canvas cvs = new Canvas(bgScaled);
//        cvs.translate(0.0f, (float) ((max - min) / 2));
//        view.draw(cvs);
//        Bitmap resultBitmap = Bitmap.createScaledBitmap(bgScaled, max / 3, max / 3, true);
//        String screenshotAbsPath = FileUtils.saveBitmapToSDCard(resultBitmap, System.currentTimeMillis() + ".png");
//        if (TextUtils.isEmpty(screenshotAbsPath)) {
//            this.screenshot = null;
//            Log.e(TAG, "保存项目截图失败");
//        } else {
//            this.screenshot = screenshotAbsPath;
//            Log.e(TAG, "保存项目截图成功");
//        }
//        bg.recycle();
//        bgScaled.recycle();
//        resultBitmap.recycle();
//    }

    public ProjectBean deepCopy() {
        ProjectBean copy = new ProjectBean();
        copy.id = this.id;
        copy.screenshot = this.screenshot;
        copy.name = this.name;
        copy.codeSheet = this.codeSheet;
        copy.buildName = this.buildName;
        copy.productName = this.productName;
        copy.robotForm = this.robotForm;
        copy.isOfficial = this.isOfficial;
        copy.boardName = this.boardName;
        for (int i = 0; i < this.widgets.size(); i++) {
            copy.widgets.add(((WidgetData) this.widgets.get(i)).deepCopy());
        }
        return copy;
    }

//    public String getWidgetsJson() {
//        if (this.widgets == null || this.widgets.size() == 0) {
//            return "";
//        }
//        return JsonUtil.objectToJson(this.widgets);
//    }
//
//    public void setWidgetsJson(String widgetsJson) {
//        this.widgets = JsonUtil.jsonToObjectArray(widgetsJson);
//    }

    public ArrayList<WidgetData> getWidgets() {
        return this.widgets;
    }

    public void setWidgets(ArrayList<WidgetData> widgets) {
        this.widgets = widgets;
    }

    public String toString() {
        return "ProjectBean [id=" + this.id + ", name=" + this.name + ", widgets=" + this.widgets + ", buildName=" + this.buildName + ", productName=" + this.productName + ", robotForm=" + this.robotForm + ", isOfficial=" + this.isOfficial + ", boardName=" + this.boardName + "]";
    }
}