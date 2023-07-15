package io.vmxy.vmgc;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	  Log.i("info", "--==============demo==");
		this.injectJS();
	}
	public void injectJS(){
		WebView wv = this.getWebView();
		WebSettings wvSettings = wv.getSettings();
		wvSettings.setJavaScriptEnabled(true);
		wv.evaluateJavascript("window.env={ANDROID: true};console.info('env=======================>>', JSON.stringify(window.env))", new ValueCallback<String>() {
			@Override
			public void onReceiveValue(String s) {
			}
		});

	}
	public WebView getWebView() {
		for (View v : getAllChildViews(getWindow().getDecorView())) {
			if (v instanceof WebView) return (WebView) v;
		}
		return null;
	}

	public List<View> getAllChildViews(View view) {
		List<View> allchildren = new ArrayList<>();
		if (view instanceof ViewGroup) {
			ViewGroup vp = (ViewGroup) view;
			for (int i = 0; i < vp.getChildCount(); i++) {
				View viewchild = vp.getChildAt(i);
				allchildren.add(viewchild);
				//再次 调用本身（递归）
				allchildren.addAll(getAllChildViews(viewchild));
			}
		}
		return allchildren;
	}

}
