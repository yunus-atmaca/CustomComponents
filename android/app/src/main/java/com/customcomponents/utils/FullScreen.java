package com.customcomponents.utils;

import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class FullScreen extends ReactContextBaseJavaModule {

  public FullScreen(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public void initialize() {

  }

  @Override
  public String getName() {
    return "FullScreen";
  }

  @ReactMethod
  public void onFullScreen() {
    UiThreadUtil.runOnUiThread(
        new Runnable() {
          @Override
          public void run() {
            getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                    | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                    | View.SYSTEM_UI_FLAG_IMMERSIVE);
          }
        });
  }

  @ReactMethod
  public void offFullScreen() {
    UiThreadUtil.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
      }
    });
  }
}