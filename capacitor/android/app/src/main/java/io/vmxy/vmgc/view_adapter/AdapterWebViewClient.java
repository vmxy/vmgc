package io.vmxy.vmgc.view_adapter;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.http.SslError;
import android.view.View;
import android.view.WindowManager;
import android.webkit.ClientCertRequest;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

import io.vmxy.vmgc.core.LocalServer;
import io.vmxy.vmgc.core.Logger;

public class AdapterWebViewClient {
	Adapter adapter;

	public AdapterWebViewClient(Adapter adapter) {
		this.adapter = adapter;
	}

	public void init() {
		View view = adapter.webview;
		String script = "window.env || Object.defineProperties(window, {\n" +
			"        env: {\n" +
			"          value: {\n" +
			"            ANDROID: true\n" +
			"          },\n" +
			"          writable: false,\n" +
			"          enumerable: false,\n" +
			"          configurable: false,\n" +
			"        }\n" +
			"      }); document.querySelector('#appLoading').remove()";
		BridgeWebViewClient webViewClient = new BridgeWebViewClient(adapter.bridge) {
			@Override
			public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
				// if ("localhost".equals(request.getUrl().getHost()))
				//return super.shouldInterceptRequest(view, request);
				return super.shouldInterceptRequest(view, request);
			}

			@Override
			public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
				super.onReceivedHttpError(view, request, errorResponse);
				//Logger.i("onReceivedHttpError", errorResponse.getStatusCode());
			}

