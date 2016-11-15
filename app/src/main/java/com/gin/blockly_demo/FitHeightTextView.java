package com.gin.blockly_demo;

import android.content.Context;
import android.content.res.Configuration;
import android.support.v7.widget.AppCompatTextView;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.text.TextUtils;
import android.util.AttributeSet;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class FitHeightTextView extends AppCompatTextView {
    private CharSequence text = null;
    private TextPaint tmpTextPaint;

    public FitHeightTextView(Context context) {
        super(context);
        init(context, null, 0);
    }

    protected void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (newConfig.orientation == 2) {
            postDelayed(new Runnable() {
                public void run() {
                    FitHeightTextView.this.setText(FitHeightTextView.this.getText());
                }
            }, 50);
        }
    }

    public FitHeightTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public FitHeightTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (h != oldh) {
            adjustTextSize();
        }
    }

    private void adjustTextSize() {
        this.tmpTextPaint = new TextPaint(getPaint());
        int textSize = searchMaxTextSize(1, 10000);
        if (textSize != 1 && textSize != ((int) getTextSize())) {
            super.setTextSize(0, (float) textSize);
        }
    }

    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    private void init(Context context, AttributeSet attrs, int defStyleAttr) {
        setEllipsize(TextUtils.TruncateAt.END);
        setMaxLines(1);
        setIncludeFontPadding(false);
    }

    private int searchMaxTextSize(int minSize, int maxSize) {
        int lastBest = minSize;
        int start = minSize;
        int end = maxSize;
        while (start <= end) {
            int middle = (start + end) >>> 1;
            if (canContain(middle)) {
                start = middle + 1;
                lastBest = middle;
            } else {
                end = middle - 1;
            }
        }
        return lastBest;
    }

    private boolean canContain(int size) {
        this.tmpTextPaint.setTextSize((float) size);
        int textHeight = new StaticLayout(getText(), this.tmpTextPaint, 100000, Layout.Alignment.ALIGN_NORMAL, 1.0f, 0.0f, false).getHeight();
        int textAvailableHeight = getHeight();
        if (textAvailableHeight == 0) {
            textAvailableHeight = getMeasuredHeight();
        }
        if (textHeight <= (textAvailableHeight - getCompoundPaddingBottom()) - getCompoundPaddingTop()) {
            return true;
        }
        return false;
    }
}
