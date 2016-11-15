package com.gin.blockly_demo;

import android.content.Context;
import android.content.res.TypedArray;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewParent;
import android.widget.FrameLayout;

import org.greenrobot.eventbus.EventBus;


/**
 * Created by zhuoying on 2016/11/10.
 */

public class CellView extends FrameLayout{
    public static final int MODE_DESIGN = 2;
    public static final int MODE_ICON = 0;
    public static final int MODE_PLAY = 1;
    private static final String TAG = "CellView";
    private static final int click_px = 10;
    private static final int click_time_design = 100;
    private static final int click_time_icon = 150;
    private float cell_height;
    private float cell_width;
    private float cell_x;
    private float cell_y;
    private boolean checkLongClick = false;
    private int currentMode = -1;
    private long downTime;
    private float downX;
    private float downY;
    private float realHeight = 0.0f;
    private float realWidth = 0.0f;
    protected WidgetData widgetData;

    private class CheckLongClickRunnable implements Runnable {
        private int mode;

        public CheckLongClickRunnable(int mode) {
            this.mode = mode;
        }

        public void run() {
            if (!CellView.this.checkLongClick) {
                return;
            }
            if (this.mode == 0) {
                EventBus.getDefault().post(new DragFromExternalEvent(CellView.this));
            } else if (this.mode == 2) {
                CellView.this.setOnDragListener();
                CellView.this.startDrag(null, new DragShadowBuilder(CellView.this), null, 0);
                CellView.this.checkLongClick = false;
            }
        }
    }

    private class WidgetAddBean {
        public String code;
        public String id;
        public String name;
        public String type;
        public String xib;
        public String xmlData;

        private WidgetAddBean() {
        }
    }

    private class WidgetUpdateBean {
        public String name;
        public String port;
        public String slot;

        private WidgetUpdateBean() {
        }
    }

    public int getCurrentMode() {
        return this.currentMode;
    }

    public WidgetData getWidgetData() {
        return this.widgetData;
    }

    public void setWidgetData(WidgetData widgetData) {
        this.widgetData = widgetData;
        notifyWidgetBeanChanged();
    }

    public void notifyWidgetBeanChanged() {
    }

    public CellView(Context context) {
        super(context);
        init(null, 0);
    }

