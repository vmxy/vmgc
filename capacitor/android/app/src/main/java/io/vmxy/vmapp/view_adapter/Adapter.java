package io.vmxy.vmapp.view_adapter;

import android.content.pm.ActivityInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.getcapacitor.Bridge;

import java.io.File;
import java.io.FilenameFilter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import io.vmxy.vmapp.R;
import io.vmxy.vmapp.core.LocalServer;
import io.vmxy.vmapp.core.Logger;
import io.vmxy.vmapp.utils.FileUtil;
import io.vmxy.vmapp.utils.NumberUtil;

public class Adapter implements Serializable {
	public Bridge bridge;
	AppCompatActivity activity;
	SwipeRefreshLayout swipeRefreshLayout;
	View webview = null;
	String APP_UPDATE_URL = "";//getResources().getString(R.string.APP_UPDATE_URL);
	String lastestAppVersion = "";

	public Adapter(AppCompatActivity activity, Bridge bridge) {
		this.bridge = bridge;
		this.activity = activity;
	}
	public Adapter(AppCompatActivity activity) {
		this.activity = activity;
	}

	public void init(){
		APP_UPDATE_URL = activity.getResources().getString(R.string.APP_UPDATE_URL);
		setAppPath();
		new AdapterWebViewClient(this).init();
		new AdapterSetting(this).init();
		new AdapterPullRefresh(this).init();
		new Update(this).init();
	}
	public String getAppName(){
		String appName = activity.getResources().getString(R.string.app_name);
		Logger.i("appName===========", appName);
		return appName;
	}
	public void setWebView(WebView webview){
		this.webview = webview;
	}
	public void setWebView(com.tencent.smtt.sdk.WebView webview){
		this.webview = webview;
	}
	public void setSwipeRefreshLayout(SwipeRefreshLayout swipeRefreshLayout){
		this.swipeRefreshLayout = swipeRefreshLayout;
	}
	/**
	 * 设置 WebViewClient
	 */
	public void setWebViewClient() {
		new AdapterWebViewClient(this).init();
	}

	public String setAppPath() {
		if (getLatestApp() != "") {
			String appBase = getAPPsPath() + File.separator + getLatestApp();
			appBase = appBase.replaceAll("[.]zip$", "");
			Logger.i("===>set app basedir ", appBase);
			if(bridge != null){
				bridge.setServerBasePath(appBase);
			}
			if(LocalServer.getInstance()!=null){
				LocalServer.getInstance().setServerBasePath(appBase);
			}
			return appBase;
		}
		return "";
	}
	public String getAppPath() {
		if (getLatestApp() != "") {
			//String apps = getAPPsPath();
			String appBase = getAPPsPath() + File.separator + getLatestApp();
			return appBase;
		}
		return "";
	}

	public Bundle getMetaData() {
		PackageManager pm = activity.getPackageManager();
		String packageName = activity.getPackageName();
		Bundle metadata = null;
		try {
			ApplicationInfo info = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
			metadata = info.metaData;
			if (metadata != null) return metadata;
		} catch (PackageManager.NameNotFoundException e) {
		}
		if (metadata == null) {
			ActivityInfo info = null;
			try {
				info = activity.getPackageManager().getActivityInfo(activity.getComponentName(), PackageManager.GET_META_DATA);
				metadata = info.metaData;
				if (metadata != null) return metadata;
			} catch (PackageManager.NameNotFoundException e) {
			}
		}
		return new Bundle();
	}

	/**
	 * 获取应用存储目录
	 *
	 * @return
	 */
	public String getAPPsPath() {
		File dir = activity.getCacheDir();
		String baseDir = dir.getParent() + File.separator + "apps";
		File apps = new File(baseDir);
		if (!apps.exists()) {
			apps.mkdirs();
		}
		return baseDir;
	}
	public static String getAPPsPath( File cacheDir) {
		String baseDir = cacheDir.getParent() + File.separator + "apps";
		File apps = new File(baseDir);
		if (!apps.exists()) {
			apps.mkdirs();
		}
		return baseDir;
	}
	/**
	 * 获取本地最新版本应用路径
	 *
	 * @return
	 */
	public String getLatestApp() {
		if(lastestAppVersion!=null && !lastestAppVersion.trim().equals("")){
			return lastestAppVersion;
		}
		String baseDir = getAPPsPath();
		File dir = new File(baseDir);
		String[] list = dir.list(new FilenameFilter() {
			@Override
			public boolean accept(File parent, String name) {
				boolean isStart = name.startsWith("app-");
				return isStart && !name.endsWith(".zip.temp");
			}
		});
		if (list.length < 1) return "";
		Arrays.sort(list, new Comparator<String>() {
			@Override
			public int compare(String s, String t) {
				s = NumberUtil.toVersion(s);
				t = NumberUtil.toVersion(t);
				if (NumberUtil.isLarge(s, t)) return 1;
				return 0;
			}
		});
		File app = new File(baseDir + File.separator + list[0].replaceAll("[.](zip|asar)$", ""));
		if (!app.exists()) {
			FileUtil.unZipFile(new File(baseDir + File.separator + list[0]), baseDir);
			File rename = new File(baseDir + File.separator + "dist");
			File newdir = new File(baseDir + File.separator + list[0].replaceAll("[.](zip|asar)", ""));
			rename.renameTo(newdir);
			Logger.i("info", "unzip============" + new File(baseDir).list().length);
		}
		lastestAppVersion = list.length > 0 ? list[0] : "";
		return lastestAppVersion;
	}


/*	public View getWebview() {
		for (View v : getAllChildViews(activity.getWindow().getDecorView())) {
			if (v instanceof WebView) return v;
			if (v instanceof com.tencent.smtt.sdk.WebView) return v;
		}
		return null;
	}*/

	public SwipeRefreshLayout getViewRefresh() {
		for (View v : getAllChildViews(activity.getWindow().getDecorView())) {
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
