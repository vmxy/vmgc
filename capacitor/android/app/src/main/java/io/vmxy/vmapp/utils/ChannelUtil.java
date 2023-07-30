package io.vmxy.vmapp.utils;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;

import io.vmxy.vmapp.core.Logger;

public class ChannelUtil {

	public static String getChannel(Context context){
		ApplicationInfo app = context.getApplicationInfo();
		if(app==null) Logger.info("=======app is null");
		if(app.metaData == null){
			Logger.info("=========app metadata is null");
			return "";
		}
		return app.metaData.getString("channel");
	}
	public static Bundle getMetaData(PackageManager pm, String packageName) {
		ApplicationInfo info = null;
		try {
			info = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
			if(info.metaData!=null)return info.metaData;
		} catch (PackageManager.NameNotFoundException e) {
		}
		return new Bundle();
	}
}
