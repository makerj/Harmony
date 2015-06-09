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
        curPuzzleID: 0,
        curPrototypeLastTop: 0,
        curPrototypeLastLeft: 0
    };
    var PLAYING = false;
    var playImg = "resource/img/main/playBtn.png", stopImg = "resource/img/main/stopBtn.png";

    var drawer = Drawer.instance();
    // Methods -----------------------------------------------------------------------
    var initPlayGround = function() {
        $('.playground').click(function() {drawer.unbindPuzzle();});
        PuzzleBox.init();
            };
            var initPlayBar = function() {
                // Enable Audio end event chaining
                $('audio').each(function () {
                    $(this)[0].addEventListener('ended', function () {
                        state.curPuzzleID += 1;
                        playAudioAtLastPuzzle();
                    });
                });
                // Backward Button
                $('#skipBtn_backward').click(function() {
                    if (!PLAYING) return;
                    stopPlaying();
                    state.curPuzzleID += -1;
                    playAudioAtLastPuzzle();
                });
                // Play Button
                $('#playBtn').click(function() {
                    // Play
                    if ($('#playBtn').attr("src") == playImg) {
                        $('#playBtn').attr("src", stopImg);
                        playAudioAtLastPuzzle();
                    }
                    // Stop
                    else {
                        $('#playBtn').attr("src", playImg);
                        stopAndClearPlaying();
            }
        });
        // Forward Button
        $('#skipBtn_forward').click(function() {
            if (!PLAYING) return;
            stopPlaying();
            state.curPuzzleID += 1;
            playAudioAtLastPuzzle();
        });
    };
    var stopAndClearPlaying = function () {
        $('#playBtn').attr("src", playImg);
        state.curPuzzleID = 0;
        PLAYING = false;
        stopPlaying();
    };
    var stopPlaying = function () {
        $('audio').each(function () {
            $(this)[0].pause();
            $(this)[0].currentTime = 0;
        });
    };
    var playAudioAtLastPuzzle = function () {
        if (state.curPuzzleID >= 25) {
            stopAndClearPlaying();
            return;
        }
        var audioID = PuzzleBox.getPuzzleBoxList()[state.curPuzzleID].audioID;
        audioID = 0;
        if (audioID == -1) {
            state.curPuzzleID += 1;
            playAudioAtLastPuzzle();
        } else {
            $("audio[data-prototype-id='" + audioID + "']")[0].play();
        }
    };
    var setCurPuzzle = function (puzzleObj) {
        state.curPuzzleID = puzzleObj.ID;
        drawer.bindPuzzle(puzzleObj);
    };
    var spawnPrototypePuzzle = function() {
        // 1. Generate prototype puzzle instance for each audio element
        $("audio").each(function () {
            var p = Puzzle.newPrototype($(this)[0], $(this).attr('code'));
            drawer.registerPuzzle(p);
            // TODO shuffle prototype puzzles at random offset
            var pc = $('.puzzles_content');
            p.DOMObject.style.top = (Math.random()*pc.height()*0.7 + Util.vh()*0.1) + 'px';
            p.DOMObject.style.left = (Math.random()*pc.width()*0.7 + pc.offset().left) + 'px';

        });
        // 2. Enable draggable
        $('.puzzle_prototype').draggable({
            start: function () {
                state.curPrototypeLastTop = $(this).offset().top;
                state.curPrototypeLastLeft = $(this).offset().left;
            },
            stop: function () {
                // User want to use this prototype puzzle
                if (Util.contains($('.playground'), $(this))) {
                    // DO NOT drop current offset yet. offset will be used for new puzzle
                    var offset = $(this).offset();

                    // Restore prototype's initial position
                    $(this).css({
                        top: state.curPrototypeLastTop,
                        left: state.curPrototypeLastLeft
                    });

                    // Add new puzzle at the playground
                    Puzzle.fromPrototype(
                        Puzzle.findPuzzleById($(this).attr('id')),
                        offset,
                        $('.playground')
                    );
                }
                // Prototype still in the drawer
                else {
                    // I think we have nothing to do here
                    // hmm... containment needed for each code section?
                }

            }
        });
    };

    var init = function() {
        console.log("Game::init Called");
        initPlayGround();
        initPlayBar();
        spawnPrototypePuzzle();
        drawer.unbindPuzzle(); // Set drawer context to puzzle selection mode
    };

    var isPlaying = function () {
        return state.curPuzzleID != -1;
    };

    // Publish public methods ---------------------------------------------------------
    return {
        init : init,
        isPlaying : isPlaying,
        setPuzzle: setCurPuzzle
    };
}());
console.log("<Game module initialized>");

$(document).ready(
    function () {
        Game.init();
    }
);