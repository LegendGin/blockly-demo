package com.gin.blockly_demo;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.os.Handler;


/**
 * Created by zhuoying on 2016/11/14.
 */

public class MusicKeyView extends CellView implements View.OnTouchListener {
    private final String JS_METHOD_NAME = "setTone";
    private final String JS_METHOD_PARAM_TONE_NAME = "toneName";
    private final String TAG = MusicKeyView.class.getSimpleName();
    private volatile boolean keyIsClickable;
    private String toneName;

    public MusicKeyView(Context context) {
        super(context);
        initViews();
    }

    public MusicKeyView(Context context, AttributeSet attrs) {
        super(context, attrs);
        initViews();
    }

    public MusicKeyView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        initViews();
    }

    public void initViews() {
        View rootView = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_music, null);
        rootView.findViewById(R.id.key_do).setOnTouchListener(this);
        rootView.findViewById(R.id.key_re).setOnTouchListener(this);
        rootView.findViewById(R.id.key_mi).setOnTouchListener(this);
        rootView.findViewById(R.id.key_fa).setOnTouchListener(this);
        rootView.findViewById(R.id.key_sol).setOnTouchListener(this);
        rootView.findViewById(R.id.key_la).setOnTouchListener(this);
        rootView.findViewById(R.id.key_si).setOnTouchListener(this);
        addView(rootView, new LayoutParams(-1, -1));
        this.keyIsClickable = true;
    }

    public boolean onTouch(View view, MotionEvent motionEvent) {
        int event = motionEvent.getAction();
        if (event == 0) {
            switch (view.getId()) {
                case R.id.key_do:
                    this.toneName = "C5";
                    break;
                case R.id.key_re:
                    this.toneName = "D5";
                    break;
                case R.id.key_mi:
                    this.toneName = "E5";
                    break;
                case R.id.key_fa:
                    this.toneName = "F5";
                    break;
                case R.id.key_sol:
                    this.toneName = "G5";
                    break;
                case R.id.key_la:
                    this.toneName = "A5";
                    break;
                case R.id.key_si:
                    this.toneName = "B5";
                    break;
                default:
                    this.toneName = "C5";
                    break;
            }
            if (this.keyIsClickable) {
                BlocklyManager.getInstance().callWeb_setTone(BlocklyManager.getDataStringForLoadUrl("setTone", new String[]{"toneName"}, new String[]{this.toneName}));
                this.keyIsClickable = false;
                new Handler().postDelayed(new Runnable() {
                    public void run() {
                        MusicKeyView.this.keyIsClickable = true;
                    }
                }, 250);
            }
            view.setSelected(true);
        } else if (event == 1) {
            view.setSelected(false);
        }
        return true;
    }
}
