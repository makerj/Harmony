/*
	화음, 솔로 음 체크
*/
// 변수 선언 부분
var score;			// 점수 Check를 위함
var bar{			// 조각 하나의 정보를 저장함
	code,				// 화음
	begin_pitch,	// 시작 솔로 음
	end_pitch		// 종료 솔로 음
	};
var bars{			// 조각의 배열
	bar;			// 조각을 원소로 함
};
// ----------종료-----------

// 점수 관련 Function
function initalizeScore(){	// 점수 초기화
	score = 0;
}
function getScore(){	// 점수 보내주기
	return score;			// 점수 Return
}

// 점수 관련 Function 종료

// 조각들의 배열에 조각을 추가하는 Function
function addNewBar(bar){		// bars에 조각을 추가함
	bars.add(bar);
}
// 종료

// 조각 Check
function check(bars){		//높이를 구한다. +-5 기준으로 함.
	for(var i = 0; i < bars.size(); i++){			// bars의 크기는 최대 25가 될 것이다.
		if(i<bars.size()-1){
			var tempLow = bars[i].end_pitch-5;		// 현재의 마지막 음에서 5도 위
			var tempHigh = bars[i].end_pitch-5;		// 현재의 마지막 음에서 5도 아래
			
			if(tempLow <= bars[i+1].begin_pitch && bars[i+1].begin_pitch <= tempHigh){
				score+=100;	// 성공 시 점수 100점 추가
			} else {}
			checkPitch(bars, i);		// 화음 체크 function 호출
		} 
		if(i==24){						// 마지막 조각일 경우
			if(bars[i].code == "C"){	// 무조건 C 화음으로 종료되어야 함
				score+=100;				// 이 경우에만 100점 추가
			}
		}
	}
}

// check function에서 호출되었을 때 실행됨
function checkPitch(bars, i){				// 화음을 체크한다.
	if(bars[i].Code == "C"){			// C 코드 일 때
		if(bars[i+1].Code == "D" || bars[i+1].codeInfo == "F" || bars[i+1].codeInfo == "G" || bars[i+1].codeInfo == "A"){		// 화음 규칙에 맞을 경우
			score+=100;	// 성공 시 점수 100점 추가
		} else if(bars[i+1].Code == "C"){	//같은 화음일 경우
			score+=50;			// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
		}
	} else if(bars[i].codeInfo == "F"){		// F 코드일 경우
		if(bars[i+1].codeInfo == "G" || bars[i+1].codeInfo == "D" || bars[i+1].codeInfo == "C"){		// 화음 규칙에 맞을 경우
			score+=100;	// 성공 시 점수 100점 추가
		} else if(bars[i+1].Code == "F"){		// 같은 화음일 경우
			score+=50;				// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
		}
	} else if(bars[i].codeInfo == "G"){		// G 화음일 경우
		if(bars[i+1].codeInfo == "C" || bars[i+1].codeInfo == "F"){		// 화음 규칙에 맞을 경우
			score+=100;	// 성공 시 점수 100점 추가
		} else if(bars[i+1].Code == "G"){		// 같은 화음일 경우
			score+=50;			// 주로 사용되는 3가지 화음(C,F,G) 이기 때문에 같은 화음을 쓸 경우 50점 추가
		}
	} else if(bars[i].codeInfo == "D"){		// D 화음일 경우
		if(bars[i+1].codeInfo == "G"){	// 화음 규칙에 맞을 경우
			score+=100;	// 성공 시 점수 100점 추가
		} else if(bars[i+1].Code == "D"){		// 주로 사용되는 3가지 화음이 아니기 때문에 20점 추가
			score+=20;
		}
	} else if(bars[i].codeInfo == "A"){		// A 화음일 경우
		if(bars[i+1].codeInfo == "D" || bars[i+1].codeInfo == "F" ||bars[i+1].codeInfo == "G"){		// 화음 규칙에 맞을 경우
			score+=100;	// 성공 시 점수 100점 추가
		} else if(bars[i+1].Code == "A"){		// 주로 사용되는 3가지 화음이 아니기 때문에 20점 추가
			score+=20;
		}
	}
}
// 조각 Check 종료

// Temp
//function getBar(file, c, begin_note, end_note, file_id ){									// 음악 마디 생성
//File = file; Code = c; begin_pitch = begin_note; End_pitch = end_note; id++;
//}