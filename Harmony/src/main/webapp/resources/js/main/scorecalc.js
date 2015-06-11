/*
 화음, 솔로 음 체크
 */
var Score = (function () {
	var score = 0;
	var scoreJDOM = $('#score');
	var bars = [];

	var init = function () {
		scoreJDOM.html(0);
		score = 0;
		bars = [];
	};

	var createBars = function (puzzleBox) {
		for (var i = 0 ; i < 25 ; ++i) {
			if (puzzleBox[i].prototypeId == -1) continue;
			bars.push({
				code: PuzzleBox.getCode(i),
				begin_pitch: PuzzleBox.getBeginNote(i),
				end_pitch: PuzzleBox.getEndNote(i)
			});
		}
	};

	var eval = function () {		//높이를 구한다. +-5 기준으로 함.
		for (var i = 0; i < bars.length; i++) {			// bars의 크기는 최대 25가 될 것이다.
			if (i < bars.length-1) {
				// Evaluate 'Pitch'
				var tempLow = bars[i].end_pitch - 5;		// 현재의 마지막 음에서 5도 위
				var tempHigh = bars[i].end_pitch - 5;		// 현재의 마지막 음에서 5도 아래
				if (tempLow <= bars[i + 1].begin_pitch && bars[i + 1].begin_pitch <= tempHigh) score += 100;	// 성공 시 점수 100점 추가
				// Evaluate 'Code'
				evalCode(bars, i);		// 화음 체크 function 호출
			}
			if (i == bars.length-1) {						// 마지막 조각일 경우
				if (bars[i].code == "C") {	// 무조건 C 화음으로 종료되어야 함
					score += 100;				// 이 경우에만 100점 추가
				}
			}
		}
	};

	var evalCode = function (bars, i) {				// 화음을 체크한다.
		if (bars[i].code == "C") {			// C 코드 일 때
			if (bars[i + 1].code == "D" || bars[i + 1].code == "F" || bars[i + 1].code == "G" || bars[i + 1].code == "A") {		// 화음 규칙에 맞을 경우
				score += 100;	// 성공 시 점수 100점 추가
			} else if (bars[i + 1].code == "C") {	//같은 화음일 경우
				score += 50;			// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
			}
		} else if (bars[i].code == "F") {		// F 코드일 경우
			if (bars[i + 1].code == "G" || bars[i + 1].code == "D" || bars[i + 1].code == "C") {		// 화음 규칙에 맞을 경우
				score += 100;	// 성공 시 점수 100점 추가
			} else if (bars[i + 1].code == "F") {		// 같은 화음일 경우
				score += 50;				// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
			}
		} else if (bars[i].code == "G") {		// G 화음일 경우
			if (bars[i + 1].code == "C" || bars[i + 1].code == "F") {		// 화음 규칙에 맞을 경우
				score += 100;	// 성공 시 점수 100점 추가
			} else if (bars[i + 1].code == "G") {		// 같은 화음일 경우
				score += 50;			// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
			}
		} else if (bars[i].code == "D") {		// D 화음일 경우
			if (bars[i + 1].code == "G") {	// 화음 규칙에 맞을 경우
				score += 100;	// 성공 시 점수 100점 추가
			} else if (bars[i + 1].code == "D") {		// 주로 사용되는 3가지 화음이 아니기 때문에 20점 추가
				score += 20;
			}
		} else if (bars[i].code == "A") {		// A 화음일 경우
			if (bars[i + 1].code == "D" || bars[i + 1].code == "F" || bars[i + 1].code == "G") {		// 화음 규칙에 맞을 경우
				score += 100;	// 성공 시 점수 100점 추가
			} else if (bars[i + 1].code == "A") {		// 주로 사용되는 3가지 화음이 아니기 때문에 20점 추가
				score += 20;
			}
		}
	};

	var updateView = function () {
		scoreJDOM.html(score);
	};

	return {
		updateScore: function (puzzleBox) {
			init();
			createBars(puzzleBox);
			eval();
			updateView();
		}
	}
}());