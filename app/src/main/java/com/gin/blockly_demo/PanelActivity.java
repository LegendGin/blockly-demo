package com.gin.blockly_demo;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.RelativeLayout;

/**
 * Created by Gin on 2016/11/8.
 */

public class PanelActivity extends AppCompatActivity{

    Button save;
    RelativeLayout webContainer;
    WebView web;
    BlocklyManager blocklyManager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_panel);
        save = (Button) findViewById(R.id.save);
        webContainer = (RelativeLayout) findViewById(R.id.webContainer);
        blocklyManager = BlocklyManager.getInstance();
        web = blocklyManager.getWebview();
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        web.setLayoutParams(params);
        if (web.getParent() != null)
            ((ViewGroup)web.getParent()).removeView(web);
        webContainer.addView(web);
    }


}
