package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Point;
import android.graphics.RectF;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.StateListDrawable;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.support.percent.PercentRelativeLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.TranslateAnimation;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity implements CellLayout.CellLayoutListener, SensorEventListener {

    public static final String TAG = MainActivity.class.getSimpleName();
    private static final int WHAT_HIDE_LEFT_PANEL = 103;
    private static final int WHAT_SHOW_LEFT_PANEL = 102;


    Button edit;
    private ImageView panel_img_grid;
    private PercentRelativeLayout relative_layout_tab;
    private LinearLayout left_linLayout_tabContainer;
    private LinearLayout left_linLayout_wdigetIcon;
    private ImageView left_img_panelVisibility;
    private CellLayout cellLayout;

    private ImageView widgetMenuIndicator;


    private Animation left_ani_rotate_anticlockwise;
    private Animation left_ani_rotate_clockwise;
    private ActionBar.LayoutParams left_linLayoutParams_group;


    private Boolean left_isHiding = false;
    private Boolean left_isShowing = false;
    private boolean isEnterBlockly;
    private int currentMode = -1;
    private int count = 20;
    private int lastTabPivotY = 0;
    private int left_ani_delayedTime = 1;

    private ArrayList<WidgetData> widgetDatas;
    private ProjectBean currentProjectBean = null;

    private volatile PopupWindow widgetEditPopupWindow;
    private volatile View widgetEditContentView;

    private Handler handler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case 102:
                    MainActivity.this.showLeftPanel(true);
                    return;
                case 103:
                    MainActivity.this.hideLeftPanel(true);
                    return;
                default:
                    return;
            }
        }
    };

    private View.OnClickListener clickListener_tap1 = new View.OnClickListener() {
        public void onClick(View view) {
            setLeftPanelTapsSelected(((Integer) view.getTag()));
        }
    };


    private View.OnClickListener clickListener_widgets = new View.OnClickListener() {
        public void onClick(View v) {
            Log.e(TAG, "onClick");
//            showEditPopupWindow((CellView) v);
        }
    };

    private void showEditPopupWindow(final CellView cellView) {
//        if (this.widgetEditPopupWindow == null) {
//            this.widgetEditContentView = getLayoutInflater().inflate(R.layout.popup_widget_edit, null);
//            this.widgetEditPopupWindow = new PopupWindow(this.widgetEditContentView, (int) (((float) DeviceManager.SCREEN_WIDTH) * 0.21972656f), (int) (((float) DeviceManager.SCREEN_WIDTH) * 0.21972656f), true);
//            this.widgetEditPopupWindow.setTouchable(true);
//            this.widgetEditPopupWindow.setOutsideTouchable(true);
//            this.widgetEditPopupWindow.setBackgroundDrawable(new BitmapDrawable(getResources(), (Bitmap) null));
//        }
//        ((TextView) this.widgetEditContentView.findViewById(R.id.tv_widgetName)).setText(cellView.getWidgetData().name);
//        this.widgetEditContentView.findViewById(R.id.layout_port).setEnabled(true);
//        this.widgetEditContentView.findViewById(R.id.layout_code).setEnabled(true);
//        if ((cellView instanceof JoystickView) || (cellView instanceof SpeakerView) || (cellView instanceof MusicKeyView)) {
//            this.widgetEditContentView.findViewById(R.id.layout_port).setEnabled(false);
//            this.widgetEditContentView.findViewById(R.id.layout_code).setEnabled(false);
//        }
//        if (TextUtils.isEmpty(cellView.getWidgetData().port)) {
//            this.widgetEditContentView.findViewById(R.id.layout_port).setEnabled(false);
//        }
//        if (cellView instanceof ColorPickerView) {
//            this.widgetEditContentView.findViewById(R.id.layout_port).setEnabled(true);
//            this.widgetEditContentView.findViewById(R.id.layout_code).setEnabled(false);
//        }
//        this.widgetEditContentView.findViewById(R.id.layout_rename).setOnClickListener(new View.OnClickListener() {
//            public void onClick(View view) {
//                Log.e(MainActivity.TAG, "layout_rename");
//                MainActivity.this.widgetEditPopupWindow.dismiss();
//                MainActivity.this.showRenameInputDialog(cellView);
//            }
//        });
//        this.widgetEditContentView.findViewById(R.id.layout_port).setOnClickListener(new View.OnClickListener() {
//            public void onClick(View view) {
//                Log.e(PanelActivity.TAG, "layout_port");
//                MainActivity.this.showPortSelectWindow(cellView);
//                MainActivity.this.widgetEditPopupWindow.dismiss();
//            }
//        });
//        this.widgetEditContentView.findViewById(R.id.layout_code).setOnClickListener(new View.OnClickListener() {
//            public void onClick(View view) {
//                Log.e(MainActivity.TAG, "显示blockly界面");
//                MainActivity.this.widgetEditPopupWindow.dismiss();
//                MainActivity.this.viewJump_showBlockly(cellView);
//            }
//        });
//        this.widgetEditContentView.findViewById(R.id.layout_delete).setOnClickListener(new View.OnClickListener() {
//            public void onClick(View view) {
//                Log.e(MainActivity.TAG, "layout_delete");
//                MainActivity.this.widgetEditPopupWindow.dismiss();
//                MainActivity.this.widgetDelete(cellView);
//            }
//        });
//        int[] location = new int[2];
//        cellView.getLocationOnScreen(location);
//        int screenH = getWindowManager().getDefaultDisplay().getHeight();
//        int screenW = getWindowManager().getDefaultDisplay().getWidth();
//        int x = location[0] + ((cellView.getWidth() - this.widgetEditPopupWindow.getWidth()) / 2);
//        int y = location[1] + cellView.getHeight();
//        if (x < 0 || this.widgetEditPopupWindow.getWidth() + x > screenW || y < 0 || this.widgetEditPopupWindow.getHeight() + y > screenH) {
//            x = location[0] + ((cellView.getWidth() - this.widgetEditPopupWindow.getWidth()) / 2);
//            y = location[1] - this.widgetEditPopupWindow.getHeight();
//            if (x < 0 || this.widgetEditPopupWindow.getWidth() + x > screenW || y < 0 || this.widgetEditPopupWindow.getHeight() + y > screenH) {
//                x = location[0] - this.widgetEditPopupWindow.getWidth();
//                y = location[1] + ((cellView.getHeight() - this.widgetEditPopupWindow.getHeight()) / 2);
//                if (x < 0 || this.widgetEditPopupWindow.getWidth() + x > screenW || y < 0 || this.widgetEditPopupWindow.getHeight() + y > screenH) {
//                    x = location[0] + cellView.getWidth();
//                    y = location[1] + ((cellView.getHeight() - this.widgetEditPopupWindow.getHeight()) / 2);
//                    if (x < 0 || this.widgetEditPopupWindow.getWidth() + x > screenW || y < 0 || this.widgetEditPopupWindow.getHeight() + y > screenH) {
//                        this.widgetEditContentView.findViewById(R.id.arrow_left).setVisibility(View.GONE);
//                        this.widgetEditContentView.findViewById(R.id.arrow_right).setVisibility(View.GONE);
//                        this.widgetEditContentView.findViewById(R.id.arrow_top).setVisibility(View.GONE);
//                        this.widgetEditContentView.findViewById(R.id.arrow_bottom).setVisibility(View.VISIBLE);
//                        this.widgetEditPopupWindow.showAsDropDown(cellView);
//                        return;
//                    }
//                    this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//                    this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//                    this.widgetEditContentView.findViewById(R.id.arrow_left).setVisibility(View.VISIBLE);
//                    this.widgetEditContentView.findViewById(R.id.arrow_right).setVisibility(View.GONE);
//                    this.widgetEditContentView.findViewById(R.id.arrow_top).setVisibility(View.GONE);
//                    this.widgetEditContentView.findViewById(R.id.arrow_bottom).setVisibility(View.GONE);
//                    return;
//                }
//                this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//                this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//                this.widgetEditContentView.findViewById(R.id.arrow_left).setVisibility(View.GONE);
//                this.widgetEditContentView.findViewById(R.id.arrow_right).setVisibility(View.VISIBLE);
//                this.widgetEditContentView.findViewById(R.id.arrow_top).setVisibility(View.GONE);
//                this.widgetEditContentView.findViewById(R.id.arrow_bottom).setVisibility(View.GONE);
//                return;
//            }
//            this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//            this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//            this.widgetEditContentView.findViewById(R.id.arrow_left).setVisibility(View.GONE);
//            this.widgetEditContentView.findViewById(R.id.arrow_right).setVisibility(View.GONE);
//            this.widgetEditContentView.findViewById(R.id.arrow_top).setVisibility(View.GONE);
//            this.widgetEditContentView.findViewById(R.id.arrow_bottom).setVisibility(View.VISIBLE);
//            return;
//        }
//        this.widgetEditPopupWindow.showAtLocation(cellView, 0, x, y);
//        this.widgetEditContentView.findViewById(R.id.arrow_left).setVisibility(View.GONE);
//        this.widgetEditContentView.findViewById(R.id.arrow_right).setVisibility(View.GONE);
//        this.widgetEditContentView.findViewById(R.id.arrow_top).setVisibility(View.VISIBLE);
//        this.widgetEditContentView.findViewById(R.id.arrow_bottom).setVisibility(View.GONE);
    }


    private void initTapsData(List<BoardGroupBean> boardGroupBeans) {

        BoardGroupBean boardGroupBean1 = new BoardGroupBean();
        boardGroupBean1.groupName = "运动";

        BoardGroupBean boardGroupBean2 = new BoardGroupBean();
        boardGroupBean2.groupName = "感应";

        BoardGroupBean boardGroupBean3 = new BoardGroupBean();
        boardGroupBean3.groupName = "自定义";


        boardGroupBeans.add(boardGroupBean1);
        boardGroupBeans.add(boardGroupBean2);
        boardGroupBeans.add(boardGroupBean3);
    }

    private void addLeftPanelTaps() {
        LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        List<BoardGroupBean> boardGroupBeans = new ArrayList<>();
        initTapsData(boardGroupBeans);
        int size = boardGroupBeans.size();
        this.relative_layout_tab.setClickable(false);
        PercentRelativeLayout.LayoutParams layoutParams1 = new PercentRelativeLayout.LayoutParams(-1, 0);
        layoutParams1.getPercentLayoutInfo().heightPercent = 0.2f;
        this.widgetMenuIndicator.setLayoutParams(layoutParams1);
        this.widgetMenuIndicator.setScaleType(ImageView.ScaleType.FIT_XY);
        this.relative_layout_tab.addView(this.widgetMenuIndicator);
        for (int i = 0; i < size; i++) {
            BoardGroupBean bean = (BoardGroupBean) boardGroupBeans.get(i);
            View tab = inflater.inflate(R.layout.item_tab1, null);
            PercentRelativeLayout.LayoutParams layoutParams = new PercentRelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            layoutParams.getPercentLayoutInfo().heightPercent = 0.2f;
            layoutParams.getPercentLayoutInfo().topMarginPercent = 0.2f * ((float) i);
            tab.setLayoutParams(layoutParams);
            tab.setOnClickListener(this.clickListener_tap1);
            tab.setTag(i);
            this.relative_layout_tab.addView(tab);
            TextView tv_name = (TextView) tab.findViewById(R.id.tv_name);
            tv_name.setText(bean.groupName);
//            tv_name.setTextAppearance(this, null);
//            ImageView img_icon = (ImageView) tab.findViewById(R.id.img_icon);
//            StateListDrawable selector_src = new StateListDrawable();
//            Bitmap icon = AssetsUtils.getImageFromAssetsFile(this, "sign_info_icon");
//            int[] iArr = new int[]{16842913};
//            selector_src.addState(iArr, new BitmapDrawable(AssetsUtils.getImageFromAssetsFile(this, "sign_info_icon")));
//            selector_src.addState(new int[]{16842910}, new BitmapDrawable(icon));
//            img_icon.setImageDrawable(selector_src);
        }
        changeTabSelectState(0);
        setLeftPanelTapsSelected(0);
    }

    private ArrayList<WidgetData> addWidgetToLeft(int i) {
        ArrayList<WidgetData> widgetDatas = new ArrayList<>();
        switch (i) {
            case 0:
                WidgetBean bean = new WidgetBean();
                bean.className = EnumXibName.MBWJoystick.toString();
                WidgetBean bean1 = new WidgetBean();
                bean1.className = EnumXibName.MBWDPad.toString();
                WidgetBean bean2 = new WidgetBean();
                bean2.className = EnumXibName.MBWIconButton.toString();
                WidgetBean bean3 = new WidgetBean();
                bean3.className = EnumXibName.MBWSwitch.toString();
                bean3.name = "避障模式";
                WidgetBean bean4 = new WidgetBean();
                bean4.className = EnumXibName.MBWSlider.toString();
                bean4.name = "编码电机";
                widgetDatas.add(new WidgetData("运动", bean));
                widgetDatas.add(new WidgetData("运动", bean1));
                widgetDatas.add(new WidgetData("运动", bean2));
                widgetDatas.add(new WidgetData("运动", bean3));
                widgetDatas.add(new WidgetData("运动", bean4));
                break;
            case 1:
                break;
            case 2:
                break;
        }
        for (int j = 0; j < widgetDatas.size(); j++)
        {
            Log.e(TAG, widgetDatas.get(j).toString());
        }
        return widgetDatas;
    }

    private void setLeftPanelTapsSelected(final int index) {
        if (index < this.relative_layout_tab.getChildCount() && !this.relative_layout_tab.getChildAt(index + 1).isSelected()) {
            this.left_linLayout_wdigetIcon.removeAllViews();
            ArrayList<WidgetData> widgets = addWidgetToLeft(index);
            final LinearLayout linLayout = new LinearLayout(this);
            linLayout.setOrientation(LinearLayout.VERTICAL);
            linLayout.setLayoutParams(this.left_linLayoutParams_group);
            this.left_linLayout_wdigetIcon.addView(linLayout);
            for (int j = 0; j < widgets.size(); j++) {
                final CellView cellView = WidgetFactory.createCellView(this, (WidgetData) widgets.get(j), 0);
                Log.e(TAG, j + "");
                if (this.cellLayout.getHeight() == 0) {
                    this.left_linLayout_wdigetIcon.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
                        public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop, int oldRight, int oldBottom) {
                            if (!MainActivity.this.isFinishing()) {
                                MainActivity.this.addCellViewToLeft(cellView, linLayout);
                                v.removeOnLayoutChangeListener(this);
                            }
                        }
                    });
                } else {
                    addCellViewToLeft(cellView, linLayout);
                }
            }
            final TranslateAnimation indicatorAnimation = new TranslateAnimation(0.0f, 0.0f, (float) this.lastTabPivotY, (float) (this.widgetMenuIndicator.getHeight() * index));
            indicatorAnimation.setDuration(150);
            indicatorAnimation.setInterpolator(new AccelerateDecelerateInterpolator());
            indicatorAnimation.setFillAfter(true);
            this.widgetMenuIndicator.post(new Runnable() {
                public void run() {
                    MainActivity.this.changeTabSelectState(index);
                    MainActivity.this.widgetMenuIndicator.startAnimation(indicatorAnimation);
                }
            });
            this.lastTabPivotY = this.widgetMenuIndicator.getHeight() * index;
        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        addLeftPanelTaps();
        initEvent();
        EventBus.getDefault().register(this);
    }

    private void initView() {
        edit = (Button) findViewById(R.id.save);
        panel_img_grid = (ImageView) findViewById(R.id.panel_img_grid);
        left_linLayout_tabContainer = (LinearLayout) findViewById(R.id.panel_linLayout_container);
        relative_layout_tab = (PercentRelativeLayout) findViewById(R.id.relative_layout_tab);
        left_linLayout_wdigetIcon = (LinearLayout) findViewById(R.id.panel_linLayout_tap2);
        left_linLayout_wdigetIcon.getParent().requestDisallowInterceptTouchEvent(true);
        left_img_panelVisibility = (ImageView) findViewById(R.id.left_img_panel_visibility_img);
        cellLayout = (CellLayout) findViewById(R.id.panel_cell_layout);

        this.widgetMenuIndicator = new ImageView(this);
        this.widgetMenuIndicator.setImageResource(R.drawable.toolbox_bg);


        left_ani_rotate_clockwise = AnimationUtils.loadAnimation(this, R.anim.rotate45_clockwise);
        left_ani_rotate_anticlockwise = AnimationUtils.loadAnimation(this, R.anim.rotate45_anticlockwise);
        this.left_linLayoutParams_group = new ActionBar.LayoutParams(-1, -2);
        int margin = DeviceManager.getPercentHeightToPx(0.01f);
        this.left_linLayoutParams_group.setMargins(margin, margin * 3, margin, 0);

        if (this.currentMode == -1 || this.currentMode == 2) {
            setModeToPlay();
        } else if (this.currentMode == 1) {
            setModeToDesign();
        }
        loadCurrentProjectBean();

    }

    private void initEvent() {
        cellLayout.setCellLayoutListener(this);
        this.cellLayout.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                MainActivity.this.hideLeftPanel(true);
            }
        });
        cellLayout.setOnDragListener(cellLayout);


        edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                startActivity(new Intent(MainActivity.this, MainActivity.class));
                if (currentMode == 1) {
                    setModeToPlay();
                } else {
                    setModeToDesign();
                }
            }
        });


        this.left_img_panelVisibility.setLayerType(1, null);
        this.left_img_panelVisibility.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Log.e(MainActivity.TAG, "left_img_panelVisibility");
                if (!MainActivity.this.left_isShowing) {
                    if (MainActivity.this.left_img_panelVisibility.getAnimation() == null) {
                        MainActivity.this.hideLeftPanel(true);
                    } else if (MainActivity.this.left_img_panelVisibility.getAnimation() != MainActivity.this.left_ani_rotate_anticlockwise) {
                        MainActivity.this.hideLeftPanel(true);
                    } else if (MainActivity.this.left_img_panelVisibility.getAnimation() != MainActivity.this.left_ani_rotate_clockwise) {
                        MainActivity.this.showLeftPanel(true);
                    }
                }
            }
        });

    }

    private void loadCurrentProjectBean() {
        Log.e(TAG, "loadCurrentProjectBean");
        cellLayout.removeAllViews();
        addProjectToUI();
        hideLeftPanel(false);
        setWidgetsDataListener();
        setWidgetsClickListener();
    }

    private void setWidgetsDataListener() {
        for (int i = 0; i < this.cellLayout.getChildCount(); i++) {
            View widget = this.cellLayout.getChildAt(i);
            if (widget instanceof CellView) {
                ControllerManager.setCellViewListener((CellView) widget);
            }
        }
    }

    private void setWidgetsClickListener() {
        for (int i = 0; i < this.cellLayout.getChildCount(); i++) {
            this.cellLayout.getChildAt(i).setOnClickListener(this.clickListener_widgets);
        }
    }


    private void addProjectToUI() {
        WidgetData data = new WidgetData();
        data.xibName = EnumXibName.MBWJoystick.toString();
        data.xPosition = 1;
        data.yPosition = 6;
        WidgetData data1 = new WidgetData();
        data1.xibName = EnumXibName.MBWIconButton.toString();
        data1.xPosition = 18;
        data1.yPosition = 6;
        data1.name = "松开";
        WidgetData data2 = new WidgetData();
        data2.xibName = EnumXibName.MBWIconButton.toString();
        data2.xPosition = 25;
        data2.yPosition = 6;
        data2.name = "夹取";
        WidgetData data3 = new WidgetData();
        data3.xibName = EnumXibName.MBWIconButton.toString();
        data3.xPosition = 18;
        data3.yPosition = 10;
        data3.name = "放下";
        WidgetData data4 = new WidgetData();
        data4.xibName = EnumXibName.MBWIconButton.toString();
        data4.xPosition = 25;
        data4.yPosition = 10;
        data4.name = "抬起";
        this.cellLayout.addCellView(WidgetFactory.createCellView(this, data, 1));
        this.cellLayout.addCellView(WidgetFactory.createCellView(this, data1, 1));
        this.cellLayout.addCellView(WidgetFactory.createCellView(this, data2, 1));
        this.cellLayout.addCellView(WidgetFactory.createCellView(this, data3, 1));
        this.cellLayout.addCellView(WidgetFactory.createCellView(this, data4, 1));
        widgetDatas = new ArrayList<>();
        widgetDatas.add(data);
        widgetDatas.add(data1);
        widgetDatas.add(data2);
        widgetDatas.add(data3);
        widgetDatas.add(data4);
        currentProjectBean = new ProjectBean();
        currentProjectBean.setWidgets(widgetDatas);
    }


    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        this.isEnterBlockly = savedInstanceState.getBoolean("isEnterBlockly");
        super.onRestoreInstanceState(savedInstanceState);
    }

    protected void onSaveInstanceState(Bundle outState) {
        outState.putBoolean("isEnterBlockly", this.isEnterBlockly);
        super.onSaveInstanceState(outState);
    }

    protected void onDestroy() {
        EventBus.getDefault().unregister(this);
        BlocklyManager.getInstance().callWeb_exitPlayMode();
        super.onDestroy();
    }


    @Subscribe(threadMode = ThreadMode.MAIN)
    public void dragFromExternal(final DragFromExternalEvent event) {
        this.cellLayout.setCurrentDragCellView(event.cellView, true);
        final Point size = this.cellLayout.getCellViewSize(event.cellView);
        event.cellView.startDrag(null, new View.DragShadowBuilder(event.cellView) {
            public void onProvideShadowMetrics(Point shadowSize, Point shadowTouchPoint) {
                super.onProvideShadowMetrics(shadowSize, shadowTouchPoint);
                int width = size.x;
                int height = size.y;
                shadowSize.set(width, height);
                shadowTouchPoint.set(width / 2, height / 2);
            }

            public void onDrawShadow(Canvas canvas) {
                RectF showRectF = MainActivity.this.cellLayout.getCellViewShowRectF(event.cellView);
                Bitmap bitmap = Bitmap.createBitmap(getView().getWidth(), getView().getHeight(), Bitmap.Config.ARGB_8888);
                getView().draw(new Canvas(bitmap));
                canvas.drawBitmap(bitmap, null, showRectF, null);
            }
        }, null, 0);
        hideLeftPanel(false);
    }


    private void hideLeftPanel(boolean isWithAnimation) {
        boolean z;
        float width = (float) this.left_linLayout_tabContainer.getWidth();
        int step = (int) (width / ((float) this.count));
        if (!isWithAnimation || width == 0.0f) {
            if (width == 0.0f) {
                this.left_linLayout_tabContainer.setX(-0.31640625f * ((float) DeviceManager.SCREEN_WIDTH));
            } else {
                this.left_linLayout_tabContainer.setX(-width);
            }
            this.left_isShowing = false;
            this.left_isHiding = false;
            if (this.currentMode == 1) {
                rotateAnticlockwiseLeftPanelVisiableButton();
            }
        } else if (!this.left_isShowing) {
            if (this.currentMode != 1) {
                this.left_img_panelVisibility.clearAnimation();
                this.left_img_panelVisibility.setVisibility(View.INVISIBLE);
            }
            float x = this.left_linLayout_tabContainer.getX();
            if (x + width > ((float) step)) {
                this.left_isHiding = true;
                this.left_linLayout_tabContainer.setX(x - (width / ((float) this.count)));
                this.handler.sendEmptyMessageDelayed(103, (long) this.left_ani_delayedTime);
            } else {
                this.left_isShowing = false;
                this.left_isHiding = false;
                this.left_linLayout_tabContainer.setX(-width);
                if (this.currentMode == 1) {
                    this.left_img_panelVisibility.setVisibility(View.VISIBLE);
                    rotateAnticlockwiseLeftPanelVisiableButton();
                }
            }
        } else {
            return;
        }
        ImageView imageView = this.left_img_panelVisibility;
        if (this.left_isHiding) {
            z = false;
        } else {
            z = true;
        }
        imageView.setEnabled(z);
//        for (int i = 0; i < this.nav_radioGroup.getChildCount(); i++) {
//            View childAt = this.nav_radioGroup.getChildAt(i);
//            if (this.left_isHiding) {
//                z = false;
//            } else {
//                z = true;
//            }
//            childAt.setClickable(z);
//
//        }
    }

    private void showLeftPanel(boolean isWithAnimation) {
        boolean z;
        int step = (int) (((float) this.left_linLayout_tabContainer.getWidth()) / ((float) this.count));
        if (!isWithAnimation) {
            this.left_isShowing = false;
            this.left_isHiding = false;
            this.left_linLayout_tabContainer.setX(0.0f);
        } else if (!this.left_isHiding) {
            float x = this.left_linLayout_tabContainer.getX();
            if (((float) step) + x < 0.0f) {
                this.left_linLayout_tabContainer.setX(((float) step) + x);
                this.handler.sendEmptyMessageDelayed(102, (long) this.left_ani_delayedTime);
                this.left_isShowing = true;
                if (this.currentMode == 1) {
                    this.left_img_panelVisibility.setVisibility(View.VISIBLE);
                    rotateClockwiseLeftPanelVisiableButton();
                } else {
                    this.left_img_panelVisibility.clearAnimation();
                    this.left_img_panelVisibility.setVisibility(View.INVISIBLE);
                }
            } else {
                this.left_linLayout_tabContainer.setX(0.0f);
                this.left_isShowing = false;
                this.left_isHiding = false;
            }
        } else {
            return;
        }
        ImageView imageView = this.left_img_panelVisibility;
        if (this.left_isShowing) {
            z = false;
        } else {
            z = true;
        }
        imageView.setEnabled(z);
//        for (int i = 0; i < this.nav_radioGroup.getChildCount(); i++) {
//            View childAt = this.nav_radioGroup.getChildAt(i);
//            if (this.left_isShowing) {
//                z = false;
//            } else {
//                z = true;
//            }
//            childAt.setClickable(z);
//        }
    }


    private void rotateAnticlockwiseLeftPanelVisiableButton() {
        if (this.left_img_panelVisibility.getAnimation() != this.left_ani_rotate_anticlockwise) {
            this.left_img_panelVisibility.startAnimation(this.left_ani_rotate_anticlockwise);
        }
    }

    private void rotateClockwiseLeftPanelVisiableButton() {
        if (this.left_img_panelVisibility.getAnimation() != this.left_ani_rotate_clockwise) {
            this.left_img_panelVisibility.startAnimation(this.left_ani_rotate_clockwise);
        }
    }


    private void setModeToDesign() {
        Log.e(TAG, "setModeToDesign");
        this.currentMode = 1;
        this.left_img_panelVisibility.setVisibility(View.VISIBLE);
        BlocklyManager.getInstance().callWeb_exitPlayMode();
        showLeftPanel(true);
        this.left_img_panelVisibility.setVisibility(View.VISIBLE);
        this.cellLayout.setMode(2);
        this.panel_img_grid.setSelected(false);
//        if (!SharedPreferencesUtils.hasShowStartDesignGuide() && !this.designModeIsAlreadySet) {
//            this.designModeIsAlreadySet = true;
//            final UserGuideDialog dialog = new UserGuideDialog(this, 16973834);
//            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(-1442840576));
//            new Handler().postDelayed(new Runnable() {
//                public void run() {
//                    dialog.show();
//                }
//            }, 230);
//        }
    }

    private void setModeToPlay() {
        Log.e(TAG, "setModeToPlay");
        this.currentMode = 2;
        this.left_img_panelVisibility.setVisibility(View.INVISIBLE);
        BlocklyManager.getInstance().callWeb_enterPlayMode();
        hideLeftPanel(true);
        this.left_img_panelVisibility.setVisibility(View.GONE);
        this.cellLayout.setMode(1);
        this.panel_img_grid.setSelected(true);
    }


    private void changeTabSelectState(int selectedIndex) {
        for (int i = 0; i < this.relative_layout_tab.getChildCount() - 1; i++) {
            PercentRelativeLayout tabItemLayout = (PercentRelativeLayout) this.relative_layout_tab.getChildAt(i + 1);
            ImageView icon = (ImageView) tabItemLayout.getChildAt(0);
            TextView iconText = (TextView) tabItemLayout.getChildAt(1);
            if (i == selectedIndex) {
                icon.setSelected(true);
                iconText.setSelected(true);
            } else {
                icon.setSelected(false);
                iconText.setSelected(false);
            }
        }
    }


    private void addCellViewToLeft(CellView cellView, LinearLayout linLayout) {
        RectF rectF = this.cellLayout.getCellViewShowRectF(cellView.getCellWidth(), cellView.getCellHeight());
        int width = (int) (((rectF.right - rectF.left) * 2.0f) / 3.0f);
        int height = (int) (((rectF.bottom - rectF.top) * 2.0f) / 3.0f);
        if (cellView instanceof ChartLayout) {
            width = (int) ((rectF.right - rectF.left) * 0.62f);
            height = (int) ((rectF.bottom - rectF.top) * 0.62f);
        }
        if (cellView instanceof MusicKeyView) {
            width = (int) (((rectF.right - rectF.left) * 31.0f) / 90.0f);
            height = (int) (((rectF.bottom - rectF.top) * 31.0f) / 90.0f);
        }
        ActionBar.LayoutParams layoutParams = new ActionBar.LayoutParams(width, height);
        int margin = DeviceManager.getPercentHeightToPx(0.01f);
        layoutParams.setMargins(margin, margin * 2, margin, 0);
        if (cellView != null) {
            linLayout.addView(cellView, layoutParams);
        }
    }


    @Override
    public void onSensorChanged(SensorEvent event) {
        float x = event.values[1];
        float y = event.values[0];
        if (Math.sqrt((double) (((event.values[0] * event.values[0]) + (event.values[1] * event.values[1])) + (event.values[2] * event.values[2]))) > 20.0d) {
            ControllerManager.tellBlocklyDeviceShake();
        } else if (Math.abs(Math.abs(x) - Math.abs(y)) < 3.0f) {
        } else {
            if (x < -3.0f) {
                ControllerManager.tellBlocklyDeviceTiltLeft();
            } else if (x > 3.0f) {
                ControllerManager.tellBlocklyDeviceTiltRight();
            } else if (y < -3.0f) {
                ControllerManager.tellBlocklyDeviceTiltForward();
            } else if (y > 3.0f) {
                ControllerManager.tellBlocklyDeviceTiltBackword();
            }
        }

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    @Override
    public void onAddCellViewByDrop(CellView cellView) {
        setWidgetsDataListener();
        setWidgetsClickListener();
        widgetAdd(cellView);
        showLeftPanel(true);
    }

    private void widgetAdd(CellView cellView) {
        WidgetData widgetData = cellView.getWidgetData();
        this.currentProjectBean.getWidgets().add(widgetData);
        int widgetID = 0;
        for (int i = 0; i < this.currentProjectBean.getWidgets().size(); i++) {
            widgetID = Math.max(((WidgetData) this.currentProjectBean.getWidgets().get(i)).widgetID, widgetID);
        }
        widgetData.widgetID = widgetID + 1;
    }


}
