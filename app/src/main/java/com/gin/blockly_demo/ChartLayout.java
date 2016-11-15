package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ChartLayout  extends CellView {
    private static final String TAG = "ChartLayout";
    private ChartView chartView;
    private TextView tv_title;

    public ChartLayout(Context context) {
        super(context);
        init(null, 0);
    }

    public ChartLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public ChartLayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_chart_layout, null);
        addView(view, new LayoutParams(-1, -1));
        this.chartView = (ChartView) view.findViewById(R.id.chartView);
        this.tv_title = (TextView) view.findViewById(R.id.tv_title);
    }

    public void notifyWidgetBeanChanged() {
        if (!(TextUtils.isEmpty(this.widgetData.icon) || AssetsUtils.getImageFromAssetsFile(getContext(), this.widgetData.icon) == null)) {
            this.chartView.setIcon(AssetsUtils.getImageFromAssetsFile(getContext(), this.widgetData.icon));
        }
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    public void addValue(int value) {
        this.chartView.addValue(value);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void setWidgetValue(SetValueToWidgetEvent event) {
        if (Integer.parseInt(event.widgetID) == this.widgetData.widgetID) {
            addValue((int) Float.parseFloat(event.value));
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