			@Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
				//Logger.i("onReceivedError", description);
				super.onReceivedError(view, errorCode, description, failingUrl);
			}

			@Override
			public void onReceivedClientCertRequest(WebView view, ClientCertRequest request) {
				//Logger.i("onReceivedClientCertRequest");
				super.onReceivedClientCertRequest(view, request);
			}

			@Override
			public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
				Logger.i("onReceivedSslError");
				//https忽略证书问题
				if (handler != null) {
					handler.proceed();
				} else {
					super.onReceivedSslError(view, handler, error);
				}
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				Logger.info("onPageStarted", url);
				super.onPageStarted(view, url, favicon);
				view.loadUrl("javascript:" + script);
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				Logger.info("onPageFinished", url);
				super.onPageFinished(view, url);
				view.loadUrl("javascript:" + script);
				if (adapter.swipeRefreshLayout != null)
					adapter.swipeRefreshLayout.setRefreshing(false);
				//页面finish后再发起图片加载
				if (!view.getSettings().getLoadsImagesAutomatically()) {
					view.getSettings().setLoadsImagesAutomatically(true);
				}
			}
		};
		if (view instanceof com.tencent.smtt.sdk.WebView) {
			Logger.i("=============set x5 WebViewClient");
			com.tencent.smtt.sdk.WebView webview = (com.tencent.smtt.sdk.WebView) view;
			webview.setWebChromeClient(new com.tencent.smtt.sdk.WebChromeClient());
			webview.setWebViewClient(new com.tencent.smtt.sdk.WebViewClient() {
				@Override
				public com.tencent.smtt.export.external.interfaces.WebResourceResponse //
					shouldInterceptRequest(com.tencent.smtt.sdk.WebView view,//
															 com.tencent.smtt.export.external.interfaces.WebResourceRequest request) {
					String host = request.getUrl().getHost();
					Logger.i("===>req start", request.getUrl());
					if (host.matches("qq[.]com$") || !request.getUrl().getScheme().matches("https?")) {
						//return super.shouldInterceptRequest(view, request);
						return new com.tencent.smtt.export.external.interfaces.WebResourceResponse(
							"text/html",
							"utf8",
							500,
							"error",
							new HashMap<>(),
							new ByteArrayInputStream(("request url error= "+request.getUrl()).getBytes())
						);
					}
					if (LocalServer.getInstance() != null) {
						return LocalServer.getInstance().shouldInterceptRequest(request);
					}
					//return super.shouldInterceptRequest(view, request);
					return super.shouldInterceptRequest(view, request);
				}
				@Override
				public boolean shouldOverrideUrlLoading(com.tencent.smtt.sdk.WebView view, String url) {
					view.loadUrl(url);
					return super.shouldOverrideUrlLoading(view, url);

				}
				@Override
				public void onPageStarted(com.tencent.smtt.sdk.WebView view, String url, Bitmap favicon) {
					Logger.info("onPageStarted x5", url);
					super.onPageStarted(view, url, favicon);
					view.loadUrl("javascript:" + script);
				}

				@Override
				public void onPageFinished(com.tencent.smtt.sdk.WebView view, String url) {
					Logger.info("onPageFinished x5", url);
					super.onPageFinished(view, url);
					view.loadUrl("javascript:" + script);
					if (adapter.swipeRefreshLayout != null)
						adapter.swipeRefreshLayout.setRefreshing(false);
					if (!view.getSettings().getLoadsImagesAutomatically()) {
						view.getSettings().setLoadsImagesAutomatically(true);
					}/**/
				}

				@Override
				public void onReceivedHttpError(com.tencent.smtt.sdk.WebView view,//
																				com.tencent.smtt.export.external.interfaces.WebResourceRequest request,//
																				com.tencent.smtt.export.external.interfaces.WebResourceResponse errorResponse) {
					super.onReceivedHttpError(view, request, errorResponse);
					//Logger.i("onReceivedHttpError", errorResponse.getStatusCode());
				}

				@Override
				public void onReceivedError(com.tencent.smtt.sdk.WebView view, //
																		int errorCode, String description, String failingUrl) {
					//Logger.i("onReceivedError", description);
					super.onReceivedError(view, errorCode, description, failingUrl);
				}

				@Override
				public void onReceivedClientCertRequest(com.tencent.smtt.sdk.WebView view,//
																								com.tencent.smtt.export.external.interfaces.ClientCertRequest request) {
					Logger.i("onReceivedClientCertRequest");
					super.onReceivedClientCertRequest(view, request);
				}

				@Override
				public void onReceivedSslError(com.tencent.smtt.sdk.WebView view,//
																			 com.tencent.smtt.export.external.interfaces.SslErrorHandler handler, //
																			 com.tencent.smtt.export.external.interfaces.SslError error) {
					Logger.i("onReceivedSslError");
					//https忽略证书问题
					if (handler != null) {
						handler.proceed();
					} else {
						super.onReceivedSslError(view, handler, error);
					}
				}
			});
		} else if (view instanceof WebView) {
			WebView webview = (WebView) view;
			Logger.i("=============set local WebViewClient");
			webview.setWebViewClient(webViewClient);
			webview.setWebChromeClient(new WebChromeClient(){
				@Override
				public void onShowCustomView(View view, CustomViewCallback callback) {
					super.onShowCustomView(view, callback);
					showCustomView(view, callback);
				}

				@Override
				public void onHideCustomView() {
					super.onHideCustomView();
					hideCustomView();
				}
			});
		}
	}
	FrameLayout fullscreenContainer;
	WebChromeClient.CustomViewCallback customViewCallback;
	/**
	 * 显示自定义控件
	 */
	private void showCustomView(View view, WebChromeClient.CustomViewCallback callback) {
		if (fullscreenContainer != null) {
			callback.onCustomViewHidden();
			return;
		}

		fullscreenContainer = new  FrameLayout(adapter.activity.getApplicationContext());//.apply { setBackgroundColor(Color.BLACK) }
		fullscreenContainer.setBackgroundColor(Color.BLACK);
		customViewCallback = callback;
		fullscreenContainer.addView(view);
		FrameLayout decorView = (FrameLayout)adapter.activity.getWindow().getDecorView();
		//	(context as? Activity)?.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
		adapter.activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
		decorView.addView(fullscreenContainer);
	}
	/**
	 * 隐藏自定义控件
	 */
	private void hideCustomView() {
		if (fullscreenContainer == null) {
			return;
		}
		FrameLayout decorView = (FrameLayout)adapter.activity.getWindow().getDecorView();
		adapter.activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
		fullscreenContainer.removeAllViews();
		decorView.removeView(fullscreenContainer);
		fullscreenContainer = null;
		customViewCallback.onCustomViewHidden();
		customViewCallback = null;
	}
}
