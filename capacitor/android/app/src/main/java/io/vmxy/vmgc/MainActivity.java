package io.vmxy.vmgc;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import io.vmxy.vmgc.core.WebViewClient;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
	SwipeRefreshLayout swipeRefreshLayout;
	WebView webview;
	private int startX;
	private int startY;
	private int endX;
	private int endY;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		webview = getWebview();
		//swipeRefreshLayout = findViewById(R.id.swipe_refresh_layout);
		//Log.i("info", "===============>swipeRefreshLayout="+(swipeRefreshLayout!=null));
		webview.setWebViewClient(new WebViewClient(this.getBridge(), swipeRefreshLayout));
		this.injectJS();
	}
	public void injectJS(){
		WebView wv = this.getWebview();
		WebSettings wvSettings = wv.getSettings();
		wvSettings.setJavaScriptEnabled(true);

		// 配置 SwipeRefreshLayout
		if(swipeRefreshLayout!=null){

			swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
				@Override
				public void onRefresh() {
					// 检查 WebView 是否为空
					if (webview == null) {
						swipeRefreshLayout.setRefreshing(false);
						return;
					}
					// 在 UI 线程上执行 WebView 刷新

					new Handler().post(new Runnable() {
						@Override
						public void run() {
							Log.i("info", "==========refresh==="+webview.getUrl());
							webview.reload();
							swipeRefreshLayout.setRefreshing(false);
						}
					});
				}
			});
		}

		wv.evaluateJavascript("window.env={ANDROID: true};console.info('env=======================>>', JSON.stringify(window.env))", new ValueCallback<String>() {
			@Override
			public void onReceiveValue(String s) {
			}
		});
		MainActivity activity = this;
		wv.setOnKeyListener(new View.OnKeyListener() {
			@Override
			public boolean onKey(View v, int keyCode, KeyEvent event) {
				if(event.getAction() == KeyEvent.ACTION_UP && wv.canGoForward()){
						wv.goBack();
					return true;
				}
				return false;
			}
		});
	}


	@Override
	public void onBackPressed() {
		this.webview.goBack();
	}

	public WebView getWebview() {
		for (View v : getAllChildViews(getWindow().getDecorView())) {
			Log.i("info", "vvvv===="+ v.toString());
			if (v instanceof WebView) return (WebView) v;
		}
		return null;
	}
	public SwipeRefreshLayout getRefres(){
		for (View v : getAllChildViews(getWindow().getDecorView())) {
			if (v instanceof SwipeRefreshLayout) return (SwipeRefreshLayout) v;
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
