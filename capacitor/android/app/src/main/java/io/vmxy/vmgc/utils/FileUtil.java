package io.vmxy.vmgc.utils;

import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class FileUtil {
	/**
	 * zipFile 压缩文件
	 * folderPath 解压后的文件路径
	 * */
	public static void unZipFile(File zipFile, String folderPath) {
		try {
			ZipFile zfile = new ZipFile(zipFile);
			Enumeration zList = zfile.entries();
			ZipEntry ze = null;
			byte[] buf = new byte[1024];
			while (zList.hasMoreElements()) {
				ze = (ZipEntry) zList.nextElement();

				if (ze.isDirectory()) {
					String dirstr = folderPath +  File.separator + ze.getName();
					dirstr = new String(dirstr.getBytes("8859_1"), "GB2312");
					File f = new File(dirstr);
					boolean mdir = f.mkdir();
					continue;
				}

				OutputStream os = new BufferedOutputStream(new FileOutputStream(getRealFileName(folderPath,ze.getName())));
				Log.e("error","---->getRealFileName(folderPath,ze.getName()): " + getRealFileName(folderPath,ze.getName()).getPath() + "  name:" + getRealFileName(folderPath,ze.getName()).getName());
				InputStream is = new BufferedInputStream(zfile.getInputStream(ze));
				int readLen = 0;
				while ((readLen = is.read(buf, 0, 1024)) != -1) {
					os.write(buf, 0, readLen);
				}
				is.close();
				os.close();
			}
			zfile.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

		//解压完成之后删除压缩包
		deleteDir(zipFile);
	}
	/**
	 * 根据保存zip的文件路径和zip文件相对路径名，返回一个实际的文件
	 * 因为zip文件解压后，里边可能是多重文件结构
	 * */
	public static File getRealFileName(String baseDir, String absFileName) {
		String[] dirs = absFileName.split("/");
		File ret = new File(baseDir);
		String substr = null;
		if (dirs.length > 1) {
			for (int i = 0; i < dirs.length - 1; i++) {
				substr = dirs[i];
				try {
					substr = new String(substr.getBytes("8859_1"), "GB2312");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				ret = new File(ret, substr);

			}
			if (!ret.exists()) {
				ret.mkdirs();
			}
			substr = dirs[dirs.length - 1];
			try {
				substr = new String(substr.getBytes("8859_1"), "GB2312");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			ret = new File(ret, substr);
			return ret;
		}
		return ret;
	}
	/**
	 * 删除整个文件夹 或者 文件
	 */
	public static void deleteDir(File file) {
		if (!file.exists()) {
			return;
		}
		if (file.isDirectory()) {
			File[] childFiles = file.listFiles();
			if (childFiles == null || childFiles.length == 0) {
				file.delete();
			}

			for (int index = 0; index < childFiles.length; index++) {
				deleteDir(childFiles[index]);
			}
		}
		file.delete();
	}


}
