package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

/**
 * Created by zhuoying on 2016/11/15.
 */

public class SliderDuplex extends CellView implements OnSeekBarValueChangeListener {
    private DuplexSeekBar slider_duplex;
    private TextView slider_value;

    public SliderDuplex(Context context) {
        super(context);
        init(context, null, 0);
    }

    public SliderDuplex(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public SliderDuplex(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context, attrs, defStyle);
    }

    private void init(Context context, AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_horizontal_duplex_slider, null);
        addView(view, new LayoutParams(-1, -1));
        this.slider_value = (TextView) view.findViewById(R.id.slider_value);
        this.slider_duplex = (DuplexSeekBar) view.findViewById(R.id.slider_duplex);
        this.slider_value.setText(formatValue(this.slider_duplex.getValue()));
        this.slider_duplex.setOnValueChangeListener(this);
    }

    public void notifyWidgetBeanChanged() {
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            ((TextView) findViewById(R.id.slider_duplex_text)).setText(this.widgetData.name);
        }
    }

    public void onSeekBarValueChange(float value) {
        this.slider_value.setText(formatValue(value));
    }

    private String formatValue(float value) {
        return ((int) value) + "";
    }
}
