/*
var score;
var bar = [
	var File;
	var Code;
	var Begin_pitch;
	var End_pitch;
	var id;
];
var bars = [
	var id;
];
function initalizeScore(){
	score = 0;
}
function getScore(){
	return score;
}
function getBar(file, c, begin_note, end_note, file_id ){									//Initalizer for Bar
	File = file; Code = c; Begin_pitch = begin_note; End_pitch = end_note; file_id = id;
}
var bars = [id];
function addNewBar(newBar){
	bars.add(newBar.id);
}
function checkNewBar(currentBar, newBar){	// Checking Algorithm
	checkHeight(currentBar, newBar);
	addNewBar(newBar)
	
}
function checkHeight(currentBar,newBar){		//높이를 구한다. +-5 기준으로 함.
	var tempLow = currentBar.End_pitch-5;
	var tempHigh = getLastSound(currentBar)+5;

	if(tempLow <= getFirstSound(newBar) && getFirstSound(newBar) <= tempHigh){
		score+=100;	// 성공 시 점수 100점 추가
	} else {
	}
	checkPitch(currentBar, newBar);
}
function checkPitch(currentBar, newBar){				//마디를 체크한다.
	if(currentBar.Code == "C_Code"){
		if(newBar.Code == "D_Code" || newBar.codeInfo == "F_Code" || newBar.codeInfo == "G_Code" || newBar.codeInfo == "A_Code"){
			score+=100;	// 성공 시 점수 100점 추가
		} else if(newBar.Code == "C_Code"){
			score+=50;
		}
	} else if(currentBar.codeInfo == "F_Code"){
		if(newBar.codeInfo == "G_Code" || newBar.codeInfo == "D_Code" || newBar.codeInfo == "C_Code"){
			score+=100;	// 성공 시 점수 100점 추가
		} else if(newBar.Code == "F_Code"){
			score+=50;
		}
	} else if(currentBar.codeInfo == "G_Code"){
		if(newBar.codeInfo == "C_Code" || newBar.codeInfo == "F_Code"){
			score+=100;	// 성공 시 점수 100점 추가
		} else if(newBar.Code == "G_Code"){
			score+=50;
		}
	} else if(currentBar.codeInfo == "D_Code"){
		if(newBar.codeInfo == "G_Code"){
			score+=100;	// 성공 시 점수 100점 추가
		} else if(newBar.Code == "D_Code"){
			score+=20;
		}
	} else if(currentBar.codeInfo == "A_Code"){
		if(newBar.codeInfo == "D_code" || newBar.codeInfo == "F_code" ||newBar.codeInfo == "G_code"){
			score+=100;	// 성공 시 점수 100점 추가
		} else if(newBar.Code == "A_Code"){
			score+=20;
		}
	}
}
*/