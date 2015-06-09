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
var Puzzle = (function() {
    // Static Fields
    var ID_SEEDER = 0;
    var PUZZLE_LIST = [];

    // Constructor -------------------------------------------------------------------
    var _Puzzle = function (audioObject, code, isPrototype) {
        this.ID= ID_SEEDER;
        this.audioSrc = audioObject;
        this.code = code;
        this.isPrototype = isPrototype;
        this.DOMObject = (function () {return $('#puzzleBase').clone(true).attr("id", String(ID_SEEDER))[0];}());
        this.overdrive  = 0;
        this.filter  = 0;
        this.cabinet  = 0;
        this.delay  = 0;
        this.convolver  = 0;
        this.compressor  = 0;
        this.wahwah  = 0;
        this.tremolo  = 0;
        this.phaser  = 0;
        this.chorus  = 0;
        PUZZLE_LIST.push(this);
        ID_SEEDER++;
    };
    var ordinaryPuzzle = function (prototypePuzzleObj, offset, container) {
        // Set attributes
        var newPuzzle = jQuery.extend(true, {}, prototypePuzzleObj); // clone()
        newPuzzle.ID = ID_SEEDER;
        newPuzzle.isPrototype = false;
        newPuzzle.DOMObject = $('#puzzleBase')[0].cloneNode(true);
        newPuzzle.DOMObject.setAttribute('id', String(ID_SEEDER));
        newPuzzle.DOMObject.className = 'puzzle';
        newPuzzle.DOMObject.style.top = offset.top + 'px';
        newPuzzle.DOMObject.style.left = offset.left + 'px';
        newPuzzle.DOMObject.style.display = 'none';

        // IMPORTANT DOMObject should be appended as container's child before being draggable
        // Because 'draggable' has position issue
        container[0].appendChild(newPuzzle.DOMObject);
        $(newPuzzle.DOMObject).fadeIn();

        // Set Draggable
        $(newPuzzle.DOMObject).draggable({
            containment: ".playground",
            drag: function(event, ui) {
                Util.enableSnappedEvent($(this), event, ui);
            },
            snap: ".puzzle", // TODO Change snap target to appropriate specific puzzle
            snapMode: "both",
            snapped: function (event, ui) {
                // TODO define procedure when puzzle snapped
                var snapper = ui.snapElement.attr("id"); // Element which waiting in its position
                var snappee = ui.helper.attr("id"); // Element which you dragging
                console.log("'snapped' event occurred when> " + new Date().getTime() + "ms");
                console.log("Snapper ID> " + snapper);
                console.log("Snappee ID> " + snappee);
            }
        });

        // Register onClick listener
        $(newPuzzle.DOMObject).click(function () {
            Game.setPuzzle(newPuzzle);
            return false; // Disable event bubbling
        });

        PUZZLE_LIST.push(newPuzzle);
        ID_SEEDER++;

        return newPuzzle;
    };
    // Public Methods ----------------------------------------------------------------
    _Puzzle.prototype.play = function () {this.audioSrc.play();};
    _Puzzle.prototype.pause = function () {this.audioSrc.pause();};
    _Puzzle.prototype.stop = function () {this.audioSrc.pause();this.audioSrc.currentTime=0;};

    // Public Static Methods ---------------------------------------------------------
    return {
        newPrototype: function (audioObject, code) {return new _Puzzle(audioObject, code, true);},
        fromPrototype: ordinaryPuzzle,
        findPuzzleById: function (id) {return PUZZLE_LIST[id];}
    }
}());
console.log("<Puzzle class initialized>");

var Playground = (function(){
    // Static Fields
    var INSTANCE;
    // Fields ------------------------------------------------------------------------
    var _Playground = function () {
        this.state = "FINE";
    };

    _Playground.prototype.addLine = function() {
        $('<div class="line"></div>').hide().appendTo($('.playground')).show('slide',{direction: 'down'});
    };

    return {
        instance: function () {
            return typeof INSTANCE == "undefined" ? (INSTANCE = new _Playground()) : INSTANCE;
        }
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