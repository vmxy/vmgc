package io.vmxy.vmapp;

import android.app.Application;
import android.util.Log;

import com.tencent.smtt.sdk.QbSdk;

import java.util.HashMap;
import io.vmxy.vmapp.core.Logger;
import io.vmxy.vmapp.utils.ChannelUtil;

public class App extends Application {

	@Override
	public void onCreate() {
		Logger.setLevel(Log.INFO);
		super.onCreate();
		String channel = ChannelUtil.getMetaData(getPackageManager(), getPackageName()).getString("channel", "office").trim().toLowerCase();
		Logger.i("==========>channel=", channel);
		if("x5".equals(channel)){
			this.initX5(channel);
		}/*else{
			//创建一个意图
			Intent intent = new Intent(getApplicationContext(), AndroidActivity.class);
			intent.putExtra("channel", channel);
			//intent.putExtra("adapter", adapter);
			intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			startActivity(intent);
		}*/
	}
	private void initX5(String channel){
		HashMap map = new HashMap();
		map.put(com.tencent.smtt.export.external.TbsCoreSettings.TBS_SETTINGS_USE_SPEEDY_CLASSLOADER, true);
		map.put(com.tencent.smtt.export.external.TbsCoreSettings.TBS_SETTINGS_USE_DEXLOADER_SERVICE, true);
		com.tencent.smtt.sdk.QbSdk.initTbsSettings(map);
		com.tencent.smtt.sdk.QbSdk.setDownloadWithoutWifi(true);
		com.tencent.smtt.sdk.QbSdk.PreInitCallback cb = new com.tencent.smtt.sdk.QbSdk.PreInitCallback() {
			@Override
			public void onViewInitFinished(boolean b) {
				//x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
				Logger.i("开启TBS===视频初始化完成", b);
			}

			@Override
			public void onCoreInitFinished() {
				Logger.i("开启TBS===核心初始化完成");
				//webview.loadUrl("http://localhost");
			}

		};
		//x5内核初始化接口
		QbSdk.initX5Environment(getApplicationContext(), cb);
	}
}
