function checkPitch(lastValue) {
	var pitches = [];
	for (var i = 0 ; i < DEFINES.PUZZLE_BOX_SIZE ; ++i) {
		if (PuzzleBox.getPrototypeID(i) == -1)
			break;
		pitches.push(PuzzleBox.getBeginNote(i));
		pitches.push(PuzzleBox.getEndNote(i));
	}
	if (lastValue !== undefined) {
		pitches.push(lastValue[0]);
		pitches.push(lastValue[1]);
	}

	var THRESHOLD = 5;
	for (var i = 2; i < pitches.length; i += 2) {
		var diff = Math.abs(pitches[i - 1] - pitches[i]);
		if (diff >= THRESHOLD) {
			return false;
		}
	}
	return true;
}

function checkChord(lastValue) {
	var chords = [];
	for (var i = 0 ; i < DEFINES.PUZZLE_BOX_SIZE ; ++i) {
		if (PuzzleBox.getPrototypeID(i) == -1)
			break;
		chords.push(PuzzleBox.getCode(i));
	}
	if (lastValue !== undefined) {
		chords.push(lastValue);
	}
	var chordsStr = chords.join(',');
	console.log(chordsStr);

	if (/([A-Za-z]+),\1/.exec(chordsStr)) {
		// 중복 코드 막기
		return false;
	}

	var re = /,?((C,[DFGA])|(F,[GDC])|(G,[CF])|(D,G)|(A,[DFG])),?/g;
	var pos = 0;
	while (pos < chordsStr.length) {
		var res = re.exec(chordsStr);
		if (!res) {
			if (pos == chordsStr.length - 1) {
				break;
			}
			return false;
		}
		pos += res[0].length;
	}

	if (chords.length === DEFINES.PUZZLE_BOX_SIZE) {
		if (chords[chords.length - 1] !== 'C') {
			// 마지막 조각일 경우 무조건 C 화음으로 종료되어야 함
			return false;
		}
	}

	return true;
}

function checkNotes(lastValue) {
	var numNotesArr = [];
	for (var i = 0 ; i < DEFINES.PUZZLE_BOX_SIZE ; ++i) {
		if (PuzzleBox.getPrototypeID(i) == -1)
			break;
		numNotesArr.push(PuzzleBox.getNotes(i));
	}
	if (lastValue !== undefined) {
		numNotesArr.push(lastValue);
	}

	for (var i = 0; i < numNotesArr.length; i++) {
		if ((i + 1) % 4 === 0) {
			if (numNotesArr[i] > 3) {
				return false;
			}
		} else {
			if (numNotesArr[i] < 3) {
				return false;
			}
		}
	}

	return true;
}

