package io.vmxy.vmapp.view_adapter;

import android.os.Handler;
import android.os.Message;

import androidx.annotation.NonNull;

import com.liulishuo.filedownloader.FileDownloader;
import com.liulishuo.filedownloader.connection.FileDownloadUrlConnection;

import io.vmxy.vmapp.core.Logger;
import io.vmxy.vmapp.utils.Download;
import io.vmxy.vmapp.utils.NumberUtil;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Update {
	private Adapter adapter;

	public Update(Adapter adapter) {
		this.adapter = adapter;
	}

	public boolean checkUpdate(String latestVersion) {
		String localLatest = adapter.getLatestApp();
		localLatest = NumberUtil.toVersion(localLatest);
		Logger.i("info", "===>check update " + localLatest + ":" + latestVersion + ":" + NumberUtil.isLarge(latestVersion, localLatest));
		return NumberUtil.isLarge(latestVersion, localLatest);
	}

	public void init() {
		updateVersionToZip();
	}

	private void updateVersionToZip() {
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					OkHttpClient client = new OkHttpClient();//创建OkHttpClient对象
					Logger.i("info", "=====req update url=" + adapter.APP_UPDATE_URL + "/latest.yml");
					Request request = new Request.Builder()
						.url(adapter.APP_UPDATE_URL + "/latest.yml")//请求接口。如果需要传参拼接到接口后面。
						.build();//创建Request 对象
					Response response = null;
					response = client.newCall(request).execute();//得到Response 对象
					if (response.isSuccessful() && response.code() == 200) {
						String text = response.body().string();
						String[] lines = text.split("[\r\n]");
						String version = lines[0].trim();
						version = version.replaceAll("version:\s+", "");

						if (!checkUpdate(version)) return;
						String name = "app-v" + version + ".zip";
						String downloadUrl = adapter.APP_UPDATE_URL + "/" + name;
						String baseDir = adapter.getAPPsPath();
						Logger.i("info", "======>dl=>" + downloadUrl, baseDir);

						FileDownloader.setupOnApplicationOnCreate(adapter.activity.getApplication())
							.connectionCreator(new FileDownloadUrlConnection.Creator())
							.commit();

						Download dl = new Download(baseDir);
						dl.download(downloadUrl, new Handler.Callback() {
							@Override
							public boolean handleMessage(@NonNull Message message) {
								return true;
							}
						});
						//此时的代码执行在子线程，修改UI的操作请使用handler跳转到UI线程。
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
	}
}
