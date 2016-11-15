package com.gin.blockly_demo;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Point;
import android.graphics.RectF;
import android.support.percent.PercentFrameLayout;
import android.support.percent.PercentLayoutHelper;
import android.util.AttributeSet;
import android.view.DragEvent;
import android.view.View;

/**
 * Created by zhuoying on 2016/11/10.
 */

public class CellLayout extends PercentFrameLayout implements View.OnDragListener {
    private CellLayoutListener cellLayoutListener;
    private int cell_height_count;
    private int cell_width_count;
    private CellView currentDragCellView;
    private float currentDragX;
    private float currentDragY;
    private View shadowView;

    public interface CellLayoutListener {
        void onAddCellViewByDrop(CellView cellView);
    }

    public void setCellLayoutListener(CellLayoutListener cellLayoutListener) {
        this.cellLayoutListener = cellLayoutListener;
    }

    public CellLayout(Context context) {
        super(context);
        init(null, 0);
    }

    public CellLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs, 0);
    }

    public CellLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(attrs, defStyleAttr);
    }

    private void init(AttributeSet attrs, int defStyle) {
        TypedArray a = getContext().obtainStyledAttributes(attrs, R.styleable.CellLayout, defStyle, 0);
        this.cell_height_count = a.getInt(R.styleable.CellLayout_cell_height_count, 0);
        this.cell_width_count = a.getInt(R.styleable.CellLayout_cell_width_count, 0);
        a.recycle();
    }

    public void addCellView(CellView cellView) {
        addView(cellView, createChildLayoutParams(cellView));
    }

    private LayoutParams createChildLayoutParams(CellView cellView) {
        LayoutParams layoutParams = new LayoutParams(getContext(), null);
        PercentLayoutHelper.PercentLayoutInfo info = layoutParams.getPercentLayoutInfo();
        info.widthPercent = cellView.getCellWidth() / ((float) this.cell_width_count);
        info.heightPercent = cellView.getCellHeight() / ((float) this.cell_height_count);
        info.leftMarginPercent = cellView.getCellX() / ((float) this.cell_width_count);
        info.topMarginPercent = cellView.getCellY() / ((float) this.cell_height_count);
        return layoutParams;
    }

    public void updateChildView(CellView cellView) {
        updateViewLayout(cellView, createChildLayoutParams(cellView));
    }

    public boolean onDrag(View v, DragEvent event) {
        switch (event.getAction()) {
            case 1:
                if (this.currentDragCellView.getCurrentMode() != 2) {
                    return true;
                }
                this.currentDragX = this.currentDragCellView.getCellX();
                this.currentDragY = this.currentDragCellView.getCellY();
                this.currentDragCellView.setVisibility(INVISIBLE);
                return true;
            case 2:
                float y = event.getY() - (((this.currentDragCellView.getCellHeight() / ((float) this.cell_height_count)) * ((float) v.getHeight())) / 2.0f);
                int cell_x = x2CellX(event.getX() - (((this.currentDragCellView.getCellWidth() / ((float) this.cell_width_count)) * ((float) v.getWidth())) / 2.0f));
                int cell_y = y2CellY(y);
                if (cell_x < 0) {
                    cell_x = 0;
                }
                if (cell_y < 0) {
                    cell_y = 0;
                }
                if (((int) this.currentDragCellView.getCellWidth()) + cell_x > this.cell_width_count) {
                    cell_x = (int) (((float) this.cell_width_count) - this.currentDragCellView.getCellWidth());
                }
                if (((int) this.currentDragCellView.getCellHeight()) + cell_y > this.cell_height_count) {
                    cell_y = (int) (((float) this.cell_height_count) - this.currentDragCellView.getCellHeight());
                }
                if (isCollision(cell_x, cell_y, (int) this.currentDragCellView.getCellHeight(), (int) this.currentDragCellView.getCellWidth())) {
                    return true;
                }
                this.currentDragX = (float) cell_x;
                this.currentDragY = (float) cell_y;
                changeShadowState(true);
                return true;
            case 3:
                if (this.currentDragCellView.getCurrentMode() != 0 || this.currentDragX == -1.0f || this.currentDragY == -1.0f) {
                    return true;
                }
                CellView cellView = WidgetFactory.createCellView(getContext(), this.currentDragCellView.getWidgetData().deepCopy(), 2);
                cellView.setCellX(this.currentDragX);
                cellView.setCellY(this.currentDragY);
                cellView.setMode(2);
                addCellView(cellView);
                if (this.cellLayoutListener == null) {
                    return true;
                }
                this.cellLayoutListener.onAddCellViewByDrop(cellView);
                return true;
            case 4:
                this.currentDragCellView.setCellX(this.currentDragX);
                this.currentDragCellView.setCellY(this.currentDragY);
                if (this.currentDragCellView != null) {
                    this.currentDragCellView.setVisibility(VISIBLE);
                    this.currentDragCellView = null;
                }
                this.currentDragX = -1.0f;
                this.currentDragY = -1.0f;
                changeShadowState(false);
                return true;
            case 5:
            case 6:
                return true;
            default:
                return false;
        }
    }

    public void setCurrentDragCellView(CellView cellView, boolean isAdd) {
        if (isAdd) {
            this.currentDragCellView = cellView;
            this.currentDragX = -1.0f;
            this.currentDragY = -1.0f;
            return;
        }
        this.currentDragCellView = cellView;
        this.currentDragX = this.currentDragCellView.getCellX();
        this.currentDragY = this.currentDragCellView.getCellY();
    }

    private boolean isCollision(int cell_x, int cell_y, int cell_height, int cell_width) {
        int count = getChildCount();
        for (int i = 0; i < count; i++) {
            View view = getChildAt(i);
            if ((view instanceof CellView) && view != this.currentDragCellView) {
                CellView childCellView = (CellView) view;
                float left = childCellView.getCellX();
                float top = childCellView.getCellY();
                RectF childRect = new RectF(left, top, left + childCellView.getCellWidth(), top + childCellView.getCellHeight());
                left = (float) cell_x;
                top = (float) cell_y;
                if (childRect.intersect(new RectF(left, top, left + ((float) cell_width), top + ((float) cell_height)))) {
                    return true;
                }
            }
        }
        return false;
    }

    private int x2CellX(float x) {
        return Math.round((((float) this.cell_width_count) * x) / ((float) getWidth()));
    }

    private int y2CellY(float y) {
        return Math.round((((float) this.cell_height_count) * y) / ((float) getHeight()));
    }

    public Point getCellViewSize(CellView cellView) {
        return new Point((int) ((((float) getWidth()) * cellView.getCellWidth()) / ((float) this.cell_width_count)), (int) ((((float) getHeight()) * cellView.getCellHeight()) / ((float) this.cell_height_count)));
    }

    public RectF getCellViewShowRectF(CellView cellView) {
        return getCellViewShowRectF(cellView.getCellWidth(), cellView.getCellHeight());
    }

    public RectF getCellViewShowRectF(float cell_width, float cell_height) {
        float showCellSize;
        float height = (((float) getHeight()) * cell_height) / ((float) this.cell_height_count);
        float width = (((float) getWidth()) * cell_width) / ((float) this.cell_width_count);
        float cellHeight = ((float) getHeight()) / ((float) this.cell_height_count);
        float cellWidth = ((float) getWidth()) / ((float) this.cell_width_count);
        if (cellHeight > cellWidth) {
            showCellSize = cellWidth;
        } else {
            showCellSize = cellHeight;
        }
        cellHeight = showCellSize * cell_height;
        cellWidth = showCellSize * cell_width;
        return new RectF((width - cellWidth) / 2.0f, (height - cellHeight) / 2.0f, (width + cellWidth) / 2.0f, (height + cellHeight) / 2.0f);
    }

    public void setMode(int type) {
        int count = getChildCount();
        for (int i = 0; i < count; i++) {
            View child = getChildAt(i);
            if (child instanceof CellView) {
                ((CellView) child).setMode(type);
            }
        }
    }

    private void changeShadowState(boolean show) {
        if (this.shadowView == null) {
            this.shadowView = new View(getContext());
            this.shadowView.setBackgroundResource(R.color.cell_shadow_color);
            addView(this.shadowView);
        }
        if (show) {
            float x = (this.currentDragX / ((float) this.cell_width_count)) * ((float) getWidth());
            float y = (this.currentDragY / ((float) this.cell_height_count)) * ((float) getHeight());
            this.shadowView.setLayoutParams(new LayoutParams((int) ((this.currentDragCellView.getCellWidth() * ((float) getWidth())) / ((float) this.cell_width_count)), (int) ((this.currentDragCellView.getCellHeight() * ((float) getHeight())) / ((float) this.cell_height_count))));
            this.shadowView.setX(x);
            this.shadowView.setY(y);
            this.shadowView.setVisibility(VISIBLE);
            return;
        }
        this.shadowView.setVisibility(GONE);
    }
}
