package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ColorPickerView extends CellView {
    private static final String TAG = ColorPickerView.class.getSimpleName();
    private int RGB_BLUE = 0;
    private int RGB_GREEN = 0;
    private int RGB_RED = 0;
    private AddRGBCommandToCommandQueueThread addRGBCommandToCommandQueueThread;
    private int circleImageDiameter;
    private int circleImageStroke;
    private CircleImageView circleImageView;
    private ImageView colorHoop;
    private FrameLayout colorHoopContainer;
    private int colorValueMax = 150;
    private Context context;
    private int innerRadius;
    private int lastBValue = 0;
    private int lastGValue = 0;
    private int lastRValue = 0;
    private int outerRadius;
    private Timer timer;
    private FitHeightTextView tv_title;

    private class AddRGBCommandToCommandQueueThread extends Thread {
        private AddRGBCommandToCommandQueueThread() {
        }

        public void run() {
            ColorPickerView.this.setUpTimer();
        }
    }

    private class CircleImageView extends ImageView {
        Paint paint = new Paint();

        public CircleImageView(Context context) {
            super(context);
        }

        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            this.paint.setStyle(Paint.Style.STROKE);
            this.paint.setStrokeWidth((float) ColorPickerView.this.circleImageStroke);
            this.paint.setColor(-1);
            canvas.drawCircle((float) (ColorPickerView.this.circleImageDiameter / 2), (float) (ColorPickerView.this.circleImageDiameter / 2), (float) ((ColorPickerView.this.circleImageDiameter / 2) - ColorPickerView.this.circleImageStroke), this.paint);
        }
    }

    public ColorPickerView(Context context) {
        super(context);
        this.context = context;
        initViews();
    }

    public ColorPickerView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        initViews();
    }

    public ColorPickerView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.context = context;
        initViews();
    }

    public void setMode(int mode) {
        super.setMode(mode);
        if (mode == 1) {
            if (this.addRGBCommandToCommandQueueThread == null) {
                this.addRGBCommandToCommandQueueThread = new AddRGBCommandToCommandQueueThread();
                this.addRGBCommandToCommandQueueThread.start();
            }
            setUpTimer();
            return;
        }
        this.addRGBCommandToCommandQueueThread = null;
        cancelTimer();
    }

    public void initViews() {
        addView(((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_color_picker_view, null), new LayoutParams(-1, -1));
        this.tv_title = (FitHeightTextView) findViewById(R.id.tv_title);
        this.colorHoop = (ImageView) findViewById(R.id.color_hoop);
        this.colorHoopContainer = (FrameLayout) findViewById(R.id.color_hoop_container);
        this.colorHoop.post(new Runnable() {
            public void run() {
                ColorPickerView.this.outerRadius = ColorPickerView.this.colorHoop.getWidth() / 2;
                ColorPickerView.this.innerRadius = ColorPickerView.this.outerRadius - (((ColorPickerView.this.outerRadius * 2) * 48) / 399);
                ColorPickerView.this.circleImageDiameter = (int) (((double) ColorPickerView.this.outerRadius) / 3.6d);
                ColorPickerView.this.circleImageStroke = ColorPickerView.this.circleImageDiameter / 10;
                ColorPickerView.this.circleImageView = new CircleImageView(ColorPickerView.this.context);
                RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(ColorPickerView.this.circleImageDiameter, ColorPickerView.this.circleImageDiameter);
                layoutParams.addRule(13);
                ColorPickerView.this.circleImageView.setLayoutParams(layoutParams);
                ColorPickerView.this.colorHoopContainer.addView(ColorPickerView.this.circleImageView);
                ColorPickerView.this.circleImageView.setVisibility(GONE);
            }
        });
        this.colorHoop.setOnTouchListener(new OnTouchListener() {
            public boolean onTouch(View view, MotionEvent motionEvent) {
                float x = motionEvent.getX();
                float y = motionEvent.getY();
                double touchRadius = Math.sqrt(Math.pow((double) (((float) ColorPickerView.this.outerRadius) - x), 2.0d) + Math.pow((double) (((float) ColorPickerView.this.outerRadius) - y), 2.0d));
                if (touchRadius < ((double) ColorPickerView.this.outerRadius)) {
                    double circleY;
                    double circleX;
                    double tY;
                    double angle;
                    if (ColorPickerView.this.circleImageView.getVisibility() == GONE) {
                        ColorPickerView.this.circleImageView.setVisibility(VISIBLE);
                    }
                    if (x < ((float) ColorPickerView.this.outerRadius) && y < ((float) ColorPickerView.this.outerRadius)) {
                        circleY = ((double) ColorPickerView.this.outerRadius) - (((double) (((float) ColorPickerView.this.outerRadius) * (((float) ColorPickerView.this.outerRadius) - y))) / touchRadius);
                        circleX = ((double) ColorPickerView.this.outerRadius) - Math.sqrt(Math.pow((double) ColorPickerView.this.outerRadius, 2.0d) - Math.pow(((double) ColorPickerView.this.outerRadius) - circleY, 2.0d));
                        tY = (((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2)) * (((double) ColorPickerView.this.outerRadius) - circleY)) / ((double) ColorPickerView.this.outerRadius);
                        ColorPickerView.this.circleImageView.setX((float) ((circleX + Math.sqrt(Math.pow((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2), 2.0d) - Math.pow(tY, 2.0d))) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        ColorPickerView.this.circleImageView.setY((float) ((circleY + tY) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        angle = Math.toDegrees(Math.atan((((double) ColorPickerView.this.outerRadius) - circleY) / (((double) ColorPickerView.this.outerRadius) - circleX)));
                        ColorPickerView.this.RGB_RED = (int) (((double) ColorPickerView.this.colorValueMax) * (angle / 120.0d));
                        ColorPickerView.this.RGB_BLUE = (int) (((double) ColorPickerView.this.colorValueMax) * ((120.0d - angle) / 120.0d));
                        ColorPickerView.this.RGB_GREEN = 0;
                    }
                    if (x > ((float) ColorPickerView.this.outerRadius) && y < ((float) ColorPickerView.this.outerRadius)) {
                        circleY = ((double) ColorPickerView.this.outerRadius) - (((double) (((float) ColorPickerView.this.outerRadius) * (((float) ColorPickerView.this.outerRadius) - y))) / touchRadius);
                        circleX = ((double) ColorPickerView.this.outerRadius) + Math.sqrt(Math.pow((double) ColorPickerView.this.outerRadius, 2.0d) - Math.pow(((double) ColorPickerView.this.outerRadius) - circleY, 2.0d));
                        tY = (((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2)) * (((double) ColorPickerView.this.outerRadius) - circleY)) / ((double) ColorPickerView.this.outerRadius);
                        ColorPickerView.this.circleImageView.setX((float) ((circleX - Math.sqrt(Math.pow((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2), 2.0d) - Math.pow(tY, 2.0d))) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        ColorPickerView.this.circleImageView.setY((float) ((circleY + tY) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        angle = Math.toDegrees(Math.atan((circleX - ((double) ColorPickerView.this.outerRadius)) / (((double) ColorPickerView.this.outerRadius) - circleY)));
                        if (angle < 30.0d) {
                            ColorPickerView.this.RGB_RED = (int) (((double) ColorPickerView.this.colorValueMax) * ((90.0d + angle) / 120.0d));
                            ColorPickerView.this.RGB_GREEN = 0;
                            ColorPickerView.this.RGB_BLUE = (int) (((double) ColorPickerView.this.colorValueMax) * ((30.0d - angle) / 120.0d));
                        } else {
                            ColorPickerView.this.RGB_RED = (int) (((double) ColorPickerView.this.colorValueMax) * ((120.0d - angle) / 120.0d));
                            ColorPickerView.this.RGB_GREEN = (int) (((double) ColorPickerView.this.colorValueMax) * ((angle - 30.0d) / 120.0d));
                            ColorPickerView.this.RGB_BLUE = 0;
                        }
                    }
                    if (x < ((float) ColorPickerView.this.outerRadius) && y > ((float) ColorPickerView.this.outerRadius)) {
                        circleY = ((double) ColorPickerView.this.outerRadius) + (((double) ((y - ((float) ColorPickerView.this.outerRadius)) * ((float) ColorPickerView.this.outerRadius))) / touchRadius);
                        circleX = ((double) ColorPickerView.this.outerRadius) - Math.sqrt(Math.pow((double) ColorPickerView.this.outerRadius, 2.0d) - Math.pow(((double) ColorPickerView.this.outerRadius) - circleY, 2.0d));
                        tY = (((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2)) * (((double) ColorPickerView.this.outerRadius) - circleY)) / ((double) ColorPickerView.this.outerRadius);
                        ColorPickerView.this.circleImageView.setX((float) ((circleX + ((double) ((int) Math.sqrt(Math.pow((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2), 2.0d) - Math.pow(tY, 2.0d))))) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        ColorPickerView.this.circleImageView.setY((float) ((circleY + tY) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        angle = Math.toDegrees(Math.atan((circleY - ((double) ColorPickerView.this.outerRadius)) / (((double) ColorPickerView.this.outerRadius) - circleX)));
                        ColorPickerView.this.RGB_RED = 0;
                        ColorPickerView.this.RGB_GREEN = (int) (((double) ColorPickerView.this.colorValueMax) * (angle / 120.0d));
                        ColorPickerView.this.RGB_BLUE = (int) (((double) ColorPickerView.this.colorValueMax) * ((120.0d - angle) / 120.0d));
                    }
                    if (x > ((float) ColorPickerView.this.outerRadius) && y > ((float) ColorPickerView.this.outerRadius)) {
                        circleY = ((double) ColorPickerView.this.outerRadius) - (((double) (((float) ColorPickerView.this.outerRadius) * (((float) ColorPickerView.this.outerRadius) - y))) / touchRadius);
                        circleX = ((double) ColorPickerView.this.outerRadius) + Math.sqrt(Math.pow((double) ColorPickerView.this.outerRadius, 2.0d) - Math.pow(((double) ColorPickerView.this.outerRadius) - circleY, 2.0d));
                        tY = (((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2)) * (((double) ColorPickerView.this.outerRadius) - circleY)) / ((double) ColorPickerView.this.outerRadius);
                        ColorPickerView.this.circleImageView.setX((float) ((circleX - ((double) ((int) Math.sqrt(Math.pow((double) ((ColorPickerView.this.outerRadius - ColorPickerView.this.innerRadius) / 2), 2.0d) - Math.pow(tY, 2.0d))))) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        ColorPickerView.this.circleImageView.setY((float) ((circleY + tY) - ((double) (ColorPickerView.this.circleImageDiameter / 2))));
                        angle = Math.toDegrees(Math.atan((circleY - ((double) ColorPickerView.this.outerRadius)) / (circleX - ((double) ColorPickerView.this.outerRadius))));
                        if (angle < 60.0d) {
                            ColorPickerView.this.RGB_RED = (int) (((double) ColorPickerView.this.colorValueMax) * ((60.0d - angle) / 120.0d));
                            ColorPickerView.this.RGB_GREEN = (int) (((double) ColorPickerView.this.colorValueMax) * ((60.0d + angle) / 120.0d));
                            ColorPickerView.this.RGB_BLUE = 0;
                        } else {
                            ColorPickerView.this.RGB_RED = 0;
                            ColorPickerView.this.RGB_GREEN = (int) (((double) ColorPickerView.this.colorValueMax) * ((180.0d - angle) / 120.0d));
                            ColorPickerView.this.RGB_BLUE = (int) (((double) ColorPickerView.this.colorValueMax) * ((angle - 60.0d) / 120.0d));
                        }
                    }
                }
                return true;
            }
        });
    }

    private void setUpTimer() {
        final BlocklyManager blocklyManager = BlocklyManager.getInstance();
        if (this.timer == null) {
            this.timer = new Timer();
            this.timer.schedule(new TimerTask() {
                public void run() {
                    if (ColorPickerView.this.RGB_RED != ColorPickerView.this.lastRValue || ColorPickerView.this.RGB_GREEN != ColorPickerView.this.lastGValue || ColorPickerView.this.RGB_BLUE != ColorPickerView.this.lastBValue) {
                        String port = ColorPickerView.this.getWidgetData().port;
                        String slot = ColorPickerView.this.getWidgetData().slot;
                        blocklyManager.callWeb_colorPickerValueChanged(BlocklyManager.getDataStringForLoadUrl("setLedColor", new String[]{"r", "g", "b", "position", "port", "slot"}, new String[]{String.valueOf(ColorPickerView.this.RGB_RED), String.valueOf(ColorPickerView.this.RGB_GREEN), String.valueOf(ColorPickerView.this.RGB_BLUE), String.valueOf(0), String.valueOf(port), String.valueOf(slot)}));
                        ColorPickerView.this.lastRValue = ColorPickerView.this.RGB_RED;
                        ColorPickerView.this.lastGValue = ColorPickerView.this.RGB_GREEN;
                        ColorPickerView.this.lastBValue = ColorPickerView.this.RGB_BLUE;
                    }
                }
            }, 0, 50);
        }
    }

    private void cancelTimer() {
        if (this.timer != null) {
            this.timer.cancel();
            this.timer = null;
        }
    }
}
