/**
 DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 Version 2, December 2004

 Copyright (C) 2015 JunHui Lee <ohenwkgdj@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

 DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO. */
var Game = (function() {
    // Fields ------------------------------------------------------------------------
    var state = {
        curPuzzleBoxIndex: 0,
        curPrototypeLastTop: 0,
        curPrototypeLastLeft: 0,
        PLAYING: false
    };

    // Methods -----------------------------------------------------------------------
    var initPlayGround = function() {
        PuzzleBox.init();
    };
    var initPlayBar = function() {
        // Enable Audio end event chaining
        $('audio').each(function () {
            $(this)[0].addEventListener('ended', function () {
                state.curPuzzleBoxIndex += 1;
                playAudioAtLastPuzzle();
            });
        });
        // Backward Button
        $('#skipBtn_backward').click(function() {
            if (!state.PLAYING) return;
            stopPlaying();
            for (var back = state.curPuzzleBoxIndex-1 ; back >= 0 ; --back)
                if (PuzzleBox.getPrototypeID(back) != -1)  {
                    state.curPuzzleBoxIndex = back;
                    break;
                }

            playAudioAtLastPuzzle();
        });
        // Play Button
        $('#playBtn').click(function() {
            // Play
            if ($('#playBtn').attr("src") == DEFINES.playImg) {
                $('#playBtn').attr("src", DEFINES.stopImg);
                playAudioAtLastPuzzle();
            }
            // Stop
            else {
                $('#playBtn').attr("src", DEFINES.playImg);
                stopAndClearPlaying();
            }
        });
        // Forward Button
        $('#skipBtn_forward').click(function() {
            if (!state.PLAYING) return;
            stopPlaying();
            state.curPuzzleBoxIndex += 1;
            playAudioAtLastPuzzle();
        });
    };
    var initDrawer = function () {
        // 1. Generate Prototype Puzzles
        $('.prototypePuzzle').each(function () {
            var jThiz = $(this);
            // Makes the prototype puzzle click-able so that player can check which sound will be played
            $(this).click(function () {
                $('audio[data-prototype-id="'+jThiz.data('prototype-id')+'"]').clone()[0].play();
            });
            $(this).draggable({
                containment: '.songContents, .playground',
                helper: 'clone'
            });
        });
    };
    var initShareButton = function () {
        $('#shareButton').click(function () {
            saveStateToServer(true);
        });
    };
    var loadWorkspace = function () {
        var savedState = $('#savedState').val();
        if (savedState != "") PuzzleBox.setPuzzleBoxListJSON(savedState);
        Score.updateScore(PuzzleBox.getPuzzleBoxList());
    };
    // Misc
    var saveStateToServer = function (isShare) {
        $.ajax({
            type: "POST",
            url: "saveWorkspace",
            data: (function () {
                $('#savedState').val(PuzzleBox.getPuzzleBoxListJSON());
                return $('#ajaxData').serialize();
            }()),
            success: function(data) {
                if (isShare) prompt('Copy this URL', "http://makerj.synology.me:8080/tonic/workspace?id="+$('#workspace_id').val());
            },
            error: function(request) {
                alert("Connecting failed. Check your internet connection");
            }
        });
    };
    var stopAndClearPlaying = function () {
        $('#playBtn').attr("src", DEFINES.playImg);
        state.curPuzzleBoxIndex = 0;
        state.PLAYING = false;
        stopPlaying();
    };
    var stopPlaying = function () {
        $('.spaceBoot').removeClass('spaceBoot');
        $('audio').each(function () {
            $(this)[0].pause();
            $(this)[0].currentTime = 0;
        });
    };
    var playAudioAtLastPuzzle = function () {
        $('.spaceBoot').removeClass('spaceBoot');
        state.PLAYING = true;
        if (state.curPuzzleBoxIndex < 0 || state.curPuzzleBoxIndex >= DEFINES.PUZZLE_BOX_SIZE) {
            stopAndClearPlaying();
            return;
        }
        var audioID = PuzzleBox.getPrototypeID(state.curPuzzleBoxIndex);
        if (audioID == -1) {
            state.curPuzzleBoxIndex += 1;
            playAudioAtLastPuzzle();
        } else {
            $('.puzzleBox[data-id="'+state.curPuzzleBoxIndex+'"]').addClass('spaceBoot');
            $("audio[data-prototype-id='" + audioID + "']")[0].play();
        }
    };
    // Publish public methods ---------------------------------------------------------
    var init = function() {
        console.log("Game::init Called");
        initPlayGround();
        initPlayBar();
        initDrawer();
        initShareButton();
        loadWorkspace();
    };
    return {
        init : init
    };
}());
console.log("<Game module initialized>");

$(document).ready(
    function () {
        Game.init();
    }
);