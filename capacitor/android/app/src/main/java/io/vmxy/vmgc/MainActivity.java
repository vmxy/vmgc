package io.vmxy.vmgc;

import android.content.pm.ApplicationInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import io.vmxy.vmgc.core.WebViewClient;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;

import org.json.JSONObject;

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
		Bridge bridge = getBridge();
		Log.i("info", "===============>bridge url="+ bridge.getAppUrl()+"->"+bridge.getServerBasePath());
		//this.setContentView(R.layout.activity_main);
		//Log.i("info", "test==contentview="+this.content)
		//setContentView(R.layout.activity_main);
		webview = findViewById(R.id.webview);
		swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			Window window = getWindow();
			//window.getDecorView().setSystemUiVisibility( View.SYSTEM_UI_FLAG_VISIBLE);//View.SYSTEM_UI_FLAG_FULLSCREEN

		}
		Log.i("info", "===============>webview=" + (webview != null) + "->" + (swipeRefreshLayout != null));
		webview.setWebViewClient(new WebViewClient(bridge, swipeRefreshLayout));
		// 透明状态栏
		this.injectJS();
		updateVersionToZip();
	}

	public void injectJS() {
		WebSettings wvSettings = webview.getSettings();
		wvSettings.setJavaScriptEnabled(true);
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			if (0 != (getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE)) {
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
							moveY = Integer.parseInt(s);
						} catch (Exception err) {
						}
					}
				});
				return false;
			}
		});
		/*webview.setOnKeyListener(new View.OnKeyListener() {
			@Override
			public boolean onKey(View v, int keyCode, KeyEvent event) {
				if (event.getAction() == KeyEvent.ACTION_UP && webview.canGoForward()) {
					webview.goBack();
					return true;
				}
				return true;
			}
		});*/
	}


	@Override
	public void onBackPressed() {
		Log.i("info", "=========back=======");
		if (webview.canGoBack()) {
			this.webview.goBack();
		} else {
			this.webview.reload();
		}
	}

	public void  onConfigurationChanged(Configuration config) {
		super.onConfigurationChanged(config);
		int orientation = config.orientation;
		Window window = getWindow();
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
		/*	window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
				| View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
			window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
			window.setStatusBarColor(Color.TRANSPARENT);*/
		}
		if(orientation == 2){//横屏
			window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
			//window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
			if ( (window.getAttributes().flags & WindowManager.LayoutParams.FLAG_FULLSCREEN)
				== WindowManager.LayoutParams.FLAG_FULLSCREEN) {
				// 是全屏
				//window.getDecorView().setSystemUiVisibility( View.SYSTEM_UI_FLAG_VISIBLE);//View.SYSTEM_UI_FLAG_FULLSCREEN

			}
		}else{
			window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			window.clearFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
			window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);

		}
	}
/*
	public void onWindowAttributesChanged(LayoutParams params) {
// TODO Auto-generated method stub
		super.onWindowAttributesChanged(params);
		Log.i("info", "onWindowAttributesChanged()" + getWindow().getAttributes().flags);
		if (WindowManager.LayoutParams.FLAG_FULLSCREEN == getWindow().getAttributes().flags) {
			Log.i("info", "onWindowAttributesChanged() FLAG_FULLSCREEN");

		}
	}
*/

	@Override
	public void onPointerCaptureChanged(boolean hasCapture) {
		super.onPointerCaptureChanged(hasCapture);
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

	private void updateVersionToZip(){
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					OkHttpClient client = new OkHttpClient();//创建OkHttpClient对象
					Request request = new Request.Builder()
						.url("https://v.iuku.xyz/apps/latest.yml")//请求接口。如果需要传参拼接到接口后面。
						.build();//创建Request 对象
					Response response = null;
					response = client.newCall(request).execute();//得到Response 对象
					if (response.isSuccessful() && response.code() == 200) {
						String text = response.body().string();
						Log.d("kwwl","res=="+text);
						String[] lines = text.split("\r\n");
						String version = lines[0];
						version = version.replaceAll("version:\s+", "");
						Log.i("info", "==========version "+ version);
						//此时的代码执行在子线程，修改UI的操作请使用handler跳转到UI线程。
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}
}
