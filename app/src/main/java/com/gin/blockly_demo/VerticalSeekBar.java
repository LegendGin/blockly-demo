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
 * Created by zhuoying on 2016/11/15.
 */

public class VerticalSeekBar extends PercentRelativeLayout {
    private float height;
    private boolean isFirst = true;
    private int max;
    private int min;
    private OnSeekBarValueChangeListener onValueChangeListener;
    private float thumb_bottom_y;
    private int thumb_shadow_view_height;
    private float thumb_top_y;
    private ImageView thumb_ver_img;
    private ImageView thumb_ver_line;
    private ImageView thumb_ver_line_over;
    private ImageView thumb_ver_shadow_img;
    private int value;
    private float width;

    public VerticalSeekBar(Context context) {
        super(context);
        init(context, null, 0);
    }

    public VerticalSeekBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public VerticalSeekBar(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    private void init(Context context, AttributeSet attrs, int defStyleAttr) {
        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.Slider, defStyleAttr, 0);
        this.min = a.getInt(R.styleable.Slider_min, 0);
        this.max = a.getInt(R.styleable.Slider_max, 100);
        this.value = a.getInt(R.styleable.Slider_value, 0);
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
                this.thumb_ver_shadow_img.setVisibility(GONE);
                setThumb(event.getY());
                return true;
            case 1:
                setThumb(event.getY());
                this.thumb_ver_shadow_img.setVisibility(VISIBLE);
                return true;
            case 2:
                setThumb(event.getY());
                return true;
            default:
                return super.onTouchEvent(event);
        }
    }

    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if (this.isFirst) {
            this.thumb_ver_img = (ImageView) findViewById(R.id.thumb_ver_img);
            this.thumb_ver_shadow_img = (ImageView) findViewById(R.id.thumb_ver_shadow_img);
            this.thumb_ver_line = (ImageView) findViewById(R.id.thumb_ver_line);
            this.thumb_ver_line_over = (ImageView) findViewById(R.id.thumb_ver_line_over);
            Drawable drawable = this.thumb_ver_shadow_img.getDrawable();
            float img_shadow_height = 0.0f;
            float img_height = 0.0f;
            if (drawable instanceof BitmapDrawable) {
                img_shadow_height = (float) ((BitmapDrawable) drawable).getBitmap().getHeight();
            }
            drawable = this.thumb_ver_img.getDrawable();
            if (drawable instanceof BitmapDrawable) {
                img_height = (float) ((BitmapDrawable) drawable).getBitmap().getHeight();
            }
            LayoutParams layoutParams = (LayoutParams) this.thumb_ver_shadow_img.getLayoutParams();
            this.thumb_shadow_view_height = (int) ((img_shadow_height / img_height) * ((float) this.thumb_ver_img.getHeight()));
            layoutParams.height = this.thumb_shadow_view_height;
            this.thumb_ver_shadow_img.setLayoutParams(layoutParams);
            this.width = (float) (right - left);
            this.height = (float) (bottom - top);
            this.isFirst = false;
            this.thumb_top_y = this.thumb_ver_line.getY() - 3.0f;
            this.thumb_bottom_y = (float) ((this.thumb_ver_line.getBottom() - this.thumb_ver_img.getWidth()) + 3);
            setValue((float) this.value);
        }
    }

    public boolean onInterceptTouchEvent(MotionEvent ev) {
        return true;
    }

    private void setThumb(float y) {
        y -= (float) (this.thumb_ver_img.getHeight() / 2);
        if (y < this.thumb_top_y) {
            y = this.thumb_top_y;
        }
        if (y > this.thumb_bottom_y) {
            y = this.thumb_bottom_y;
        }
        this.thumb_ver_img.setY(y);
        LayoutParams layoutParams = (LayoutParams) this.thumb_ver_line_over.getLayoutParams();
        layoutParams.height = (int) (this.thumb_bottom_y - y);
        this.thumb_ver_line_over.setLayoutParams(layoutParams);
        this.thumb_ver_shadow_img.setY(this.thumb_ver_img.getY() - (((((float) this.thumb_shadow_view_height) + 0.0f) - ((float) this.thumb_ver_img.getHeight())) / 2.0f));
        updateValue(y);
    }

    private void updateValue(float y) {
        this.value = (int) (((float) this.min) + (((this.thumb_bottom_y - y) / (this.thumb_bottom_y - this.thumb_top_y)) * ((float) (this.max - this.min))));
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
        setThumb((this.thumb_bottom_y - (((value - ((float) this.min)) * (this.thumb_bottom_y - this.thumb_top_y)) / ((float) (this.max - this.min)))) + ((float) (this.thumb_ver_img.getWidth() / 2)));
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
