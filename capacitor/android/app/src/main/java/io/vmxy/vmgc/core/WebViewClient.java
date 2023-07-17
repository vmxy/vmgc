package io.vmxy.vmgc.core;

import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.LinkedBlockingQueue;

public class WebViewClient extends BridgeWebViewClient {
	private Queue<WebResourceResponse> responseList = new LinkedBlockingQueue<>(2048);
	public WebViewClient(Bridge bridge) {
		super(bridge);

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
	public void onPageFinished(WebView view, String url) {
		view.loadUrl("javascript:" + "window.env={ANDROID: true};console.info('env<===>>"+url+"', JSON.stringify(window.env))" );
		super.onPageFinished(view, url);
	}

	public void closeAll(){
		Logger.info("===================close response", responseList.size());
		for(WebResourceResponse res = responseList.poll(); res!=null; res = responseList.poll() ){
			try{
				if(res.getData() != null)res.getData().close();
			}catch(Throwable err){
				err.printStackTrace();
			}
		}
	}
}
