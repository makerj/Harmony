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
var Util = (function () {
    /**
     * Bounds checking
     * @param containerExp jQueryObj container
     * @param elemExp jQueryObj Element which will be contained
     * @returns {boolean}
     */
    var contains = function (container, elem) {
        var c = container;
        var cTop = c.offset().top;
        var cLeft = c.offset().left;
        var cBottom = cTop + c.height();
        var cRight = cLeft + c.width();

        var e = elem;
        var eTop = e.offset().top;
        var eLeft = e.offset().left;
        var eBottom = eTop + e.height();
        var eRight = eLeft + e.width();

        return (cLeft < eRight && cRight > eLeft && cTop < eBottom && cBottom > eTop);
    };

    var containsPoint = function (container, x, y) {
        var c = container;
        var cTop = c.offset().top;
        var cLeft = c.offset().left;
        var cBottom = cTop + c.height();
        var cRight = cLeft + c.width();

        return ((x >= cLeft && x <= cRight) && (y >= cTop && y <= cBottom));
    };

    var getBounds = function (jQueryObj) {
        var off = jQueryObj.offset();
        return {
            top: off.top,
            bottom: off.top + jQueryObj.height(),
            left: off.left,
            right: off.left + jQueryObj.width()
        }
    };

    var enableSnappedEvent = function (jQueryObj, event, ui) {
        var draggable = jQueryObj.data("ui-draggable");
        $.each(draggable.snapElements, function(index, element) {
            ui = $.extend({}, ui, {
                snapElement: $(element.item),
                snapping: element.snapping
            });
            if (element.snapping) {
                if (!element.snappingKnown) {
                    element.snappingKnown = true;
                    draggable._trigger("snapped", event, ui);
                }
            } else if (element.snappingKnown) {
                element.snappingKnown = false;
                draggable._trigger("snapped", event, ui);
            }
        });
    };



    // Viewport size getter methods
    var viewPortHeight = window.innerHeight, viewPortWidth = window.innerWidth;
    $(window).resize(function () {
        viewPortHeight = window.innerHeight;
        viewPortWidth = window.innerWidth;
    });

    // Public  Methods ---------------------------------------------------------------
    return {
        contains: contains,
        containsPoint: containsPoint,
        getBounds: getBounds,
        enableSnappedEvent: enableSnappedEvent,
        vh: function () {return viewPortHeight;},
        vw: function () {return viewPortWidth;}
    }
}());
console.log("<Util module initialized>");