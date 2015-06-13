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

/**
 * Class Puzzle. implementation of puzzle
 * Provides newPrototype(audioObject, code), fromPrototype(puzzleObj) public static methods */
var PuzzleBox = (function () {
    // Static Fields
    var INSTANCE;
    var PUZZLE_BOX_LIST = {};
    var _PuzzleBox = function () {
        this.prototypeId = DEFINES.NOT_SET;
    };
    var init = function(clearPuzzleBoxList) {
        $('.puzzleBox').each(function () {
            var jThiz = $(this);
            if (clearPuzzleBoxList) PUZZLE_BOX_LIST[jThiz.data('id')] = new _PuzzleBox();
            var thiz = PUZZLE_BOX_LIST[jThiz.data('id')];

            jThiz.unbind(); // init() can be called multiple time. so clear all event listener first at every time for prevent resource leak
            jThiz.click(function () {
                thiz.prototypeId = DEFINES.NOT_SET;
                jThiz.html('');
                jThiz.attr('class', 'puzzleBox ui-droppable');
                // After works
                $('#savedState').val(PuzzleBox.getPuzzleBoxListJSON()); // update box list state
            });
            jThiz.droppable({
                drop: function (event, ui) {
                    var helperDom = ui.helper[0];
                    thiz.prototypeId = helperDom.getAttribute('data-prototype-id');
                    jThiz.html(helperDom.innerHTML);
                    jThiz.addClass('code'+helperDom.getAttribute('data-code'));

                    if (!checkChord() || !checkPitch()) {
                        thiz.prototypeId = DEFINES.NOT_SET;
                        jThiz.html('');
                        jThiz.attr('class', 'puzzleBox ui-droppable');
                        alert('올바르지 않은 조각입니다.');
                    }

                    // After works
                    $('#savedState').val(PuzzleBox.getPuzzleBoxListJSON()); // update box list state
                }
            });
        })
    };

    var getPuzzleBoxList = function () {return PUZZLE_BOX_LIST;};
    var setPuzzleBoxList = function (obj) {
        // Restore PuzzleBoxList Object
        PUZZLE_BOX_LIST = obj;
        init(false);
        // Restore DOM
        $('.puzzleBox').each(function () {
            var boxID = $(this).data('id');
            var prototypeID = PUZZLE_BOX_LIST[boxID].prototypeId;
            if (prototypeID == DEFINES.NOT_SET) return;
            var relatedPrototypePuzzle = findRelatedPrototypePuzzle(prototypeID);

            $(this).html(relatedPrototypePuzzle.html());
            $(this).attr('class', 'puzzleBox ui-droppable code'+relatedPrototypePuzzle.data('code'));
        });
    };
    var findRelatedPrototypePuzzle = function (prototypeID) {
        return $('.prototypePuzzle[data-prototype-id="' +prototypeID+ '"]');
    };
    // Public Static Methods ---------------------------------------------------------
    return {
        init: function () {init(true);},
        getCode: function (listIndex) {
             return findRelatedPrototypePuzzle(PUZZLE_BOX_LIST[listIndex].prototypeId).data('code');
        },
        getBeginNote: function (listIndex) {
            return findRelatedPrototypePuzzle(PUZZLE_BOX_LIST[listIndex].prototypeId).data('begin-note');
        },
        getEndNote: function (listIndex) {
            return findRelatedPrototypePuzzle(PUZZLE_BOX_LIST[listIndex].prototypeId).data('end-note');
        },
        getPrototypeID: function (listIndex) {
            return PUZZLE_BOX_LIST[listIndex].prototypeId;
        },
        getPuzzleBoxList: getPuzzleBoxList,
        setPuzzleBoxList: setPuzzleBoxList,
        getPuzzleBoxListJSON: function () {return JSON.stringify(getPuzzleBoxList())},
        setPuzzleBoxListJSON: function (JSONObj) {setPuzzleBoxList(JSON.parse(JSONObj))}
    }
}());
/**
 * Class Drawer. implementation of drawer
 * Provides instance() public static method for singleton design */
var Drawer = (function () {
    // Static Fields
    var INSTANCE;
    // Fields ------------------------------------------------------------------------
    var _Drawer = function () {
        this.origin = String($('#drawer').html());
        // Fields for Properties
        this.title = $('.properties_title')[0];
        // Fields for Puzzles
    };
    // Private Methods ---------------------------------------------------------------
    var bindSliderWithPuzzle = function (puzzleObj) {
        // initialize slider first
        unbindSliderWithPuzzle();

        // Bind event listeners with puzzle object
        $('.properties_content>input[type=range]').each(function () {
            var attrName = $(this).attr('name');
            $(this).val(puzzleObj[attrName]);
            $(this).change(function () {puzzleObj[attrName] = $(this).val();});
        });
    };

    var unbindSliderWithPuzzle = function () {
        $('.properties_content>input[type=range]').each(function () {$(this).off('change');});
    };
    // Public Methods ----------------------------------------------------------------
    _Drawer.prototype.bindPuzzle = function(puzzleObj) {
        this.title.textContent = "Puzzle #" + puzzleObj.ID;
        bindSliderWithPuzzle(puzzleObj);
        $('#properties').show();
        $('#puzzles').hide();
    };
    _Drawer.prototype.unbindPuzzle = function () {
        unbindSliderWithPuzzle();
        $('#properties').hide();
        $('#puzzles').show();
    };
    _Drawer.prototype.registerPuzzle = function (puzzle) {
        $('.puzzles_content')[0].appendChild(puzzle.DOMObject);
    };
    // Public Static Methods ---------------------------------------------------------
    return {
        instance: function () {
            return typeof INSTANCE == "undefined" ? (INSTANCE = new _Drawer()) : INSTANCE;
        }
    }
}());
console.log("<Drawer class initialized>");

console.log("<Types module initialized>");
