package com.gin.blockly_demo;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.percent.PercentRelativeLayout;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.ImageView;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class DuplexSeekBar extends PercentRelativeLayout {
    private float height;
    private boolean isFirst = true;
    private int max;
    private int min;
    private OnSeekBarValueChangeListener onValueChangeListener;
    private ImageView thumb_hor_img;
    private ImageView thumb_hor_line;
    private ImageView thumb_hor_line_over_left;
    private ImageView thumb_hor_line_over_right;
    private ImageView thumb_hor_shadow_img;
    private float thumb_left_x;
    private float thumb_right_x;
    private int thumb_shadow_view_width;
    private int value;
    private float width;

    public DuplexSeekBar(Context context) {
        super(context);
        init(context, null, 0);
    }

    public DuplexSeekBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public DuplexSeekBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    private void init(Context context, AttributeSet attrs, int defStyleAttr) {
        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.Slider, defStyleAttr, 0);
        this.min = a.getInt(R.styleable.Slider_min, 0);
        this.max = a.getInt(R.styleable.Slider_max, 1);
        this.value = a.getInt(R.styleable.Slider_value, 2);
        a.recycle();
    }

    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        if (w != 0 && h != 0) {
            if (this.width != ((float) w) || this.height != ((float) h)) {
                this.width = (float) w;
                this.height = (float) h;
                this.isFirst = true;
            }
        }
    }

    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }

    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
            case 0:
                this.thumb_hor_shadow_img.setVisibility(GONE);
                setThumb(event.getX());
                return true;
            case 1:
                setThumb(event.getX());
                this.thumb_hor_shadow_img.setVisibility(VISIBLE);
                return true;
            case 2:
                setThumb(event.getX());
                return true;
            default:
                return super.onTouchEvent(event);
        }
    }

    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if (this.isFirst) {
            this.thumb_hor_img = (ImageView) findViewById(R.id.thumb_hor_img);
            this.thumb_hor_shadow_img = (ImageView) findViewById(R.id.thumb_hor_shadow_img);
            this.thumb_hor_line = (ImageView) findViewById(R.id.thumb_hor_line);
            this.thumb_hor_line_over_left = (ImageView) findViewById(R.id.thumb_hor_line_over_left);
            this.thumb_hor_line_over_right = (ImageView) findViewById(R.id.thumb_hor_line_over_right);
            Drawable drawable = this.thumb_hor_shadow_img.getDrawable();
            float img_shadow_width = 0.0f;
            float img_width = 0.0f;
            if (drawable instanceof BitmapDrawable) {
                img_shadow_width = (float) ((BitmapDrawable) drawable).getBitmap().getWidth();
            }
            drawable = this.thumb_hor_img.getDrawable();
            if (drawable instanceof BitmapDrawable) {
                img_width = (float) ((BitmapDrawable) drawable).getBitmap().getWidth();
            }
            LayoutParams layoutParams = (LayoutParams) this.thumb_hor_shadow_img.getLayoutParams();
            this.thumb_shadow_view_width = (int) ((img_shadow_width / img_width) * ((float) this.thumb_hor_img.getWidth()));
            layoutParams.width = this.thumb_shadow_view_width;
            this.thumb_hor_shadow_img.setLayoutParams(layoutParams);
            this.width = (float) (right - left);
            this.height = (float) (bottom - top);
            this.isFirst = false;
            this.thumb_left_x = this.thumb_hor_line.getX() - 3.0f;
            this.thumb_right_x = (float) ((this.thumb_hor_line.getRight() - this.thumb_hor_img.getWidth()) + 3);
            setValue((float) this.value);
        }
    }

    public boolean onInterceptTouchEvent(MotionEvent ev) {
        return true;
    }

    private void setThumb(float x) {
        x -= (float) (this.thumb_hor_img.getWidth() / 2);
        if (x < this.thumb_left_x) {
            x = this.thumb_left_x;
        }
        if (x > this.thumb_right_x) {
            x = this.thumb_right_x;
        }
        this.thumb_hor_img.setX(x);
        LayoutParams layoutParams = (LayoutParams) this.thumb_hor_line_over_left.getLayoutParams();
        int tmp = (int) (((this.thumb_right_x + this.thumb_left_x) / 2.0f) - x);
        if (tmp < 0) {
            tmp = 0;
        }
        layoutParams.width = tmp;
        this.thumb_hor_line_over_left.setLayoutParams(layoutParams);
        layoutParams = (LayoutParams) this.thumb_hor_line_over_right.getLayoutParams();
        tmp = (int) (x - ((this.thumb_right_x + this.thumb_left_x) / 2.0f));
        if (tmp < 0) {
            tmp = 0;
        }
        layoutParams.width = tmp;
        this.thumb_hor_line_over_right.setLayoutParams(layoutParams);
        this.thumb_hor_shadow_img.setX(this.thumb_hor_img.getX() - (((((float) this.thumb_shadow_view_width) + 0.0f) - ((float) this.thumb_hor_img.getWidth())) / 2.0f));
        updateValue(x);
    }

    private void updateValue(float x) {
        this.value = (int) (((float) this.min) + (((x - this.thumb_left_x) / (this.thumb_right_x - this.thumb_left_x)) * ((float) (this.max - this.min))));
        if (this.value < this.min) {
            this.value = this.min;
        } else if (this.value > this.max) {
            this.value = this.max;
        }
        if (this.onValueChangeListener != null) {
            this.onValueChangeListener.onSeekBarValueChange((float) this.value);
        }
    }

    public void setValue(float value) {
        setThumb((this.thumb_left_x + (((value - ((float) this.min)) * (this.thumb_right_x - this.thumb_left_x)) / ((float) (this.max - this.min)))) + ((float) (this.thumb_hor_img.getWidth() / 2)));
    }

    public float getValue() {
        return (float) this.value;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public void setOnValueChangeListener(OnSeekBarValueChangeListener onValueChangeListener) {
        this.onValueChangeListener = onValueChangeListener;
    }
}