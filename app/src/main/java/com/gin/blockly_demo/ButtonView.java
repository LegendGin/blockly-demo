package com.gin.blockly_demo;

import android.content.Context;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class ButtonView extends CellView {
    private static final String TAG = "ButtonView";
    private ButtonViewListener buttonViewListener;
    private boolean pressed;
    private TextView tv_subTitle;

    public interface ButtonViewListener {
        void onButtonStateChanged(boolean z);
    }

    public boolean isPressed() {
        return this.pressed;
    }

    public int getValue() {
        return isPressed() ? 1 : 0;
    }

    public void setButtonViewListener(ButtonViewListener buttonViewListener) {
        this.buttonViewListener = buttonViewListener;
    }

    public ButtonView(Context context) {
        super(context);
        init(null, 0, context);
    }

    public ButtonView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(null, 0, context);
    }

    public ButtonView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(null, 0, context);
    }

    private void init(AttributeSet attrs, int defStyle, Context context) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_button_with_icon, null);
        addView(view);
        this.tv_subTitle = (TextView) findViewById(R.id.tv_subTitle);
        final View layout_bg = view.findViewById(R.id.layout_bg);
        view.setOnTouchListener(new OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction() & 255) {
                    case 0:
                        Log.e(ButtonView.TAG, "ACTION_DOWN");
                        layout_bg.setSelected(true);
                        ButtonView.this.pressed = true;
                        if (ButtonView.this.buttonViewListener != null) {
                            ButtonView.this.buttonViewListener.onButtonStateChanged(true);
                            break;
                        }
                        break;
                    case 1:
                        Log.e(ButtonView.TAG, "ACTION_UP");
                        ButtonView.this.pressed = false;
                        layout_bg.setSelected(false);
                        if (ButtonView.this.buttonViewListener != null) {
                            ButtonView.this.buttonViewListener.onButtonStateChanged(false);
                            break;
                        }
                        break;
                }
                return true;
            }
        });
    }

    public void notifyWidgetBeanChanged() {
        if (!TextUtils.isEmpty(this.widgetData.name)) {
            this.tv_subTitle.setText(this.widgetData.name);
        }
    }
}
