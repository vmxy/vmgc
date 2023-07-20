package io.vmxy.vmgc.utils;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadSampleListener;
import com.liulishuo.filedownloader.FileDownloader;
import com.liulishuo.filedownloader.util.FileDownloadUtils;

import java.io.File;

public class Download {
	BaseDownloadTask singleTask;
	public int singleTaskId = 0;
	//文件下载地址
	//private String downloadUrl = "https://b2c-store.oss-ap-southeast-1.aliyuncs.com/ceshi/FRT.zip";
	//文件保存路径
	private String baseDir ;
	//下载下来的文件名称
	private String fileName;

	public Download(String base){
			baseDir = base;
	}

	public void download(String url, Handler.Callback callback) {
		singleTask = FileDownloader.getImpl().create(url)
			.setPath(baseDir, true)
			.setCallbackProgressTimes(300)
			.setMinIntervalUpdateSpeed(400)
			.setListener(new FileDownloadSampleListener() {
				@Override
				protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
					super.pending(task, soFarBytes, totalBytes);
				}

				@Override
				protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
					Log.i("info", "----->progress taskId:" + task.getId() + ",soFarBytes:" + soFarBytes + ",totalBytes:" + totalBytes
						+ ",percent:" + soFarBytes * 1.0 / totalBytes + ",speed:" + task.getSpeed());
					super.progress(task, soFarBytes, totalBytes);
				}

				@Override
				protected void blockComplete(BaseDownloadTask task) {
					Log.i("info","----------->blockComplete taskId:" + task.getId() + ",filePath:" + task.getPath() +
						",fileName:" + task.getFilename() + ",speed:" + task.getSpeed() + ",isReuse:" + task.reuse());
					fileName = task.getFilename();
					super.blockComplete(task);
				}

				@Override
				protected void completed(BaseDownloadTask task) {
					Log.i("info","---------->completed taskId:" + task.getId() + ",isReuse:" + task.reuse());
					super.completed(task);
					Message msg = new Message();
					callback.handleMessage(msg);
				}

				@Override
				protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
					super.paused(task, soFarBytes, totalBytes);
				}

				@Override
				protected void error(BaseDownloadTask task, Throwable e) {
					Log.e("error", "--------->error taskId:" + task.getId() + ",e:" + e.getLocalizedMessage());
					super.error(task, e);
				}

				@Override
				protected void warn(BaseDownloadTask task) {
					super.warn(task);
				}
			});
		singleTaskId = singleTask.start();
	}


}
