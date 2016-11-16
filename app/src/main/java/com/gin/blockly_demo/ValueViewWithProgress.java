package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by zhuoying on 2016/11/16.
 */

public class ValueViewWithProgress extends CellView {
    private static final String TAG = "ValueViewWithProgress";
    private CircleProgressView circleProgressView;
    private TextView tv_title;

    public ValueViewWithProgress(Context context) {
        super(context);
        init(null, 0);
    }

    public ValueViewWithProgress(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public ValueViewWithProgress(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_value_progress_view, null);
        addView(view, new LayoutParams(-1, -1));
        this.tv_title = (TextView) view.findViewById(R.id.tv_title);
        this.circleProgressView = (CircleProgressView) view.findViewById(R.id.circleProgressView);
        view.setOnTouchListener(new OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                if (ValueViewWithProgress.this.getCurrentMode() == 1) {
                    switch (event.getAction() & 255) {
                        case 0:
                            Log.e(ValueViewWithProgress.TAG, "ACTION_DOWN");
                            break;
                        case 1:
                            Log.e(ValueViewWithProgress.TAG, "ACTION_UP");
                            break;
                        case 2:
                            Log.e(ValueViewWithProgress.TAG, "ACTION_MOVE");
                            break;
                        default:
                            break;
                    }
                }
                return false;
            }
        });
    }

    public void notifyWidgetBeanChanged() {
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    public void setProgress(float progress) {
        this.circleProgressView.setProgress(progress);
    }

    public int getMax() {
        return this.circleProgressView.getMaxValue();
    }

    public void setMax(int maxValue) {
        this.circleProgressView.setMaxValue(maxValue);
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void setWidgetValue(SetValueToWidgetEvent event) {
        if (Integer.parseInt(event.widgetID) == this.widgetData.widgetID) {
            setProgress(Float.parseFloat(event.value) / ((float) getMax()));
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
