# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile
-dontwarn dalvik.**
-dontwarn com.tencent.smtt.**
-dontwarn okhttp3.**
-dontwarn javax.annotation.**
-dontwarn io.netty.**
-dontwarn com.maxmind.**
-dontwarn net.lightnetwork.lproxy.**
-dontwarn net.lightnetwork.view.**
-dontwarn com.getcapacitor.**

-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service

-keep class com.tencent.smtt.** {
    *;
}

-keep class com.tencent.tbs.** {
    *;
}
-keep class okhttp3.** {
    *;
}
-keep class io.netty.** {
    *;
}
-keep class com.maxmind.** {
    *;
}

-keep class io.vmxy.vmapp.** {
    *;
}
-keep class com.getcapacitor.** {
    *;
}
