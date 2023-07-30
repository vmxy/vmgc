package io.vmxy.vmapp.core;

import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Logger {
	private static int level = Log.INFO;
	private static Locale locale = new Locale("zh-CN", "CN");
	//private static DateFormat dateFormat = DateFormat.getTimeInstance(DateFormat.DEFAULT, locale);
	private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static void setLevel(int level) {
		Logger.level = level;
	}

	public static void debug(Object... args) {
		if (Log.isLoggable("debug", Log.DEBUG) && level >= Log.DEBUG) Log.d("debug", string(args));
	}

	public static void info(Object... args) {
		if (Log.isLoggable("info", Log.INFO) && level >= Log.INFO) Log.i("info", string(args));
	}

	public static void warn(Object... args) {
		if (Log.isLoggable("warn", Log.WARN) && level >= Log.WARN) Log.w("warn", string(args));
	}

	public static void error(Object... args) {
		if (Log.isLoggable("error", Log.ERROR) && level >= Log.ERROR) Log.e("error", string(args));
	}


	public static void d(Object... args) {
		Logger.debug(args);
	}

	public static void i(Object... args) {
		Logger.info(args);
	}
	public static void w(Object... args) {
		Logger.warn(args);
	}
	public static void e(Object... args) {
		Logger.error(args);
	}
	private static String string(Object... args) {
		String date = simpleDateFormat.format(new Date());
		StringBuilder sb = new StringBuilder();
		sb.append(date).append(" ");
		for (Object o : args) {
			sb.append(o).append(" ");
		}
		return sb.toString();
	}
}
