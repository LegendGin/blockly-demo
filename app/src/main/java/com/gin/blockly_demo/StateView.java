package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

/**
 * Created by zhuoying on 2016/11/16.
 */

public class StateView extends CellView {
    private static final String TAG = "StateView";
    private ImageView img_icon;
    private boolean isON;
    private TextView tv_off;
    private TextView tv_on;
    private TextView tv_title;

    public StateView(Context context) {
        super(context);
        init(null, 0);
    }

    public StateView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public StateView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_state_view, null);
        addView(view, new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.img_icon = (ImageView) view.findViewById(R.id.img_icon);
        this.tv_title = (TextView) findViewById(R.id.tv_title);
        this.tv_on = (TextView) findViewById(R.id.tv_on);
        this.tv_off = (TextView) findViewById(R.id.tv_off);
        setState(false);
        view.setOnTouchListener(new OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                if (StateView.this.getCurrentMode() != 1) {
                    return false;
                }
                return true;
            }
        });
    }

    private void setState(boolean isON) {
        this.isON = isON;
        if (isON) {
            this.tv_on.setVisibility(VISIBLE);
            this.tv_off.setVisibility(GONE);
        } else {
            this.tv_on.setVisibility(VISIBLE);
            this.tv_off.setVisibility(GONE);
        }
        this.img_icon.setSelected(isON);
    }

    public void notifyWidgetBeanChanged() {
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void setWidgetValue(SetValueToWidgetEvent event) {
        if (Integer.parseInt(event.widgetID) == this.widgetData.widgetID) {
            setState(((int) Float.parseFloat(event.value)) != 0);
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

    public void setMode(int mode) {
        super.setMode(mode);
        if (mode == 2) {
            setState(false);
        }
    }
}
