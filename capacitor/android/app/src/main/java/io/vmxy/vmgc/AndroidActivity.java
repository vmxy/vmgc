package io.vmxy.vmgc;

import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebView;

import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import io.vmxy.vmgc.view_adapter.Adapter;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;

import java.util.ArrayList;
import java.util.List;

public class AndroidActivity extends BridgeActivity {
	String APP_UPDATE_URL;
	SwipeRefreshLayout swipeRefreshLayout;
	WebView webview;
	private int startX;
	private int startY;
	private int endX;
	private int endY;
	private int moveY;
	private static Adapter adapter;
	static Adapter getAdapter(){
		return adapter;
	}
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		getWindow().setFormat(PixelFormat.TRANSLUCENT);
		Bridge bridge = getBridge();
		Adapter adapter = new Adapter(this, bridge);
		webview = findViewById(R.id.webview);
		swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
		adapter.setWebView(webview);
		adapter.setSwipeRefreshLayout(swipeRefreshLayout);
		adapter.init();
	}
	/*
58      * 通过这个方法跳转到SecondActivity界面
59      */
	public void gotoX5Activity() {
		//创建一个意图
		Intent intent = new Intent(AndroidActivity.this, X5Activity.class);
		startActivity(intent);
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

	public void onConfigurationChanged(Configuration config) {
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
		if (orientation == 2) {//横屏
			window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
			//window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
			if ((window.getAttributes().flags & WindowManager.LayoutParams.FLAG_FULLSCREEN)
				== WindowManager.LayoutParams.FLAG_FULLSCREEN) {
				// 是全屏
				//window.getDecorView().setSystemUiVisibility( View.SYSTEM_UI_FLAG_VISIBLE);//View.SYSTEM_UI_FLAG_FULLSCREEN

			}
		} else {
			window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			window.clearFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
			window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
		}
	}
	public WebView getWebview() {
		for (View v : getAllChildViews(getWindow().getDecorView())) {
			Log.i("info", "vvvv====" + v.toString());
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
