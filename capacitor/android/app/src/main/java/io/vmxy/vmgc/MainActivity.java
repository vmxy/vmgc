package io.vmxy.vmgc;

import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.DragEvent;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
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
	private int moveY;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//this.setContentView(R.layout.activity_main);
		//Log.i("info", "test==contentview="+this.content)
		//setContentView(R.layout.activity_main);
		webview = findViewById(R.id.webview);
		swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);

		Log.i("info", "===============>webview=" + (webview != null) + "->" + (swipeRefreshLayout != null));
		webview.setWebViewClient(new WebViewClient(this.getBridge(), swipeRefreshLayout));
		this.injectJS();
	}

	public void injectJS() {
		WebSettings wvSettings = webview.getSettings();
		wvSettings.setJavaScriptEnabled(true);
		if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT){
			if (0 != (getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE)){
				webview.setWebContentsDebuggingEnabled(true);
			}
		}
		// 配置 SwipeRefreshLayout
		if (swipeRefreshLayout != null) {
			swipeRefreshLayout.setOnChildScrollUpCallback(new SwipeRefreshLayout.OnChildScrollUpCallback() {
				@Override
				public boolean canChildScrollUp(@NonNull SwipeRefreshLayout parent, @Nullable View child) {
					return moveY > 0;
				}
			});
			swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
				@Override
				public void onRefresh() {
					if (moveY > 0) {
						swipeRefreshLayout.setRefreshing(false);
						return;
					}

					// 检查 WebView 是否为空
					if (MainActivity.this.webview == null) {
						swipeRefreshLayout.setRefreshing(false);
						return;
					}
					// 在 UI 线程上执行 WebView 刷新
					new Handler().post(new Runnable() {
						@Override
						public void run() {
							Log.i("info", "==========refresh===" + MainActivity.this.webview.getUrl());
							//webview.reload();
							webview.evaluateJavascript("(()=>{var app = window.app;  app && app.reloadPage() })();", new ValueCallback<String>() {
								@Override
								public void onReceiveValue(String s) {
								}
							});
							swipeRefreshLayout.setRefreshing(false);
						}
					});
				}
			});
		}
		webview.setOnTouchListener(new View.OnTouchListener() {
			@Override
			public boolean onTouch(View view, MotionEvent motionEvent) {
				webview.evaluateJavascript("(()=>{var el = document.querySelector('#__SCROLL_EL_ID__'); return el.scrollTop;})()", new ValueCallback<String>() {
					@Override
					public void onReceiveValue(String s) {
						try {
							s = s.replaceAll("[.][0-9]+$", "");
							Log.i("info", "=========>result1=" + s);
							moveY = Integer.parseInt(s);
							Log.i("info", "=========>result2=" + moveY);

						} catch (Exception err) {
						}
					}
				});
				return false;
			}
		});
		webview.setOnKeyListener(new View.OnKeyListener() {
			@Override
			public boolean onKey(View v, int keyCode, KeyEvent event) {
				if (event.getAction() == KeyEvent.ACTION_UP && webview.canGoForward()) {
					webview.goBack();
					return true;
				}
				return true;
			}
		});
	}


	@Override
	public void onBackPressed() {
		this.webview.goBack();
	}

	public WebView getWebview() {
		for (View v : getAllChildViews(getWindow().getDecorView())) {
			Log.i("info", "vvvv====" + v.toString());
			if (v instanceof WebView) return (WebView) v;
		}
		return null;
	}

	public SwipeRefreshLayout getRefres() {
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
