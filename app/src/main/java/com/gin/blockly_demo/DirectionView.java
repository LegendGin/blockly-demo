package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class DirectionView extends CellView {
    public static final int DIRECTION_BOTTOM = 4;
    public static final int DIRECTION_LEFT = 1;
    public static final int DIRECTION_RIGHT = 2;
    public static final int DIRECTION_TOP = 3;
    private static final String TAG = "DirectionView";
    private DirectionViewListener directionViewListener;
    private ImageView img_bottom;
    private ImageView img_left;
    private ImageView img_right;
    private ImageView img_top;
    private OnTouchListener onTouchListener = new OnTouchListener() {
        public boolean onTouch(View v, MotionEvent event) {
            switch (event.getAction() & 0xff) {
                case 0:
                    if (Color.alpha(Bitmap.createBitmap(((ImageView) v).getDrawingCache()).getPixel((int) event.getX(), (int) event.getY())) > 100) {
                        v.setSelected(true);
                        if (DirectionView.this.directionViewListener != null) {
                            DirectionView.this.directionViewListener.onDirectionButtonStateChanged(DirectionView.this.getButtonID(v), true);
                            Log.e(DirectionView.TAG, "buttonid=" + DirectionView.this.getButtonID(v) + " pressed");
                            break;
                        }
                    }
                    break;
                case 1:
                    v.setSelected(false);
                    if (DirectionView.this.directionViewListener != null) {
                        DirectionView.this.directionViewListener.onDirectionButtonStateChanged(DirectionView.this.getButtonID(v), false);
                        Log.e(DirectionView.TAG, "buttonid=" + DirectionView.this.getButtonID(v) + " released");
                        break;
                    }
                    break;
            }
            return true;
        }
    };

    public interface DirectionViewListener {
        void onDirectionButtonStateChanged(int i, boolean z);
    }

    public void setDirectionViewListener(DirectionViewListener directionViewListener) {
        this.directionViewListener = directionViewListener;
    }

    public DirectionView(Context context) {
        super(context);
        init(null, 0);
    }

    public DirectionView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public DirectionView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        View view = ((LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.widget_direction, null);
        addView(view, new LayoutParams(-1, -1));
        this.img_left = (ImageView) view.findViewById(R.id.img_left);
        this.img_right = (ImageView) view.findViewById(R.id.img_right);
        this.img_top = (ImageView) view.findViewById(R.id.img_top);
        this.img_bottom = (ImageView) view.findViewById(R.id.img_bottom);
        this.img_left.setDrawingCacheEnabled(true);
        this.img_right.setDrawingCacheEnabled(true);
        this.img_top.setDrawingCacheEnabled(true);
        this.img_bottom.setDrawingCacheEnabled(true);
        this.img_left.setOnTouchListener(this.onTouchListener);
        this.img_right.setOnTouchListener(this.onTouchListener);
        this.img_top.setOnTouchListener(this.onTouchListener);
        this.img_bottom.setOnTouchListener(this.onTouchListener);
    }

    private int getButtonID(View v) {
        switch (v.getId()) {
            case R.id.img_left:
                return 1;
            case R.id.img_top:
                return 3;
            case R.id.img_right:
                return 2;
            case R.id.img_bottom:
                return 4;
            default:
                return 0;
        }
    }
}
