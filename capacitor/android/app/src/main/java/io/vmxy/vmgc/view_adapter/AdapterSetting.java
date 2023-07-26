package io.vmxy.vmgc.view_adapter;

import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import io.vmxy.vmgc.R;

public class AdapterSetting {
	Adapter adapter;
	public AdapterSetting(Adapter adapter){
		this.adapter = adapter;
	}
	public void init(){
		View view = adapter.webview;
		if(view instanceof com.tencent.smtt.sdk.WebView webview){
			com.tencent.smtt.sdk.WebSettings wvSettings = webview.getSettings();
			wvSettings.setJavaScriptEnabled(true);
			wvSettings.setDatabaseEnabled(true);
			wvSettings.setDomStorageEnabled(true);
			//wvSettings.setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54");
			wvSettings.setUserAgentString(wvSettings.getUserAgentString() + adapter.getAppName());
			wvSettings.setSavePassword(false);
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
				if (0 != (adapter.activity.getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE)) {
					webview.setWebContentsDebuggingEnabled(true);
				}
				webview.getSettings().setLoadsImagesAutomatically(true);
			}else{
				webview.getSettings().setLoadsImagesAutomatically(false);
			}

		}
		else if(view instanceof WebView webview){
			webview.requestFocus();
			webview.setVisibility(View.VISIBLE);
			webview.setEnabled(true);  //  这里如果设置false, 则点击h5页面中的输入框时不能唤起软键盘
			webview.requestFocusFromTouch();//支持获取手势焦点
			WebSettings wvSettings = webview.getSettings();
			wvSettings.setJavaScriptEnabled(true);
			wvSettings.setDatabaseEnabled(true);
			wvSettings.setDomStorageEnabled(true);
			//wvSettings.setUserAgentString("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54");
			wvSettings.setUserAgentString(wvSettings.getUserAgentString() + adapter.getAppName());

			wvSettings.setSavePassword(false);
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
				if (0 != (adapter.activity.getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE)) {
					webview.setWebContentsDebuggingEnabled(true);
				}
				webview.getSettings().setLoadsImagesAutomatically(true);
			}else{
				webview.getSettings().setLoadsImagesAutomatically(false);
			}
		}
	}
}
