package io.vmxy.vmgc;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import io.vmxy.vmgc.core.Logger;
import io.vmxy.vmgc.utils.ChannelUtil;

public class MainActivity extends AppCompatActivity {
	@Override
	protected void onCreate(@Nullable Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		String channel = ChannelUtil.getMetaData(getPackageManager(), getPackageName()).getString("channel").trim().toLowerCase();
		Logger.info("====>channel=", channel);
		if("x5".equalsIgnoreCase(channel)){
			Intent intent = new Intent(this, X5Activity.class);
			startActivity(intent);
		}else{
			Intent intent = new Intent(this, AndroidActivity.class);
			startActivity(intent);
		}
	}

	@Override
	public void onBackPressed() {

	}
}
