package com.customcomponents.utils;

import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.content.ContextCompat;

import com.customcomponents.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

import java.util.Objects;

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
            Window w = Objects.requireNonNull(getCurrentActivity()).getWindow();
            if(w != null){
              w.getDecorView().setSystemUiVisibility(
                      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                              | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                              | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                              | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                              | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                              | View.SYSTEM_UI_FLAG_IMMERSIVE);

              if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                w.getAttributes().layoutInDisplayCutoutMode =
                        WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
              }

              /*w.setFlags(
                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION,
                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
              w.setFlags(
                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS,
                      WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);*/

              w.clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
              w.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
            }
          }
        });
  }

  @ReactMethod
  public void offFullScreen() {
    UiThreadUtil.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        Window w = Objects.requireNonNull(getCurrentActivity()).getWindow();
        if(w != null){
          w.getDecorView().setSystemUiVisibility(
                  View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                          | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                          | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);


          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            w.getAttributes().layoutInDisplayCutoutMode =
                    WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT;
          }

          /*w.setNavigationBarColor(ContextCompat.getColor(getCurrentActivity(), R.color.primary_dark));
          w.setStatusBarColor(ContextCompat.getColor(getCurrentActivity(), R.color.primary_dark));
          //w.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
          w.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
          w.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
          w.clearFlags(WindowManager.LayoutParams.TYPE_STATUS_BAR);*/

          w.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
          w.addFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);

          w.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
        }
      }
    });
  }
}