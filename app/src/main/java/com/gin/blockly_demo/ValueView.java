package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by zhuoying on 2016/11/16.
 */

public class ValueView extends CellView {
    private static final String TAG = "ValueView";
    private Bitmap bitmapNor;
    private Bitmap bitmapPressed;
    private TextView tv_title;
    private TextView tv_value;
    private TextView tv_value_shadow;

    public ValueView(Context context) {
        super(context);
        init(null, 0, context);
    }

    public ValueView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(null, 0, context);
    }

    public ValueView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(null, 0, context);
    }

    private void init(AttributeSet attrs, int defStyle, Context context) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_value_view, null);
        addView(view, new LayoutParams(-1, -1));
        this.tv_value = (TextView) view.findViewById(R.id.tv_value);
        this.tv_value_shadow = (TextView) view.findViewById(R.id.tv_value_shadow);
        Typeface diodeFont = Typeface.createFromAsset(context.getAssets(), "font/diode.TTF");
        this.tv_value.setTypeface(diodeFont);
        this.tv_value_shadow.setTypeface(diodeFont);
        this.tv_title = (TextView) view.findViewById(R.id.tv_title);
        setValue(0);
    }

    public void setValue(int value) {
        this.tv_value.setText(String.format("%04d", new Object[]{Integer.valueOf(value)}));
    }

    public void notifyWidgetBeanChanged() {
//        this.bitmapNor = AssetsUtils.getImageFromAssetsFile(getContext(), this.widgetData.icon);
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void setWidgetValue(SetValueToWidgetEvent event) {
        if (Integer.parseInt(event.widgetID) == this.widgetData.widgetID) {
            setValue((int) Float.parseFloat(event.value));
        }
    }

    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        EventBus.getDefault().register(this);
    }

    protected void onDetachedFromWindow() {
        EventBus.getDefault().unregister(this);
        super.onDetachedFromWindow();
    }
}
