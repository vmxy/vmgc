package io.vmxy.vmgc.view_adapter;

import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import io.vmxy.vmgc.core.Logger;

public class AdapterPullRefresh {
	Adapter adapter;
	int moveY = 0;

	public AdapterPullRefresh(Adapter adapter) {
		this.adapter = adapter;
	}

	public void init() {
		adapter.webview.setOnTouchListener(new View.OnTouchListener() {
			@Override
			public boolean onTouch(View view, MotionEvent motionEvent) {
				evaluateJavascript("(()=>{var el = document.querySelector('#__SCROLL_EL_ID__') || document.body; return el.scrollTop;})()", new Callback() {
					@Override
					public void callback(String s) {
						try {
							s = s.replaceAll("[.][0-9]+$", "");
							moveY = Integer.parseInt(s);
						} catch (Exception err) {
						}
					}
				});
				return false;
			}
		});
		if(adapter.swipeRefreshLayout != null) {
			// 配置 SwipeRefreshLayout
			adapter.swipeRefreshLayout.setOnChildScrollUpCallback(new SwipeRefreshLayout.OnChildScrollUpCallback() {
				@Override
				public boolean canChildScrollUp(@NonNull SwipeRefreshLayout parent, @Nullable View child) {
					return moveY > 0;
				}
			});
			adapter.swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
				@Override
				public void onRefresh() {
					Logger.i("moveY===", moveY);
					if (moveY > 0) {
						adapter.swipeRefreshLayout.setRefreshing(false);
						return;
					}
					// 在 UI 线程上执行 WebView 刷新
					new Handler().post(new Runnable() {
						@Override
						public void run() {
							//webview.reload();
							evaluateJavascript("(()=>{var app = window.app; console.info('===reload====>', app);  app ? app.reloadPage() : location.reload(); })();", new Callback() {
								@Override
								public void callback(String s) {
								}
							});
							adapter.swipeRefreshLayout.setRefreshing(false);
						}
					});
				}
			});
		}
	}

	private void evaluateJavascript(String script, Callback callback) {
		if (adapter.webview instanceof com.tencent.smtt.sdk.WebView) {
			Logger.i("evaluateJavascript", script);
			((com.tencent.smtt.sdk.WebView) adapter.webview).evaluateJavascript(script, new com.tencent.smtt.sdk.ValueCallback<String>() {
				@Override
				public void onReceiveValue(String s) {
					callback.callback(s);
				}
			});
		} else if (adapter.webview instanceof WebView) {
			((WebView) adapter.webview).evaluateJavascript(script, new ValueCallback<String>() {
				@Override
				public void onReceiveValue(String s) {
					callback.callback(s);
				}
			});
		}
	}

	interface Callback {
		void callback(String value);
	}
}
