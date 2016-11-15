package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.CornerPathEffect;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.widget.ImageView;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ChartView extends ImageView {
    private static final String TAG = "ChartView";
    public static final int TIME_COUNT = 30;
    private Bitmap bitmap;
    int[] dataArray;
    private Path mPath;
    private int maxValue;
    private int maxXStart;
    private int maxXStop;
    private int maxYStart;
    private int maxYStop;
    private int midValue;
    private int midXStart;
    private int midXStop;
    private int midYStart;
    private int midYStop;
    private int minValue;
    private int minXStart;
    private int minXStop;
    private int minYStart;
    private int minYStop;
    private Paint paint;
    private Paint paint2;
    private int textValueWidth;
    float unitX;

    public ChartView(Context context) {
        super(context);
        this.maxValue = 0;
        this.minValue = 0;
        this.midValue = 0;
        this.dataArray = new int[30];
        init(null, 0);
    }

    public ChartView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.maxValue = 0;
        this.minValue = 0;
        this.midValue = 0;
        this.dataArray = new int[30];
        init(attrs, 0);
    }

    public ChartView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.maxValue = 0;
        this.minValue = 0;
        this.midValue = 0;
        this.dataArray = new int[30];
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        setLayerType(1, null);
        this.paint2 = new Paint();
        this.paint2.setColor(Color.rgb(75, 86, 97));
        this.paint2.setStrokeWidth((float) DeviceManager.getPercentHeightToPx(0.0025f));
        this.paint = new Paint(1);
    }

    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        this.paint.setStyle(Paint.Style.FILL);
        int width = getWidth();
        int height = getHeight();
        this.paint.setColor(Color.rgb(66, 76, 87));
        canvas.drawRoundRect(new RectF(0.0f, 0.0f, (float) width, (float) height), 3.0f, 3.0f, this.paint);
        this.maxXStart = 0;
        this.maxYStart = height / 4;
        this.maxXStop = width;
        this.maxYStop = height / 4;
        this.midXStart = 0;
        this.midYStart = (height / 4) * 2;
        this.midXStop = width;
        this.midYStop = (height / 4) * 2;
        this.minXStart = 0;
        this.minYStart = (height / 4) * 3;
        this.minXStop = width;
        this.minYStop = (height / 4) * 3;
        canvas.drawLine((float) this.maxXStart, (float) this.maxYStart, (float) this.maxXStop, (float) this.maxYStop, this.paint2);
        canvas.drawLine((float) this.minXStart, (float) this.minYStart, (float) this.minXStop, (float) this.minYStop, this.paint2);
        canvas.drawLine((float) this.midXStart, (float) this.midYStart, (float) this.midXStop, (float) this.midYStop, this.paint2);
        if (this.bitmap != null) {
            int wh = (int) (((float) getHeight()) / 1.5f);
            int left = (width - wh) / 2;
            int top = (height - wh) / 2;
            canvas.drawBitmap(Bitmap.createScaledBitmap(this.bitmap, wh, wh, true), (float) left, (float) top, this.paint);
        }
        String maxValueStr = this.maxValue + "";
        String minValueStr = this.minValue + "";
        String midValueStr = this.midValue + "";
        if (this.maxValue == this.minValue) {
            maxValueStr = (this.minValue + 1) + "";
            minValueStr = (this.minValue - 1) + "";
        }
        this.paint.setTextSize(20.0f);
        this.paint.setColor(Color.rgb(255, 255, 255));
        float margin = ((float) width) * 0.02f;
        canvas.drawText(maxValueStr, margin, ((float) this.maxYStop) - (margin / 2.0f), this.paint);
        canvas.drawText(midValueStr, margin, ((float) this.midYStop) - (margin / 2.0f), this.paint);
        canvas.drawText(minValueStr, margin, ((float) this.minYStop) - (margin / 2.0f), this.paint);
        this.paint.setStyle(Paint.Style.STROKE);
        this.paint.setColor(Color.parseColor("#fffceb4f"));
        this.paint.setStrokeWidth(3.0f);
        if (this.maxValue != this.minValue) {
            this.unitX = (((float) width) - (2.0f * margin)) / 30.0f;
            float xLatest = ((float) width) - margin;
            int yLatest = this.minYStart - (((this.dataArray[29] - this.minValue) * (this.minYStart - this.maxYStart)) / (this.maxValue - this.minValue));
            this.paint.setPathEffect(new CornerPathEffect(50.0f));
            this.mPath = new Path();
            this.mPath.moveTo(xLatest, (float) yLatest);
            for (int i = 29; i >= 0; i--) {
                float x = (((float) width) - margin) - (this.unitX * ((float) (30 - i)));
                int y = this.minYStart - (((this.dataArray[i] - this.minValue) * (this.minYStart - this.maxYStart)) / (this.maxValue - this.minValue));
                this.mPath.lineTo(xLatest, (float) yLatest);
                xLatest = x;
                yLatest = y;
            }
            this.paint.setStrokeWidth((float) DeviceManager.getPercentHeightToPx(0.003f));
            canvas.drawPath(this.mPath, this.paint);
        } else if (this.minValue > 0) {
            canvas.drawLine(margin, (float) this.midYStart, (float) this.midXStop, (float) this.midYStop, this.paint);
        }
    }

    public void addValue(int value) {
        int i;
        for (i = 0; i < 29; i++) {
            this.dataArray[i] = this.dataArray[i + 1];
            if (this.dataArray[i] >= this.maxValue) {
                this.maxValue = this.dataArray[i];
                this.midValue = (this.maxValue + this.minValue) / 2;
            }
            if (this.dataArray[i] <= this.minValue) {
                this.minValue = this.dataArray[i];
                this.midValue = (this.maxValue + this.minValue) / 2;
            }
        }
        this.dataArray[29] = value;
        this.maxValue = this.dataArray[0];
        this.minValue = this.dataArray[0];
        for (i = 1; i < 30; i++) {
            if (this.dataArray[i] > this.maxValue) {
                this.maxValue = this.dataArray[i];
                this.midValue = (this.maxValue + this.minValue) / 2;
            }
            if (this.dataArray[i] < this.minValue) {
                this.minValue = this.dataArray[i];
                this.midValue = (this.maxValue + this.minValue) / 2;
            }
        }
        invalidate();
    }

    public void setIcon(Bitmap bitmap) {
        this.bitmap = bitmap;
    }
}
