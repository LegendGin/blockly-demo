package com.gin.blockly_demo;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.support.v4.view.ViewCompat;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.View;

/**
 * Created by zhuoying on 2016/11/16.
 */

public class CircleProgressView extends View {
    private static final String TAG = "CircleProgressView";
    private int circleColor;
    private int circleProgressColor;
    private String circleWidthPercent;
    private float circleWidthPercentFloat;
    private int finishAngle;
    private int maxValue;
    private Paint paint;
    private float progress;
    private int startAngle;
    private int textColor;

    public int getMaxValue() {
        return this.maxValue;
    }

    public CircleProgressView(Context context) {
        this(context, null);
    }

    public CircleProgressView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CircleProgressView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        this.paint = new Paint();
        TypedArray mTypedArray = context.obtainStyledAttributes(attrs, R.styleable.CircleProgressView);
        this.circleColor = mTypedArray.getColor(R.styleable.CircleProgressView_circleColor, getResources().getColor(R.color.circle_color));
        this.circleProgressColor = mTypedArray.getColor(R.styleable.CircleProgressView_circleProgressColor, getResources().getColor(R.color.circle_progress_color));
        this.textColor = mTypedArray.getColor(R.styleable.CircleProgressView_textColor, ViewCompat.MEASURED_STATE_MASK);
        this.circleWidthPercent = mTypedArray.getString(R.styleable.CircleProgressView_circleWidthPercent);
        if (TextUtils.isEmpty(this.circleWidthPercent)) {
            this.circleWidthPercent = "6%w";
        }
        this.maxValue = mTypedArray.getInteger(R.styleable.CircleProgressView_maxValue, 100);
        this.progress = mTypedArray.getFloat(R.styleable.CircleProgressView_progress, 0.3f);
        this.startAngle = mTypedArray.getInteger(R.styleable.CircleProgressView_startAngle, 135);
        this.finishAngle = mTypedArray.getInteger(R.styleable.CircleProgressView_finishAngle, 405);
        mTypedArray.recycle();
    }

    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        float width = (float) getWidth();
        float height = (float) getHeight();
        float length = (float) Math.min(getWidth(), getHeight());
        float circleWidth = 0.0f;
        if (this.circleWidthPercent.endsWith("%w") || this.circleWidthPercent.endsWith("%W")) {
            this.circleWidthPercentFloat = Float.parseFloat(this.circleWidthPercent.substring(0, this.circleWidthPercent.length() - 2)) / 100.0f;
            circleWidth = width * this.circleWidthPercentFloat;
        } else if (this.circleWidthPercent.endsWith("%h") || this.circleWidthPercent.endsWith("%H")) {
            this.circleWidthPercentFloat = Float.parseFloat(this.circleWidthPercent.substring(0, this.circleWidthPercent.length() - 2)) / 100.0f;
            circleWidth = height * this.circleWidthPercentFloat;
        }
        this.paint.setAntiAlias(true);
        this.paint.setStrokeWidth(circleWidth);
        this.paint.setStyle(Paint.Style.STROKE);
        RectF rect_circle = new RectF();
        rect_circle.left = ((width - length) / 2.0f) + (circleWidth / 2.0f);
        rect_circle.top = ((height - length) / 2.0f) + (circleWidth / 2.0f);
        rect_circle.right = (rect_circle.left + length) - circleWidth;
        rect_circle.bottom = (rect_circle.top + length) - circleWidth;
        this.paint.setColor(this.circleColor);
        canvas.drawArc(rect_circle, (float) this.startAngle, (float) (this.finishAngle - this.startAngle), false, this.paint);
        float progressAngle = (((float) (this.finishAngle - this.startAngle)) * this.progress) + ((float) this.startAngle);
        this.paint.setColor(this.circleProgressColor);
        canvas.drawArc(rect_circle, (float) this.startAngle, progressAngle - ((float) this.startAngle), false, this.paint);
        float radius = (length - circleWidth) / 2.0f;
        this.paint.setStyle(Paint.Style.FILL);
        this.paint.setColor(this.circleColor);
        canvas.drawCircle((float) ((((double) radius) * Math.cos((((double) this.finishAngle) * 3.141592653589793d) / 180.0d)) + ((double) (width / 2.0f))), (float) ((((double) radius) * Math.sin((((double) this.finishAngle) * 3.141592653589793d) / 180.0d)) + ((double) (height / 2.0f))), circleWidth / 2.0f, this.paint);
        this.paint.setColor(this.circleProgressColor);
        canvas.drawCircle((float) ((((double) radius) * Math.cos((((double) this.startAngle) * 3.141592653589793d) / 180.0d)) + ((double) (width / 2.0f))), (float) ((((double) radius) * Math.sin((((double) this.startAngle) * 3.141592653589793d) / 180.0d)) + ((double) (height / 2.0f))), circleWidth / 2.0f, this.paint);
        canvas.drawCircle((float) ((((double) radius) * Math.cos((((double) progressAngle) * 3.141592653589793d) / 180.0d)) + ((double) (width / 2.0f))), (float) ((((double) radius) * Math.sin((((double) progressAngle) * 3.141592653589793d) / 180.0d)) + ((double) (height / 2.0f))), circleWidth / 2.0f, this.paint);
        String valueString = ((int) Math.rint((double) (((float) this.maxValue) * this.progress))) + "";
        changePaintTextSizeToSuitbale(this.paint, valueString, (int) (((float) getWidth()) * 0.45f), (int) (((float) getWidth()) * 0.25f));
        Paint.FontMetricsInt fontMetrics = this.paint.getFontMetricsInt();
        int textHeight = fontMetrics.bottom - fontMetrics.top;
        Rect bounds = new Rect();
        this.paint.getTextBounds(valueString, 0, valueString.length(), bounds);
        int baseX = (getWidth() - (bounds.right - bounds.left)) / 2;
        int baseY = ((getHeight() - textHeight) / 2) - fontMetrics.top;
        this.paint.setColor(this.textColor);
        canvas.drawText(valueString, (float) baseX, (float) baseY, this.paint);
    }

    public static void changePaintTextSizeToSuitbale(Paint paint, String text, int maxWidth, int maxHeight) {
        int textSize = (int) paint.getTextSize();
        Paint.FontMetricsInt fontMetrics = paint.getFontMetricsInt();
        int textHeight = fontMetrics.bottom - fontMetrics.top;
        Rect bounds = new Rect();
        paint.getTextBounds(text, 0, text.length(), bounds);
        if (bounds.right - bounds.left > maxWidth || textHeight > maxHeight) {
            paint.setTextSize((float) (textSize - 1));
            return;
        }
        paint.setTextSize((float) (textSize + 1));
        changePaintTextSizeToSuitbale(paint, text, maxWidth, maxHeight);
    }

    public void setProgress(float progress) {
        if (progress < 0.0f) {
            progress = 0.0f;
        }
        if (progress > 1.0f) {
            progress = 1.0f;
        }
        this.progress = progress;
        postInvalidate();
    }

    public void setMaxValue(int maxValue) {
        this.maxValue = maxValue;
        postInvalidate();
    }
}
