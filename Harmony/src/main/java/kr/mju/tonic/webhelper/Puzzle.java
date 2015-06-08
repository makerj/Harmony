package kr.mju.tonic.webhelper;

import java.io.File;
import java.util.StringTokenizer;
import java.util.concurrent.atomic.AtomicInteger;

public class Puzzle {
	private static final AtomicInteger prototypeIDSeeder = new AtomicInteger(0);
	
	private String audioFileURL;
	private String code;
	private int beginNote;
	private int endNote;
	private int prototypeId;
	
	public Puzzle(File e) {
		if (!e.getName().matches(".+_.+_.+_.+_.+\\.(?i)(mp3|midi|wav|ogg)"))
			throw new IllegalArgumentException("Audio file has illegal name: " + e.getName());
		
		StringTokenizer tok = new StringTokenizer(e.getName(), "_");
		tok.nextToken(); // drop a song title
		
		audioFileURL = Defines.WEB_AUDIO_PATH + e.getName();
		code = tok.nextToken();
		beginNote = Integer.parseInt(tok.nextToken());
		endNote = Integer.parseInt(tok.nextToken());
		prototypeId = prototypeIDSeeder.getAndIncrement();
	}

	public String getAudioFileURL() {
		return audioFileURL;
	}

	public void setAudioFileURL(String audioFileURL) {
		this.audioFileURL = audioFileURL;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getBeginNote() {
		return beginNote;
	}

	public void setBeginNote(int beginNote) {
		this.beginNote = beginNote;
	}

	public int getEndNote() {
		return endNote;
	}

	public void setEndNote(int endNote) {
		this.endNote = endNote;
	}

	public int getPrototypeId() {
		return prototypeId;
	}

	public void setPrototypeId(int prototypeId) {
		this.prototypeId = prototypeId;
	}
}
