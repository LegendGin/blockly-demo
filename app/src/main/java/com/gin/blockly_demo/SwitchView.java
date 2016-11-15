package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by zhuoying on 2016/11/15.
 */

public class SwitchView extends CellView {
    private static final String TAG = "SwitchView";
    private ImageView img_icon_off;
    private ImageView img_icon_on;
    private boolean isON = false;
    private SwitchViewListener switchViewListener;
    private TextView tv_title;

    public interface SwitchViewListener {
        void onSwitch(boolean z);
    }

    public boolean isON() {
        return this.isON;
    }

    public SwitchView(Context context) {
        super(context);
        init(null, 0);
    }

    public SwitchView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public SwitchView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    public void setSwitchViewListener(SwitchViewListener switchViewListener) {
        this.switchViewListener = switchViewListener;
    }

    private void init(AttributeSet attrs, int defStyle) {
        final View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_switch_view, null);
        addView(view, new LayoutParams(-1, -1));
        this.tv_title = (TextView) findViewById(R.id.tv_title);
        this.img_icon_on = (ImageView) findViewById(R.id.img_icon_on);
        this.img_icon_off = (ImageView) findViewById(R.id.img_icon_off);
        setState(false);
        view.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                SwitchView.this.setState(!SwitchView.this.isON);
                if (SwitchView.this.isON) {
                    Log.e(SwitchView.TAG, "onClick-->on");
                } else {
                    Log.e(SwitchView.TAG, "onClick-->off");
                }
                if (SwitchView.this.isON) {
                    view.findViewById(R.id.img_icon_on).setVisibility(VISIBLE);
                    view.findViewById(R.id.img_icon_off).setVisibility(GONE);
                    if (SwitchView.this.switchViewListener != null) {
                        SwitchView.this.switchViewListener.onSwitch(SwitchView.this.isON);
                        return;
                    }
                    return;
                }
                view.findViewById(R.id.img_icon_on).setVisibility(GONE);
                view.findViewById(R.id.img_icon_off).setVisibility(VISIBLE);
                if (SwitchView.this.switchViewListener != null) {
                    SwitchView.this.switchViewListener.onSwitch(SwitchView.this.isON);
                }
            }
        });
    }

    public void notifyWidgetBeanChanged() {
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_title.setText(this.widgetData.name);
        }
    }

    private void setState(boolean isON) {
        this.isON = isON;
        if (isON) {
            this.img_icon_off.setVisibility(GONE);
            this.img_icon_on.setVisibility(VISIBLE);
            return;
        }
        this.img_icon_off.setVisibility(VISIBLE);
        this.img_icon_on.setVisibility(GONE);
    }

    public void setMode(int mode) {
        super.setMode(mode);
        if (mode == 2) {
            setState(false);
        }
    }

    public int getValue() {
        return isON() ? 1 : 0;
    }
}
