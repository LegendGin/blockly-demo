package com.gin.blockly_demo;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;

/**
 * Created by zhuoying on 2016/11/9.
 */

public class JoystickView extends CellView {
    private static final String TAG = "JoystickView";
    private ImageView img_bottom;
    private ImageView img_joystick;
    private ImageView img_left;
    private ImageView img_right;
    private ImageView img_top;
    private float joystickCentreX;
    private float joystickCentreY;
    int joystickQuadrant = 0;
    private double joystickRadian;
    private double joystickRadius;
    private JoystickViewListener joystickViewListener;

    public interface JoystickViewListener {
        //type : 0表示按下 ； 1表示松开；  2表示移动
        void onJoystickMoved(int quadrant, double radius, double radian, int type);
    }

    public void setJoystickViewListener(JoystickViewListener joystickViewListener) {
        this.joystickViewListener = joystickViewListener;
    }

    public JoystickView(Context context) {
        super(context);
        init(null, 0);
    }

    public JoystickView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public JoystickView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        final View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_joystick, null);
        addView(view, new LayoutParams(-1, -1));
        this.img_joystick = (ImageView) view.findViewById(R.id.img_joystick);
        this.img_joystick.setLayerType(1, null);
        this.img_left = (ImageView) view.findViewById(R.id.img_left);
        this.img_right = (ImageView) view.findViewById(R.id.img_right);
        this.img_top = (ImageView) view.findViewById(R.id.img_top);
        this.img_bottom = (ImageView) view.findViewById(R.id.img_bottom);
        view.setOnTouchListener(new OnTouchListener() {
            public boolean onTouch(View v, MotionEvent event) {
                float touchX = event.getX();
                float touchY = event.getY();
                float viewSideLength = (float) view.getHeight();
                float radius = (viewSideLength / 2.0f) - ((float) (JoystickView.this.img_joystick.getWidth() / 2));
                switch (event.getAction() & 255) {
                    case 0:
                        JoystickView.this.img_joystick.setSelected(true);
                        JoystickView.this.joystickCentreX = viewSideLength / 2.0f;
                        JoystickView.this.joystickCentreY = viewSideLength / 2.0f;
                        break;
                    case 1:
                        JoystickView.this.img_joystick.setSelected(false);
                        JoystickView.this.joystickCentreX = viewSideLength / 2.0f;
                        JoystickView.this.joystickCentreY = viewSideLength / 2.0f;
                        JoystickView.this.joystickRadius = 0.0d;
                        JoystickView.this.joystickRadian = 0.0d;
                        JoystickView.this.joystickQuadrant = 0;
                        break;
                    case 2:
                        float x2 = touchX - (viewSideLength / 2.0f);
                        float y2 = touchY - (viewSideLength / 2.0f);
                        JoystickView.this.joystickRadius = Math.sqrt((double) ((x2 * x2) + (y2 * y2)));
                        JoystickView.this.joystickRadian = Math.atan((double) (y2 / x2));
                        JoystickView.this.joystickQuadrant = 4;
                        if (x2 < 0.0f && y2 > 0.0f) {
                            JoystickView.this.joystickQuadrant = 3;
                            JoystickView.this.joystickRadian = JoystickView.this.joystickRadian + 3.141592653589793d;
                        }
                        if (x2 < 0.0f && y2 < 0.0f) {
                            JoystickView.this.joystickQuadrant = 2;
                            JoystickView.this.joystickRadian = JoystickView.this.joystickRadian + 3.141592653589793d;
                        }
                        if (x2 > 0.0f && y2 < 0.0f) {
                            JoystickView.this.joystickQuadrant = 1;
                            JoystickView.this.joystickRadian = JoystickView.this.joystickRadian + 6.283185307179586d;
                        }
                        if (JoystickView.this.joystickRadius / ((double) radius) > 1.0d) {
                            JoystickView.this.joystickRadius = (double) radius;
                            JoystickView.this.joystickCentreX = (float) ((JoystickView.this.joystickRadius * Math.cos(JoystickView.this.joystickRadian)) + ((double) (viewSideLength / 2.0f)));
                            JoystickView.this.joystickCentreY = (float) ((JoystickView.this.joystickRadius * Math.sin(JoystickView.this.joystickRadian)) + ((double) (viewSideLength / 2.0f)));
                        } else {
                            JoystickView.this.joystickCentreX = touchX;
                            JoystickView.this.joystickCentreY = touchY;
                        }
                        JoystickView.this.joystickRadius = JoystickView.this.joystickRadius / ((double) radius);
                        break;
                }
                JoystickView.this.img_joystick.setX(JoystickView.this.joystickCentreX - ((float) (JoystickView.this.img_joystick.getWidth() / 2)));
                JoystickView.this.img_joystick.setY(JoystickView.this.joystickCentreY - ((float) (JoystickView.this.img_joystick.getWidth() / 2)));
                JoystickView.this.changeArrow(JoystickView.this.joystickQuadrant);
                if (JoystickView.this.joystickViewListener != null) {
                    JoystickView.this.joystickViewListener.onJoystickMoved(JoystickView.this.joystickQuadrant, JoystickView.this.joystickRadius, JoystickView.this.joystickRadian, event.getAction() & 255);
                }
                return true;
            }
        });
    }

    private void changeArrow(int quadrant) {
        switch (quadrant) {
            case 0:
                this.img_left.setSelected(false);
                this.img_right.setSelected(false);
                this.img_top.setSelected(false);
                this.img_bottom.setSelected(false);
                return;
            case 1:
                this.img_left.setSelected(false);
                this.img_right.setSelected(true);
                this.img_top.setSelected(true);
                this.img_bottom.setSelected(false);
                return;
            case 2:
                this.img_left.setSelected(true);
                this.img_right.setSelected(false);
                this.img_top.setSelected(true);
                this.img_bottom.setSelected(false);
                return;
            case 3:
                this.img_left.setSelected(true);
                this.img_right.setSelected(false);
                this.img_top.setSelected(false);
                this.img_bottom.setSelected(true);
                return;
            case 4:
                this.img_left.setSelected(false);
                this.img_right.setSelected(true);
                this.img_top.setSelected(false);
                this.img_bottom.setSelected(true);
                return;
            default:
                return;
        }
    }

}

