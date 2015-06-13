/*
 화음, 솔로 음 체크\

"점수 추가" 제거

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
		for (var i = 0 ; i < 16 ; ++i) {
			if (puzzleBox[i].prototypeId == -1) continue;
			bars.push({
				code: PuzzleBox.getCode(i),
				begin_pitch: PuzzleBox.getBeginNote(i),
				end_pitch: PuzzleBox.getEndNote(i),
				notes : PuzzleBox.getNotes(i)			// 음표의 개수를 구함
			});
		}
	};

	var eval = function () {		//높이를 구한다. +-4 기준으로 함.
		for (var i = 0; i < bars.length; i++) {			// bars의 크기는 최대 16이 될 것이다.
			if (i < bars.length-1) {
				// Evaluate 'Pitch'
				var tempLow = bars[i].end_pitch + 4;		// 현재의 마지막 음에서 4도 위
				var tempHigh = bars[i].end_pitch - 4;		// 현재의 마지막 음에서 4도 아래
				if (tempLow <= bars[i + 1].begin_pitch && bars[i + 1].begin_pitch <= tempHigh){
					if(i==3 || i ==7 || i==15){
						if(bars[i].notes<3){
							evalCode(bars, i);		// 화음 체크 function 호출	
						}
					} else{
						evalCode(bars, i);		// 화음 체크 function 호출
					}
				// Evaluate 'Code'
				}
			}
			if (i == bars.length-1) {						// 마지막 조각일 경우
				if (bars[i].code != bars[0].code) {	// 무조건 첫화음과 같은 화음만 추가되어야 함
					// Error!
				}

			}
		}
	};

	var evalCode = function (bars, i) {				// 화음을 체크한다.
		if (bars[i].code == "C") {			// C 코드 일 때
			if (bars[i + 1].code != "D" && bars[i + 1].code != "F" && bars[i + 1].code != "G" && bars[i + 1].code != "A") {		// 화음 규칙에 안 맞을 경우
				// Error
			}
		} else if (bars[i].code == "F") {		// F 코드일 경우
			if (bars[i + 1].code != "G" && bars[i + 1].code != "D" && bars[i + 1].code != "C") {		// 화음 규칙에 안 맞을 경우
				// Error ! 
			}
		} else if (bars[i].code == "G") {		// G 화음일 경우
			if (bars[i + 1].code != "C" && bars[i + 1].code != "F") {		// 화음 규칙에 안 맞을 경우
				// Error

			}
		} else if (bars[i].code == "D") {		// D 화음일 경우
			if (bars[i + 1].code != "G") {	// 화음 규칙에 안 맞을 경우
				// Error!

			}
		} else if (bars[i].code == "A") {		// A 화음일 경우
			if (bars[i + 1].code != "D" && bars[i + 1].code != "F" && bars[i + 1].code != "G") {		// 화음 규칙에 안 맞을 경우
				// Error ! 
			}
		}
	};

	var updateView = function () {
		scoreJDOM.html(score);
		scoreJDOM.effect('bounce');
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