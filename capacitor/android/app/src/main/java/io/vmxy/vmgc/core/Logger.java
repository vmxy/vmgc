package io.vmxy.vmgc.core;

import android.os.Build;
import android.util.Log;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Logger {
    private static Locale locale = new Locale("zh-CN", "CN");
    //private static DateFormat dateFormat = DateFormat.getTimeInstance(DateFormat.DEFAULT, locale);
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    public static void debug(Object... args){
        if(Log.isLoggable("debug", Log.DEBUG)) Log.d("debug", string(args));
    }

    public static void info(Object... args){
        Log.i("info", string(args));
    }
    public static void warn(Object... args){
        Log.w("warn", string(args));
    }
    public static void error(Object... args){
        Log.e("error", string(args));
    }
    private static String string(Object... args){
        String date = simpleDateFormat.format(new Date());
        StringBuilder sb = new StringBuilder();
        sb.append(date).append(" ");
        for(Object o : args){
            sb.append(o).append(" ");
        }
        return sb.toString();
    }
}
