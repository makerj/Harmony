package kr.mju.tonic.webhelper;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class Puzzles {
	private static final List<Puzzle> defaultPuzzles = new ArrayList<Puzzle>();
	private static boolean defaultPuzzlesInit;
	
	public static List<Puzzle> generateDefaultPuzzle() {
		if (defaultPuzzlesInit) return defaultPuzzles;
		
		File audioDir = new File(Defines.LOCAL_WEBAPP_ROOT_PATH, "resources/audio");

		for (File e : audioDir.listFiles())
			defaultPuzzles.add(new Puzzle(e));
		
		defaultPuzzlesInit = true;
		
		return defaultPuzzles;
	}
}
