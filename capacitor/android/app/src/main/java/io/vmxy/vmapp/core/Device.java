package io.vmxy.vmapp.core;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;

import androidx.core.app.ActivityCompat;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.security.MessageDigest;
import java.util.UUID;

public class Device {
    //保存文件的路径
    private static final String CACHE_IMAGE_DIR = "newbing";
    //保存的文件 采用隐藏文件的形式进行保存
    private static final String DEVICES_FILE_NAME = ".device";

    public static String getPhone(Context context) {
        try {
            TelephonyManager tMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED &&
                    ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_NUMBERS) != PackageManager.PERMISSION_GRANTED &&
                    ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
                return "";
            }
            String mPhoneNumber = tMgr.getLine1Number();// || tMgr.getSimSerialNumber();
						if(mPhoneNumber == null) mPhoneNumber = "";
            return mPhoneNumber;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    /**
     * 获取设备唯一标识符
     *
     * @param context
     * @return
     */
    public static String getDeviceId(Context context) {
        //读取保存的在sd卡中的唯一标识符
        String deviceId = readDeviceID(context);
        //用于生成最终的唯一标识符
        StringBuffer s = new StringBuffer();
        //判断是否已经生成过,
        if (deviceId != null && !"".equals(deviceId)) {
            return deviceId;
        }
        try {
            //获取IMES(也就是常说的DeviceId)
            deviceId = getIMIEStatus(context);
            s.append(deviceId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            //获取设备的MACAddress地址 去掉中间相隔的冒号
            deviceId = getLocalMac(context).replace(":", "");
            s.append(deviceId);
        } catch (Exception e) {
            e.printStackTrace();
        }
//        }

        //如果以上搜没有获取相应的则自己生成相应的UUID作为相应设备唯一标识符
        if (s == null || s.length() <= 0) {
            UUID uuid = UUID.randomUUID();
            deviceId = uuid.toString().replace("-", "");
            s.append(deviceId);
        }
        //为了统一格式对设备的唯一标识进行md5加密 最终生成32位字符串
        String md5 = getMD5(s.toString(), true);
        if (s.length() > 0) {
            //持久化操作, 进行保存到SD卡中
            saveDeviceID(md5, context);
        }
        return md5;
    }


    /**
     * 读取固定的文件中的内容,这里就是读取sd卡中保存的设备唯一标识符
     *
     * @param context
     * @return
     */
    public static String readDeviceID(Context context) {
        File file = getDevicesDir(context);
        StringBuffer buffer = new StringBuffer();
        try {
            FileInputStream fis = new FileInputStream(file);
            InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
            Reader in = new BufferedReader(isr);
            int i;
            while ((i = in.read()) > -1) {
                buffer.append((char) i);
            }
            in.close();
            return buffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取设备的DeviceId(IMES) 这里需要相应的权限<br/>
     * 需要 READ_PHONE_STATE 权限
     *
     * @param context
     * @return
     */
    private static String getIMIEStatus(Context context) {
        TelephonyManager tm = (TelephonyManager) context
                .getSystemService(Context.TELEPHONY_SERVICE);
        String deviceId = tm.getDeviceId();
        return deviceId;
    }


    /**
     * 获取设备MAC 地址 由于 6.0 以后 WifiManager 得到的 MacAddress得到都是 相同的没有意义的内容
     * 所以采用以下方法获取Mac地址
     *
     * @param context
     * @return
     */
    private static String getLocalMac(Context context) {
//        WifiManager wifi = (WifiManager) context
//                .getSystemService(Context.WIFI_SERVICE);
//        WifiInfo info = wifi.getConnectionInfo();
//        return info.getMacAddress();


        String macAddress = null;
        StringBuffer buf = new StringBuffer();
        NetworkInterface networkInterface = null;
        try {
            networkInterface = NetworkInterface.getByName("eth1");
            if (networkInterface == null) {
                networkInterface = NetworkInterface.getByName("wlan0");
            }
            if (networkInterface == null) {
                return "";
            }
            byte[] addr = networkInterface.getHardwareAddress();


            for (byte b : addr) {
                buf.append(String.format("%02X:", b));
            }
            if (buf.length() > 0) {
                buf.deleteCharAt(buf.length() - 1);
            }
            macAddress = buf.toString();
        } catch (SocketException e) {
            e.printStackTrace();
            return "";
        }
        return macAddress;


    }

    /**
     * 保存 内容到 SD卡中,  这里保存的就是 设备唯一标识符
     *
     * @param str
     * @param context
     */
    public static void saveDeviceID(String str, Context context) {
        File file = getDevicesDir(context);
        try {
            FileOutputStream fos = new FileOutputStream(file);
            Writer out = new OutputStreamWriter(fos, "UTF-8");
            out.write(str);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 对挺特定的 内容进行 md5 加密
     *
     * @param message   加密明文
     * @param upperCase 加密以后的字符串是是大写还是小写  true 大写  false 小写
     * @return
     */
    public static String getMD5(String message, boolean upperCase) {
        String md5str = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] input = message.getBytes();
            byte[] buff = md.digest(input);
            md5str = bytesToHex(buff, upperCase);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return md5str;
    }


    public static String bytesToHex(byte[] bytes, boolean upperCase) {
        StringBuffer md5str = new StringBuffer();
        int digital;
        for (int i = 0; i < bytes.length; i++) {
            digital = bytes[i];

            if (digital < 0) {
                digital += 256;
            }
            if (digital < 16) {
                md5str.append("0");
            }
            md5str.append(Integer.toHexString(digital));
        }
        if (upperCase) {
            return md5str.toString().toUpperCase();
        }
        return md5str.toString().toLowerCase();
    }

    /**
     * 统一处理设备唯一标识 保存的文件的地址
     *
     * @param context
     * @return
     */
    private static File getDevicesDir(Context context) {
        File mCropFile = null;
        File cropdir = new File(context.getFilesDir(), CACHE_IMAGE_DIR);
        if (!cropdir.exists()) {
            cropdir.mkdirs();
        }
        mCropFile = new File(cropdir, DEVICES_FILE_NAME);
        return mCropFile;
    }
}
