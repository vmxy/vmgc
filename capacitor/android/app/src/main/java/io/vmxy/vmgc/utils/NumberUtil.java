package io.vmxy.vmgc.utils;

public class NumberUtil {
	public static int toInt(String v, int df){
		try{
			return Integer.parseInt(v);
		}catch(Exception e){}
		return df;
	}

	public static String toVersion(String s){
		s = s.replaceAll("^app[-_]+v", "").replaceAll("[.](zip|asar)$", "");
		return s;
	}
	public static boolean isLarge(String s1, String s2){
		String[] s0 = s1.split(".");
		String[] t0 = s2.split(".");
		if(s0.length != t0.length) return true;
		for(int i=0;i<s0.length;i++){
			int a = NumberUtil.toInt(s0[i], 0);
			int b = NumberUtil.toInt(t0[i], 0);
			if( a > b) return true;
		}
		return false;
	}
}