    public CellView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public CellView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs, defStyle);
    }

    private void init(AttributeSet attrs, int defStyle) {
        TypedArray a = getContext().obtainStyledAttributes(attrs, R.styleable.CellView, defStyle, 0);
        this.cell_height = (float) a.getInt(R.styleable.CellView_cell_height, 4);
        this.cell_width = (float) a.getInt(R.styleable.CellView_cell_width, 4);
        this.cell_x = (float) a.getInt(R.styleable.CellView_cell_x, 4);
        this.cell_y = (float) a.getInt(R.styleable.CellView_cell_y, 4);
        a.recycle();
    }

    public float getCellWidth() {
        return this.cell_width;
    }

    public void setCellWidth(float cell_width) {
        this.cell_width = cell_width;
        notifyChange();
    }

    public boolean onTouchEvent(MotionEvent event) {
        switch (this.currentMode) {
            case 0:
                switch (event.getAction()) {
                    case 0:
                        this.downX = event.getRawX();
                        this.downY = event.getRawY();
                        this.downTime = System.currentTimeMillis();
                        this.checkLongClick = true;
                        postDelayed(new CheckLongClickRunnable(0), 150);
                        return true;
                    case 1:
                        this.checkLongClick = false;
                        break;
                    case 2:
                        if (!treatAsMove(event)) {
                            return true;
                        }
                        this.checkLongClick = false;
                        return false;
                    case 3:
                        this.checkLongClick = false;
                        return false;
                    default:
                        break;
                }
            case 2:
                switch (event.getAction()) {
                    case 0:
                        this.downX = event.getRawX();
                        this.downY = event.getRawY();
                        this.checkLongClick = true;
                        postDelayed(new CheckLongClickRunnable(2), 100);
                        return true;
                    case 1:
                        if (!treatAsMove(event)) {
                            performClick();
                        }
                        this.checkLongClick = false;
                        break;
                    case 2:
                        if (!treatAsMove(event)) {
                            return true;
                        }
                        this.checkLongClick = false;
                        return false;
                    case 3:
                        this.checkLongClick = false;
                        return false;
                    default:
                        break;
                }
        }
        return false;
    }

    public float getCellHeight() {
        return this.cell_height;
    }

    public void setCellHeight(float cell_height) {
        this.cell_height = cell_height;
        notifyChange();
    }

    public float getCellX() {
        return this.cell_x;
    }

    public void setCellX(float cell_x) {
        this.cell_x = cell_x;
        notifyChange();
        this.widgetData.xPosition = (int) this.cell_x;
    }

    public float getCellY() {
        return this.cell_y;
    }

    public void setCellY(float cell_y) {
        this.cell_y = cell_y;
        notifyChange();
        this.widgetData.yPosition = (int) this.cell_y;
    }

    private void notifyChange() {
        ViewParent parent = getParent();
        if (parent instanceof CellLayout) {
            ((CellLayout) parent).updateChildView(this);
        }
    }

    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        View child = getChildAt(0);
        if (child != null) {
            float perCellSize;
            float perCellHeight = this.realHeight / this.cell_height;
            float perCellWidth = this.realWidth / this.cell_width;
            boolean verticalCenter = perCellHeight >= perCellWidth;
            if (verticalCenter) {
                perCellSize = perCellWidth;
            } else {
                perCellSize = perCellHeight;
            }
            float childWidth = perCellSize * this.cell_width;
            float childHeight = perCellSize * this.cell_height;
            if (verticalCenter) {
                child.layout(0, (int) ((this.realHeight - childHeight) / 2.0f), (int) childWidth, (int) ((this.realHeight + childHeight) / 2.0f));
            } else {
                child.layout((int) ((this.realWidth - childWidth) / 2.0f), 0, (int) ((this.realWidth + childWidth) / 2.0f), (int) childHeight);
            }
        }
    }

    private void setOnDragListener() {
        ViewParent parent = getParent();
        if (parent instanceof CellLayout) {
            ((CellLayout) parent).setCurrentDragCellView(this, false);
        }
    }

    public void setMode(int mode) {
        this.currentMode = mode;
    }

    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        int measureWidth = measureWidth(widthMeasureSpec);
        int measureHeight = measureHeight(heightMeasureSpec);
        if (!(measureWidth == 0 || measureHeight == 0)) {
            float perCellSize;
            this.realWidth = (float) measureWidth;
            this.realHeight = (float) measureHeight;
            float perCellHeight = this.realHeight / this.cell_height;
            float perCellWidth = this.realWidth / this.cell_width;
            if (perCellHeight >= perCellWidth) {
                perCellSize = perCellWidth;
            } else {
                perCellSize = perCellHeight;
            }
            measureChildren(MeasureSpec.makeMeasureSpec((int) (perCellSize * this.cell_width), MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec((int) (perCellSize * this.cell_height), MeasureSpec.EXACTLY));
        }
        setMeasuredDimension(measureWidth, measureHeight);
    }

    private int measureWidth(int pWidthMeasureSpec) {
        int widthMode = MeasureSpec.getMode(pWidthMeasureSpec);
        int widthSize = MeasureSpec.getSize(pWidthMeasureSpec);
        switch (widthMode) {
            case Integer.MIN_VALUE:
            case MeasureSpec.EXACTLY:
                return widthSize;
            default:
                return 0;
        }
    }

    private int measureHeight(int pHeightMeasureSpec) {
        int heightMode = MeasureSpec.getMode(pHeightMeasureSpec);
        int heightSize = MeasureSpec.getSize(pHeightMeasureSpec);
        switch (heightMode) {
            case Integer.MIN_VALUE:
            case MeasureSpec.EXACTLY:
                return heightSize;
            default:
                return 0;
        }
    }

    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (this.currentMode != 1) {
            return true;
        }
        return super.onInterceptTouchEvent(ev);
    }

//    public String getWidgetAddJson() {
//        Object widgetAddBean = new WidgetAddBean();
//        widgetAddBean.id = String.valueOf(this.widgetData.widgetID);
//        widgetAddBean.name = this.widgetData.name;
//        if (TextUtils.isEmpty(this.widgetData.xmlData)) {
//            widgetAddBean.xmlData = "";
//        } else {
//            widgetAddBean.xmlData = this.widgetData.xmlData;
//        }
//        widgetAddBean.xib = this.widgetData.xibName;
//        widgetAddBean.type = this.widgetData.type;
//        return new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create().toJson(widgetAddBean);
//    }

//    public String getWidgetUpdateJson() {
//        Object widgetUpdateBean = new WidgetUpdateBean();
//        widgetUpdateBean.name = this.widgetData.name;
//        widgetUpdateBean.port = this.widgetData.port;
//        widgetUpdateBean.slot = this.widgetData.slot;
//        return new Gson().toJson(widgetUpdateBean);
//    }

    private boolean treatAsMove(MotionEvent event) {
        if (Math.abs(event.getRawX() - this.downX) >= 10.0f || Math.abs(event.getRawY() - this.downY) >= 10.0f) {
            return true;
        }
        return false;
    }

    public int getValue() {
        return 0;
    }

}
