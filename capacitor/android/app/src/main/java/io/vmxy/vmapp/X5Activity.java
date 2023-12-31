package io.vmxy.vmapp;


import android.graphics.PixelFormat;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.tencent.smtt.sdk.WebView;

import io.vmxy.vmapp.core.LocalServer;
import io.vmxy.vmapp.core.Logger;
import io.vmxy.vmapp.view_adapter.Adapter;

public class X5Activity extends AppCompatActivity {
	private Adapter adapter;
	private WebView webview;
	private SwipeRefreshLayout swipeRefreshLayout;
	public static void show() {

	}
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		setContentView(R.layout.x5_activity);
		super.onCreate(savedInstanceState);
		getWindow().setFormat(PixelFormat.TRANSLUCENT);
		adapter = new Adapter(this);

		String basePath = adapter.getAppPath();
		if(basePath == null || basePath.trim().equals("")){

		}
		LocalServer.start(this, basePath);

		Logger.i("===>use X5Activity", basePath);
		webview = findViewById(R.id.x5webview);
		swipeRefreshLayout = findViewById(R.id.x5SwipeRefreshLayout);
		adapter.setSwipeRefreshLayout(swipeRefreshLayout);
		adapter.setWebView(webview);
		adapter.init();
		webview.loadUrl("http://localhost/");//https://debugtbs.qq.com
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
}
