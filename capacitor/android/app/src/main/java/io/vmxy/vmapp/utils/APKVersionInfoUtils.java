package io.vmxy.vmapp.utils;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

/**
 * 获取当前APK的版本号和版本名
 */
public class APKVersionInfoUtils {
	/**
	 * 获取当前apk的版本号
	 *
	 * @param mContext
	 * @return
	 */
	public static int getVersionCode(Context mContext) {
		int versionCode = 0;
		try {
			//获取软件版本号，对应AndroidManifest.xml下android:versionCode
			versionCode = mContext.getPackageManager().
				getPackageInfo(mContext.getPackageName(), 0).versionCode;
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
		}
		return versionCode;
	}

	/**
	 * 获取当前apk的版本名
	 *
	 * @param context 上下文
	 * @return
	 */
	public static String getVersionName(Context context) {
		String versionName = "";
		try {
			//获取软件版本号，对应AndroidManifest.xml下android:versionName
			versionName = context.getPackageManager().
				getPackageInfo(context.getPackageName(), 0).versionName;
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
		}
		return versionName.replaceAll("[.][a-z]+$", "");
	}
	/**
	 * 判断当前应用是否是debug状态
	 */
	public static boolean isApkInDebug(Context context) {
		try {
			ApplicationInfo info = context.getApplicationInfo();
			return (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
		} catch (Exception e) {
			return false;
		}
	}
}
