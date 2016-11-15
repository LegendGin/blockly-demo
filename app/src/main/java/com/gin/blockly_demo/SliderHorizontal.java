package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by zhuoying on 2016/11/15.
 */

public class SliderHorizontal extends CellView implements OnSeekBarValueChangeListener {
    private HorizontalSeekBar horizontalSeekBar;
    private ImageView img_icon;
    private OnSliderValueChangeListener onSliderValueChangeListener;
    private TextView slider_value;
    private TextView tv_title;
    private float value;

    public int getValue() {
        return (int) this.value;
    }

    public void setOnSliderValueChangeListener(OnSliderValueChangeListener onSliderValueChangeListener) {
        this.onSliderValueChangeListener = onSliderValueChangeListener;
    }

    public SliderHorizontal(Context context) {
        super(context);
        init(context, null, 0);
    }

    public SliderHorizontal(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public SliderHorizontal(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context, attrs, defStyle);
    }

    private void init(Context context, AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_horizontal_icon_slider, null);
        addView(view, new LayoutParams(-1, -1));
        this.slider_value = (TextView) view.findViewById(R.id.slider_value);
        this.horizontalSeekBar = (HorizontalSeekBar) view.findViewById(R.id.horizontalSeekBar);
        this.slider_value.setText(formatValue(this.horizontalSeekBar.getValue()));
        this.horizontalSeekBar.setOnValueChangeListener(this);
        this.img_icon = (ImageView) view.findViewById(R.id.img_icon);
        this.tv_title = (TextView) view.findViewById(R.id.tv_title);
    }

    public void notifyWidgetBeanChanged() {
//        this.img_icon.setImageBitmap(AssetsUtils.getImageFromAssetsFile(getContext(), this.widgetData.icon));
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    public void onSeekBarValueChange(float value) {
        this.value = value;
        this.slider_value.setText(formatValue(value));
        if (this.onSliderValueChangeListener != null) {
            this.onSliderValueChangeListener.onSliderValueChange(value);
        }
    }

    private void setValue(float value) {
        this.value = value;
        this.slider_value.setText(formatValue(value));
        this.horizontalSeekBar.setValue(value);
    }

    private String formatValue(float value) {
        return ((int) value) + "";
    }

    public void setMode(int mode) {
        super.setMode(mode);
        if (mode == 2) {
            post(new Runnable() {
                public void run() {
                    SliderHorizontal.this.setValue(0.0f);
                }
            });
        }
    }
}
