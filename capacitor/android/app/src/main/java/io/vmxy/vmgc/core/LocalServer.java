package io.vmxy.vmgc.core;

import android.content.Context;
import android.net.Uri;
import android.util.Base64;
import androidx.appcompat.app.AppCompatActivity;
import com.getcapacitor.AndroidProtocolHandler;
import com.getcapacitor.Bridge;
import com.getcapacitor.UriMatcher;
import com.getcapacitor.WebViewLocalServer;
import com.tencent.smtt.export.external.interfaces.WebResourceRequest;
import com.tencent.smtt.export.external.interfaces.WebResourceResponse;
import com.tencent.smtt.sdk.CookieManager;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LocalServer {
	private static final String capacitorFileStart = Bridge.CAPACITOR_FILE_START;
	private static final String capacitorContentStart = Bridge.CAPACITOR_CONTENT_START;
	//public String serverBasePath;
	public String basePath = "public";
	private AppCompatActivity context;
	private UriMatcher uriMatcher;
	private final AndroidProtocolHandler protocolHandler;

	WebViewLocalServer.PathHandler handler = new WebViewLocalServer.PathHandler() {
		@Override
		public InputStream handle(Uri url)  {
			try {
				String path = basePath + File.separator + url.getPath();
				path = path.replaceAll("\\/{2,}", "/");
				Logger.i("=======>path", path);
				File file = new File(path);
				FileInputStream fis = new FileInputStream(file);
				return fis;
			}catch (FileNotFoundException err){
				return new ByteArrayInputStream(err.getMessage().getBytes());
			}
		}
	};

	public LocalServer(AppCompatActivity context, String serverBasePath) {
		this.setServerBasePath(serverBasePath);
		this.context = context;
		this.protocolHandler = new AndroidProtocolHandler(context.getApplicationContext());
	}
	private static LocalServer localServer;

	public static LocalServer start(AppCompatActivity context, String serverBasePath){
		if(localServer!=null) return localServer;
		localServer = new LocalServer(context, serverBasePath);
		return localServer;
	}
	public static LocalServer getInstance(){
		return localServer;
	}

	public void setServerBasePath(String serverBasePath){
		//this.basePath = serverBasePath;
	}

	public WebResourceResponse shouldInterceptRequest(WebResourceRequest request) {
		Uri loadingUrl = request.getUrl();
		//WebViewLocalServer.PathHandler handler;
/*		synchronized (uriMatcher) {
			handler = (WebViewLocalServer.PathHandler) uriMatcher.match(request.getUrl());
		}*/
		//Logger.i("====>xreq", loadingUrl, isLocalFile(loadingUrl) || isMainUrl(loadingUrl), handler);
		if (handler == null) {
			return null;
		}
		if (isLocalFile(loadingUrl) || isMainUrl(loadingUrl)) {
			Logger.debug("===Handling local request: " + request.getUrl().toString());
			return handleLocalRequest(request, handler);
		} else {
			return handleProxyRequest(request, handler);
		}
	}

	private boolean isLocalFile(Uri uri) {
		String path = uri.getPath();
		return path.startsWith(capacitorContentStart) || path.startsWith(capacitorFileStart);
	}


	private boolean isMainUrl(Uri loadingUrl) {
		return (loadingUrl.getHost().equalsIgnoreCase("localhost"));
	}


	private WebResourceResponse handleLocalRequest(WebResourceRequest request, WebViewLocalServer.PathHandler handler) {
		String path = request.getUrl().getPath();
		if (request.getRequestHeaders().get("Range") != null) {
			InputStream responseStream = new LollipopLazyInputStream(handler, request);
			String mimeType = getMimeType(path, responseStream);
			Map<String, String> tempResponseHeaders = handler.getResponseHeaders();
			int statusCode = 206;
			try {
				int totalRange = responseStream.available();
				String rangeString = request.getRequestHeaders().get("Range");
				String[] parts = rangeString.split("=");
				String[] streamParts = parts[1].split("-");
				String fromRange = streamParts[0];
				int range = totalRange - 1;
				if (streamParts.length > 1) {
					range = Integer.parseInt(streamParts[1]);
				}
				tempResponseHeaders.put("Accept-Ranges", "bytes");
				tempResponseHeaders.put("Content-Range", "bytes " + fromRange + "-" + range + "/" + totalRange);
			} catch (IOException e) {
				statusCode = 404;
			}
			return new WebResourceResponse(
				mimeType,
				handler.getEncoding(),
				statusCode,
				handler.getReasonPhrase(),
				tempResponseHeaders,
				responseStream
			);
		}

		if (isLocalFile(request.getUrl())) {
			InputStream responseStream = new LollipopLazyInputStream(handler, request);
			String mimeType = getMimeType(request.getUrl().getPath(), responseStream);
			int statusCode = getStatusCode(responseStream, handler.getStatusCode());
			return new WebResourceResponse(
				mimeType,
				handler.getEncoding(),
				statusCode,
				handler.getReasonPhrase(),
				handler.getResponseHeaders(),
				responseStream
			);
		}

		if (path.equals("/cordova.js")) {
			return new WebResourceResponse(
				"application/javascript",
				handler.getEncoding(),
				handler.getStatusCode(),
				handler.getReasonPhrase(),
				handler.getResponseHeaders(),
				null
			);
		}

		if (path.equals("/") || (!request.getUrl().getLastPathSegment().contains("."))) {
			InputStream responseStream;
			try {
				String startPath = this.basePath + "/index.html";
				Boolean isAsset = "public".equals(this.basePath);//  false;
				//Logger.info("==========startPath1=" + this.basePath + "=" + startPath+"--"+isAsset+"-->"+protocolHandler);
				if (isAsset) {
					responseStream = protocolHandler.openAsset(startPath);
				} else {
					responseStream = protocolHandler.openFile(startPath);
				}
			} catch (Exception e) {
				Logger.error("===Unable to open index.html", e);
				return null;
			}

			int statusCode = getStatusCode(responseStream, handler.getStatusCode());
			Logger.info("===req" , statusCode, path);
			return new WebResourceResponse(
				"text/html",
				handler.getEncoding(),
				statusCode,
				handler.getReasonPhrase(),
				handler.getResponseHeaders(),
				responseStream
			);
		}

		if ("/favicon.ico".equalsIgnoreCase(path)) {
			try {
				return new WebResourceResponse("image/png", null, null);
			} catch (Exception e) {
				Logger.error("favicon handling failed", e);
			}
		}

		int periodIndex = path.lastIndexOf(".");
		if (periodIndex >= 0) {
			String ext = path.substring(path.lastIndexOf("."));

			//InputStream responseStream = new LollipopLazyInputStream(handler, request);
			InputStream responseStream;
			try {
				String startPath = this.basePath + path;
				Boolean isAsset = "public".equals(this.basePath);//  false;
				//Logger.info("==========startPath2=" + this.basePath + "=" + startPath+"--"+isAsset+"-->"+protocolHandler);
				if (isAsset) {
					responseStream = protocolHandler.openAsset(startPath);
				} else {
					responseStream = protocolHandler.openFile(startPath);
				}
			} catch (Exception e) {
				Logger.error("===Unable to open index.html", e);
				return null;
			}
			String mimeType = getMimeType(path, responseStream);
			int statusCode = getStatusCode(responseStream, handler.getStatusCode());
			try {
				Logger.info("===>req ", statusCode, path, ext, mimeType, responseStream.available());
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
			return new WebResourceResponse(
				mimeType,
				handler.getEncoding(),
				statusCode,
				handler.getReasonPhrase(),
				handler.getResponseHeaders(),
				responseStream
			);
		}

		return null;
	}

	/**
	 * Instead of reading files from the filesystem/assets, proxy through to the URL
	 * and let an external server handle it.
	 *
	 * @param request
	 * @param handler
	 * @return
	 */
	private WebResourceResponse handleProxyRequest(WebResourceRequest request, WebViewLocalServer.PathHandler handler) {
		final String method = request.getMethod();
		if (method.equals("GET")) {
			try {
				String url = request.getUrl().toString();
				Map<String, String> headers = request.getRequestHeaders();
				boolean isHtmlText = false;
				for (Map.Entry<String, String> header : headers.entrySet()) {
					if (header.getKey().equalsIgnoreCase("Accept") && header.getValue().toLowerCase().contains("text/html")) {
						isHtmlText = true;
						break;
					}
				}
				if (isHtmlText) {
					HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
					for (Map.Entry<String, String> header : headers.entrySet()) {
						conn.setRequestProperty(header.getKey(), header.getValue());
					}
					String getCookie = CookieManager.getInstance().getCookie(url);
					if (getCookie != null) {
						conn.setRequestProperty("Cookie", getCookie);
					}
					conn.setRequestMethod(method);
					conn.setReadTimeout(30 * 1000);
					conn.setConnectTimeout(30 * 1000);
					if (request.getUrl().getUserInfo() != null) {
						byte[] userInfoBytes = request.getUrl().getUserInfo().getBytes(StandardCharsets.UTF_8);
						String base64 = Base64.encodeToString(userInfoBytes, Base64.NO_WRAP);
						conn.setRequestProperty("Authorization", "Basic " + base64);
					}

					List<String> cookies = conn.getHeaderFields().get("Set-Cookie");
					if (cookies != null) {
						for (String cookie : cookies) {
							CookieManager.getInstance().setCookie(url, cookie);
						}
					}
					InputStream responseStream = conn.getInputStream();
					return new WebResourceResponse(
						"text/html",
						handler.getEncoding(),
						handler.getStatusCode(),
						handler.getReasonPhrase(),
						handler.getResponseHeaders(),
						responseStream
					);
				}
			} catch (Exception ex) {
				InputStream in = new ByteArrayInputStream(ex.getMessage().getBytes());
				return new WebResourceResponse(
					"text/html",
					"utf-8",
					500,
					"",
					new HashMap<>(),
					in
				);
			}
		}
		return null;
	}

	private String getMimeType(String path, InputStream stream) {
		String mimeType = null;
		try {
			mimeType = URLConnection.guessContentTypeFromName(path); // Does not recognize *.js
			if (mimeType != null && path.endsWith(".js") && mimeType.equals("image/x-icon")) {
				Logger.debug("We shouldn't be here");
			}
			if (mimeType == null) {
				if (path.endsWith(".js") || path.endsWith(".mjs")) {
					// Make sure JS files get the proper mimetype to support ES modules
					mimeType = "application/javascript";
				} else if (path.endsWith(".wasm")) {
					mimeType = "application/wasm";
				} else {
					mimeType = URLConnection.guessContentTypeFromStream(stream);
				}
			}
		} catch (Exception ex) {
			Logger.error("Unable to get mime type" + path, ex);
		}
		return mimeType;
	}

	private int getStatusCode(InputStream stream, int defaultCode) {
		int finalStatusCode = defaultCode;
		try {
			if (stream.available() == -1) {
				finalStatusCode = 404;
			}
		} catch (IOException e) {
			finalStatusCode = 500;
		}
		return finalStatusCode;
	}

	void register(Uri uri, WebViewLocalServer.PathHandler handler) {
		synchronized (uriMatcher) {
			uriMatcher.addURI(uri.getScheme(), uri.getAuthority(), uri.getPath(), handler);
		}
	}
	private void registerUriForScheme(String scheme, WebViewLocalServer.PathHandler handler, String authority) {
		Uri.Builder uriBuilder = new Uri.Builder();
		uriBuilder.scheme(scheme);
		uriBuilder.authority(authority);
		uriBuilder.path("");
		Uri uriPrefix = uriBuilder.build();

		register(Uri.withAppendedPath(uriPrefix, "/"), handler);
		register(Uri.withAppendedPath(uriPrefix, "**"), handler);
	}
	// For L and above.
	private static class LollipopLazyInputStream extends WebViewLocalServer.LazyInputStream {

		private WebResourceRequest request;
		private InputStream is;

		public LollipopLazyInputStream(WebViewLocalServer.PathHandler handler, WebResourceRequest request) {
			super(handler);
			this.request = request;
		}

		@Override
		protected InputStream handle() {
			return handler.handle(new android.webkit.WebResourceRequest() {
				@Override
				public Uri getUrl() {
					return request.getUrl();
				}

				@Override
				public boolean isForMainFrame() {
					return request.isForMainFrame();
				}

				@Override
				public boolean isRedirect() {
					return request.isRedirect();
				}

				@Override
				public boolean hasGesture() {
					return request.hasGesture();
				}

				@Override
				public String getMethod() {
					return request.getMethod();
				}

				@Override
				public Map<String, String> getRequestHeaders() {
					return request.getRequestHeaders();
				}
			});
		}
	}

	public String getBasePath() {
		return this.basePath;
	}

}
