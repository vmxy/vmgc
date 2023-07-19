package io.vmxy.vmgc.core;

import android.graphics.Bitmap;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

public class WebViewClient extends BridgeWebViewClient {
	private SwipeRefreshLayout swipeRefreshLayout;
	private Queue<WebResourceResponse> responseList = new LinkedBlockingQueue<>(2048);
	private View view;

	public WebViewClient(Bridge bridge, SwipeRefreshLayout swipeRefreshLayout) {
		super(bridge);
		this.view = bridge.getWebView().getRootView();
		this.swipeRefreshLayout = swipeRefreshLayout;
	}

 /*   @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        handler.proceed(); // Ignore SSL certificate errors
    }*/

	@Override
	public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {

/*        if ("localhost".equals(request.getUrl().getHost())){
            return super.shouldInterceptRequest(view, request);
        }
        return super.shouldInterceptRequest(view, request);*/
		WebResourceResponse response = super.shouldInterceptRequest(view, request);
		//WebResourceResponse response = getNewResponse(request.getUrl().toString(), request.getMethod(), request.getRequestHeaders());
		//Logger.info("==============res", request.getUrl(), responseList.size());
		return response;
	}

	@Override
	public void onPageStarted(WebView view, String url, Bitmap favicon) {
		super.onPageStarted(view, url, favicon);
		view.loadUrl("javascript:" + "window.env={ANDROID: true};");
	}

	@Override
	public void onPageFinished(WebView view, String url) {
		super.onPageFinished(view, url);
		view.loadUrl("javascript:" + "window.env={ANDROID: true};");
		if (swipeRefreshLayout != null)
			swipeRefreshLayout.setRefreshing(false);
	}

}
