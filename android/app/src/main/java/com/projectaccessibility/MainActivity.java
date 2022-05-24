package com.projectaccessibility;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.os.Bundle;
import android.os.getActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ProjectAccessibility";
  }

   @Override
   protected void onCreate(Bundle savedInstanceState) {
     // React Native Bootsplash
     RNBootSplash.init(getActivity());
   }
}
