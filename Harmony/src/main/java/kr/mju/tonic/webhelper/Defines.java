package kr.mju.tonic.webhelper;

import java.io.File;

public class Defines {
	public static final String LOCAL_WEBAPP_ROOT_PATH = new File(Thread.currentThread()
			.getContextClassLoader().getResource("/").toString())
			.getParentFile().getParent().replace("file:" + File.separator, "");
	public static final String WEB_AUDIO_PATH = "tonic/resources/audio/";
}
